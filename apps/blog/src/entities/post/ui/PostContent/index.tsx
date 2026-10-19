import styles from './PostContent.module.scss';
import PostMarkdown from '@/entities/post/ui/PostMarkdown';

interface PostContentProps {
	content: string;
}

export default function PostContent({ content }: PostContentProps) {
	return (
		<div className={styles.container}>
			<PostMarkdown content={content} />
		</div>
	);
}
PostContent.displayName = 'PostContent';
