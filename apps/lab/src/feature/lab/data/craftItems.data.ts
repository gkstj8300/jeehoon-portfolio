import type { CraftItem } from '../types/craftItem';

export const craftItems: CraftItem[] = [
	{
		slug: 'wavy-text',
		title: 'Wavy Text',
		description: '텍스트에 물결 애니메이션을 적용하는 실험입니다. 글자별로 wave 효과를 줄 수 있어요.',
		category: 'animation',
		tags: ['CSS', 'Animation', 'Text'],
		createdAt: '2026-02-25',
		thumbnailValue: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
	},
	{
		slug: 'debounce-throttle',
		title: 'Debounce vs Throttle',
		description: '디바운스와 쓰로틀의 차이를 시각적으로 비교해볼 수 있는 인터랙션 데모입니다.',
		category: 'interaction',
		tags: ['JavaScript', 'Performance', 'Event'],
		createdAt: '2026-02-25',
		thumbnailValue: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
	},
];

export function getCraftBySlug(slug: string): CraftItem | undefined {
	return craftItems.find((item) => item.slug === slug);
}

export function getAllSlugs(): string[] {
	return craftItems.map((item) => item.slug);
}
