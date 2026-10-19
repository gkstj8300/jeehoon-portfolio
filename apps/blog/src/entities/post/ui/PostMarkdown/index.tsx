import { DetailedHTMLProps, HTMLAttributes, ImgHTMLAttributes } from 'react';
import Markdown, { ExtraProps } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import CustomCodeBlock from '@/entities/post/ui/PostContent/CustomCodeBlock';
import { toHeadingId } from '@/entities/post/utils/headingId';
import { markDownContentFormat } from '@/entities/post/utils/markDown';

const REMARK_PLUGINS = [remarkGfm, remarkBreaks];
const REHYPE_PLUGINS = [rehypeRaw];

/**
 * react-markdown이 컴포넌트마다 넘기는 node(구문 트리)는 DOM 속성이 아니다.
 * 그대로 펼치면 HTML에 node="[object Object]"로 붙고, 서버 렌더링 데이터에는 트리 전체가 실린다.
 */
function omitNode<P extends ExtraProps>(props: P): Omit<P, 'node'> {
	const domProps = { ...props };
	delete domProps.node;
	return domProps;
}

const MARKDOWN_COMPONENTS = {
	code(props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & ExtraProps) {
		return <CustomCodeBlock props={omitNode(props)} />;
	},
	h1: ({
		children,
		...props
	}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & ExtraProps) => (
		<h1 id={toHeadingId(String(children))} style={{ fontSize: '2em' }} {...omitNode(props)}>
			{children}
		</h1>
	),
	h2: ({
		children,
		...props
	}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & ExtraProps) => (
		<h2 id={toHeadingId(String(children))} style={{ fontSize: '1.75em' }} {...omitNode(props)}>
			{children}
		</h2>
	),
	h3: ({
		children,
		...props
	}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & ExtraProps) => (
		<h3 id={toHeadingId(String(children))} style={{ fontSize: '1.5em' }} {...omitNode(props)}>
			{children}
		</h3>
	),
	h4: (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & ExtraProps) => (
		<h4 style={{ fontSize: '1.25em' }} {...omitNode(props)} />
	),
	h5: (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & ExtraProps) => (
		<h5 style={{ fontSize: '1em' }} {...omitNode(props)} />
	),
	p: (props: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & ExtraProps) => (
		<p style={{ marginTop: 0, marginBottom: '1rem' }} {...omitNode(props)} />
	),
	pre: (props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> & ExtraProps) => (
		<pre style={{ marginTop: 0, marginBottom: '1rem' }} {...omitNode(props)} />
	),
	details: (props: DetailedHTMLProps<HTMLAttributes<HTMLDetailsElement>, HTMLDetailsElement> & ExtraProps) => (
		<details style={{ cursor: 'pointer' }} {...omitNode(props)} />
	),
	/**
	 * 서버에서 그린 <img>에는 React가 자동으로 높은 우선순위 preload를 붙인다.
	 * 본문 이미지가 첫 화면의 썸네일·CSS·JS와 대역폭을 다투지 않도록 낮은 우선순위로 바로 불러온다.
	 */
	img: (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & ExtraProps) => (
		// eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
		<img {...omitNode(props)} fetchPriority="low" />
	),
};

interface PostMarkdownProps {
	content: string;
}

/**
 * 게시글 마크다운 렌더러. 훅을 쓰지 않아 서버 컴포넌트로 그릴 수 있다.
 * 상세·목록은 서버에서 그려 본문이 HTML에 바로 실리고, 글쓰기 미리보기는 지연 로딩해 쓴다.
 */
export default function PostMarkdown({ content }: PostMarkdownProps) {
	return (
		<Markdown
			remarkPlugins={REMARK_PLUGINS}
			rehypePlugins={REHYPE_PLUGINS}
			components={MARKDOWN_COMPONENTS}
		>
			{markDownContentFormat(content)}
		</Markdown>
	);
}
