import { CSSProperties, ReactElement, ReactNode, isValidElement } from 'react';

/** 스타일 묶음 클래스 접두사(react-syntax-highlighter). 다른 클래스와 겹치지 않게 한다 */
const STYLE_CLASS_PREFIX = 'rsh-';
const FNV_OFFSET_BASIS = 0x811c9dc5;
const FNV_PRIME = 0x01000193;
const CLASS_NAME_RADIX = 36;

/** className·style·children 외의 props는 React와 결과가 달라질 수 있어 다루지 않는다 */
const SUPPORTED_PROPS = new Set(['className', 'style', 'children']);

export interface StyleRule {
	className: string;
	cssText: string;
}

interface StaticHtmlSuccess {
	ok: true;
	html: string;
	/** 인라인 스타일 대신 쓰는 클래스 규칙. html과 함께 넣어야 같은 모양이 된다 */
	styleRules: StyleRule[];
}

export type StaticHtmlResult = StaticHtmlSuccess | { ok: false; reason: string };

class UnsupportedNodeError extends Error {}

function escapeHtml(text: string) {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#x27;');
}

function toCssPropertyName(name: string) {
	return name
		.replace(/([A-Z])/g, '-$1')
		.toLowerCase()
		.replace(/^ms-/, '-ms-');
}

/** React가 style 속성에 쓰지 않고 건너뛰는 값 */
function isOmittedStyleValue(value: unknown) {
	return value === null || value === undefined || typeof value === 'boolean' || value === '';
}

/**
 * React DOM과 같은 결과가 보장되는 문자열 값만 직렬화한다.
 * 숫자(단위 처리 규칙)·CSS 변수는 React와 어긋날 수 있어 지원하지 않는다.
 */
function toCssText(style: CSSProperties) {
	return Object.entries(style)
		.filter(([, value]) => !isOmittedStyleValue(value))
		.map(([name, value]) => {
			const isSupportedDeclaration = typeof value === 'string' && !name.startsWith('--');
			if (!isSupportedDeclaration) {
				throw new UnsupportedNodeError(`문자열이 아닌 스타일 값(${name})`);
			}
			return `${toCssPropertyName(name)}:${value.trim()}`;
		})
		.join(';');
}

/** 같은 인라인 스타일을 쓰는 요소들이 공유할 클래스 이름(FNV-1a 32bit). 스타일 내용이 같으면 같은 이름이 된다 */
function toStyleClassName(cssText: string) {
	let hash = FNV_OFFSET_BASIS;
	for (let i = 0; i < cssText.length; i++) {
		hash ^= cssText.charCodeAt(i);
		hash = Math.imul(hash, FNV_PRIME);
	}
	return `${STYLE_CLASS_PREFIX}${(hash >>> 0).toString(CLASS_NAME_RADIX)}`;
}

interface HostElementProps {
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}

/** `<span>`처럼 문자열 태그로 된 요소인지(컴포넌트 요소가 아닌지) */
function isHostElement(node: ReactNode): node is ReactElement<HostElementProps, string> {
	return isValidElement(node) && typeof node.type === 'string';
}

function renderNode(node: ReactNode, classNameForStyle: (cssText: string) => string): string {
	if (node === null || node === undefined || typeof node === 'boolean') {
		return '';
	}

	if (typeof node === 'string' || typeof node === 'number') {
		return escapeHtml(String(node));
	}

	if (Array.isArray(node)) {
		return node.map(child => renderNode(child, classNameForStyle)).join('');
	}

	if (!isHostElement(node)) {
		throw new UnsupportedNodeError('문자열 태그가 아닌 요소');
	}

	const unsupportedProp = Object.keys(node.props).find(prop => !SUPPORTED_PROPS.has(prop));
	if (unsupportedProp) {
		throw new UnsupportedNodeError(`지원하지 않는 속성(${unsupportedProp})`);
	}

	const { className, style, children } = node.props;
	const cssText = style ? toCssText(style) : '';
	const classNames = [className, cssText ? classNameForStyle(cssText) : ''].filter(Boolean).join(' ');
	const classAttribute = classNames ? ` class="${escapeHtml(classNames)}"` : '';

	return `<${node.type}${classAttribute}>${renderNode(children, classNameForStyle)}</${node.type}>`;
}

/**
 * 하이라이터가 만든 span 트리(문자열 태그 + className·style만 쓰는 요소)를 HTML 문자열로 바꾼다.
 * 토큰마다 반복되는 인라인 스타일은 내용별 클래스 하나로 묶어 HTML 크기를 줄인다
 * (요소 선택자보다 우선하는 클래스 규칙이라, 전역 span 리셋에 덮이지 않고 인라인일 때와 같게 그려진다).
 * 예상 밖의 트리를 만나면 { ok: false }를 돌려주며, 호출하는 쪽은 React 렌더링으로 대체한다.
 */
export default function renderStaticHtml(node: ReactNode): StaticHtmlResult {
	const cssTextByClassName = new Map<string, string>();
	const classNameForStyle = (cssText: string) => {
		const className = toStyleClassName(cssText);
		const registeredCssText = cssTextByClassName.get(className);
		if (registeredCssText !== undefined && registeredCssText !== cssText) {
			throw new UnsupportedNodeError(`클래스 이름 충돌(${className})`);
		}
		cssTextByClassName.set(className, cssText);
		return className;
	};

	try {
		const html = renderNode(node, classNameForStyle);
		const styleRules = [...cssTextByClassName].map(([className, cssText]) => ({ className, cssText }));
		return { ok: true, html, styleRules };
	} catch (error) {
		if (error instanceof UnsupportedNodeError) {
			return { ok: false, reason: error.message };
		}
		throw error;
	}
}
