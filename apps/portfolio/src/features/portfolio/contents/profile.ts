export const profile = {
	name: '박지훈',
	englishName: 'Park Jeehoon',
	role: 'Frontend Engineer',
	badge: 'Frontend Engineer',
	headline: '사용자 중심으로 설계하는',
	headlineAccent: '프론트엔드 개발자',
	subline:
		'복잡한 요구사항을 명확한 구조로 정리해, 빠르고 자연스러운 사용자 경험을 만듭니다.\n성능과 코드 품질, 그리고 협업의 흐름까지 함께 고민합니다.',
	careerHistory: [
		{ company: '내담씨앤씨', start: '2022-03-07', end: '2025-03-21' },
		{ company: 'JH Solution', start: '2026-01-01', end: 'present' },
	],
	stats: [
		{ key: 'projects', num: '9+', label: '담당 프로젝트' },
		{ key: 'experience', num: 'auto', label: '프론트엔드 경험' },
		{ key: 'domain', num: 'B2B / B2C', label: '주요 도메인' },
	],
	skillChips: [
		'React / Next.js',
		'TypeScript',
		'Performance',
		'Design System',
	],
	coreArea: 'Commerce · Monitoring Dashboard',
	profileImage: '/images/portfolio/profile.jpg',
} as const;
