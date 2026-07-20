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
			{ icon: 'company', label: 'Company', value: '한국미스미' },
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
				why: '한 번에 갈아엎으면 장애 영향 범위가 통제 불가능해집니다. 신·구 시스템을 병렬 운영하며 데이터 정합성을 먼저 검증하고, DNS·리버스 프록시 레벨에서 트래픽을 조금씩 옮겨 영업시간 중단 없이 전환했습니다.',
			},
			{
				icon: 'speed',
				title: 'LCP 3.5s → 1.4s (60% 단축)',
				text: 'Chrome DevTools·Lighthouse·web-vitals로 병목을 초기 번들과 이미지 로딩으로 좁힌 뒤, Lazy Load와 S3+CloudFront CDN, 이미지 WebP 변환을 적용해 초기 렌더링을 가속했습니다.',
				why: '“최신 기술을 쓰자”가 아니라 도구로 원인을 좁히고, 단계별로 적용한 뒤 지표로 검증하는 사이클을 돌렸습니다. 같은 기간 GA4 기준 이탈률도 42% → 27%로 줄었는데, 이는 단일 최적화가 아니라 마이그레이션 전반이 함께 작용한 결과입니다.',
			},
			{
				icon: 'target',
				title: '검색봇 전용 SSR 우회 경로',
				text: 'CSR로 렌더된 PC 페이지가 검색엔진에 빈 화면으로 색인되던 문제를, Next.js Middleware에서 검색봇 User-Agent(Googlebot·Bingbot·Naver Yeti)를 감지해 SSR 전용 라우트로 rewrite하여 해결했습니다.',
				why: '전면 SSR 전환은 비용과 리스크가 컸습니다. redirect가 아닌 rewrite로 URL·쿼리 계약을 그대로 두고, canonical을 원본 URL로 고정해 중복 색인을 막았습니다. 봇과 사용자에게 다른 경로를 주되 URL 계약은 깨지 않는다는 접근으로, Search Console URL 검사로 색인 정상화를 확인했습니다.',
			},
			{
				icon: 'cube',
				title: 'PC / Mobile 분리 빌드',
				text: '@next/bundle-analyzer로 디바이스별 번들을 분석하고, 모바일에 불필요한 번들을 제거해 타겟 빌드 구조를 설계했습니다.',
				why: '저사양 모바일 기기의 초기 진입 비용을 줄이려면, PC용 번들을 모바일에 함께 내려보내지 않아야 했습니다. 엔트리포인트를 런타임에 나눠 디바이스마다 필요한 것만 로드하도록 했습니다.',
			},
			{
				icon: 'layers',
				title: '공통 컴포넌트 시스템화',
				text: 'Button·Checkbox·Modal 등 공통 UI를 Props 인터페이스 기반으로 설계해, 신규 페이지 개발 리드타임을 30% 단축했습니다.',
				why: '페이지마다 버튼·모달을 다시 만들면 디자인과 동작이 조금씩 어긋납니다. Props 인터페이스로 계약을 고정하니 반복 UI가 예측 가능해지고, 새 페이지를 붙이는 속도가 붙었습니다.',
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
		],
	},
};
