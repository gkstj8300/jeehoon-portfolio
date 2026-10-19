import { useCallback } from 'react';
import styles from './Post.module.scss';
import PostItem from './PostItem';
import { ga } from '@/shared/lib/logs/analytics';
import { PostSummary } from '@/shared/types/slug';

interface PostProps {
	postList: PostSummary[];
}

const LAYOUT = 'Home';
/**
 * 첫 화면(데스크톱 첫 줄 3개)에 보이는 썸네일만 미리 불러온다.
 * 나머지는 스크롤해서 가까워질 때 불러와, 첫 화면 이미지와 대역폭을 다투지 않게 한다.
 */
const PRIORITY_THUMBNAIL_COUNT = 3;

export default function Post({ postList }: PostProps) {
	const handlePostClick = useCallback((post: PostSummary) => {
		ga.events.selectPost(post, LAYOUT);
	}, []);

	return (
		<div className={styles.container}>
			{postList.map((post, idx) => (
				<PostItem
					key={idx}
					post={post}
					priority={idx < PRIORITY_THUMBNAIL_COUNT}
					handlePostClick={handlePostClick}
				/>
			))}
		</div>
	);
}
Post.displayName = 'Post';
