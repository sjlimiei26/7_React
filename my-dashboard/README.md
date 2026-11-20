# my-dashboard
 React의 핵심 개념(Props 단방향 데이터 흐름, 커스텀 훅, 비동기 3상태 처리, 반응형 그리드 레이아웃 및 `localStorage` 연동)으로 구성된 대시보드 프로젝트입니다.

---

## 1. 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행 (http://localhost:5173)
npm run dev

# 3. 코드 린트 검사 (ESLint)
npm run lint

# 4. 프로덕션 빌드 확인
npm run build

# 5. 빌드 결과물 미리보기
npm run preview
```

---

## 2. 디렉터리 및 파일 구조

```text
src/
├─ main.jsx
├─ App.jsx
├─ components/
│  ├─ layout/        # Header, DashboardLayout, DashboardGrid (리사이즈/이동 로직)
│  ├─ weather/       # WeatherWidget (현재 날씨 표시)
│  ├─ charts/        # 차트 8종 및 최근 주문 테이블
│  └─ common/        # Card, KpiCard, Skeleton, ErrorMessage
├─ hooks/
│  ├─ useWeather.js        # 날씨 데이터 로딩 및 상태 관리
│  └─ useLayoutStorage.js  # 카드 레이아웃 저장/복원/초기화
├─ api/
│  └─ weather.js     # Open-Meteo API 호출 및 데이터 변환
├─ data/             # 차트별 더미 데이터 및 defaultLayouts.js
├─ constants/        # 공용 상수 (저장 키, 색상 팔레트, 그리드 설정)
├─ utils/            # 순수 함수 (숫자/통화 포맷터, 날씨 코드 매핑)
└─ styles/
   └─ tokens.css     # 색상, 간격, 폰트 등 CSS 변수
```

---

## 3. 학습 포인트

1. **CSS 변수(디자인 토큰) 활용** (`src/styles/tokens.css`)
   - 색상, 간격, 폰트 크기를 `:root` CSS 변수로 정의해 일관된 스타일을 유지하는 방법
2. **관심사 분리 (Separation of Concerns)** (`src/components/common/Card.jsx`)
   - `Card`는 그리드 리사이즈 로직을 직접 알지 못하고, 드래그 핸들(`.card-drag-handle`)과 플렉스 레이아웃만 제공하는 구조
3. **Props 전달과 조건부 스타일링** (`src/components/common/KpiCard.jsx`, `src/components/charts/RevenueLineChart.jsx`)
   - 더미 데이터를 페이지(`App.jsx`)에서만 import하고 하위 컴포넌트에는 `props`로 주입하여 재사용성을 높이는 단방향 데이터 흐름
4. **커스텀 훅과 `useEffect` Cleanup (`AbortController`)** (`src/hooks/useWeather.js`)
   - 컴포넌트 언마운트 시 진행 중인 `fetch` 요청을 `AbortController`로 취소하고 `setInterval` 타이머를 정리하는 이유
5. **비동기 UI의 3가지 상태(로딩 / 에러 / 성공) 조건부 렌더링** (`src/components/weather/WeatherWidget.jsx`)
   - 로딩 중에는 `Skeleton`, 실패 시에는 `ErrorMessage`와 재시도 버튼, 성공 시에는 날씨 데이터를 렌더링하는 패턴
6. **리스트 렌더링과 고유 `key`** (`src/components/charts/RecentOrdersTable.jsx`)
   - 배열 인덱스 대신 고유 식별자(`order.orderId`)를 `key`로 지정해야 하는 이유
7. **방어적 `localStorage` 파싱 및 레이아웃 상태 관리** (`src/hooks/useLayoutStorage.js`)
   - `JSON.parse`를 `try/catch`로 감싸고, 저장된 카드 ID 목록이나 형식이 깨졌을 때 기본 레이아웃(`defaultLayouts`)으로 안전하게 복구하는 방법
8. **반응형 그리드와 모바일 터치 오조작 방지** (`src/components/layout/DashboardGrid.jsx`)
   - 브레이크포인트(`lg: 12열`, `md: 6열`, `sm: 1열`) 전환과 모바일(`sm`)에서의 리사이즈 비활성화 처리

---
