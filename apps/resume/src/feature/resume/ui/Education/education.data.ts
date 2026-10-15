export interface SchoolEntry {
	name: string;
	major: string;
	period: string;
}

export const educationSection = {
	eyebrow: '04 · 교육',
	title: '배움의 기반.',
} as const;

export const schools: readonly SchoolEntry[] = [
	{ name: '방송통신대학교', major: '컴퓨터과학과 · 졸업', period: '2023.03 — 2025.02' },
	{ name: '비트캠프', major: 'SW 웹 개발 교육', period: '2021.02 — 2021.08' },
	{ name: '국제대학교', major: '외식조리과 · 졸업', period: '2014.03 — 2018.02' },
	{ name: '문산제일고등학교', major: '자연계 · 졸업', period: '2011.03 — 2014.02' },
];
