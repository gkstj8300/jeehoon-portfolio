import { CUSTOM_BLOCK_LANGUAGES, SCRIPT_CODE_LANGUAGES } from './codeLanguages';
import { markDownContentFormat } from './markDown';

/*
 * 목록의 글 상자는 최대 900px(PostListPage.module.scss `.post`의 max-height)까지만 보이고 나머지는 잘린다.
 * 그래서 상자를 넘치게 채우는 앞부분만 보내도 보이는 모습은 전체 본문과 같다.
 * 높이는 실제보다 «작게» 어림한다(이미지·여백·제목 크기를 세지 않고, 그려지지 않을 수 있는 내용은 0으로 센다).
 * 어림값이 목표를 넘으면 실제로는 더 높다.
 */
/** 보이는 높이(900px)에 여유를 둔 목표 어림 높이 */
const TARGET_ESTIMATED_HEIGHT_PX = 1200;
/** 데스크톱 본문 폭(약 770px)에 폭이 좁은 글자만 들어간다고 가정한 한 줄 글자 수. 줄 수를 적게 센다 */
const PROSE_CHARS_PER_LINE = 100;
/** 본문 문단 한 줄 높이(16px × 1.6) */
const PROSE_LINE_HEIGHT_PX = 25.6;
/** 하이라이트되는 코드 블록 한 줄 높이(14px × 1.5) */
const SCRIPT_CODE_LINE_HEIGHT_PX = 21;
/** 강조 박스(point·list·caution) 한 줄의 최소 높이. 실제 줄 높이(1.4em~2rem)보다 낮게 잡는다 */
const CUSTOM_BLOCK_LINE_HEIGHT_PX = 16;
/** 그려지지 않을 수 있는 내용(지원하지 않는 언어의 펜스, HTML 주석·블록 안쪽, 구분선 등) */
const INVISIBLE_LINE_HEIGHT_PX = 0;
/** 닫는 펜스는 여는 펜스보다 3칸까지 더 들여쓸 수 있다(CommonMark) */
const CLOSING_FENCE_EXTRA_INDENT = 3;

const FENCE_PATTERN = /^(\s*)(`{3,}|~{3,})(.*)$/;
const FENCE_LANGUAGE_PATTERN = /^\w+/;
const LIST_ITEM_PATTERN = /^\s*([-*+]|\d+[.)])\s/;
/** 구분선(---, ***, ___) */
const THEMATIC_BREAK_PATTERN = /^\s*([-*_])(\s*\1){2,}\s*$/;
/** 표의 정렬 줄(|---|:--:|) */
const TABLE_DELIMITER_PATTERN = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/;
/** 참조 링크 `[x]: url`·각주 `[^x]: 내용` 정의 */
const LINK_DEFINITION_PATTERN = /^ {0,3}\[[^\]]+\]:/m;
const INLINE_CODE_PATTERN = /`[^`]*`/g;
const HTML_COMMENT_PATTERN = /<!--[\s\S]*?-->/g;
const HTML_TAG_PATTERN = /<(\/?)([a-zA-Z][\w-]*)\b[^>]*?(\/?)>/g;
const VOID_HTML_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

interface OpenFence {
	marker: string;
	length: number;
	indent: number;
	/** 펜스 안 한 줄의 어림 높이. 그려지지 않는 언어면 0 */
	lineHeight: number;
}

/** 펜스 언어(정보 문자열의 첫 단어)로 펜스 안 한 줄의 어림 높이를 정한다 */
function toFenceLineHeight(info: string) {
	const language = FENCE_LANGUAGE_PATTERN.exec(info.trim())?.[0] ?? '';
	if (SCRIPT_CODE_LANGUAGES.has(language)) {
		return SCRIPT_CODE_LINE_HEIGHT_PX;
	}

	if (CUSTOM_BLOCK_LANGUAGES.has(language)) {
		return CUSTOM_BLOCK_LINE_HEIGHT_PX;
	}
	return INVISIBLE_LINE_HEIGHT_PX;
}

/** 화면에 보이는 글자만 남긴다(링크 주소·이미지·HTML 태그 제외) — 길이를 실제보다 짧게 센다 */
function toVisibleText(line: string) {
	return line
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\]\([^)]*\)/g, ']')
		.replace(/<[^>]*>/g, '')
		.trim();
}

function estimateProseHeight(line: string) {
	const isDecorationLine = THEMATIC_BREAK_PATTERN.test(line) || TABLE_DELIMITER_PATTERN.test(line);
	if (isDecorationLine) {
		return INVISIBLE_LINE_HEIGHT_PX;
	}
	const visibleLength = toVisibleText(line).length;
	return Math.ceil(visibleLength / PROSE_CHARS_PER_LINE) * PROSE_LINE_HEIGHT_PX;
}

/** 줄을 차례로 넘겨받으며 코드 펜스·HTML 블록 안인지 추적하고, 줄마다 어림 높이를 돌려준다 */
function createBlockScanner() {
	let openFence: OpenFence | null = null;
	let htmlDepth = 0;
	let isInHtmlComment = false;

	const isInsideHtml = () => 0 < htmlDepth || isInHtmlComment;

	const trackHtml = (line: string) => {
		let text = line.replace(INLINE_CODE_PATTERN, '');
		if (isInHtmlComment) {
			const commentEnd = text.indexOf('-->');
			if (commentEnd === -1) {
				return;
			}
			isInHtmlComment = false;
			text = text.slice(commentEnd + '-->'.length);
		}
		text = text.replace(HTML_COMMENT_PATTERN, '');
		const commentStart = text.indexOf('<!--');
		if (commentStart !== -1) {
			isInHtmlComment = true;
			text = text.slice(0, commentStart);
		}

		for (const [, closingSlash, tagName = '', selfClosingSlash] of text.matchAll(HTML_TAG_PATTERN)) {
			const isOpeningTag = !closingSlash && !selfClosingSlash && !VOID_HTML_TAGS.has(tagName.toLowerCase());
			if (closingSlash) {
				htmlDepth = Math.max(0, htmlDepth - 1);
			} else if (isOpeningTag) {
				htmlDepth += 1;
			}
		}
	};

	return {
		/** 코드 펜스·HTML 블록·HTML 주석 바깥(블록을 끊어도 되는 위치)인지 */
		isAtTopLevel: () => openFence === null && !isInsideHtml(),

		consume(line: string): number {
			const [, indent = '', fence, info = ''] = FENCE_PATTERN.exec(line) ?? [];

			if (openFence) {
				const isClosingFence =
					!!fence &&
					fence.charAt(0) === openFence.marker &&
					openFence.length <= fence.length &&
					info.trim() === '' &&
					indent.length <= openFence.indent + CLOSING_FENCE_EXTRA_INDENT;
				if (isClosingFence) {
					openFence = null;
					return INVISIBLE_LINE_HEIGHT_PX;
				}
				return openFence.lineHeight;
			}

			if (fence) {
				openFence = {
					marker: fence.charAt(0),
					length: fence.length,
					indent: indent.length,
					lineHeight: toFenceLineHeight(info),
				};
				return INVISIBLE_LINE_HEIGHT_PX;
			}

			// HTML 주석·블록(<details> 등) 안쪽은 접혀 있거나 보이지 않을 수 있어 세지 않는다
			const wasInsideHtml = isInsideHtml();
			trackHtml(line);
			if (wasInsideHtml || isInsideHtml()) {
				return INVISIBLE_LINE_HEIGHT_PX;
			}
			return estimateProseHeight(line);
		},
	};
}

/** 빈 줄 뒤에 이어지는 줄이 새 블록의 시작인지(목록 항목·들여쓴 이어짐 줄이면 앞 블록의 일부) */
function startsNewTopLevelBlock(line: string | undefined) {
	if (line === undefined) {
		return false;
	}
	const isIndented = /^\s/.test(line);
	return !isIndented && !LIST_ITEM_PATTERN.test(line);
}

/** 본문을 화면과 같은 기준으로 줄로 나눈다: 문자열 속 `\n` 표기를 실제 줄바꿈으로 바꾼 뒤 자른다 */
function toFormattedLines(rawLine: string) {
	return markDownContentFormat(rawLine)
		.split('\n')
		.map(line => line.replace(/\r$/, ''));
}

/**
 * 목록 미리보기용 본문 앞부분. 잘린 앞부분이 전체 본문의 앞부분과 똑같이 그려지도록,
 * - 빈 줄(블록 경계)에서만 자르고, 코드 펜스·HTML 블록 안이나 목록 중간에서는 자르지 않는다.
 * - 뒤쪽 정의가 앞 내용의 모양을 바꾸는 참조 링크·각주가 있으면 자르지 않는다.
 * 안전하게 자를 위치를 못 찾으면 전체 본문을 그대로 돌려준다.
 */
export function createExcerpt(markdown: string) {
	if (LINK_DEFINITION_PATTERN.test(markdown)) {
		return markdown;
	}

	// 원문 줄을 그대로 이어 붙여야 렌더링 입력이 전체 본문의 앞부분과 같아진다(CRLF 포함)
	const rawLines = markdown.split('\n');
	const formattedLines = rawLines.map(toFormattedLines);
	const isBlankLine = (index: number) => formattedLines[index]?.every(line => line.trim() === '') ?? false;
	const scanner = createBlockScanner();
	let estimatedHeight = 0;

	for (let index = 0; index < rawLines.length; index++) {
		const isFilledEnough = TARGET_ESTIMATED_HEIGHT_PX <= estimatedHeight;
		const isBlockBoundary = isBlankLine(index) && scanner.isAtTopLevel();
		if (isFilledEnough && isBlockBoundary) {
			let nextIndex = index + 1;
			while (nextIndex < rawLines.length && isBlankLine(nextIndex)) {
				nextIndex++;
			}

			if (startsNewTopLevelBlock(formattedLines[nextIndex]?.[0])) {
				return rawLines.slice(0, index).join('\n');
			}
		}

		for (const line of formattedLines[index] ?? []) {
			estimatedHeight += scanner.consume(line);
		}
	}

	return markdown;
}
