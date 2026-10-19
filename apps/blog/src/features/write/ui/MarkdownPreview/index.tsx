import dynamic from 'next/dynamic';
import styles from './MarkdownPreview.module.scss';

// 마크다운 렌더러·코드 하이라이터는 미리보기에서만 쓰므로 지금처럼 브라우저에서 늦게 불러온다
const PostMarkdown = dynamic(() => import('@/entities/post/ui/PostMarkdown'), {
	ssr: false,
});

interface MarkdownPreviewProps {
	content: string;
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
	return (
		<div className={styles.editor}>
			<PostMarkdown content={content} />
		</div>
	);
}
MarkdownPreview.displayName = 'MarkdownPreview';
