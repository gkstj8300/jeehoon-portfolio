import { url } from '@jeehoon/utils';

export interface FeaturedProject {
	slug: string;
	company: string;
	title: string;
	summary: string;
	period: string;
	tags: readonly string[];
	href: string;
}

const projectUrl = (slug: string) => `${url.portfolio}/projects/${slug}/`;

export const featuredProjects: readonly FeaturedProject[] = [
	{
		slug: 'sems',
		company: '삼성물산',
		title: '연돌 상태 모니터링 시스템 (SEMS)',
		summary:
			'42개 층 IoT 센서·기상 API 데이터를 실시간 시각화하는 빌딩 관제 플랫폼.',
		period: '2026.02 ~ 진행중',
		tags: ['React', 'TypeScript', 'ECharts'],
		href: projectUrl('sems'),
	},
	{
		slug: 'misumi-renewal',
		company: '한국미스미',
		title: '커머스 플랫폼 React / Next.js 마이그레이션',
		summary:
			'10년된 레거시(PHP·RxJS)를 React·Next.js로 단계 전환. LCP 60% 단축, 이탈률 15%p 감소.',
		period: '2024.04 ~ 2025.03',
		tags: ['Next.js', 'TypeScript', 'Performance'],
		href: projectUrl('misumi-renewal'),
	},
	{
		slug: 'jh-solution',
		company: 'JH Solution',
		title: 'JH Solution 홈페이지 리뉴얼',
		summary:
			'Markdown 기반 동적 페이지 생성과 GitHub Actions 이중 배포 파이프라인.',
		period: '2026.01 ~ 2026.02',
		tags: ['Gatsby', 'AWS', 'GitHub Actions'],
		href: projectUrl('jh-solution'),
	},
] as const;

export const featuredSection = {
	sectionLabel: 'Featured Projects',
	title: '대표 프로젝트',
	lead: '최근 작업한 프로젝트 중 임팩트 위주로 추렸습니다.',
	moreLabel: '모든 프로젝트 보기',
	moreHref: `${url.portfolio}/#projects`,
} as const;
