import type { ProjectDetail } from './types';

const IMG = '/images/projects/bees';

export const bees: ProjectDetail = {
	slug: 'bees',
	hero: {
		titlePre: '삼성물산 GEC',
		titleAccent: 'BEES',
		titlePost: '스마트빌딩 통합\n관제 플랫폼',
		summaryHtml:
			'<strong>에너지(BEMS)</strong>와 <strong>설비(BAS)</strong>를 한 화면에서 관제하는 통합 플랫폼입니다. <strong>관리자·건물주·입주자</strong> 세 페르소나의 27개 화면을 단일 코드베이스로 운영하고, 화면·<strong>BFF API</strong>·실시간 센서 파이프라인까지 프론트엔드 전 구간을 직접 설계했습니다.',
		thumbnail: { src: `${IMG}/BEES-1.png`, alt: 'BEES 통합 대시보드' },
		meta: [
			{ icon: 'company', label: 'Company', value: '제이에이치솔루션\n고객사: 삼성물산' },
			{ icon: 'timeline', label: 'Timeline', value: '2026.03 ~ 진행중' },
			{ icon: 'role', label: 'Role', value: 'Frontend 전체 담당\nBFF API 설계·연동' },
			{ icon: 'stack', label: 'Tech Stack', value: 'Next.js · TypeScript · Zustand\nTanStack Query · Three.js · Django(BFF)' },
		],
	},
	strategy: {
		label: '핵심 설계 전략',
		title: '역할·화면이 늘어도 무너지지 않는 구조',
		lead: '세 페르소나와 27개 화면, 실시간 센서 데이터를 하나의 코드베이스로 감당하기 위해, 권한과 데이터 가공을 화면 밖으로 밀어내는 데 집중했습니다.',
		cards: [
			{
				icon: 'layers',
				title: '역할별 권한을 라우팅 단에서 분리',
				text: '관리자·건물주·입주자의 접근 범위를 App Router 세그먼트(/admin·/landlord·/tenant)로 나누고, 화면 컴포넌트는 권한을 신경 쓰지 않도록 정리했습니다.',
				why: '화면마다 role 분기를 넣으면 27개 화면이 금세 조건문으로 뒤덮입니다. 권한을 라우팅 단과 AuthGuard로 걷어내니 화면이 단순해졌고, 페르소나가 늘어도 세그먼트만 추가하면 됩니다.',
			},
			{
				icon: 'flow',
				title: '프론트엔드 주도 BFF 설계',
				text: '화면에 필요한 형태로 데이터를 내려주는 BFF(Django/DRF)를 직접 설계하고, PostgreSQL(마스터)과 TimescaleDB(시계열)를 한 시점 스냅샷으로 합쳐 내려줍니다.',
				why: '한 화면에 REST 호출이 6~7건씩 붙고 컴포넌트마다 응답을 조합하던 반복을, 통합 응답 포맷과 자원 계층 경로로 표준화했습니다. 화면당 호출이 1건으로 줄고, 데이터 가공 책임이 서버로 옮겨졌습니다.',
			},
			{
				icon: 'speed',
				title: 'WebSocket 폴백을 훅으로 캡슐화',
				text: 'WebSocket을 우선 사용하되 끊기면 TanStack Query 폴링(60초)으로 자동 전환되도록 커스텀 훅 하나로 감쌌습니다.',
				why: '재연결 시점에 오래된 데이터가 최신 상태를 덮어쓰는 레이스 컨디션을, 서버 스냅샷 시각 비교로 방어했습니다. 화면은 실시간인지 폴백인지 구분하지 않아도 되게 통일했습니다.',
			},
			{
				icon: 'shield',
				title: 'AI 생성 코드의 메모리 누수 직접 검증',
				text: 'Claude Code로 Three.js 3D 씬 구현 속도를 냈지만, 생성 코드의 WebGL 컨텍스트가 해제되지 않아 페이지 전환 시 메모리가 누적됐습니다.',
				why: 'Chrome 힙 스냅샷으로 detached WebGL 컨텍스트를 확인하고, 언마운트 시 geometry·material·texture dispose와 컨텍스트 해제를 직접 넣었습니다. 도구는 속도를 주지만 최종 책임은 사람이 진다는 걸 다시 확인했습니다.',
			},
			{
				icon: 'cube',
				title: '훅 캡슐화로 저장소 교체 흡수',
				text: '프로젝트 도중 시계열 저장소가 InfluxDB에서 PostgreSQL/TimescaleDB로 단일화됐지만, useSensors 훅의 시그니처는 유지한 채 내부 fetcher만 교체했습니다.',
				why: '조회 응답 파서를 long-format으로 바꾸는 인프라 변경을 훅 안에 가뒀기 때문에, UI 코드는 한 줄도 바꾸지 않고 그대로 동작했습니다. 캡슐화 경계가 인프라 교체를 흡수한 사례였습니다.',
			},
		],
	},
	showcase: {
		label: '주요 화면',
		title: '수치를 3D 공간 위에서 읽게 만들다',
		lead: '표 형태의 센서 수치 대신, 건물 형상 위에 층·존별 상태와 AI 분석을 겹쳐 운영자가 한 화면에서 원인을 좇을 수 있도록 설계했습니다.',
		layout: 'tabs',
		items: [
			{ id: 'dashboard', label: '통합 대시보드', image: { src: `${IMG}/BEES-1.png`, alt: '건물주 통합 대시보드 — 에너지·비용·쾌적도 KPI' } },
			{ id: 'trend', label: '실시간 추이', image: { src: `${IMG}/BEES-2.png`, alt: '에너지 실시간 사용량 추이 화면' } },
			{ id: 'energy-3d', label: '에너지 3D 관제', image: { src: `${IMG}/BEES-UN-1.png`, alt: '3D 건물 위 층별 전력 오버레이와 AI 낭비 분석' } },
			{ id: 'env-3d', label: '실내환경 3D', image: { src: `${IMG}/BEES-UN-2.png`, alt: '3D 건물 위 층별 쾌적도 점수와 불만족 존 분석' } },
			{ id: 'stack-3d', label: '연돌 3D 분석', image: { src: `${IMG}/BEES-UN-3.png`, alt: '3D 건물 위 층별 차압 프로파일과 연돌 영향 분석' } },
		],
	},
	system: {
		label: '센서 데이터 파이프라인',
		title: '센서 한 포인트가 화면 한 픽셀이 되기까지',
		lead: '물리 센서·시뮬레이터에서 3D 화면까지 이어지는 전 구간을 다루며, 수집·저장·표출 각 계층의 경계를 직접 정의했습니다.',
		cards: [
			{
				icon: 'flow',
				title: '수집 — Edge Gateway',
				text: 'BACnet·Modbus·MQTT·HTTP·TCP 5종 프로토콜 폴러로 데이터를 모으고, 실제 설비가 없는 구간은 열역학·재실·날씨 모델 기반 물리 시뮬레이터로 대체했습니다.',
			},
			{
				icon: 'layers',
				title: '저장 — TimescaleDB',
				text: '환경·설비 값을 판별자 컬럼 하나로 통합한 long-format 하이퍼테이블(sensor_record·meter_record)에 적재하고, 조회 축을 3방향 인덱스로 커버했습니다.',
			},
			{
				icon: 'chart',
				title: '표출 — WebSocket → 3D',
				text: 'Django Channels의 6개 그룹 브로드캐스트를 훅이 구독해 Zustand에 반영하고, Three.js 씬의 존 폴리곤 색상과 경보 마커를 즉시 갱신합니다.',
			},
		],
		rightImage: { src: `${IMG}/BEES-UN-1.png`, alt: 'BEES 3D 에너지 관제 화면' },
	},
};
