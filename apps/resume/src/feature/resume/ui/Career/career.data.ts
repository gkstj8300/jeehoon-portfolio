export interface CareerEntry {
	company: string;
	period: string;
	role: string;
	summary: string;
	chips: readonly string[];
}

export const careerSection = {
	eyebrow: '01 · 경력',
	title: '쌓아온 경험.',
	description:
		'서비스의 전환부터 안정적인 운영까지. 문제의 맥락을 이해하고 해결해 왔습니다.',
} as const;

export const careers: readonly CareerEntry[] = [
	{
		company: '제이에이치솔루션',
		period: '2026.01 — 현재',
		role: '개발본부 · 대리',
		summary: '스마트빌딩과 산업용 IoT 서비스의 프론트엔드 설계·개발 및 서버 연동.',
		chips: ['실시간 데이터', '관제 플랫폼', '장애 대응'],
	},
	{
		company: '내담씨앤씨',
		period: '2022.03 — 2025.03',
		role: 'Service Frontend Team · 대리',
		summary: '한국미스미 커머스의 무중단 마이그레이션, 성능 개선과 데이터 기반 UX 개선.',
		chips: ['커머스', 'Next.js 전환', '성능 최적화'],
	},
];
