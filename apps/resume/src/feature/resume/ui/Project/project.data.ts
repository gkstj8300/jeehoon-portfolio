export const project = {
	title: '프로젝트',
	sems: {
		name: '삼성물산',
		projectName: '연돌 상태 모니터링 시스템 (SEMS)',
		durationStart: '2026-02',
		durationEnd: '진행중',
		skillKeywords: 'React,TypeScript,Vite,TailwindCSS,Zustand,TanStack Query,ECharts,i18next,WebSocket',
		development: `삼성물산 R4 타워(42개 층)의 연돌효과 층간 압력차를 IoT 센서 + 기상청 API 데이터 기반으로 실시간 모니터링·이상 감지하는 건물 관제 플랫폼<br />
									TanStack Query(서버 상태)와 Zustand(클라이언트 상태) 분리 설계, WebSocket 기반 실시간 데이터 수신 처리<br />
									ECharts 기반 42개 층 압력 프로파일 시각화 및 데이터 샘플링·인스턴스 재사용으로 렌더링 최적화<br />
									Figma 디자인 토큰 기반 UI 컴포넌트 설계 및 6개 영역 실시간 대시보드 개발<br />
									CSV → JSON 자동 변환 다국어 시스템, MSW 기반 Mock/Server 모드 분리로 독립 개발 환경 구축<br />
									Claude Code + Figma MCP 연동으로 디자인 → 코드 전환 자동화, AI 생성 코드의 ECharts 메모리 누수 식별 및 dispose 로직 직접 설계·해결`,
	},
	jhHomepage: {
		name: 'JH Solution',
		projectName: '기업 홈페이지 리뉴얼',
		durationStart: '2026-01',
		durationEnd: '2026-02',
		skillKeywords: 'Gatsby,React,CSS Modules,GraphQL,AWS S3,CloudFront,GitHub Actions,Docker',
		development: `Markdown frontmatter 기반 동적 페이지 생성 — 콘텐츠 추가 시 코드 변경 없이 페이지 자동 생성<br />
									GitHub Actions 기반 dev/prod 이중 배포 파이프라인 및 CloudFront 캐시 무효화 자동화<br />
									Google Forms 연동 서버리스 Contact API — 별도 백엔드 없이 문의 플로우 완결<br />
									Claude Code + Figma MCP 연동으로 디자인 시안을 코드로 직접 연결, 컴포넌트 마크업·스타일 초안 생성 자동화`,
	},
	misumiRenewal: {
		name: '한국미스미',
		projectName: '커머스 플랫폼 React/Next.js 마이그레이션',
		durationStart: '2024-04',
		durationEnd: '2025-03',
		skillKeywords: 'React,TypeScript,Next.js,Redux,Sass,Styled-components',
		development: `RxJS, Twig 기반 10년 된 레거시 플랫폼(월 약 40만 UV)을 React, TypeScript, Next.js로 전환. 운영 중단 없이 페이지 단위 점진적 마이그레이션으로 안정적 전환 완료<br />
									Lighthouse·web-vitals 기반 성능 분석 후 Lazy Load와 S3+CloudFront CDN을 적용하여 LCP 3.5초 → 1.4초(60% 단축), GA4 기준 이탈률 42% → 27%(15%p 감소) 달성<br />
									@next/bundle-analyzer로 디바이스별 불필요 번들을 확인 후 PC/Mobile 분리 타겟 빌드 구조 설계. 모바일 번들 사이즈 절감 및 독립 유지보수 체계 확보<br />
									상품 비교 기능 및 전용 비교 페이지 신규 개발. 상세 페이지 유입률 27% 증가, 구매 전환율 12% 상승 견인<br />
									공통 UI 컴포넌트(Button, Checkbox, Modal 등) Props 인터페이스 기반 설계·개발로 신규 페이지 개발 리드타임 평균 30% 단축`,
	},
	misumiMaintenance: {
		name: '한국미스미',
		projectName: '데이터 기반 UI/UX 개선 및 운영',
		durationStart: '2023-04',
		durationEnd: '2024-04',
		skillKeywords: 'RxJS,Twig,JavaScript,jQuery,PHP',
		development: `GA4 이벤트 택소노미 설계 및 dataLayer 기반 주요 이벤트(PV, 장바구니, 주문, 검색 등) 트래킹 구현. GA4 Explore를 통해 마케팅·기획팀이 직접 데이터를 조회할 수 있는 의사결정 체계 구축<br />
									Click Heatmap, Scroll Depth 분석에서 CTA 가시성 부족과 콘텐츠 이탈 구간 발견. CTA 위치 조정 및 콘텐츠 구조 개편을 반영한 UI 리뉴얼로 체류시간 평균 18% 증가, 이탈률 약 11% 감소<br />
									외부 추천 솔루션 API 연동을 통한 페이지별 개인화 상품 추천 배너 구현. 도입 전/후 데이터 비교로 재방문율 15% 증가, 구매 전환율 약 8% 상승 확인`,
	},
	naedam: {
		name: '내담씨앤씨',
		projectName: '사내 홈페이지 리뉴얼',
		durationStart: '2022-12',
		durationEnd: '2023-04',
		skillKeywords: 'Java,Spring Boot,JavaScript,jQuery,MariaDB',
		development: `Java + Spring Boot 기반 사내 홈페이지 전면 리뉴얼<br />
									UI/UX 플로우 기획, 반응형 UI, 쿠키 기반 다국어 전환(국/영) 기능 개발`,
	},
	hanwha: {
		name: '한화생명',
		projectName: '코어 시스템 구축 프로젝트',
		durationStart: '2022-05',
		durationEnd: '2022-12',
		skillKeywords: 'Java,JavaScript,Oracle,KendoUI',
		development: `Kendo UI 기반 수수료 확인/계산 업무 화면 설계 및 구현<br />
									보험 정책 변경에 따른 프론트엔드 로직 유지보수 주도`,
	},
} as const;
