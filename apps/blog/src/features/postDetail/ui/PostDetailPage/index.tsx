import Image from 'next/image';
import PostComentsLazy from '../PostComentsLazy';
import PostDetailPageView from '../PostDetailPageView';
import TableOfContents from '../TableOfContents';
import styles from './PostDetailPage.module.scss';
import PostContent from '@/entities/post/ui/PostContent';
import PostInfo from '@/entities/post/ui/PostInfo';
import PostTitle from '@/entities/post/ui/PostTitle';
import { getPostContentHeadings } from '@/features/postDetail/utils/getPostContentHeadings';

interface PostDetailProps {
	title: string;
	thumbnailImage: string;
	mainTag: string;
	regDate: string;
	tags: string[];
	content: string;
}

/**
 * 게시글 상세. 본문과 목차는 서버에서 그려 첫 HTML에 실리고,
 * 목차 상호작용·댓글·조회 기록만 클라이언트 컴포넌트로 둔다.
 */
export default function PostDetailPage({
	title,
	thumbnailImage,
	regDate,
	mainTag,
	tags,
	content,
}: PostDetailProps) {
	const headings = getPostContentHeadings(content);

	return (
		<div className={styles.container}>
			<div className={styles.detailWrap}>
				{thumbnailImage && (
					<div className={styles.thumbnail}>
						<Image
							src={thumbnailImage}
							alt={`${thumbnailImage}`}
							width={668}
							height={400}
							priority
						/>
					</div>
				)}
				<PostTitle title={title} />
				<PostInfo tags={tags} />
				<PostContent content={content} />
				<PostComentsLazy />
			</div>
			{headings.length > 0 && <TableOfContents headings={headings} />}
			<PostDetailPageView title={title} regDate={regDate} mainTag={mainTag} />
		</div>
	);
}
PostDetailPage.displayName = 'PostDetailPage';
