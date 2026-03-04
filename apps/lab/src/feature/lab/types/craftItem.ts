export type CraftCategory = 'animation' | 'interaction' | 'visualization' | 'utility';

export interface CraftItem {
	slug: string;
	title: string;
	description: string;
	category: CraftCategory;
	tags: string[];
	createdAt: string;
	thumbnailValue: string;
}
