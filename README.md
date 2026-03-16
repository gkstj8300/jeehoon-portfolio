# ☄️ baakhan.com: 포트폴리오
각기의 다른 프로젝트들을 baakhan.com 한 도메인에서 통합하여 운영하고 있는 포트폴리오입니다.
Resume(경력 기술서), Blog(테크 블로그), Lab(실험실) 등 각각의 앱을 모노레포로 관리시켜 개별 라우팅되도록 설정하여 개발 및 배포하고 있습니다.

## 🔗 링크
- 🌅 [메인 페이지](https://www.baakhan.com/)
- 💼 [경력 기술서](https://resume.baakhan.com/)
- 📋 [테크 블로그](https://blog.baakhan.com/)
- ⚗️ [실험실](https://lab.baakhan.com/)

## 🌫️ Jeehoon Portfolio
[baakhan.com](https://www.baakhan.com/)은 개발 기록과 인사이트를 담는 **Next.js + TypeScript** 도메인입니다. 모노레포(**Turborepo + pnpm**) 구조로 유지보수성과 확장성을 높였습니다.

<p align="left">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-20232a?logo=react&logoColor=61DAFB">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white">
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white">
  <img alt="Turborepo" src="https://img.shields.io/badge/Turborepo-000?logo=turbo&logoColor=white">
  <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white">
  <img alt="Prettier" src="https://img.shields.io/badge/Prettier-1A2C34?logo=prettier&logoColor=F7BA3E">
  <img alt="MIT" src="https://img.shields.io/badge/License-MIT-green">
</p>

## 🧰 기술 스택
- 프레임워크: Next.js (React 18)
- 언어: TypeScript
- 스타일링: Sass, Stylelint
- 블로그 마크다운: gray-matter(+ remark/rehype)
- 빌드: Turborepo, pnpm
- 배포: Vercel
- 옵션: AWS S3

## 📂 프로젝트 구조
```
jeehoon-portfolio/
├── apps
│   ├── home        # 메인 페이지
│   ├── blog        # 테크 블로그
│   ├── resume      # 경력 기술서
│   └── lab         # 실험실
└── packages
    ├── ui          # 공통 UI 컴포넌트
    ├── theme       # dark, light theme 관리
    ├── hooks       # 공통 hook 함수
    └── utils       # 공통 utils 함수
```

## 🏗️ 엔지니어링 기록

### 성능 최적화
- **정적 사이트 생성(SSG)**: 블로그 게시글과 실험실 데모 페이지를 빌드 타임에 사전 렌더링하여 TTFB를 최소화합니다. (`generateStaticParams`)
- **컴포넌트 Memoization**: `useCallback`, `useMemo`를 활용해 불필요한 리렌더링을 방지하고, Canvas 기반 데모(Interactive Particles)에서 `requestAnimationFrame` 루프를 통해 60fps를 유지합니다.
- **스크롤 애니메이션 최적화**: `IntersectionObserver` 기반 `Reveal` 컴포넌트로 뷰포트 진입 시에만 애니메이션을 실행하여 메인 스레드 부하를 줄입니다.
- **접근성 대응**: `prefers-reduced-motion` 미디어 쿼리로 모션 민감 사용자에게 애니메이션을 비활성화합니다.

### 에러 핸들링 전략
- **ErrorBoundary 계층화**: 각 앱 레이아웃에 `ErrorBoundary`를 배치하여 하위 컴포넌트 오류가 전체 페이지를 다운시키지 않도록 격리합니다. `fallbackRender`, `FallbackComponent`, `fallback` 세 가지 폴백 패턴을 지원합니다.
- **동적 라우트 Not Found 처리**: 존재하지 않는 slug 접근 시 `notFound()`를 호출해 Next.js 404 페이지로 우아하게 전환합니다.
- **GA 이벤트 안전 처리**: `window.dataLayer` 초기화 가드와 `clearVariables()`를 통해 이전 페이지 데이터가 오염되지 않도록 방어합니다.

### 디자인 시스템 구축
- **공유 패키지 아키텍처**: `@jeehoon/ui`(공통 컴포넌트), `@jeehoon/theme`(디자인 토큰), `@jeehoon/hooks`(공통 훅), `@jeehoon/utils`(유틸리티)로 분리하여 4개 앱에서 일관된 UI를 제공합니다.
- **CSS 변수 기반 테마 시스템**: `html[data-theme]` 셀렉터와 CSS Custom Properties로 다크/라이트 모드를 전환합니다. 쿠키 기반 서버사이드 초기화 + 클라이언트 토글로 FOUC(Flash of Unstyled Content)를 방지합니다.
- **SCSS Modules**: 컴포넌트 스코프 스타일링으로 클래스 충돌을 원천 차단하고, 디자인 토큰(`--foreground`, `--sub-background-color` 등)을 일관되게 참조합니다.

## 🛠️ 시작하기

### 1) 의존성 설치
```sh
pnpm install
```
### 2) 개발 서버
```sh
pnpm run dev
# 프로젝트 설정에 따라 포트가 다를 수 있습니다
```
### 3) 빌드
```sh
pnpm build
```

## ✒️ 커밋 메세지 컨벤션
```
- feat (feature)
- fix (bug fix)
- docs (documentation)
- style (formatting, missing semi colons, …)
- refactor
- test (when adding missing tests)
- chore (maintain)
```

## ✍️ Blog 글쓰기 Frontmatter
```
---
title: "Next.js i18n 정리"
regDate: "2025-09-10"
description: "react-i18next로 다국어 블로그 구축기"
thumbnailImage: 'i18n.webp'
mainTag: 'i18n'
tags: ["nextjs", "i18n", "blog"]
---
```
