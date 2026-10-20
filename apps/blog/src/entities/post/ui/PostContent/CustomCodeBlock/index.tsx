// dist/esm 경로의 타입은 @types/react-syntax-highlighter의 전역 선언에만 있어, @types를 자동으로 읽지 않는 TypeScript 6에서도 찾도록 명시한다
/// <reference types="react-syntax-highlighter" />
import { ClassAttributes, HTMLAttributes } from 'react';
import { ExtraProps } from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import materialDark from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark';
import CautionCodeBlock from './CautionCodeBlock';
import styles from './CustomCodeBlock.module.scss';
import ListCodeBlock from './ListCodeBlock';
import PointCodeBlock from './PointCodeBlock';
import renderStaticHtml from './renderStaticHtml';
import { SCRIPT_CODE_LANGUAGES } from '@/entities/post/utils/codeLanguages';

/**
 * 토큰 스타일 규칙은 <style href precedence>로 그려 React가 <head>로 옮기고, 같은 규칙(href)은 한 번만 넣게 한다.
 * 코드 블록 안에 <style>이 끼지 않고, 여러 블록이 같은 규칙을 반복해 싣지 않는다.
 */
const SYNTAX_STYLE_PRECEDENCE = 'syntax-highlight';

interface CustomCodeBlockProps {
	props: ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps;
}

/**
 * 하이라이트 결과(토큰마다 인라인 스타일이 붙은 span 수천 개)를 React 트리 대신 HTML 문자열로 넣는다.
 * 그려지는 DOM은 같고, 서버 렌더링 데이터(RSC)에 스타일 객체가 토큰 수만큼 직렬화되지 않는다.
 */
function StaticCodeTag({ children, ...props }: HTMLAttributes<HTMLElement>) {
	const result = renderStaticHtml(children);

	// 예상 밖의 트리면 지금까지처럼 React로 그린다(모양은 같고 데이터만 크다)
	if (!result.ok) {
		return <code {...props}>{children}</code>;
	}

	return (
		<>
			{result.styleRules.map(({ className, cssText }) => (
				<style key={className} href={className} precedence={SYNTAX_STYLE_PRECEDENCE}>
					{`.${className}{${cssText}}`}
				</style>
			))}
			<code {...props} dangerouslySetInnerHTML={{ __html: result.html }} />
		</>
	);
}

/**
 * 코드 블록은 서버에서 하이라이트까지 마친 HTML로 내려보낸다.
 * 브라우저가 Prism(하이라이터)과 테마 스타일을 내려받은 뒤에야 코드가 보이던 지연을 없앤다.
 * 색은 기존과 같은 material-dark 테마를 쓴다.
 */
export default function CustomCodeBlock({ props }: CustomCodeBlockProps) {
	const { className, children } = props;
	const match = /language-(\w+)/.exec(className || '');

	if (match?.[1] === 'point') {
		return <PointCodeBlock content={String(children).replace(/\n$/, '')} />;
	}

	if (match?.[1] === 'list') {
		return <ListCodeBlock props={props} />;
	}

	if (match?.[1] === 'caution') {
		return <CautionCodeBlock content={String(children).replace(/\n$/, '')} />;
	}

	if (SCRIPT_CODE_LANGUAGES.has(match?.[1] ?? '')) {
		return (
			<SyntaxHighlighter
				className={styles.scriptBlock}
				style={materialDark}
				language="javascript"
				PreTag="pre"
				showLineNumbers
				wrapLines
				CodeTag={StaticCodeTag}
			>
				{String(children).replace(/\n$/, '')}
			</SyntaxHighlighter>
		);
	}
}
