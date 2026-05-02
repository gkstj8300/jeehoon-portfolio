import type { ProjectDetail } from './types';

const IMG = '/images/projects/misumi-renewal';

export const misumiRenewal: ProjectDetail = {
	slug: 'misumi-renewal',
	hero: {
		titlePre: '한국미스미',
		titleAccent: '커머스 플랫폼',
		titlePost: 'React · Next.js\n마이그레이션',
		summaryHtml:
			'<strong>10년 된 레거시(PHP·RxJS·Twig)</strong>를 React·Next.js로 전환한 <strong>대규모 마이그레이션</strong>. 운영 중단 없이 페이지 단위로 점진 전환하며, <strong>LCP 60% 단축</strong>과 <strong>이탈률 15%p 감소</strong>를 달성했습니다.',
		thumbnail: { src: `${IMG}/main.webp`, alt: '한국미스미 메인 페이지' },
		meta: [
			{ icon: 'company', label: 'Company', value: '한국미스미 (파견)' },
			{ icon: 'timeline', label: 'Timeline', value: '2024.04 ~ 2025.03 (12개월)' },
			{ icon: 'role', label: 'Role', value: 'Frontend Engineer\n메인·카테고리·비교·헤더 담당' },
			{ icon: 'stack', label: 'Tech Stack', value: 'Next.js · TypeScript\nRedux · Sass · Styled-components' },
		],
	},
	strategy: {
		label: '핵심 설계 전략',
		title: '운영 중단 없이 점진적으로 전환하는 마이그레이션',
		lead: '월 40만 UV 규모 서비스를 멈추지 않고 새 스택으로 옮기기 위해, 페이지 단위 점진 전환과 디바이스 분리 빌드 전략을 수립했습니다.',
		cards: [
			{
				icon: 'flow',
				title: '페이지 단위 점진 전환',
				text: '레거시와 신규 코드를 동시 운용하면서, 페이지마다 안정성이 검증된 시점에 라우팅을 교체했습니다.',
				why: '한 번에 모든 페이지를 옮기면 장애 영향 범위가 커집니다. 단위 검증·롤백 가능한 구조를 우선했습니다.',
			},
			{
				icon: 'speed',
				title: 'LCP 3.5s → 1.4s (60% 단축)',
				text: 'Lighthouse·web-vitals 기반 분석 후 Lazy Load와 S3+CloudFront CDN을 적용해 초기 렌더링을 가속했습니다.',
				why: '데이터로 병목을 검증한 뒤 적용했기 때문에 효과가 정량으로 확인됩니다. GA4 기준 이탈률도 42% → 27%로 감소했습니다.',
			},
			{
				icon: 'cube',
				title: 'PC / Mobile 분리 빌드',
				text: '@next/bundle-analyzer로 디바이스별 번들을 분석하고, 모바일에 불필요한 번들을 제거해 타겟 빌드 구조를 설계했습니다.',
			},
			{
				icon: 'layers',
				title: '공통 컴포넌트 시스템화',
				text: 'Button·Checkbox·Modal 등 공통 UI를 Props 인터페이스 기반으로 설계해, 신규 페이지 개발 리드타임을 30% 단축했습니다.',
			},
		],
	},
	showcase: {
		label: '주요 화면 설계',
		title: '익숙한 정보 위에 구조를 다시 짜다',
		lead: '레거시 사용자의 학습 비용을 최소화하면서, 카테고리 탐색·검색·비교의 흐름을 재정의했습니다.',
		layout: 'tabs',
		items: [
			{ id: 'dashboard', label: '메인', image: { src: `${IMG}/dashboard.webp`, alt: '메인 페이지' } },
			{ id: 'category', label: '카테고리', image: { src: `${IMG}/category.webp`, alt: '카테고리 페이지' } },
			{ id: 'compare', label: '상품 비교', image: { src: `${IMG}/compare.webp`, alt: '비교 결과 페이지' } },
			{ id: 'search', label: '검색', image: { src: `${IMG}/search.webp`, alt: '검색 인터페이스' } },
			{ id: 'mega-nav', label: '메가나비', image: { src: `${IMG}/mega-nav.webp`, alt: '카테고리 메가 내비게이션' } },
			{ id: 'floating', label: '플로팅 바', image: { src: `${IMG}/floating.webp`, alt: '플로팅 바 + 비교 팝업' } },
		],
	},
	comparison: {
		label: '권한 기반 헤더 설계',
		title: '로그인 상태에 따라 변화하는 정보 우선순위',
		groups: [
			{
				tag: '로그인 전',
				title: '신규 유입에 최적화된 진입점',
				desc: '회원가입·로그인을 직관적으로 노출하고, 카테고리 탐색을 즉시 시작할 수 있도록 구성했습니다.',
				image: { src: `${IMG}/header-anonymous.webp`, alt: '로그인 전 헤더' },
				variant: 'before',
			},
			{
				tag: '로그인 후',
				title: '운영 효율을 높이는 개인화 영역',
				desc: 'My 부품표·견적·CAD 다운로드 등 권한별 메뉴를 노출해, 반복 작업을 한 번의 클릭으로 줄였습니다.',
				image: { src: `${IMG}/header-authed.webp`, alt: '로그인 후 헤더' },
				variant: 'after',
			},
		],
	},
};
