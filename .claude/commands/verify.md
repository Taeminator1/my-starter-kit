---
description: typecheck + biome + build + SSR 런타임 검증 일괄 실행
---

프로젝트 품질 게이트를 일괄 실행해주세요. 각 단계가 실패하면 그 단계의 출력을 그대로 보여주고 즉시 멈춥니다.

## 단계

### 1. TypeScript 타입 체크
```bash
pnpm typecheck
```

### 2. Biome lint + format
```bash
pnpm check
```
`pnpm check`는 `biome check --write .`를 실행해 자동 수정까지 합니다. 수정된 파일이 있으면 `git status`로 확인 후 사용자에게 알리세요.

### 3. 프로덕션 빌드
```bash
pnpm build
```

### 4. SSR 런타임 검증
이 단계가 핵심입니다. typecheck/build는 통과하지만 클라이언트에서 `Temporal is not defined` 같은 런타임 크래시가 나는 케이스를 잡습니다.

a. **포트 정리**: `lsof -ti:3000`으로 기존 프로세스 확인. 있으면 사용자에게 종료 의사를 물어봅니다 (다른 dev 서버일 수 있음).

b. **dev 서버 백그라운드 기동**:
```bash
pnpm dev > /tmp/verify-dev.log 2>&1
```
`run_in_background: true`로 실행. 그 후 `until curl -sf http://localhost:3000/ -o /dev/null; do sleep 1; done`로 준비 대기.

c. **두 페이지 검증**:
- `curl -sf http://localhost:3000/ -o /tmp/verify-home.html -w "%{http_code}"` → 200 확인 + HTML에 `sx-react-calendar-wrapper` 포함 확인
- `curl -sf http://localhost:3000/booking -o /tmp/verify-booking.html -w "%{http_code}"` → 200 확인 + HTML에 `예약 슬롯` 포함 확인

d. **dev 로그 검사**: `.next/dev/logs/next-development.log`의 끝 30줄에서 `ERROR` / `ReferenceError` / `TypeError` 패턴 검색. 발견되면 실패로 간주하고 해당 줄 보여주기.

e. **dev 서버 종료**: `kill $(lsof -ti:3000)` 후 포트가 비었는지 확인.

### 5. 최종 리포트

성공한 경우 한 줄 요약:
> ✅ typecheck · biome · build · SSR 런타임 모두 통과

실패한 경우 어느 단계에서, 어떤 출력으로 실패했는지 명시.

## 주의

- `pnpm check`가 파일을 자동 수정해도 그건 정상 동작입니다 (포맷·임포트 정렬 등). 다만 변경된 파일이 있으면 사용자에게 알려서 커밋 여부를 결정하게 하세요.
- dev 서버는 반드시 종료까지 책임지세요. 백그라운드에 남기면 다음 `pnpm dev` 실행 시 포트 충돌이 납니다.
