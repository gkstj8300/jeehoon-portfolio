'use client';

import { useInfiniteSlice, useOnMounted } from '@jeehoon/hooks';
import { url } from '@jeehoon/utils';
import Link from 'next/link';
import { ReactNode, useState, useMemo, useCallback } from 'react';
import styles from './PostListPage.module.scss';
import PostInfo from '@/entities/post/ui/PostInfo';
import PostSearch from '@/entities/post/ui/PostSearch';
import PostTitle from '@/entities/post/ui/PostTitle';
import { ga } from '@/shared/lib/logs/analytics';
import { PostSummary } from '@/shared/types/slug';

interface PostListPageProps {
	/** 글 정보와, 서버에서 미리 그려 둔 본문 미리보기 */
	previews: { post: PostSummary; preview: ReactNode }[];
}

const LAYOUT = 'PostList';
const PAGE_SIZE = 5;

export default function PostListPage({ previews }: PostListPageProps) {
	const postList = useMemo(() => previews.map(({ post }) => post), [previews]);
	/**
	 * 검색·태그 필터는 같은 글 객체를 그대로 걸러 내므로 객체로 미리보기를 찾는다(슬러그가 겹쳐도 섞이지 않음).
	 * 같은 주소로 다시 들어와 목록 데이터만 새로 오면 걸러 둔 글이 이전 객체일 수 있어, 그때는 슬러그로 찾는다.
	 */
	const findPreview = useMemo(() => {
		const previewByPost = new Map(previews.map(({ post, preview }) => [post, preview]));
		const previewBySlug = new Map(previews.map(({ post, preview }) => [post.slug, preview]));
		return (post: PostSummary) => previewByPost.get(post) ?? previewBySlug.get(post.slug);
	}, [previews]);
	const [filtered, setFiltered] = useState<PostSummary[]>(postList);

	const { visibleItems, hasMore, sentinelRef } = useInfiniteSlice(filtered, {
		pageSize: PAGE_SIZE,
		rootMargin: '200px',
		threshold: 0,
	});

	const filterPosts = useCallback((next: PostSummary[]) => {
		setFiltered(next);
	}, []);

	const handlePostClick = useCallback((post: PostSummary) => {
		ga.events.selectPost(post, LAYOUT);
	}, []);

	const renderedPostList = useMemo(
		() =>
			visibleItems.map(post => (
				<div key={post.slug} className={styles.post}>
					<div className={styles.postWrap}>
						<PostTitle title={post.title} />
						<PostInfo tags={post.tags} />
						{findPreview(post)}
					</div>
					<div className={styles.detailButton}>
						<div className={styles.overlay} />
						<Link
							className={styles.button}
							href={url.postDetail(post.slug)}
							onPointerDown={() => handlePostClick(post)}
							aria-label={`게시글 상세 보기: ${post.title}`}
						>
							상세보기
						</Link>
					</div>
				</div>
			)),
		[visibleItems, findPreview, handlePostClick]
	);

	useOnMounted(ga.pageView.postList);

	return (
		<div className={styles.container}>
			<div className={styles.searchWrap}>
				<PostSearch postList={postList} filterPosts={filterPosts} />
			</div>

			<div className={styles.postListWrap}>
				{renderedPostList}
				{hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
			</div>
		</div>
	);
}
PostListPage.displayName = 'PostListPage';
