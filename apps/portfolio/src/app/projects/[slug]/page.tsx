import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
	getProjectDetail,
	getNextSlug,
	projectDetailSlugs,
	projects,
} from '@/features/portfolio/contents';
import ProjectDetail from '@/features/portfolio/ui/ProjectDetail';

export function generateStaticParams() {
	return projectDetailSlugs.map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
	const card = projects.find(p => p.slug === params.slug);
	if (!card) return { title: '프로젝트를 찾을 수 없습니다 | 박지훈 포트폴리오' };
	return {
		title: `${card.title} | 박지훈 포트폴리오`,
		description: card.summary,
		openGraph: {
			title: `${card.title} | 박지훈 포트폴리오`,
			description: card.summary,
			locale: 'ko',
			type: 'article',
		},
	};
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
	const detail = getProjectDetail(params.slug);
	const card = projects.find(p => p.slug === params.slug);

	if (!detail || !card) {
		notFound();
	}

	const nextSlug = getNextSlug(params.slug);
	const nextCard = nextSlug ? projects.find(p => p.slug === nextSlug) : undefined;

	return (
		<ProjectDetail
			card={card}
			detail={detail}
			nextCard={nextCard ?? card}
		/>
	);
}
