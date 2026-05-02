import type { ProjectDetail } from './types';

const IMG = '/images/projects/hanwha-core';

export const hanwhaCore: ProjectDetail = {
	slug: 'hanwha-core',
	hero: {
		titlePre: '한화생명',
		titleAccent: '코어 시스템',
		titlePost: '구축 프로젝트',
		summaryHtml:
			'<strong>Kendo UI 기반 수수료 업무 화면</strong>과 <strong>ETL 기반 시스템 재구축</strong>에 참여한 차세대 코어 시스템 프로젝트.',
		meta: [
			{ icon: 'company', label: 'Company', value: '한화생명' },
			{ icon: 'timeline', label: 'Timeline', value: '2022.05 ~ 2022.12 (8개월)' },
			{ icon: 'role', label: 'Role', value: 'Frontend Engineer\n수수료 화면 · 프로시저 연동' },
			{ icon: 'stack', label: 'Tech Stack', value: 'Java · JavaScript\nOracle · Kendo UI · TeraStream' },
		],
	},
	strategy: {
		label: '핵심 설계 전략',
		title: '레거시 배치를 ETL 기반으로 재구축',
		lead: '수작업 기반 배치 로직을 JobPass + TeraStream 조합으로 전환하면서, 화면과 데이터 흐름이 끊기지 않도록 인터페이스를 함께 설계했습니다.',
		cards: [
			{
				icon: 'flow',
				title: '수수료 프로세스 전반 구현',
				text: '데이터 수신 → 적재 → 유형별 계산 → 검증 → 지급으로 이어지는 전체 흐름을 화면과 함께 개발했습니다.',
				why: '한 단계만 담당하면 정책 변경에 약합니다. 흐름 전체를 이해하고 있었기 때문에 보험 정책 변경 시 영향 범위를 빠르게 식별할 수 있었습니다.',
			},
			{
				icon: 'cube',
				title: 'JobPass + TeraStream 도입',
				text: 'DD(DB to DB), FD(File to DB) 방식의 다양한 데이터 유형을 ETL로 적재하도록 인터페이스를 재설계했습니다.',
			},
			{
				icon: 'speed',
				title: 'MERGE 기반 적재 효율화',
				text: 'MERGE 문으로 적재 효율을 높이고, 지급 유형별 프로시저를 모듈화해 유연한 수수료 계산 로직을 만들었습니다.',
			},
			{
				icon: 'shield',
				title: '데이터 마이그레이션 검증',
				text: 'Core 시스템과 레거시 청산 과정에서 협업 부서와 데이터 정합성 검증을 함께 수행했습니다.',
			},
		],
	},
	showcase: {
		label: '주요 화면 및 시스템',
		title: '업무 화면과 시스템 구조를 한눈에',
		lead: 'Kendo UI 기반 수수료 화면, ETL 엔진(TeraStream), 잡 스케줄러(JobPass)까지 시스템 단위로 개발에 참여했습니다.',
		layout: 'grid',
		items: [
			{ id: 'fee-payment', label: '수수료 지급', image: { src: `${IMG}/fee-payment.webp`, alt: '수수료 지급 화면 (마스킹)' } },
			{ id: 'payment-request', label: '지급 의뢰', image: { src: `${IMG}/payment-request.webp`, alt: '지급 의뢰 화면' } },
			{ id: 'jobpass', label: 'JobPass', image: { src: `${IMG}/jobpass.webp`, alt: 'JobPass 잡 스케줄러' } },
			{ id: 'terastream', label: 'TeraStream', image: { src: `${IMG}/terastream.webp`, alt: 'TeraStream ETL 엔진' } },
		],
	},
};
