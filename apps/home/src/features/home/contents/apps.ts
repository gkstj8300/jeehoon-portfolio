import { url } from '@jeehoon/utils';

export type AppId = 'portfolio' | 'resume' | 'blog' | 'lab';

export interface AppCard {
	id: AppId;
	title: string;
	description: string;
	href: string;
}

export const apps: readonly AppCard[] = [
	{
		id: 'portfolio',
		title: 'Portfolio',
		description: '프로젝트 케이스 스터디 모음',
		href: url.portfolio,
	},
	{
		id: 'resume',
		title: 'Resume',
		description: '정형화된 이력 문서',
		href: url.resume,
	},
	{
		id: 'blog',
		title: 'Blog',
		description: '기술 노트와 회고',
		href: url.blog,
	},
	{
		id: 'lab',
		title: 'Lab',
		description: '실험·프로토타입',
		href: url.lab,
	},
] as const;

export const appsSection = {
	sectionLabel: 'Apps',
	title: '한 도메인에서, 목적별로 분리된 앱들',
	lead: '각 앱은 서브도메인으로 분리 배포되며, 공통 UI·테마는 패키지로 공유됩니다.',
} as const;
