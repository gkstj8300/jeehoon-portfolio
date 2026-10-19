import { useState, useCallback, useMemo } from 'react';
import { SearchType } from '../types/Home.types';
import { PostSummary } from '@/shared/types/slug';

const RECENT_POST_COUNT = 5;

/** postList는 서버에서 최신 글 순으로 정렬해 넘긴다 */
export function useHome(postList: PostSummary[]) {
	const [search, setSearch] = useState<SearchType>({ tag: '' });

	const recentPosts = useMemo(() => postList.slice(0, RECENT_POST_COUNT), [postList]);

	const handleFindPosts = useCallback((search: SearchType) => {
		setSearch(prev => ({
			...prev,
			...search,
		}));
	}, []);

	// 검색 결과는 상태로 따로 들고 있지 않고 렌더링 중에 계산한다(이펙트 뒤 한 번 더 그리지 않도록)
	const posts = useMemo(() => {
		let filteredPosts = postList;

		if (search.keyword) {
			const keyword = search.keyword.toLowerCase();
			filteredPosts = filteredPosts.filter(post => post.title.toLowerCase().includes(keyword));
		}

		if (search.tag) {
			filteredPosts = filteredPosts.filter(post => post.mainTag === search.tag);
		}

		return filteredPosts;
	}, [search, postList]);

	return {
		posts,
		search,
		recentPosts,
		handleFindPosts,
	};
}
