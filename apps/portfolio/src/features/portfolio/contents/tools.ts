export interface ToolItem {
	name: string;
	desc: string;
}

export interface ToolGroup {
	id: string;
	title: string;
	subtitle: string;
	items: readonly ToolItem[];
}

export const toolsHeader = {
	title: '협업과 설계를 위한 기술 활용',
	desc: '각 도구를 목적에 맞게 활용하여 제품의 완성도와 협업의 효율을 함께 높입니다.',
};

export const tools: readonly ToolGroup[] = [
	{
		id: 'frontend',
		title: 'Frontend',
		subtitle: '구조 & 사용자 경험 기반 인터페이스 구현',
		items: [
			{ name: 'React', desc: '컴포넌트 단위의 선언적 UI 설계' },
			{ name: 'Next.js', desc: 'SSR / SSG 기반 SEO·성능 최적화' },
			{ name: 'TypeScript', desc: '타입 안정성 기반의 견고한 코드 작성' },
		],
	},
	{
		id: 'state-style',
		title: 'State / Style',
		subtitle: '예측 가능한 상태와 일관된 스타일 시스템',
		items: [
			{ name: 'Redux / Zustand', desc: '복잡도에 맞춘 클라이언트 상태 분리 관리' },
			{ name: 'TanStack Query', desc: '서버 상태 캐싱 및 동기화' },
			{ name: 'Sass / CSS Modules', desc: '컴포넌트 스코프 스타일링과 디자인 토큰 운영' },
		],
	},
	{
		id: 'workflow',
		title: 'Workflow',
		subtitle: '체계적인 협업과 효율적인 작업 흐름',
		items: [
			{ name: 'Git / GitHub', desc: 'PR 기반 코드 리뷰와 브랜치 전략 운영' },
			{ name: 'Jira / Notion', desc: '이슈 트래킹과 의사결정 문서화' },
			{ name: 'Figma', desc: '디자이너와 토큰·컴포넌트 단위 협업' },
		],
	},
	{
		id: 'ai-workflow',
		title: 'AI Workflow',
		subtitle: '생산성 향상과 의사결정 가속',
		items: [
			{ name: 'Claude Code', desc: '코드베이스 탐색·리팩토링 자동화 및 페어 프로그래밍' },
			{ name: 'ChatGPT', desc: '기획 구조화·UX 라이팅·아이디어 검증' },
			{ name: 'Figma MCP', desc: '디자인 → 코드 전환 워크플로우 자동화' },
		],
	},
] as const;
