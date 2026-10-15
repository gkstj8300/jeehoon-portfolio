import { url } from '@jeehoon/utils';

/**
 * 상세 안의 한 묶음 — 제목 없이 목록만 둘 수도 있다.
 * 항목 안의 `**…**`는 굵게 강조할 구간이다(시안의 강조 위치를 그대로 옮긴다).
 */
export interface DetailBlock {
	heading?: string;
	items: readonly string[];
}

export interface ProjectEntry {
	ordinal: string;
	title: string;
	meta: string;
	/** 대표 프로젝트만 갖는 값들 */
	featured?: {
		tag: string;
		problem: string;
		solution: string;
		outcomeLabel: string;
		outcome: string;
		outcomeNote: string;
		href: string;
	};
	stack?: string;
	blocks: readonly DetailBlock[];
	/** 기본으로 펼쳐 둘지 */
	defaultOpen?: boolean;
}

const projectUrl = (slug: string) => `${url.portfolio}/projects/${slug}/`;

export const projectSection = {
	eyebrow: '02 · 프로젝트',
	title: '문제와 해결의 기록.',
	aside: '대표 프로젝트 4개 · 문제, 판단, 검증을 중심으로',
	groupLabel: '기타 프로젝트 · 제품 개선과 개발 경험',
} as const;

/** 대표 프로젝트. 순서가 곧 화면 순서이자 번호다 */
export const featuredProjects: readonly ProjectEntry[] = [
	{
		ordinal: '01',
		title: 'AIoT 오염물질 배출 관리 시스템',
		meta: '제이에이치솔루션 · 2026.08 — 진행 중 · FE 1명 / 전체 3명',
		defaultOpen: true,
		featured: {
			tag: '데이터 신뢰성 · AI 개발 품질 관리',
			problem:
				'계측 서버가 응답하지 않거나 데이터가 누락될 때, 대체 값이 정상 실측값으로 해석될 수 있었습니다.',
			solution:
				'연동 책임을 3계층으로 나누고 토큰 갱신·폴백을 설계했습니다. 결측과 0을 구분하고 데이터 출처를 화면에 표시했습니다.',
			outcomeLabel: '설계한 동작',
			outcome: '실측·대체 구분',
			outcomeNote: 'pending / live / fallback',
			href: projectUrl('smb-emission'),
		},
		stack: 'React · Next.js · TypeScript · TanStack Query · ThingsBoard · Vitest',
		blocks: [
			{
				heading: '담당 범위와 기술적 판단',
				items: [
					'**서버 프록시·전송 클라이언트·도메인 매퍼**로 책임을 분리했습니다. 자격증명은 서버 경계에서 관리하고 JWT 선제 갱신과 single-flight 큐로 중복 인증 요청을 제어했습니다.',
					'시각이 어긋난 계측 응답을 시간 격자에 맞춰 매핑하고, 결측값을 0으로 처리하지 않도록 구분했습니다.',
				],
			},
			{
				heading: 'AI 활용과 검증',
				items: [
					'Claude Code를 활용하는 개발 과정에서 **코딩 규약·아키텍처·테스트 기준을 문서화**하고, 수치에 출처를 붙이도록 규칙을 정했습니다.',
					'회귀 테스트와 구조 규약 검사로 변경을 확인하고, 문서와 코드 상수의 불일치를 검사하는 자동화를 구성했습니다.',
				],
			},
		],
	},
	{
		ordinal: '02',
		title: '삼성물산 BEES 스마트빌딩 통합 에너지·환경 관제 플랫폼',
		meta: '제이에이치솔루션 · 2026.03 — 2026.07 · 프론트엔드 1명 / 전체 6명',
		featured: {
			tag: '실시간 서비스 · 장애 대응',
			problem:
				'역할마다 다른 데이터 접근 범위와 실시간 연결 장애에 대응해야 했습니다.',
			solution:
				'권한별 라우팅을 설계하고 WebSocket 장애 시 REST 폴링으로 전환하도록 구성했습니다.',
			outcomeLabel: '담당 범위',
			outcome: '27개 화면',
			outcomeNote: '권한별 라우팅 · BFF 연동',
			href: projectUrl('bees'),
		},
		stack: 'React · Next.js · TypeScript · Zustand · TanStack Query · Django · WebSocket',
		blocks: [
			{
				heading: '담당 범위와 기술적 판단',
				items: [
					'관리자·건물주·입주자의 데이터 접근 범위를 분리한 라우팅 구조를 설계했습니다.',
					'Django 기반 BFF에서 PostgreSQL·InfluxDB 데이터를 단일 스냅샷으로 집계해, 데이터 조합 책임을 화면 컴포넌트에서 서버로 옮겼습니다.',
					'WebSocket 장애 시 REST 폴링으로 전환하고, 재연결 시 데이터 동기화 충돌을 제어했습니다.',
				],
			},
			{
				heading: 'AI 생성 코드의 런타임 검증',
				items: [
					'AI가 생성한 Three.js 코드의 WebGL 자원 누수를 Chrome 힙 스냅샷으로 추적하고, 명시적인 dispose 처리로 보완했습니다.',
				],
			},
		],
	},
	{
		ordinal: '03',
		title: '한국미스미 커머스 플랫폼 React / Next.js 마이그레이션',
		meta: '내담씨앤씨 · 2024.04 — 2025.03 · 프론트엔드 3명 / 전체 6명',
		featured: {
			tag: '무중단 전환 · 웹 성능',
			problem:
				'레거시 커머스를 서비스 중단 없이 전환하면서 로딩 성능을 개선해야 했습니다.',
			solution:
				'신·구 시스템 병렬 운영과 정합성 검증, 이미지·스크립트·CDN 최적화를 진행했습니다.',
			outcomeLabel: '성과',
			outcome: '3.5초 → 1.4초',
			outcomeNote: 'LCP 60% 단축',
			href: projectUrl('misumi-renewal'),
		},
		stack: 'React · TypeScript · Next.js · Redux · Sass · Styled-components',
		blocks: [
			{
				heading: '담당 범위와 기술적 판단',
				items: [
					'FE 3명으로 구성된 팀에서 RxJS·Twig 기반 커머스의 React·Next.js 전환에 참여했습니다. 신·구 시스템을 병렬 운영하며 정합성을 검증한 뒤 서비스 중단 없이 전환했습니다.',
					'Core Web Vitals의 LCP 개선을 목표로 이미지 로딩·스크립트 우선순위·CDN 캐싱을 최적화해, LCP를 3.5초에서 1.4초로 단축했습니다.',
					'번들 분석과 PC·모바일 엔트리포인트 분리로 모바일에서 불필요한 코드를 로드하지 않도록 개선했습니다.',
				],
			},
		],
	},
	{
		ordinal: '04',
		title: '한국미스미 데이터 기반 UI / UX 개선 및 운영',
		meta: '내담씨앤씨 · 2023.04 — 2024.04 · 프론트엔드 2명 / 전체 3명',
		featured: {
			tag: '데이터 기반 개선 · 사용자 행동 분석',
			problem:
				'결제·장바구니에서 사용자가 이탈하는 구간을 찾고, 그 판단의 근거가 될 행동 데이터를 마련해야 했습니다.',
			solution:
				'GTM·dataLayer 기반 행동 추적 표준을 설계하고, 분석 결과에 따라 CTA 배치와 정보 구조를 개선했습니다.',
			// 성과 수치(구매 전환율 등)를 싣지 않는다 — 결제·장바구니 개선은
			// 수치 없이 «CTA 배치와 정보 구조 개선»으로 표현한다는 요구사항이다
			outcomeLabel: '설계한 체계',
			outcome: '행동 추적 표준',
			outcomeNote: 'GTM · dataLayer',
			href: projectUrl('misumi-maintenance'),
		},
		stack: 'RxJS · Twig · JavaScript · jQuery · PHP · GA4 · GTM',
		blocks: [
			{
				heading: '담당 범위와 기술적 판단',
				items: [
					'사용자 행동 분석을 바탕으로 결제·장바구니의 CTA 배치와 정보 구조를 개선했습니다.',
					'GTM과 dataLayer 표준을 설계하고, 사용자 행동 추적 및 개인화 추천 솔루션을 연동했습니다.',
				],
			},
		],
	},
];

export const otherProjects: readonly ProjectEntry[] = [
	{
		ordinal: '05',
		title: '삼성물산 연돌 상태 모니터링 시스템 · SEMS',
		meta: '2026.01 — 2026.03 · 프론트엔드 1명 / 전체 5명',
		stack: 'React · TypeScript · Vite · TanStack Query · Zustand · ECharts',
		blocks: [
			{
				items: [
					'ECharts 인스턴스 재사용과 **LTTB 다운샘플링**으로 대용량 시계열 데이터 렌더링 부담을 줄였습니다.',
					'서버 상태와 UI 상태를 분리하고, MSW 기반 Mock 환경을 구축해 API 구현 전에도 화면 개발을 진행했습니다.',
				],
			},
		],
	},
	{
		ordinal: '06',
		title: 'JH Solution 기업 홈페이지 리뉴얼',
		meta: '2026.01 — 2026.03 · 프론트엔드 1명 / 전체 3명',
		stack: 'Gatsby · React · CSS Modules · GraphQL · AWS S3 · CloudFront',
		blocks: [
			{
				items: [
					'Gatsby 기반 정적 사이트와 마크다운 콘텐츠 관리 흐름을 구축하고, Google Forms API로 문의 기능을 연동했습니다.',
				],
			},
		],
	},
	{
		ordinal: '07',
		title: '내담씨앤씨 홈페이지 리뉴얼',
		meta: '2022.12 — 2023.03 · 전체 3명',
		blocks: [
			{
				items: [
					'Java / Spring Boot 기반 기업 사이트의 UI·UX 기획, 반응형 화면, 국·영문 전환과 관리자 기능을 개발했습니다.',
				],
			},
		],
	},
	{
		ordinal: '08',
		title: '한화생명 코어 시스템 구축',
		meta: '2022.05 — 2022.12 · 전체 2명',
		blocks: [
			{
				items: [
					'Java / JavaScript / KendoUI 환경에서 보험 수수료 확인·계산 업무 화면을 개발하고, 정책 변경에 따른 유지보수를 수행했습니다.',
				],
			},
		],
	},
];
