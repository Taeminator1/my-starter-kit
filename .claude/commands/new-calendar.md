---
description: 새 캘린더 라우트 (app/<route>/page.tsx) 스캐폴드
argument-hint: <route>
---

새 캘린더 라우트를 만들어주세요. 라우트 이름: `$ARGUMENTS`

## 작업 순서

1. **인자 검증** — `$ARGUMENTS`가 비어있거나 공백/슬래시/특수문자가 들어있으면 사용자에게 다시 물어보고 멈추세요. 영문 소문자, 숫자, `-`만 허용합니다.

2. **충돌 확인** — `app/<route>/page.tsx`가 이미 존재하면 덮어쓰지 말고 사용자에게 알린 뒤 멈추세요.

3. **파일 생성** — `app/<route>/page.tsx`를 `app/page.tsx`와 동일한 패턴으로 작성하세요:
   - 서버 컴포넌트 (no `"use client"`)
   - `EventCalendar`, `CalendarEvent`를 `@/components/calendar/event-calendar`에서 임포트
   - `date-fns`의 `addDays` 사용
   - 이벤트는 반드시 **ISO 문자열**(`Date.toISOString()`)로 넘겨야 합니다 — RSC 직렬화 안전성 때문에 Date 객체로 넘기면 안 됩니다
   - `selectedDate`는 `new Date().toISOString()`
   - 함수 이름은 `<Route>Page` (예: `team` → `TeamPage`)
   - 제목·설명은 라우트 이름을 반영해 한국어로 자연스럽게 (예: `team` → "팀 캘린더"). 사용자가 나중에 직접 수정할 수 있도록 너무 고정적이지 않게 작성

   참고 원본: `app/page.tsx`

4. **컴파일 검증** — `pnpm typecheck`을 실행해 통과 확인. 실패 시 출력 그대로 보여주고 수정 시도.

5. **결과 리포트** — 생성된 파일 경로와 접근 URL(`http://localhost:3000/<route>`)을 한 줄로 안내.
