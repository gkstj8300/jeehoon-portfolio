export const project = {
	title: '프로젝트',
	bees: {
		name: '삼성물산',
		projectName: 'BEES 스마트빌딩 통합 에너지·환경 관제 플랫폼 (BEMS/BAS)',
		durationStart: '2026-04',
		durationEnd: '진행중',
		skillKeywords: 'React,Next.js,TypeScript,Vite,TailwindCSS,Zustand,TanStack Query,Three.js,ECharts,i18next,Django,WebSocket',
		development: `대시보드 아키텍처 설계: 27개 화면의 조건부 렌더링 복잡도를 제거하고자 페르소나별(관리자/건물주/입주자) 데이터 접근 범위를 격리한 라우팅 시스템 구축 및 유지보수 생산성 극대화<br />
									프론트엔드 주도형 BFF 설계: Python 기반 시뮬레이터 인프라와의 정렬을 위해 Django/DRF 기반 API 표준 직접 구축. PostgreSQL과 InfluxDB 시계열 데이터를 BFF 단에서 단일 스냅샷으로 집계 처리하여 프론트엔드 컴포넌트 내 데이터 가공 로직 최소화<br />
									실시간 데이터 가용성 99.9% 보장: 웹소켓 장애 대응을 위해 TanStack Query 폴링(60s)으로 전환되는 이중 폴백 메커니즘을 커스텀 훅으로 구현. 웹소켓 재연결 시 레이스 컨디션을 방지하는 State Synchronization 전략 적용<br />
									AI 생성 코드 안정성 확보: Claude Code 활용으로 생산성을 높이되, 생성된 Three.js 내부 WebGL 컨텍스트의 가비지 컬렉션 누수를 크롬 힙 스냅샷으로 식별 후 수동 dispose 로직으로 보완`,
	},
	sems: {
		name: '삼성물산',
		projectName: '연돌 상태 모니터링 시스템 (SEMS)',
		durationStart: '2026-02',
		durationEnd: '2026-03',
		skillKeywords: 'React,TypeScript,Vite,TailwindCSS,Zustand,TanStack Query,ECharts,i18next',
		development: `대용량 데이터 스트림 최적화: 초당 수천 건의 IoT 데이터 유입 시 발생하는 메인 스레드 블로킹 해소를 위해 ECharts 인스턴스 재사용 아키텍처 구축. LTTB(Largest-Triangle-Three-Buckets) 다운샘플링 알고리즘을 도입하여 렌더링 오버헤드 감소 및 CPU 점유율 안정화.<br />
									상태 관리 전략 수립: 자주 변경되는 관제 데이터는 TanStack Query 캐시로, 다국어 및 UI 상태는 Zustand로 엄격히 분리하여 상태 변화의 예측 가능성 확보.<br />
									AI 기반 디자인-개발 워크플로우 자동화: Claude Code와 Figma MCP를 연동하여 디자인 토큰 기반 마크업 초안 생성을 자동화하여 UI 구현 리드타임 단축.<br />
									MSW 기반 독립적 개발 환경: API 명세 단계에서 Mock 서버를 선제 구축하여 백엔드 의존성 없이 프론트엔드 비즈니스 로직 100% 독립 구현.`,
	},
	jhHomepage: {
		name: 'JH Solution',
		projectName: '기업 홈페이지 리뉴얼',
		durationStart: '2026-01',
		durationEnd: '2026-03',
		skillKeywords: 'Gatsby,React,CSS Modules,GraphQL,AWS S3,CloudFront,GitHub Actions,Docker',
		development: `Gatsby 5(SSG) 도입 및 정적 마크다운 기반 Git-CMS 워크플로우 구축으로 인프라 운영 비용 제로화. Google Forms API 기반 서버리스 Contact 기능 구현.`,
	},
	misumiRenewal: {
		name: '한국미스미',
		projectName: '커머스 플랫폼 React/Next.js 마이그레이션',
		durationStart: '2024-04',
		durationEnd: '2025-03',
		skillKeywords: 'React,TypeScript,Next.js,Redux,Sass,Styled-components',
		development: `전면 개편 및 무중단 스위칭 전략: RxJS/Twig 기반 레거시 시스템을 Next.js 기반 아키텍처로 재설계. 신·구 시스템 간 데이터 정합성을 검증하는 병렬 운영 기간을 거쳐, DNS 및 리버스 프록시 레벨의 라우팅 스위칭 전략을 통해 단 한 번의 서비스 중단 없이 To-be 시스템 런칭 성공.<br />
									Core Web Vitals 최적화를 통한 비즈니스 지표 개선: 이미지 Lazy Loading, 스크립트 로딩 우선순위 조정, CDN 캐싱 전략 최적화를 적용하여 LCP(Largest Contentful Paint)를 3.5초에서 1.4초로 60% 단축. 결과적으로 GA 기준 사용자 이탈률 15%p 감소 견인.<br />
									디바이스별 타겟 번들링 최적화: @next/bundle-analyzer를 통한 번들 크기 정밀 분석으로 PC와 Mobile의 엔트리포인트를 런타임에 분리. 모바일 환경에서 불필요한 번들 사이즈를 제거하여 저사양 모바일 기기의 초기 진입 속도 대폭 개선.`,
	},
	misumiMaintenance: {
		name: '한국미스미',
		projectName: '데이터 기반 UI/UX 개선 및 운영',
		durationStart: '2023-04',
		durationEnd: '2024-04',
		skillKeywords: 'RxJS,Twig,JavaScript,jQuery,PHP',
		development: `전환율 최적화(CRO) 달성: GA4 히트맵 및 유저 세션 분석을 통해 결제 및 장바구니 페이지 내 주요 이탈 구간을 식별. CTA 버튼 배치 최적화 및 정보 구조 개편을 통해 구매 전환율 12% 상승 달성.<br />
									데이터 드리븐 인프라 구축: GTM 및 dataLayer 표준 규격을 설계하여 유저의 핵심 행동 궤적(PV, 검색, 스크롤 인터랙션, 주문) 트래킹 체계 마련. 사내 데이터 기반 의사결정의 기반 제공.<br />
									외부 추천 솔루션 API 연동: 페이지별 개인화 상품 추천 배너 구현. 도입 전/후 데이터 비교로 재방문율 15% 증가, 구매 전환율 약 8% 상승 확인`,
	},
	naedam: {
		name: '내담씨앤씨',
		projectName: '사내 홈페이지 리뉴얼',
		durationStart: '2022-12',
		durationEnd: '2023-04',
		skillKeywords: 'Java,Spring Boot,JavaScript,jQuery,MariaDB',
		development: `Java + Spring Boot 기반 사내 홈페이지 전면 리뉴얼. UI/UX 플로우 기획, 반응형 UI 구현, 쿠기 기반 다국어 기능(국/영), 관리자 시스템 개발`,
	},
	hanwha: {
		name: '한화생명',
		projectName: '코어 시스템 구축 프로젝트',
		durationStart: '2022-05',
		durationEnd: '2022-12',
		skillKeywords: 'Java,JavaScript,jQuery,KendoUI,Oracle',
		development: `생명보험 손해보험 수수료 확인 계산 업무 화면 설계 및 구현 보험 정책 변경에 따른 유지보수 주도`,
	},
} as const;
