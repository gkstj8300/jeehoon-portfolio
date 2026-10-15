import type { ProjectDetail } from './types';

const IMG = '/images/projects/zipboda';

/**
 * 개인 프로젝트. 회사 업무 상세와 같은 틀을 쓰되, 소속 대신 «개인 프로젝트 · 1인 개발»을
 * 앞세우고 AI 활용 방식을 따로 적는다 — 읽는 사람이 회사 결과물로 오해하지 않게 한다.
 *
 * 수치는 저장소(github.com/ZIPBODA)에서 확인한 값만 쓴다. 서비스 홈의 «평면도 14,200+» 같은
 * 숫자는 디자인 시안의 자리 표시 값이라 싣지 않는다.
 */
export const zipboda: ProjectDetail = {
	slug: 'zipboda',
	hero: {
		titlePre: '개인 프로젝트',
		titleAccent: '집보다',
		titlePost: '공공 청약 · 3D 집구경\n주거 플랫폼',
		summaryHtml:
			'LH·SH 공공 청약 정보와 <strong>현황도를 옮긴 3D 집구경</strong>을 묶은 주거 플랫폼입니다. 회사 밖에서 <strong>혼자</strong> 기획 산출물부터 <strong>디자인 시스템 패키지</strong>, 웹 화면까지 만들고 있으며, <strong>Claude Code·Codex</strong>를 개발 파트너로 쓰되 규칙과 테스트로 결과를 검증합니다.',
		thumbnail: { src: `${IMG}/layout-3d-hero.webp`, alt: '현황도를 옮긴 3D 입체 평면도' },
		meta: [
			{ icon: 'company', label: 'Type', value: '개인 프로젝트\n1인 개발 · 회사 업무 아님' },
			{ icon: 'timeline', label: 'Timeline', value: '2026.07 ~ 진행중' },
			{ icon: 'role', label: 'Role', value: '기획 · 디자인 시스템\n프론트엔드 전체' },
			{ icon: 'platform', label: 'AI', value: 'Claude Code · Codex\n규칙 11종으로 통제' },
			{ icon: 'goal', label: 'Scope', value: '웹 21개 화면\n디자인 시스템 패키지 3종' },
			{ icon: 'stack', label: 'Tech Stack', value: 'Next.js · TypeScript · Three.js\nR3F · OpenCV.js · Vitest' },
		],
		links: [
			{ label: 'GitHub · ZIPBODA', href: 'https://github.com/ZIPBODA' },
			{ label: 'zipboda-web 저장소', href: 'https://github.com/ZIPBODA/zipboda-web' },
		],
	},
	strategy: {
		label: '핵심 설계 전략',
		title: '혼자, 그리고 AI와 함께 만들 때 무엇을 지켰나',
		lead: '팀이 없으면 리뷰어도 없습니다. AI가 코드를 빠르게 쓰는 만큼, 무엇을 믿고 무엇을 다시 확인할지를 규칙과 테스트로 먼저 정했습니다.',
		cards: [
			{
				icon: 'cube',
				title: '현황도 PDF를 3D 집구경으로',
				text: 'LH·SH 현황도에서 평형별 도면을 잘라 2D 평면 모델(벽·문·방)로 만들고, Three.js·React Three Fiber 뷰어에서 3인칭 입체 뷰와 1인칭 워크스루로 보여 줍니다.',
				why: '청약을 고를 때 사람들이 실제로 궁금한 건 «이 집에 들어가면 어떤가»입니다. 도면 이미지를 그대로 보여 주는 대신, 같은 평면을 걸어 볼 수 있는 공간으로 바꾸는 데 집중했습니다.',
			},
			{
				icon: 'shield',
				title: '자동 추출보다 검증을 먼저',
				text: 'OpenCV·OCR로 벽과 치수를 자동 추출하는 초안을 만들었지만, 승격 기준을 통과한 초안은 0건이었습니다. 그래서 인쇄된 치수선을 실측해 트레이싱하는 방식으로 바꾸고, 검수를 통과한 20개 평형만 3D로 노출합니다.',
				why: '틀린 3D는 도면이 없는 것보다 나쁩니다. 나머지 46개 평형은 2D로만 보여 주고, «검수된 모델만 3D»라는 정책 자체를 테스트로 고정해 실수로 풀리지 않게 했습니다.',
			},
			{
				icon: 'sparkles',
				title: 'AI 에이전트 둘을 하나의 규칙으로',
				text: 'Claude Code와 Codex가 같은 규칙을 읽도록 AGENTS.md에서 상황별 규칙 11종(코드·구조·테스트·시각 검증 등)으로 연결하고, 작업 난도별 모델 선택 기준을 문서로 남겼습니다.',
				why: '도구마다 규칙을 따로 두면 두 벌이 어긋납니다. 원본은 한 곳에 두고 진입점만 나눴고, 검수 기록에는 어떤 에이전트가 어떤 근거로 모델을 등록했는지 남깁니다.',
			},
			{
				icon: 'target',
				title: '1인칭은 사람 기준으로',
				text: '현관 안쪽 650mm에서 걷기 시작하고, 발코니·욕실·반침은 시작 자리에서 뺍니다. 화면 비율에 따라 시야각을 제한하고, 프레임이 끊겨도 한 번에 멀리 순간 이동하지 않도록 이동량에 상한을 둡니다.',
				why: '처음에는 ㄱ자 방에서 벽 속에서 시작하거나 현관문으로 집 밖 허공에 걸어 나가는 문제가 있었습니다. 증상마다 원인을 고치고 회귀 테스트로 남겼습니다.',
			},
			{
				icon: 'layers',
				title: '디자인 시스템을 패키지로',
				text: 'Figma 토큰을 @zipboda/tokens · ui-core · ui 세 패키지로 나눠 GitHub Packages에 배포하고, changesets로 버전을 관리합니다. 플랫폼 공통(tokens·ui-core)과 웹 전용(ui)을 갈라, React Native 앱도 토큰·코어를 함께 씁니다.',
				why: '혼자 여러 저장소(웹·앱·관리자)를 다루면 화면마다 색과 간격이 조금씩 갈라집니다. 디자인을 코드가 아니라 버전이 붙은 의존성으로 만들어 한 곳만 고치게 했습니다.',
			},
		],
	},
	showcase: {
		label: '주요 화면',
		title: '도면을 읽는 대신, 걸어 보게',
		lead: '청약 정보를 찾는 데서 끝나지 않고, 그 집의 평면을 2D·3D·1인칭으로 이어서 볼 수 있도록 흐름을 설계했습니다.',
		layout: 'tabs',
		items: [
			{ id: 'walkthrough', label: '1인칭 집구경', image: { src: `${IMG}/walkthrough.webp`, alt: '1인칭 워크스루와 미니 도면 위치 표시' } },
			{ id: 'layout-3d', label: '3D 입체 뷰', image: { src: `${IMG}/layout-3d.webp`, alt: '드래그로 회전하는 3D 입체 평면도' } },
			{ id: 'detail', label: '청약 상세 · 2D', image: { src: `${IMG}/subscription-detail.webp`, alt: '청약 상세 화면 — 2D 평면도와 공고 정보, 위치' } },
			{ id: 'map', label: '청약 지도', image: { src: `${IMG}/subscription-map.webp`, alt: '지도 위 공공 청약 목록과 지역별 묶음 표시' } },
			{ id: 'score', label: '가점 계산기', image: { src: `${IMG}/score.webp`, alt: '청약 가점 계산기와 신청 가능한 공고' } },
		],
	},
	system: {
		label: '현황도 → 3D 파이프라인',
		title: '도면 한 장이 걸을 수 있는 집이 되기까지',
		lead: '자동화와 사람의 검수를 단계로 나눴습니다. 어느 단계에서 멈췄는지가 기록으로 남아, 다음 평형을 이어서 작업할 수 있습니다.',
		cards: [
			{
				icon: 'flow',
				title: '추출 — 브라우저에서 초안 만들기',
				text: 'PDF에서 평형별 도면을 잘라 카탈로그(9개 주택 · 66개 평형)로 만들고, 벽 형상은 OpenCV를 Web Worker에서, 치수 숫자는 Tesseract OCR로 읽어 초안을 뽑습니다.',
			},
			{
				icon: 'shield',
				title: '검수 — 승격 판정과 실측 트레이싱',
				text: '초안을 승격 기준으로 판정하고, 통과하지 못하면 인쇄 치수선을 실측해 트레이싱합니다. 검수 화면은 개발 서버에서만 열리고 운영 빌드에서 빠집니다.',
			},
			{
				icon: 'chart',
				title: '표출 — 검수된 모델만 3D로',
				text: '등록된 20개 평형만 3D·1인칭을 켜고 나머지는 2D 도면으로 보여 줍니다. 1인칭은 30fps 아래로 떨어지면 해상도를 자동으로 낮춥니다.',
			},
		],
		rightImage: { src: `${IMG}/layout-review.webp`, alt: '현황도 검수 화면 — 원본 도면, 2D 모델 오버레이, 3D 미리보기와 검수 기록' },
	},
};
