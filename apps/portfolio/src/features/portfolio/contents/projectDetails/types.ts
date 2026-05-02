export type MetaIcon = 'platform' | 'timeline' | 'role' | 'goal' | 'company' | 'stack';

export interface MetaItem {
	icon: MetaIcon;
	label: string;
	value: string;
}

export type StrategyIcon =
	| 'layers'
	| 'flow'
	| 'cube'
	| 'sparkles'
	| 'shield'
	| 'target'
	| 'speed'
	| 'chart';

export interface StrategyCard {
	icon: StrategyIcon;
	title: string;
	text: string;
	why?: string;
}

export interface ImageRef {
	src: string;
	alt: string;
	caption?: string;
}

export interface ShowcaseItem {
	id: string;
	label: string;
	image: ImageRef;
}

export interface ShowcaseBlock {
	label: string;
	title: string;
	lead: string;
	layout: 'tabs' | 'grid';
	items: ShowcaseItem[];
}

export interface SystemCard {
	icon: StrategyIcon;
	title: string;
	text: string;
}

export interface SystemBlock {
	label: string;
	title: string;
	lead: string;
	cards: SystemCard[];
	rightImage: ImageRef;
}

export interface WideVisualBlock {
	label: string;
	title: string;
	lead: string;
	image: ImageRef;
	cards: { title: string; text: string }[];
}

export interface ComparisonGroup {
	tag: string;
	title: string;
	desc: string;
	image: ImageRef;
	variant: 'before' | 'after';
}

export interface ComparisonBlock {
	label: string;
	title: string;
	groups: ComparisonGroup[];
}

export interface DetailHero {
	titlePre?: string;
	titleAccent: string;
	titlePost: string;
	summaryHtml: string;
	thumbnail?: ImageRef;
	meta: MetaItem[];
}

export interface ProjectDetail {
	slug: string;
	hero: DetailHero;
	strategy?: {
		label: string;
		title: string;
		lead: string;
		cards: StrategyCard[];
	};
	showcase?: ShowcaseBlock;
	system?: SystemBlock;
	wideVisual?: WideVisualBlock;
	comparison?: ComparisonBlock;
}
