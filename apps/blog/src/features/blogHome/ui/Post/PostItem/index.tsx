import { url } from '@jeehoon/utils';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PostItem.module.scss';
import { PostSummary } from '@/shared/types/slug';

interface PostItemProps {
	post: PostSummary;
	priority: boolean;
	handlePostClick: (post: PostSummary) => void;
}

export default function PostItem({ post, priority, handlePostClick }: PostItemProps) {
	const { slug, title, description, thumbnailImage, mainTag } = post;
	return (
		<Link
			className={styles.container}
			href={url.postDetail(slug)}
			onClick={() => handlePostClick(post)}
		>
			<div className={styles.thumbnail}>
				<div className={styles.thumbnailImg}>
					<Image
						src={thumbnailImage}
						alt={title}
						fill
						sizes="(max-width: 768px) 100vw, 350px"
						className={styles.img}
						priority={priority}
					/>
				</div>
				<div className={styles.mainTag}>{mainTag}</div>
			</div>
			<div className={styles.title}>{title}</div>
			<div className={styles.description}>{description}</div>
		</Link>
	);
}
PostItem.displayName = 'PostItem';
