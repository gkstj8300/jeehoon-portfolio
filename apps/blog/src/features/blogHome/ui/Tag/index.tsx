import { Ui } from '@jeehoon/ui';
import { useCallback, useMemo, MouseEvent } from 'react';
import styles from './Tag.module.scss';
import { SearchType } from '@/features/blogHome/types';
import { PostSummary } from '@/shared/types/slug';
import TagLink from '@/shared/ui/TagLink';

interface TagProps {
	postList: PostSummary[];
	search?: SearchType;
	handleFindPosts: (search: SearchType) => void;
}

export default function Tag({ postList, search, handleFindPosts }: TagProps) {
	// 태그 목록은 서버 렌더링 단계에서 바로 그려지도록 이펙트 대신 렌더링 중에 계산한다
	const { tags, tagCounts } = useMemo(() => {
		const allTags = postList.flatMap(post => post.mainTag);
		const counts = allTags.reduce((acc: Record<string, number>, tag: string) => {
			acc[tag] = (acc[tag] || 0) + 1;
			return acc;
		}, {});

		return { tags: [...new Set(allTags)], tagCounts: counts };
	}, [postList]);

	const handleClickFindPost = useCallback(
		(e: MouseEvent, tag: string) => {
			e.preventDefault();
			if (search?.tag === tag) {
				handleFindPosts({ tag: '' });
				return;
			}
			handleFindPosts({ tag });
		},
		[search, handleFindPosts]
	);

	return (
		<div className={styles.container}>
			<Ui.Title className={styles.title} title="Tag List" />
			<div className={styles.link}>
				<div
					className={styles.tagWrap}
					data-bold={search?.tag === ''}
					onClick={e => handleClickFindPost(e, '')}
				>
					<TagLink href="" name={'전체'} />
				</div>
				{tags?.map((tag, index) => (
					<div
						key={index}
						className={styles.tagWrap}
						data-bold={search?.tag === tag}
						onClick={e => handleClickFindPost(e, tag)}
					>
						<TagLink href="" name={tag} tagCounts={tagCounts} />
					</div>
				))}
			</div>
		</div>
	);
}
Tag.displayName = 'Tag';
