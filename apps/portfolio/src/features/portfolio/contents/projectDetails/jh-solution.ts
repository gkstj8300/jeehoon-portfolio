import type { ProjectDetail } from './types';

const IMG = '/images/projects/jh-solution';

export const jhSolution: ProjectDetail = {
	slug: 'jh-solution',
	hero: {
		titlePre: 'JH Solution',
		titleAccent: '기업 홈페이지',
		titlePost: '리뉴얼 및 자동 배포\n파이프라인 구축',
		summaryHtml:
			'<strong>Markdown 기반 동적 페이지 생성</strong>과 <strong>GitHub Actions 이중 배포 파이프라인</strong>으로, 콘텐츠 업데이트 비용을 최소화한 기업 홈페이지입니다.',
		thumbnail: { src: `${IMG}/main.png`, alt: 'JH Solution 메인 페이지' },
		meta: [
			{ icon: 'company', label: 'Company', value: 'JH Solution' },
			{ icon: 'timeline', label: 'Timeline', value: '2026.01 ~ 진행중' },
			{ icon: 'role', label: 'Role', value: 'Frontend / Infra\n설계 · 구현 · 배포 자동화 단독' },
			{ icon: 'stack', label: 'Tech Stack', value: 'Gatsby · React · GraphQL\nAWS S3 · CloudFront · GitHub Actions' },
		],
	},
	strategy: {
		label: '핵심 설계 전략',
		title: '운영 비용을 줄이는 콘텐츠·배포 자동화',
		lead: '단순한 노출용 사이트가 아니라, 비개발자도 콘텐츠를 추가할 수 있고 배포 사고가 줄어드는 운영 구조를 우선했습니다.',
		cards: [
			{
				icon: 'layers',
				title: 'Markdown 기반 동적 페이지',
				text: 'frontmatter만 작성하면 GraphQL 쿼리로 페이지가 자동 생성되어, 콘텐츠 추가 시 코드 변경이 필요 없습니다.',
				why: '제품·프로젝트 항목이 자주 추가되는 환경에서는, 코드 PR 없이 Markdown만 추가해도 페이지가 만들어지는 구조가 운영 비용을 가장 크게 줄입니다.',
			},
			{
				icon: 'flow',
				title: 'dev / prod 이중 배포 파이프라인',
				text: 'GitHub Actions로 브랜치별 환경에 자동 배포하고, CloudFront 캐시 무효화까지 워크플로우 안에서 처리합니다.',
				why: '수동 배포는 누락·실수 비용이 큽니다. PR 머지 → 빌드 → S3 업로드 → CDN 갱신을 하나의 파이프라인으로 묶어 의식하지 않고도 안전하게 배포되도록 설계했습니다.',
			},
			{
				icon: 'sparkles',
				title: 'AI 기반 디자인-코드 연결',
				text: 'Claude Code + Figma MCP 연동으로 디자인 시안을 코드 초안으로 직접 변환해, 컴포넌트 마크업·스타일 작업 시간을 단축했습니다.',
			},
			{
				icon: 'shield',
				title: '서버리스 Contact API',
				text: 'Google Forms 연동으로 별도 백엔드 없이 문의 플로우를 완결, 운영 부담을 0에 가깝게 유지했습니다.',
			},
		],
	},
	showcase: {
		label: '주요 화면',
		title: '브랜드 정체성과 정보 가독성을 동시에',
		lead: '단순한 LP를 넘어, 제품·프로젝트·문의가 한 흐름으로 이어지도록 설계했습니다.',
		layout: 'grid',
		items: [
			{ id: 'main', label: '메인', image: { src: `${IMG}/main.png`, alt: 'JH Solution 메인 페이지' } },
			{ id: 'jhaion-engine', label: 'JHAION 엔진', image: { src: `${IMG}/jhaion-engine.png`, alt: 'JHAION 엔진 개발 배경 페이지' } },
			{ id: 'energy', label: '에너지 관리', image: { src: `${IMG}/energy.png`, alt: '에너지 관리 솔루션 페이지' } },
			{ id: 'project-view', label: '프로젝트 뷰', image: { src: `${IMG}/project-view.png`, alt: '프로젝트 상세 뷰 페이지' } },
			{ id: 'contact', label: '문의하기', image: { src: `${IMG}/contact.png`, alt: '문의하기 폼' } },
		],
	},
};
