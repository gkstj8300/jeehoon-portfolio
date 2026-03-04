import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCraftBySlug, getAllSlugs } from '@/feature/lab/data/craftItems.data';
import CraftDetailPage from '@/feature/lab/ui/CraftDetailPage';

interface CraftDetailProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CraftDetailProps): Promise<Metadata> {
	const { slug } = await params;
	const item = getCraftBySlug(slug);

	if (!item) return {};

	return {
		title: `${item.title} | 실험실`,
		description: item.description,
		openGraph: {
			url: `https://lab.baakhan.com/craft/${item.slug}`,
			type: 'website',
			siteName: '실험실 | FE 박지훈',
			title: `${item.title} | 실험실`,
			description: item.description,
		},
	};
}

export default async function CraftDetail({ params }: CraftDetailProps) {
	const { slug } = await params;
	const item = getCraftBySlug(slug);

	if (!item) notFound();

	return <CraftDetailPage item={item} />;
}
