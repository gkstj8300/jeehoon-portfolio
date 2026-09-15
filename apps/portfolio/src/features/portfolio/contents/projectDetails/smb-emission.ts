import type { ProjectDetail } from './types';

const IMG = '/images/projects/smb-emission';

export const smbEmission: ProjectDetail = {
	slug: 'smb-emission',
	hero: {
		titlePre: '제이에이치솔루션',
		titleAccent: 'AquaSense',
		titlePost: '소규모 사업장\n오염물질 배출 관리 플랫폼',
		summaryHtml:
			'TMS가 없는 <strong>소규모 폐수배출사업장</strong>의 수질·설비 시계열을 수집해, <strong>이상 탐지·오염도 추정·설비 예지보전</strong> 결과를 한 화면에서 읽게 만드는 관제 플랫폼입니다. <strong>AI 응용제품 신속상용화 지원사업(환경)</strong> 국책 과제로, <strong>사업장·기초지자체·시스템 관리자</strong> 3개 역할의 16개 화면과 계측 서버 실연동까지 프론트엔드 전 구간을 담당했습니다.',
		thumbnail: { src: `${IMG}/hero.png`, alt: '통합 관제 — 실증 사업장 지도와 이상 탐지 XAI' },
		meta: [
			{ icon: 'company', label: 'Company', value: '제이에이치솔루션\n주관기관' },
			{ icon: 'timeline', label: 'Timeline', value: '2026.08 ~ 진행중' },
			{ icon: 'role', label: 'Role', value: 'Frontend 전체 담당\n화면 설계·계측 서버 연동' },
			{ icon: 'stack', label: 'Tech Stack', value: 'Next.js · React 19 · TypeScript\nTailwind · TanStack Query · Recharts' },
		],
	},
	strategy: {
		label: '핵심 설계 전략',
		title: '화면이 조용히 거짓말하지 않게 만드는 구조',
		lead: '환경 규제 데이터를 다루는 화면에서 가장 위험한 것은 비어 있는 화면이 아니라 그럴듯하게 틀린 화면입니다. 결측·시각·임계값·권한 네 축을 화면 밖 한 곳으로 모으는 데 집중했습니다.',
		cards: [
			{
				icon: 'shield',
				title: '결측과 0을 끝까지 구분',
				text: '서버 응답을 그대로 zip 하지 않고 타임스탬프 격자를 먼저 만든 뒤 채웁니다. 채워지지 않은 칸이 곧 결측이고, 차트는 그 구간을 이어 그리지 않습니다.',
				why: '널 병합으로 0을 채우는 한 줄이면 코드는 단순해지지만, 방지시설 미가동 구간의 전류 0(측정된 사실)과 통신 두절 구간의 빈칸(모름)이 같은 값이 됩니다. 두 개가 같아지는 순간 무단방류 의심 판정 자체가 사라집니다.',
			},
			{
				icon: 'target',
				title: '임계는 표본 수가 아니라 분으로',
				text: '이상 구간·방류 의심의 최소 지속 시간을 분 단위로 정의하고, 수집 주기를 곱해 표본 수로 환산하는 함수를 한 곳에 두었습니다.',
				why: '수집 주기가 5분에서 1분으로 바뀌자, 상수로 박아 둔 표본 수가 말없이 다른 시간을 뜻하게 됐습니다. 실제로 «3시간 이상 지속»이 36분으로, «두절 55분»이 11분으로 줄어 있었습니다. 단위를 바꾸니 주기가 바뀌어도 판정 기준이 따라 움직이지 않습니다.',
			},
			{
				icon: 'layers',
				title: '권한이 아니라 범위를 URL에',
				text: '역할별로 보이는 사업장 수가 달라지는 필터를 전부 URL 쿼리(scope·site·municipality)로 표현하고, 라우트 가드가 진입 시점에 범위를 박습니다.',
				why: '서버는 역할을 모릅니다. 역할로 행 수를 가르면 서버 HTML과 클라이언트 렌더 결과가 갈려 하이드레이션이 깨집니다. URL은 서버도 읽기 때문에, 범위를 URL에 두는 것은 취향이 아니라 제약이었습니다. 덤으로 특정 사업장 화면을 그대로 공유·북마크할 수 있게 됐습니다.',
			},
			{
				icon: 'flow',
				title: '실계측과 내장 데이터를 같은 경로로',
				text: '계측 서버(ThingsBoard) 연동과 fixture를 조회 훅 하나 뒤로 숨기고, 수신 상태를 pending·live·fallback 세 가지로 나눠 화면에 그대로 적습니다.',
				why: '아직 확인하지 못한 상태를 «서버 미연결»로 적으면 없는 사실을 주장하게 됩니다. 결측을 0으로 그리지 않는 것과 같은 규약을 상태 표기에도 적용해, 아직 모르는 것과 확인된 두절을 갈랐습니다.',
			},
			{
				icon: 'sparkles',
				title: '임시값에 이름표를 붙이다',
				text: '원문이 정하지 않은 값(이상 점수 구간 경계, 최소 지속 시간, 단위 등)은 전부 PROVISIONAL_ 접두사로 한 파일에 모으고, 근거와 미정 번호를 주석으로 남겼습니다.',
				why: '프로토타입은 값을 정해야 화면이 돌아가지만, 정해진 값과 우리가 임시로 고른 값이 섞이면 시연 뒤에 무엇을 확정해야 하는지 아무도 모릅니다. 한 파일만 고치면 전 화면이 따라오고, 화면은 지어낸 기준을 판정 근거처럼 인쇄하지 않습니다.',
			},
		],
	},
	showcase: {
		label: '주요 화면',
		title: '역할이 다르면 묻는 질문도 다릅니다',
		lead: '시스템 관리자는 «어디가 이상한가», 지자체는 «관내에 조치가 필요한 곳이 있는가», 사업장은 «우리 공정이 지금 정상인가»를 묻습니다. 같은 데이터 위에 역할별로 다른 진입 화면을 세웠습니다.',
		layout: 'tabs',
		items: [
			{ id: 'dashboard', label: '통합 관제', image: { src: `${IMG}/dashboard.png`, alt: '실증 사업장 10개소 지도와 선택 사업장 이상 점수·XAI 기여 변수' } },
			{ id: 'anomaly', label: '이상 탐지', image: { src: `${IMG}/anomaly.png`, alt: '사업장별 이상 점수 순위와 최근 24시간 추세' } },
			{ id: 'prediction', label: '오염도 추정', image: { src: `${IMG}/prediction.png`, alt: 'TOC·TN·TP 기준 대비 추이와 예측 미정 구간 표기' } },
			{ id: 'site-detail', label: '사업장 상세', image: { src: `${IMG}/site-detail.png`, alt: '일간 운전 리본과 이상 탐지·알람·설비 요약' } },
			{ id: 'inout', label: '유입·유출 비교', image: { src: `${IMG}/inout.png`, alt: '유입수와 유출수의 수질 8종 대조와 처리 판정' } },
			{ id: 'wallboard', label: '현황판', image: { src: `${IMG}/wallboard.png`, alt: '사무실 벽 TV용 현황판 — 이상 점수·수질 8종·알람·설비·배출 축' } },
			{ id: 'jurisdiction', label: '관내 감독', image: { src: `${IMG}/jurisdiction.png`, alt: '기초지자체 관할 시·군·구 감독 현황' } },
		],
	},
	system: {
		label: '계측 데이터 파이프라인',
		title: '센서 한 점이 판정 한 줄이 되기까지',
		lead: '백엔드가 없는 단계에서 계측 서버에만 직접 붙었습니다. 나중에 백엔드를 경유하게 될 때 고칠 자리가 한 곳이어야 한다는 전제로 계층을 나눴습니다.',
		cards: [
			{
				icon: 'shield',
				title: '수집 — 서버 라우트 프록시',
				text: '브라우저가 계측 서버를 직접 부르지 않습니다. 토큰 획득·갱신·재로그인을 서버 라우트 한 파일에 가두고, 조회 경로 다섯 개만 허용 목록으로 통과시킵니다.',
			},
			{
				icon: 'cube',
				title: '변환 — 격자 매퍼',
				text: '문자열 값·유령 표본·키마다 다른 타임스탬프 집합을 매퍼에서 흡수해, 컴포넌트는 정규화된 계측 포인트 한 타입만 봅니다.',
			},
			{
				icon: 'flow',
				title: '표출 — 단일 조회 훅',
				text: '화면이 읽는 입구는 조회 훅 하나뿐입니다. 실계측·폴백 전환, 로딩·에러 상태를 훅 안에서 처리해 화면은 어느 원천인지 알 필요가 없습니다.',
			},
		],
		rightImage: { src: `${IMG}/process.png`, alt: '수처리 공정 — 어디를 재고 어디를 AI로 추정하며 어디가 안 보이는지' },
	},
};
