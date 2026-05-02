import type { ProjectDetail } from './types';

const IMG = '/images/projects/sems';

export const sems: ProjectDetail = {
	slug: 'sems',
	hero: {
		titlePre: '삼성물산',
		titleAccent: 'SEMS',
		titlePost: '연돌 상태 모니터링\n실시간 관제 플랫폼',
		summaryHtml:
			'<strong>42개 층 IoT 센서</strong>와 <strong>기상청 API</strong>를 결합해, 건물 압력 변화를 실시간으로 시각화하는 <strong>관제 플랫폼</strong>입니다.',
		meta: [
			{ icon: 'company', label: 'Company', value: '삼성물산' },
			{ icon: 'timeline', label: 'Timeline', value: '2026.02 ~ 진행중' },
			{ icon: 'role', label: 'Role', value: 'Frontend Lead\n실시간 데이터·시각화 설계' },
			{ icon: 'stack', label: 'Tech Stack', value: 'React · TypeScript · Vite\nZustand · TanStack Query · ECharts' },
		],
	},
	strategy: {
		label: '핵심 설계 전략',
		title: '실시간성과 가독성을 동시에 만족시키는 구조 설계',
		lead: '대량의 센서 데이터를 끊김 없이 받아 처리하면서도, 사용자가 즉시 이상을 인지할 수 있는 정보 구조로 변환했습니다.',
		cards: [
			{
				icon: 'flow',
				title: '서버·클라이언트 상태 분리',
				text: 'TanStack Query로 서버 상태(센서·기상)를 캐싱·동기화하고, Zustand로 UI 상태를 분리해 책임을 명확히 했습니다.',
				why: '하나의 상태 라이브러리로 모든 것을 다루면 캐시 무효화·리렌더링 경계가 모호해집니다. 두 영역을 분리해 디버깅과 확장이 쉬워졌습니다.',
			},
			{
				icon: 'speed',
				title: 'WebSocket 기반 실시간 처리',
				text: '폴링 대신 WebSocket으로 압력 변화·이상 알림을 푸시 받고, 부분 업데이트만 화면에 반영합니다.',
				why: '주기 폴링은 변화 없는 시점에도 트래픽이 발생합니다. 푸시 모델로 전환해 네트워크와 렌더링 비용을 함께 줄였습니다.',
			},
			{
				icon: 'chart',
				title: 'ECharts 인스턴스 재사용',
				text: '42개 층 압력 프로파일을 데이터 샘플링과 인스턴스 재사용으로 그려, 매 갱신마다 차트를 재생성하지 않습니다.',
				why: 'AI가 생성한 초안 코드에서 메모리 누수를 발견하고, dispose 시점을 직접 설계해 장시간 운영 안정성을 확보했습니다.',
			},
			{
				icon: 'cube',
				title: 'Mock / Server 모드 분리',
				text: 'MSW 기반으로 Mock과 Server 모드를 토글해 백엔드 의존 없이도 UI 개발과 시연이 가능하도록 환경을 분리했습니다.',
			},
		],
	},
	showcase: {
		label: '주요 화면',
		title: '운영자가 한 화면에서 즉시 판단할 수 있도록',
		lead: '복잡한 센서 수치 대신, 흐름·이상·조치를 동일한 화면에서 이어갈 수 있도록 6개 영역의 대시보드를 설계했습니다.',
		layout: 'tabs',
		items: [
			{ id: 'overview', label: '종합 현황', image: { src: `${IMG}/overview.png`, alt: '종합 현황 대시보드' } },
			{ id: 'stack-effect', label: '연돌 계산', image: { src: `${IMG}/stack-effect.png`, alt: '연돌 효과 계산 화면' } },
			{ id: 'sensors', label: '센서 관리', image: { src: `${IMG}/sensors.png`, alt: '센서 관리 화면' } },
			{ id: 'alert-config', label: '알림 설정', image: { src: `${IMG}/alert-config.png`, alt: '알림 정책 설정 화면' } },
			{ id: 'alert-google-chat', label: 'Google Chat 연동', image: { src: `${IMG}/alert-google-chat.png`, alt: 'Google Chat 알림 연동' } },
		],
	},
};
