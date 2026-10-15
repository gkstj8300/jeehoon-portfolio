import { url } from '@jeehoon/utils';

export const PDF_URL =
	'https://d2ut7x8yqv441q.cloudfront.net/posts/resume.pdf';

export interface ContactLink {
	label: string;
	href: string;
	/** 바깥 링크는 새 탭으로 연다. 메일은 같은 탭이 자연스럽다 */
	external?: boolean;
	/** PDF 열람은 분석 이벤트를 남긴다 */
	trackPdf?: boolean;
}

export const hero = {
	eyebrow: 'Resume · Frontend Developer',
	status: '제이에이치솔루션 재직 중',
	name: '박지훈',
	nameEn: 'Jeehoon Park',
	/** 두 번째 줄이 포인트색으로 강조된다 */
	positioningLines: ['AI를 개발에 활용하고,', '성능과 안정성을 직접 검증합니다.'],
	accentLineIndex: 1,
	summary:
		'React·TypeScript 기반 커머스와 실시간 관제 서비스를 개발합니다. 레거시의 무중단 전환, 데이터 연동과 장애 대응 구조를 설계해 왔습니다. Claude Code와 Figma MCP를 개발에 활용하며, 회귀 테스트와 브라우저 메모리 분석으로 결과물의 품질을 확인합니다.',
} as const;

export const contactLinks: readonly ContactLink[] = [
	{ label: 'gkstj8300@gmail.com', href: 'mailto:gkstj8300@gmail.com' },
	{ label: 'GitHub ↗', href: url.github, external: true },
	{ label: 'Portfolio ↗', href: url.portfolio, external: true },
	{ label: '기존 이력서 PDF ↗', href: PDF_URL, external: true, trackPdf: true },
];

/** 본문 바로가기. `id`는 각 섹션의 앵커와 같아야 한다 */
export const indexNav = [
	{ id: 'career', label: '01 경력' },
	{ id: 'work', label: '02 프로젝트' },
	{ id: 'foundation', label: '03 기술' },
] as const;

export const indexHint = 'SCROLL TO EXPLORE ↓';
