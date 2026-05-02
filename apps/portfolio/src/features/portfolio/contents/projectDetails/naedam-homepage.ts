import type { ProjectDetail } from './types';

const IMG = '/images/projects/naedam-homepage';

export const naedamHomepage: ProjectDetail = {
	slug: 'naedam-homepage',
	hero: {
		titlePre: '내담씨앤씨',
		titleAccent: '사내 홈페이지',
		titlePost: '신규 개발 및 리뉴얼\nfrom 0 to 1',
		summaryHtml:
			'<strong>전체 기획부터 관리자 페이지·다국어까지</strong> 단독으로 리드한 IT 기업 홈페이지. 스크롤 인터랙션 기반 비주얼과 운영 가능한 CMS를 함께 설계했습니다.',
		thumbnail: { src: `${IMG}/main.webp`, alt: '내담씨앤씨 메인 페이지' },
		meta: [
			{ icon: 'company', label: 'Company', value: '내담씨앤씨' },
			{ icon: 'timeline', label: 'Timeline', value: '2022.12 ~ 2023.04 (5개월)' },
			{ icon: 'role', label: 'Role', value: 'Project Lead\n기획 · 디자인 · 풀스택 단독' },
			{ icon: 'stack', label: 'Tech Stack', value: 'Java · Spring Boot\nJavaScript · jQuery · MariaDB' },
		],
	},
	strategy: {
		label: '핵심 설계 전략',
		title: '단발성 노출 사이트가 아닌, 운영되는 홈페이지',
		lead: '디자인은 한 번이지만 운영은 매일 이어집니다. 비개발자가 직접 콘텐츠를 관리하고, 사이트는 사고 없이 유지되는 구조를 우선했습니다.',
		cards: [
			{
				icon: 'layers',
				title: '데이터 구조 우선 설계',
				text: '사이트맵과 정보 구조를 먼저 잡고, 그에 맞춰 관리자 데이터 모델을 설계했습니다. 부서별 자료 수집부터 단독으로 진행했습니다.',
				why: '관리자 화면이 후순위가 되면 결국 운영자에게 부담이 돌아갑니다. 운영 시나리오부터 그렸기 때문에 메뉴·콘텐츠 변경이 자유로워졌습니다.',
			},
			{
				icon: 'flow',
				title: 'CMS 동적 제어',
				text: '관리자 페이지에서 메뉴·이미지·텍스트를 수정하면 즉시 반영되는 구조를 구현했습니다.',
				why: '코드 배포 없이 콘텐츠를 갱신할 수 있어, 마케팅·HR 부서의 자율도가 크게 올라갔습니다.',
			},
			{
				icon: 'sparkles',
				title: '쿠키 기반 다국어 전환',
				text: '국문/영문 페이지를 쿠키로 분기해, 사용자가 선택한 언어를 세션 단위로 유지합니다.',
			},
			{
				icon: 'shield',
				title: '무중단 배포 운영',
				text: '카페24 도메인 기반 환경에서 Root 파일 교체 방식으로 무중단 배포 운영. 개발용 도메인을 별도 구성해 안정성을 확보했습니다.',
			},
		],
	},
	showcase: {
		label: '주요 화면 설계',
		title: '회사 정체성을 먼저 보여주는 정보 흐름',
		lead: '회사소개 → 사업 → 파트너 → 인재정보의 자연스러운 정보 위계로, 처음 방문한 사용자도 회사를 이해하도록 설계했습니다.',
		layout: 'tabs',
		items: [
			{ id: 'main', label: '메인', image: { src: `${IMG}/main.webp`, alt: '메인 페이지' } },
			{ id: 'business-overview', label: '사업 개요', image: { src: `${IMG}/business-overview.webp`, alt: '사업 개요' } },
			{ id: 'business-intro', label: '사업 소개', image: { src: `${IMG}/business-intro.webp`, alt: '사업 소개' } },
			{ id: 'division', label: '사업부 소개', image: { src: `${IMG}/division.webp`, alt: '사업부 소개' } },
			{ id: 'partnership', label: '파트너쉽', image: { src: `${IMG}/partnership.webp`, alt: '파트너쉽 페이지' } },
			{ id: 'recruit-vision', label: '인재상', image: { src: `${IMG}/recruit-vision.webp`, alt: '인재상 페이지' } },
			{ id: 'recruit-notice', label: '채용 안내', image: { src: `${IMG}/recruit-notice.webp`, alt: '채용 안내' } },
			{ id: 'location', label: '오시는 길', image: { src: `${IMG}/location.webp`, alt: '오시는 길 (Google Maps)' } },
		],
	},
	system: {
		label: '관리자 시스템',
		title: '운영자 관점의 관리 화면',
		lead: '비개발자도 메뉴·이미지·텍스트를 직접 수정할 수 있도록, 사용 빈도와 권한을 고려해 메뉴 구조를 설계했습니다.',
		cards: [
			{
				icon: 'cube',
				title: '메뉴 단위 컨트롤',
				text: '메뉴 트리를 그대로 관리자에서 노출해, 사이트 구조를 머릿속에서 매핑하지 않아도 되도록 만들었습니다.',
			},
			{
				icon: 'shield',
				title: '이미지·텍스트 안전 갱신',
				text: '미리보기와 임시저장을 지원해, 실제 사이트에 반영되기 전에 운영자가 결과를 검토할 수 있게 했습니다.',
			},
		],
		rightImage: { src: `${IMG}/admin-main.webp`, alt: '관리자 메인 화면' },
	},
};
