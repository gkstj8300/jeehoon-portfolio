import { url } from '@jeehoon/utils';

export type ChapterId = 'portfolio' | 'resume' | 'blog' | 'lab';

export interface HeroTile {
	id: Exclude<ChapterId, 'resume'>;
	eyebrow: string;
	/** 줄바꿈 위치가 타일 레이아웃의 일부라 배열로 둔다 */
	headline: readonly string[];
	caption: string;
	href: string;
	/** Lab 타일만 더 큰 타이포를 쓴다 */
	emphasized?: boolean;
}

export interface Chapter {
	id: ChapterId;
	index: string;
	name: string;
	kind: string;
	role: string;
	question: string;
	description: string;
	href: string;
}

export const hero = {
	overline: 'PERSONAL SPACE / BAAKHAN',
	sideLabel: 'BUILD. LEARN. SHARE.',
	hello: '안녕하세요, 프론트엔드 개발자 박지훈입니다.',
	titleLines: ['작은 호기심이', '다음 화면을', '만듭니다.'],
	/** titleLines 중 강조(브랜드 컬러)로 그릴 줄의 인덱스 */
	accentLineIndex: 1,
	summaryLines: [
		'일하며 만든 것, 배우며 남긴 글,',
		'그리고 아직 진행 중인 작은 실험들.',
		'저의 여러 이야기를 한곳에 모았습니다.',
	],
	motto: '더디더라도, 계속 나아갑니다.',
} as const;

export const heroTiles: readonly HeroTile[] = [
	{
		id: 'portfolio',
		eyebrow: 'PORTFOLIO',
		headline: ['Make', 'it work.'],
		caption: '만들어 온 것들',
		href: url.portfolio,
	},
	{
		id: 'blog',
		eyebrow: 'BLOG',
		headline: ['Learn', 'out loud.'],
		caption: '배우며 남긴 기록',
		href: url.blog,
	},
	{
		id: 'lab',
		eyebrow: 'LAB',
		headline: ['What', 'if?'],
		caption: '호기심을 직접 만져보기',
		href: url.lab,
		emphasized: true,
	},
];

/** 레일은 한 벌을 두 번 그려 이어 붙인다 — 스크롤 이동량을 한 벌 너비로 나머지 연산해 끊김을 없앤다 */
export const railWords = ['BUILD', 'LEARN', 'SHARE', 'REPEAT'] as const;

export const hub = {
	label: 'FOUR WAYS TO EXPLORE',
	titleLines: ['하나의 공간,', '네 가지 이야기.'],
	descriptionLines: [
		'결과가 궁금하다면 프로젝트를,',
		'생각이 궁금하다면 기록을.',
		'마음이 가는 곳부터 둘러보세요.',
	],
} as const;

export const chapters: readonly Chapter[] = [
	{
		id: 'portfolio',
		index: '01',
		name: 'Portfolio',
		kind: '01 / WORK',
		role: '만든 것',
		question: '어떤 문제를, 어떻게 해결했을까요?',
		description: '실제 프로젝트와 그 안의 선택을 살펴보세요.',
		href: url.portfolio,
	},
	{
		id: 'resume',
		index: '02',
		name: 'Resume',
		kind: '02 / EXPERIENCE',
		role: '쌓아 온 경험',
		question: '함께 일할 개발자를 찾고 계신가요?',
		description: '경력과 역량을 한눈에 확인할 수 있습니다.',
		href: url.resume,
	},
	{
		id: 'blog',
		index: '03',
		name: 'Blog',
		kind: '03 / NOTES',
		role: '배운 것',
		question: '배운 것을, 제 언어로 남깁니다.',
		description: '개발하며 만난 질문과 생각, 그리고 회고.',
		href: url.blog,
	},
	{
		id: 'lab',
		index: '04',
		name: 'Lab',
		kind: '04 / PLAYGROUND',
		role: '시도하는 것',
		question: '‘이렇게 하면 어떨까?’에서 시작합니다.',
		description: '작은 아이디어와 인터랙션을 직접 만져보세요.',
		href: url.lab,
	},
];

export const play = {
	label: 'A SMALL INVITATION TO PLAY',
	titleLines: ['조금 움직이면,', '다르게 보이는 것들.'],
	descriptionLines: ['작은 시도들이 모여 더 나은 화면을 만듭니다.'],
	linkLabel: 'Wavy Text 실험 보러 가기',
	href: `${url.lab}/craft/wavy-text/`,
	waveLetters: ['H', 'e', 'l', 'l', 'o', '.'],
	waveLabel: '마우스와 터치에 반응하는 Hello 글자',
} as const;

export const finale = {
	label: 'LET’S KEEP IN TOUCH',
	titleLines: ['다음 이야기는', '함께 만들어도 좋겠네요.'],
	contactLabel: '이메일 보내기',
	email: 'gkstj8300@gmail.com',
	signature: 'BaakHan',
} as const;
