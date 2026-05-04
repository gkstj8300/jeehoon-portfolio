export type ProjectCategory =
	| 'samsung'
	| 'jh'
	| 'misumi'
	| 'naedam'
	| 'hanwha';

export interface ProjectLink {
	label: string;
	href: string;
}

export interface Project {
	slug: string;
	category: ProjectCategory;
	categoryLabel: string;
	company: string;
	title: string;
	summary: string;
	durationStart: string;
	durationEnd: string;
	tags: readonly string[];
	highlights: readonly string[];
	links?: readonly ProjectLink[];
	thumbnail?: string;
}

export const categoryFilters = [
	{ id: 'all', label: '전체' },
	{ id: 'samsung', label: '삼성물산' },
	{ id: 'jh', label: 'JH Solution' },
	{ id: 'misumi', label: '한국미스미' },
	{ id: 'naedam', label: '내담씨앤씨' },
	{ id: 'hanwha', label: '한화생명' },
] as const;

export const projects: readonly Project[] = [
	{
		slug: 'sems',
		category: 'samsung',
		categoryLabel: '삼성물산',
		company: '삼성물산',
		title: '연돌 상태 모니터링 시스템 (SEMS)',
		summary:
			'42개 층 IoT 센서·기상청 API 데이터를 실시간 시각화하는 빌딩 관제 플랫폼',
		durationStart: '2026-02',
		durationEnd: '진행중',
		thumbnail: '/images/projects/sems/overview.png',
		tags: ['React', 'TypeScript', 'Vite', 'Zustand', 'TanStack Query', 'ECharts', 'WebSocket'],
		highlights: [
			'TanStack Query(서버 상태) + Zustand(클라이언트 상태) 분리 설계, WebSocket 기반 실시간 데이터 수신',
			'ECharts 기반 42개 층 압력 프로파일 시각화 — 데이터 샘플링·인스턴스 재사용으로 렌더링 최적화',
			'Figma 디자인 토큰 기반 UI 컴포넌트 설계, 6개 영역 실시간 대시보드 개발',
			'CSV → JSON 자동 변환 다국어 시스템, MSW 기반 Mock/Server 모드 분리로 독립 개발 환경 구축',
			'Claude Code + Figma MCP 연동으로 디자인→코드 전환 자동화, AI 생성 코드의 ECharts 메모리 누수 식별 및 dispose 로직 직접 설계',
		],
	},
	{
		slug: 'jh-solution',
		category: 'jh',
		categoryLabel: 'JH Solution',
		company: 'JH Solution',
		title: '제이에이치솔루션 홈페이지 리뉴얼',
		summary:
			'Markdown 기반 동적 페이지 + GitHub Actions 이중 배포 파이프라인',
		durationStart: '2026-01',
		durationEnd: '2026-02',
		thumbnail: '/images/projects/jh-solution/main.png',
		tags: ['Gatsby', 'React', 'GraphQL', 'AWS S3', 'CloudFront', 'GitHub Actions', 'Docker'],
		highlights: [
			'Markdown frontmatter 기반 동적 페이지 생성 — 콘텐츠 추가 시 코드 변경 없이 페이지 자동 생성',
			'GitHub Actions 기반 dev/prod 이중 배포 파이프라인 및 CloudFront 캐시 무효화 자동화',
			'Google Forms 연동 서버리스 Contact API — 별도 백엔드 없이 문의 플로우 완결',
			'Claude Code + Figma MCP 연동으로 디자인 시안을 코드로 직접 연결, 컴포넌트 마크업·스타일 초안 생성 자동화',
		],
	},
	{
		slug: 'misumi-renewal',
		category: 'misumi',
		categoryLabel: '한국미스미',
		company: '한국미스미',
		title: '커머스 플랫폼 React / Next.js 마이그레이션',
		summary:
			'10년된 레거시(PHP·RxJS·Twig)를 React·Next.js로 전환한 대규모 마이그레이션',
		durationStart: '2024-04',
		durationEnd: '2025-03',
		thumbnail: '/images/projects/misumi-renewal/dashboard.webp',
		tags: ['React', 'TypeScript', 'Next.js', 'Redux', 'Sass', 'Styled-components'],
		highlights: [
			'운영 중단 없이 페이지 단위 점진적 마이그레이션으로 안정적 전환 완료 (월 약 40만 UV)',
			'Lighthouse · web-vitals 기반 성능 분석 후 Lazy Load + S3+CloudFront CDN 적용 → LCP 3.5초 → 1.4초 (60% 단축)',
			'GA4 기준 이탈률 42% → 27% (15%p 감소) 달성',
			'@next/bundle-analyzer로 디바이스별 번들 분석 후 PC/Mobile 분리 타겟 빌드 구조 설계',
			'상품 비교 기능 신규 개발 — 상세 페이지 유입률 27% 증가, 구매 전환율 12% 상승 견인',
			'공통 UI 컴포넌트(Button·Checkbox·Modal 등) Props 인터페이스 기반 설계로 신규 페이지 리드타임 평균 30% 단축',
		],
		links: [
			{ label: '한국미스미 공식 홈페이지', href: 'https://kr.misumi-ec.com/' },
			{ label: '회고 블로그', href: 'https://www.baakhan.com/posts/Php,-RxJS%EC%97%90%EC%84%9C-React,-TypeScript%EB%A1%9C%EC%9D%98-%EB%8C%80%EC%A0%84%ED%99%98---%EC%9D%B4%EC%BB%A4%EB%A8%B8%EC%8A%A4-%EB%A6%AC%EB%89%B4%EC%96%BC-%EC%8B%A4%EB%AC%B4-%EA%B2%BD%ED%97%98-2%ED%8E%B8/' },
		],
	},
	{
		slug: 'misumi-maintenance',
		category: 'misumi',
		categoryLabel: '한국미스미',
		company: '한국미스미',
		title: 'UI / UX 개선 및 운영',
		summary:
			'GA4 택소노미 + 히트맵 분석 기반 의사결정으로 체류·전환 지표 개선',
		durationStart: '2023-04',
		durationEnd: '2024-04',
		thumbnail: '/images/projects/misumi-maintenance/ui-tobe.webp',
		tags: ['RxJS', 'Twig', 'JavaScript', 'jQuery', 'PHP', 'GA4'],
		highlights: [
			'GA4 이벤트 택소노미 설계 및 dataLayer 기반 주요 이벤트(PV·장바구니·주문·검색) 트래킹 구현',
			'GA4 Explore를 통해 마케팅·기획팀이 직접 데이터를 조회할 수 있는 의사결정 체계 구축',
			'Click Heatmap, Scroll Depth 분석에서 CTA 가시성 부족·이탈 구간 발견 → UI 리뉴얼로 체류시간 평균 18% 증가, 이탈률 약 11% 감소',
			'외부 추천 솔루션 API 연동을 통한 페이지별 개인화 상품 추천 배너 구현 → 재방문율 15% 증가, 구매 전환율 약 8% 상승',
			'Admin 답변 회수 처리 등 운영자 도구 개선으로 CS 처리 지연 단축',
		],
	},
	{
		slug: 'naedam-homepage',
		category: 'naedam',
		categoryLabel: '내담씨앤씨',
		company: '내담씨앤씨',
		title: '내담씨앤씨 홈페이지 리뉴얼',
		summary:
			'전체 기획·관리자 페이지·다국어까지 단독 리드한 IT 기업 홈페이지',
		durationStart: '2022-12',
		durationEnd: '2023-04',
		thumbnail: '/images/projects/naedam-homepage/main.webp',
		tags: ['Java', 'Spring Boot', 'JavaScript', 'jQuery', 'MariaDB'],
		highlights: [
			'사이트맵·정보 구조 기획 주도 — 부서별 자료 수집과 관리자 데이터 구조 설계까지 단독 진행',
			'CMS 연동 — 관리자 페이지에서 메뉴·이미지·텍스트를 동적으로 제어하는 구조 구현',
			'쿠키 기반 다국어(국/영) 전환 기능 개발',
			'스크롤 인터랙션과 반응형 UI를 적용한 IT 기업 톤의 비주얼 구현',
			'카페24 도메인 기반 무중단 배포(Root 파일 교체) 운영 환경 구성',
		],
		links: [
			{ label: '내담씨앤씨 공식 홈페이지', href: 'http://ndcc.co.kr/' },
			{ label: '회고 블로그', href: 'https://www.baakhan.com/posts/%ED%9A%8C%EC%82%AC%EC%9D%98-%EC%96%BC%EA%B5%B4%EC%9D%84-%EB%A7%8C%EB%93%9C%EB%8A%94-%EC%9D%BC---IT-%EA%B8%B0%EC%97%85-%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A6%AC%EB%89%B4%EC%96%BC%EA%B8%B0/' },
		],
	},
	{
		slug: 'hanwha-core',
		category: 'hanwha',
		categoryLabel: '한화생명',
		company: '한화생명',
		title: '코어 시스템 구축 프로젝트',
		summary:
			'Kendo UI 기반 수수료 업무 화면 구현 및 ETL 기반 시스템 재구축 협업',
		durationStart: '2022-05',
		durationEnd: '2022-12',
		thumbnail: '/images/projects/hanwha-core/fee-payment.webp',
		tags: ['Java', 'JavaScript', 'Oracle', 'KendoUI'],
		highlights: [
			'수수료 확인·계산·지급 의뢰 등 업무 화면 신규 설계 및 구현',
			'JobPass(Job Scheduler) + TeraStream(ETL) 기반 시스템 전환 시 프론트 연동 담당',
			'보험 정책 변경에 따른 수수료 로직 유지보수 및 재정비 주도',
			'데이터 마이그레이션 검증 협업 — Core 시스템과 레거시 청산 과정',
		],
	},
];
