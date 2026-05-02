import type { ProjectDetail } from './types';

const IMG = '/images/projects/misumi-maintenance';

export const misumiMaintenance: ProjectDetail = {
	slug: 'misumi-maintenance',
	hero: {
		titlePre: '한국미스미',
		titleAccent: '데이터 기반',
		titlePost: 'UI / UX 개선과\n운영 의사결정 체계',
		summaryHtml:
			'<strong>GA4 이벤트 택소노미</strong>와 <strong>히트맵 분석</strong>을 결합해, 감으로 진행되던 UI 개선을 데이터 기반 의사결정 체계로 바꾼 운영기입니다.',
		meta: [
			{ icon: 'company', label: 'Company', value: '한국미스미 (파견)' },
			{ icon: 'timeline', label: 'Timeline', value: '2023.04 ~ 2024.04 (13개월)' },
			{ icon: 'role', label: 'Role', value: 'Frontend Engineer\nGA 설계 · UI 개선 · A/B 검증' },
			{ icon: 'stack', label: 'Tech Stack', value: 'GA4 · BigQuery\nRxJS · Twig · jQuery · PHP' },
		],
	},
	strategy: {
		label: '핵심 설계 전략',
		title: '의사결정 권한을 팀에 돌려주는 데이터 체계',
		lead: '개발자가 매번 데이터를 뽑아주던 구조에서, 마케팅·기획팀이 직접 데이터를 조회하고 가설을 검증하는 구조로 전환했습니다.',
		cards: [
			{
				icon: 'chart',
				title: 'GA4 이벤트 택소노미 설계',
				text: 'PV·장바구니·주문·검색 등 핵심 이벤트의 dataLayer 스키마를 표준화해, 페이지·디바이스를 가로질러 일관된 분석이 가능하도록 만들었습니다.',
				why: '이벤트 이름과 파라미터가 흩어져 있으면 같은 지표도 다르게 측정됩니다. 택소노미를 먼저 잡아 분석 신뢰도를 확보했습니다.',
			},
			{
				icon: 'flow',
				title: '비개발자 자율 분석 환경',
				text: 'GA4 Explore와 BigQuery 쿼리 템플릿을 제공해, 마케팅·기획팀이 직접 데이터를 조회하는 의사결정 체계를 구축했습니다.',
				why: '병목이 되는 분석 요청 큐를 줄이고, 가설 검증 사이클을 짧게 만들었습니다.',
			},
			{
				icon: 'target',
				title: 'Heatmap·Scroll Depth 기반 개선',
				text: 'CTA 가시성 부족·콘텐츠 이탈 구간을 발견하고 UI 리뉴얼을 진행해 체류시간 18%↑, 이탈률 11%↓를 달성했습니다.',
			},
			{
				icon: 'sparkles',
				title: '개인화 추천 배너 도입',
				text: '외부 추천 솔루션 API를 페이지별 컨텍스트에 맞춰 연동해, 재방문율 15%↑, 구매 전환율 8%↑를 확인했습니다.',
			},
		],
	},
	comparison: {
		label: 'AS-IS / TO-BE',
		title: '데이터로 검증된 개선 결과',
		groups: [
			{
				tag: 'AS-IS',
				title: '정보 우선순위가 흐려진 화면',
				desc: '핵심 CTA가 시각적으로 묻혀 있고, 콘텐츠 길이만 길었던 기존 화면. 이탈률·체류시간 분석에서 병목이 명확히 드러났습니다.',
				image: { src: `${IMG}/ui-asis.webp`, alt: 'AS-IS 화면' },
				variant: 'before',
			},
			{
				tag: 'TO-BE',
				title: 'CTA 가시성과 흐름을 재정의',
				desc: '데이터에서 발견한 병목 지점에 정보 위계를 다시 정의하고, 메인 배너·헤더·푸터까지 일관된 톤으로 정렬했습니다.',
				image: { src: `${IMG}/ui-tobe.webp`, alt: 'TO-BE 화면' },
				variant: 'after',
			},
		],
	},
	showcase: {
		label: 'GA4 트래킹 적용 화면',
		title: '페이지마다 무엇을 측정하는지 명시',
		lead: '메인부터 플로팅 바까지, 각 영역에 측정 의도를 명시해 분석가가 별도 설명 없이도 데이터를 읽을 수 있게 했습니다.',
		layout: 'grid',
		items: [
			{ id: 'main', label: '메인', image: { src: `${IMG}/ga4-main.webp`, alt: 'GA4 — 메인 페이지' } },
			{ id: 'category', label: '카테고리', image: { src: `${IMG}/ga4-category.webp`, alt: 'GA4 — 카테고리' } },
			{ id: 'leaf-category', label: '말단 카테고리', image: { src: `${IMG}/ga4-leaf-category.webp`, alt: 'GA4 — 말단 카테고리' } },
			{ id: 'product', label: '상품 상세', image: { src: `${IMG}/ga4-product.webp`, alt: 'GA4 — 상품 상세' } },
			{ id: 'search-cart', label: '검색·장바구니', image: { src: `${IMG}/ga4-search-cart.webp`, alt: 'GA4 — 검색·장바구니' } },
			{ id: 'compare', label: '비교 결과', image: { src: `${IMG}/ga4-compare.webp`, alt: 'GA4 — 비교 결과' } },
			{ id: 'floating', label: '플로팅 바', image: { src: `${IMG}/ga4-floating.webp`, alt: 'GA4 — 플로팅 바' } },
		],
	},
};
