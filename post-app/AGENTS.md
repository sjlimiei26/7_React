# AGENTS.md

# post-app

이 파일은 이 저장소에서 일하는 AI 코딩 에이전트(Claude Code, Codex, Cursor 등)를 위한 온보딩 문서다. 작업 전에 반드시 읽는다.

## 프로젝트 개요

게시글을 관리하기 위한 프론트엔드 전용 웹앱 (axios 연습)

- 범위 밖: 로그인
- 상세 사양은 `docs/prd/`를 기준으로 한다. (없으면 만들기 전에 사용자에게 묻는다)

## 명령어

패키지 매니저는 **npm**만 사용한다. (yarn 사용 금지) <!-- TODO: yarn을 사용할 경우 바꿀 것 -->

```bash
npm install    # 의존성 설치
npm run dev    # 개발 서버 (http://localhost:5173)
npm build      # 프로덕션 빌드
npm lint       # ESLint 검사
```

## 기술 스택

Vite + React (JavaScript, JSX) + styled-components. 경로 별칭 `@/*` → `src/*`.

## 규칙
- 사용자에게 보이는 텍스트는 **한글**로 쓴다.
- 컴포넌트 파일 확장자는 `.jsx`, 일반 유틸/로직은 `.js`를 사용한다.
- 스타일은 `styled-components`를 사용하며, 인라인 스타일(`style={{...}}`)은 지양한다.
- 이미지는 표준 `<img>` 태그를 사용하며, 접근성을 위해 `alt` 속성을 반드시 작성한다.
- 새 로직(함수)을 만들면 같은 폴더에 `*.test.js` 테스트를 함께 작성한다.
- 요청받지 않은 외부 라이브러리를 임의로 설치하지 않는다. 필요하면 먼저 제안하고 묻는다.

## 작업 완료 조건

작업을 "끝났다"고 말하기 전에 아래를 실행하고, 모두 통과한 결과를 보여준다.

```bash
npm run lint && npm test && npm run build
```

## 하지 말 것

- `.env*` 파일 내용 출력·커밋 금지.
- 사용자 확인 없이 `git push`, 브랜치 삭제, 강제 푸시(`git push -f`) 금지.
- 미사용 import나 선언만 하고 쓰지 않는 변수를 방치한 채 커밋하지 않는다.

## 참고 문서 (필요할 때만 읽는다)

- 개발 환경 세팅 절차: `docs/setup/` (01-linter → 02-testing → 03-github → 04-github-actions)
- 기능 사양: `docs/prd/`
