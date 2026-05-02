# Calendar Starter Kit

캘린더가 포함된 웹페이지를 빠르게 시작하기 위한 Next.js 16 starter. 월/주/일 이벤트 뷰와
예약 슬롯 폼이 기본 탑재되어 있다.

## 스택

| 영역 | 사용 |
|---|---|
| 프레임워크 | Next.js 16 (App Router) + React 19 + TypeScript |
| 스타일 | Tailwind CSS v4, shadcn/ui (base-ui 기반) |
| 캘린더 | [Schedule-X](https://schedule-x.dev) (월/주/일/아젠다 뷰), react-day-picker (날짜 선택기) |
| 폼 | react-hook-form + zod |
| 상태/데이터 | Zustand, TanStack Query v5 |
| 날짜 | date-fns v4 + date-fns-tz |
| 다크모드 | next-themes |
| 린트/포맷 | Biome 2 |

## 페이지

| 경로 | 설명 |
|---|---|
| `/` | Schedule-X 일정 캘린더 데모 (월/주/일/아젠다 뷰 전환) |
| `/booking` | react-day-picker + 30분 슬롯 + 다이얼로그 예약 폼 |

## 스크립트

```bash
pnpm dev        # 개발 서버
pnpm build      # 프로덕션 빌드
pnpm typecheck  # tsc --noEmit
pnpm check      # biome 포맷 + 린트 자동 수정
pnpm lint       # biome 린트만
pnpm format     # biome 포맷만
```

## 디렉토리

```
app/
  layout.tsx         # Providers + SiteHeader
  page.tsx           # Schedule-X 캘린더 데모
  booking/page.tsx   # 예약 슬롯 데모
components/
  calendar/
    event-calendar.tsx   # Schedule-X 클라이언트 래퍼
    booking-slots.tsx    # 예약 폼 (RHF + zod)
  ui/                    # shadcn/ui 컴포넌트
  providers.tsx          # Theme + QueryClient
  site-header.tsx
  theme-provider.tsx
  theme-toggle.tsx
hooks/
  use-calendar-store.ts  # Zustand 뷰/날짜 상태
lib/
  date.ts                # 타임존·슬롯 헬퍼
  query-client.ts
  schemas/booking.ts     # zod 스키마
  utils.ts               # cn()
```

## 새 캘린더 화면 추가하기

1. `app/<route>/page.tsx`에서 `EventCalendar`를 임포트해 이벤트 배열을 넘기면 끝.
2. 이벤트는 외부 API에서 받아오는 경우 TanStack Query로 페치하고 클라이언트 컴포넌트에서 전달.
3. 날짜·시간은 `lib/date.ts` 헬퍼(`formatTz`, `zonedToUtc`, `buildSlots`)로 일관되게 처리한다.

## 의도적으로 제외된 항목

- 인증, DB, ORM (프로젝트별 결정 사항)
- 국제화 라이브러리 (한국어 단일 가정, 필요 시 `next-intl` 추가)
- 분석/모니터링 (배포 단계 결정)
