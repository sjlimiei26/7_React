/**
 * 브레이크포인트별(lg, md, sm) 대시보드 카드 기본 배치 및 최소/최대 크기 설정
 * AGENTS.md 7번 사양:
 * - 카드 id와 레이아웃 항목의 i를 동일하게 맞춥니다.
 * - 모든 카드에 minW, minH, maxW, maxH를 지정해 차트가 찌그러지거나 텍스트가 잘리지 않게 보호합니다.
 * - 컬럼 수: lg(12열), md(6열), sm(1열)
 */

// 저장된 레이아웃이 유효한지 검증할 때 기준이 되는 전체 카드 ID 목록입니다.
export const DASHBOARD_CARD_IDS = [
  'kpi-revenue',
  'kpi-visitors',
  'kpi-conversion',
  'kpi-orders',
  'chart-line-revenue',
  'chart-area-visitors',
  'chart-bar-category',
  'chart-stacked-channel',
  'chart-donut-traffic',
  'chart-radar-satisfaction',
  'chart-scatter-adspend',
  'chart-composed-conversion',
  'table-recent-orders',
];

const lgLayout = [
  // 1행: KPI 카드 4개 (3컬럼씩 총 12컬럼)
  { i: 'kpi-revenue', x: 0, y: 0, w: 3, h: 3, minW: 2, minH: 3, maxW: 6, maxH: 5 },
  { i: 'kpi-visitors', x: 3, y: 0, w: 3, h: 3, minW: 2, minH: 3, maxW: 6, maxH: 5 },
  { i: 'kpi-conversion', x: 6, y: 0, w: 3, h: 3, minW: 2, minH: 3, maxW: 6, maxH: 5 },
  { i: 'kpi-orders', x: 9, y: 0, w: 3, h: 3, minW: 2, minH: 3, maxW: 6, maxH: 5 },

  // 2행: 라인 차트(6) + 영역 차트(6)
  { i: 'chart-line-revenue', x: 0, y: 3, w: 6, h: 6, minW: 4, minH: 5, maxW: 12, maxH: 10 },
  { i: 'chart-area-visitors', x: 6, y: 3, w: 6, h: 6, minW: 4, minH: 5, maxW: 12, maxH: 10 },

  // 3행: 막대 차트(4) + 누적 막대 차트(4) + 도넛 차트(4)
  { i: 'chart-bar-category', x: 0, y: 9, w: 4, h: 6, minW: 3, minH: 5, maxW: 12, maxH: 10 },
  { i: 'chart-stacked-channel', x: 4, y: 9, w: 4, h: 6, minW: 3, minH: 5, maxW: 12, maxH: 10 },
  { i: 'chart-donut-traffic', x: 8, y: 9, w: 4, h: 6, minW: 3, minH: 5, maxW: 12, maxH: 10 },

  // 4행: 레이더 차트(4) + 산점도(4) + 복합 차트(4)
  { i: 'chart-radar-satisfaction', x: 0, y: 15, w: 4, h: 6, minW: 3, minH: 5, maxW: 12, maxH: 10 },
  { i: 'chart-scatter-adspend', x: 4, y: 15, w: 4, h: 6, minW: 3, minH: 5, maxW: 12, maxH: 10 },
  { i: 'chart-composed-conversion', x: 8, y: 15, w: 4, h: 6, minW: 4, minH: 5, maxW: 12, maxH: 10 },

  // 5행: 최근 주문 테이블 (12컬럼 전체)
  { i: 'table-recent-orders', x: 0, y: 21, w: 12, h: 7, minW: 6, minH: 5, maxW: 12, maxH: 12 },
];

const mdLayout = [
  // 태블릿(6컬럼): KPI 카드 2열 배치 (3컬럼씩)
  { i: 'kpi-revenue', x: 0, y: 0, w: 3, h: 3, minW: 2, minH: 3, maxW: 6, maxH: 5 },
  { i: 'kpi-visitors', x: 3, y: 0, w: 3, h: 3, minW: 2, minH: 3, maxW: 6, maxH: 5 },
  { i: 'kpi-conversion', x: 0, y: 3, w: 3, h: 3, minW: 2, minH: 3, maxW: 6, maxH: 5 },
  { i: 'kpi-orders', x: 3, y: 3, w: 3, h: 3, minW: 2, minH: 3, maxW: 6, maxH: 5 },

  // 주요 차트들
  { i: 'chart-line-revenue', x: 0, y: 6, w: 6, h: 6, minW: 3, minH: 5, maxW: 6, maxH: 10 },
  { i: 'chart-area-visitors', x: 0, y: 12, w: 6, h: 6, minW: 3, minH: 5, maxW: 6, maxH: 10 },
  { i: 'chart-bar-category', x: 0, y: 18, w: 3, h: 6, minW: 3, minH: 5, maxW: 6, maxH: 10 },
  { i: 'chart-stacked-channel', x: 3, y: 18, w: 3, h: 6, minW: 3, minH: 5, maxW: 6, maxH: 10 },
  { i: 'chart-donut-traffic', x: 0, y: 24, w: 3, h: 6, minW: 3, minH: 5, maxW: 6, maxH: 10 },
  { i: 'chart-radar-satisfaction', x: 3, y: 24, w: 3, h: 6, minW: 3, minH: 5, maxW: 6, maxH: 10 },
  { i: 'chart-scatter-adspend', x: 0, y: 30, w: 3, h: 6, minW: 3, minH: 5, maxW: 6, maxH: 10 },
  { i: 'chart-composed-conversion', x: 3, y: 30, w: 3, h: 6, minW: 3, minH: 5, maxW: 6, maxH: 10 },
  { i: 'table-recent-orders', x: 0, y: 36, w: 6, h: 7, minW: 4, minH: 5, maxW: 6, maxH: 12 },
];

const smLayout = [
  // 모바일(1컬럼): 한 열로 위에서 아래로 쌓이게 배치
  { i: 'kpi-revenue', x: 0, y: 0, w: 1, h: 3, minW: 1, minH: 3, maxW: 1, maxH: 4 },
  { i: 'kpi-visitors', x: 0, y: 3, w: 1, h: 3, minW: 1, minH: 3, maxW: 1, maxH: 4 },
  { i: 'kpi-conversion', x: 0, y: 6, w: 1, h: 3, minW: 1, minH: 3, maxW: 1, maxH: 4 },
  { i: 'kpi-orders', x: 0, y: 9, w: 1, h: 3, minW: 1, minH: 3, maxW: 1, maxH: 4 },
  { i: 'chart-line-revenue', x: 0, y: 12, w: 1, h: 6, minW: 1, minH: 5, maxW: 1, maxH: 9 },
  { i: 'chart-area-visitors', x: 0, y: 18, w: 1, h: 6, minW: 1, minH: 5, maxW: 1, maxH: 9 },
  { i: 'chart-bar-category', x: 0, y: 24, w: 1, h: 6, minW: 1, minH: 5, maxW: 1, maxH: 9 },
  { i: 'chart-stacked-channel', x: 0, y: 30, w: 1, h: 6, minW: 1, minH: 5, maxW: 1, maxH: 9 },
  { i: 'chart-donut-traffic', x: 0, y: 36, w: 1, h: 6, minW: 1, minH: 5, maxW: 1, maxH: 9 },
  { i: 'chart-radar-satisfaction', x: 0, y: 42, w: 1, h: 6, minW: 1, minH: 5, maxW: 1, maxH: 9 },
  { i: 'chart-scatter-adspend', x: 0, y: 48, w: 1, h: 6, minW: 1, minH: 5, maxW: 1, maxH: 9 },
  { i: 'chart-composed-conversion', x: 0, y: 54, w: 1, h: 6, minW: 1, minH: 5, maxW: 1, maxH: 9 },
  { i: 'table-recent-orders', x: 0, y: 60, w: 1, h: 7, minW: 1, minH: 5, maxW: 1, maxH: 11 },
];

export const defaultLayouts = {
  lg: lgLayout,
  md: mdLayout,
  sm: smLayout,
};

/**
 * 기본 레이아웃 객체가 참조에 의해 오염되지 않도록 깊은 복사본을 생성합니다.
 * @returns {{ lg: Array<object>, md: Array<object>, sm: Array<object> }}
 */
export const cloneDefaultLayouts = () => ({
  lg: lgLayout.map((item) => ({ ...item })),
  md: mdLayout.map((item) => ({ ...item })),
  sm: smLayout.map((item) => ({ ...item })),
});
