import { url } from '@jeehoon/utils';

export const site = {
	sectionLabel: 'The Site',
	title: '5개의 앱, 4개의 패키지, 한 도메인',
	lead: 'baakhan.com은 Turborepo 기반 모노레포로,\n각 앱이 Vercel에서 분리 배포되며 공통 UI·테마는 패키지로 공유됩니다.',
	apps: [
		{ id: 'home', title: 'home', desc: '랜딩·메인 웹앱' },
		{ id: 'portfolio', title: 'portfolio', desc: '프로젝트 케이스 스터디' },
		{ id: 'resume', title: 'resume', desc: '이력서' },
		{ id: 'blog', title: 'blog', desc: '기술 노트 & 글' },
		{ id: 'lab', title: 'lab', desc: '실험·프로토타입' },
	],
	packages: [
		{ id: 'ui', title: 'ui', desc: '디자인 시스템 컴포넌트' },
		{ id: 'theme', title: 'theme', desc: '디자인 토큰·컬러·타이포' },
		{ id: 'hooks', title: 'hooks', desc: '공용 React Hooks' },
		{ id: 'utils', title: 'utils', desc: '유틸 함수·타입' },
	],
	chips: [
		'Turborepo',
		'Vercel 분리 배포',
		'공유 디자인 토큰',
	],
	cta: {
		label: 'GitHub에서 전체 코드 보기',
		href: url.githubRepository,
	},
} as const;
