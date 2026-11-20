/**
 * 대시보드 전역 상수 및 차트 색상 팔레트
 * 매직 넘버와 매직 문자열이 여러 파일에 흩어지지 않도록 한 곳에서 관리합니다.
 */

// 사용자가 변경한 카드 배치와 크기를 localStorage에 저장할 때 사용하는 버전 포함 키입니다.
export const LAYOUT_STORAGE_KEY = 'dashboard-layout-v1';

// 날씨 데이터를 주기적으로 새로고침할 간격 (10분 = 600,000ms)
export const WEATHER_REFRESH_INTERVAL_MS = 10 * 60 * 1000;

// Recharts 컴포넌트에 전달할 공용 색상 팔레트입니다. (tokens.css의 색상과 일치)
export const CHART_COLORS = {
  primary: '#2563eb',
  secondary: '#0d9488',
  accent: '#f59e0b',
  purple: '#8b5cf6',
  pink: '#ec4899',
  slate: '#64748b',
  grid: '#e2e8f0',
  text: '#475569',
};

// 도넛 차트 등 여러 항목을 순서대로 칠할 때 사용하는 색상 배열입니다.
export const CHART_PALETTE = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  CHART_COLORS.accent,
  CHART_COLORS.purple,
  CHART_COLORS.pink,
  CHART_COLORS.slate,
];

// 반응형 그리드 브레이크포인트 및 컬럼 수 설정 (AGENTS.md 6번 사양)
export const GRID_BREAKPOINTS = {
  lg: 1200,
  md: 768,
  sm: 0,
};

export const GRID_COLS = {
  lg: 12,
  md: 6,
  sm: 1,
};

export const GRID_ROW_HEIGHT = 44;
export const GRID_MARGIN = [16, 16];
