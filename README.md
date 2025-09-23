# 프로젝트: 찾아줘!

분실물을 빠르게 찾기 위한 **지도 기반 등록**, **실시간 채팅**, **알림** 기능을 제공하는 커뮤니티 플랫폼입니다.  
누구나 잃어버린 물건을 쉽게 등록하고, 주인을 찾을 수 있게 만드는 것이 목표입니다.

## 주요 기능

- **지도 기반 등록**: 분실물 위치를 지도에 표시해 직관적으로 확인
- **실시간 채팅**: 등록자와 직접 소통하여 빠른 연결
- **실시간 알림**: 새로운 등록/메시지/상태 변화를 즉시 전달

## 팀원

- **Frontend**: 서지권(Lead), 권형준, 이수현
- **Backend**: 김찬호(Lead), 유세정, 채우경

> **바로가기 Wiki 준비중**

## 빠른 시작

```bash
# 저장소 클론
git clone https://github.com/find-my-item/FMI-FE.git

# 디렉토리 이동
cd FMI-FE

# 패키지 설치
npm i

# 개발 서버 실행
npm run dev
# http://localhost:3000 접속
```

## Scripts

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 테스트
npm run test

# 컴포넌트 UI 개발/테스트를 위한 Storybook 실행
npm run storybook
```

## 기술 스택

Next.js • TypeScript • Storybook • Jest • Playwright • zod • zustand • tailwind

> **바로가기 Wiki 준비중**

## 핵심 폴더 구조

```
├── components # 컴포넌트
│   ├── Dropdown
│   │   ├── Dropdown.tsx
│   │   ├── Dropdown.stories.tsx
│   │   └── Dropdown.test.tsx
│   ├── Modal
│   └── index.ts
├── app # 페이지
│   ├── (route)
│   │     ├── list
│   │     ├── write
│   │     └── login
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   └── globals.css
├── hooks # 훅
├── api # API
├── assets # 이미지/SVG/폰트
├── context # 컨텍스트
├── providers # 프로바이더
├── types # 타입
└── utils # 유틸
```

> **바로가기 Wiki 준비중**

## 컨벤션

- **Code Style**: prettier
- **Pre-commit**: husky + lint-staged
- **Commits**: Conventional Commits(scope)
  - feat(auth): 로그인 기능 추가
- **Branch 전략**
  - main: 배포용, 직접 커밋 금지 (PR 머지 전용)
  - develop: 통합 브랜치

> **바로가기 Wiki 준비중**

## CI/CD

- **디자인 토큰 반영**: Figma → Style Dictionary → src/tokens/build/tailwind.config.js → FMI-FE PR 자동 생성
- **Chromatic 반영**: Pull Request Merge → Chromatic 실행(스토리북 UI 리뷰)
- **배포**: develop 머지 → 스테이징(Preview) 배포 / main 머지 → 프로덕션 배포

> **바로가기 링크 준비중**

## 링크

- [위키](https://github.com/find-my-item/FMI-FE/wiki)
- [배포](https://fmi-fe.vercel.app/)
- [Storybook](https://68c99e09f6a97616c494116e-ulrtpjeevc.chromatic.com/?path=/docs/components-dropdown--docs)
