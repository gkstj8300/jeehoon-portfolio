export interface SkillGroup {
	title: string;
	items: string;
}

export const skillSection = {
	eyebrow: '03 · 기술',
	title: '업무에 사용한 기술.',
} as const;

export const skillGroups: readonly SkillGroup[] = [
	{ title: 'Frontend', items: 'TypeScript, JavaScript, React, Next.js' },
	{ title: '상태·데이터', items: 'TanStack Query, Zustand, Redux, WebSocket' },
	{
		title: '스타일·시각화',
		items: 'Tailwind CSS, Sass, Styled-components, ECharts, Three.js',
	},
	{ title: '테스트', items: 'Vitest, React Testing Library, MSW' },
	{
		title: 'AI 활용·검증',
		items: 'Claude Code · Figma MCP · 회귀 테스트 · Chrome 힙 스냅샷',
	},
	{
		title: '협업·배포',
		items: 'Git · GitHub Actions · Figma · AWS S3 · CloudFront',
	},
];
