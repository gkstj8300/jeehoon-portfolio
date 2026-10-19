'use client';

import { useOnMounted } from '@jeehoon/hooks';
import { ga } from '@/shared/lib/logs/analytics';

interface PostDetailPageViewProps {
	title: string;
	regDate: string;
	mainTag: string;
}

/** 상세 페이지 조회를 GA에 기록한다. 화면에는 아무것도 그리지 않는다 */
export default function PostDetailPageView({ title, regDate, mainTag }: PostDetailPageViewProps) {
	useOnMounted(() => {
		ga.pageView.postDetail({ title, regDate, mainTag });
	});

	return null;
}
