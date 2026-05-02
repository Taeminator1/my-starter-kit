---
description: 새 예약 슬롯 라우트 (app/<route>/page.tsx) 스캐폴드
argument-hint: <route>
---

새 예약 슬롯 라우트를 만들어주세요. 라우트 이름: `$ARGUMENTS`

## 작업 순서

1. **인자 검증** — `$ARGUMENTS`가 비어있거나 공백/슬래시/특수문자가 들어있으면 사용자에게 다시 물어보고 멈추세요. 영문 소문자, 숫자, `-`만 허용합니다.

2. **충돌 확인** — `app/<route>/page.tsx`가 이미 존재하면 덮어쓰지 말고 사용자에게 알린 뒤 멈추세요.

3. **파일 생성** — `app/<route>/page.tsx`를 `app/booking/page.tsx`와 동일한 패턴으로 작성하세요:
   - 서버 컴포넌트
   - `BookingSlots`를 `@/components/calendar/booking-slots`에서 임포트
   - 단일 `<BookingSlots />` 렌더
   - 함수 이름은 `<Route>Page` (예: `sales` → `SalesPage`)
   - 제목·설명은 라우트 이름을 반영해 한국어로 자연스럽게

   참고 원본: `app/booking/page.tsx`

4. **슬롯 시간/간격 커스터마이즈가 필요하다면** — 사용자에게 묻기 전에 우선 기본값(09–18, 30분)으로 만들고, 마지막에 "슬롯 시간대를 바꾸려면 `BookingSlots` 컴포넌트의 `buildSlots` 호출 인자를 조정하세요" 정도로 한 줄 안내.

5. **컴파일 검증** — `pnpm typecheck`을 실행해 통과 확인.

6. **결과 리포트** — 생성된 파일 경로와 접근 URL(`http://localhost:3000/<route>`)을 한 줄로 안내.
