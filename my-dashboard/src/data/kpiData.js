/**
 * 상단 KPI 카드 4개의 고정 더미 데이터 (AGENTS.md 6번 사양)
 * 렌더링마다 값이 바뀌지 않도록 Math.random()을 쓰지 않고 정적 데이터로 정의합니다.
 */
export const kpiListData = [
  {
    id: 'kpi-revenue',
    title: '이번 달 매출',
    description: '최근 30일 누적 결제액',
    value: '₩148,500,000',
    changeRate: 14.8,
    comparisonText: '전월 대비 +₩19,150,000 증가',
  },
  {
    id: 'kpi-visitors',
    title: '순 방문자 수',
    description: '최근 30일 고유 방문자(UV)',
    value: '84,320명',
    changeRate: 9.4,
    comparisonText: '전월 대비 +7,240명 증가',
  },
  {
    id: 'kpi-conversion',
    title: '구매 전환율',
    description: '방문자 대비 결제 완료 비율',
    value: '3.85%',
    changeRate: -0.4,
    comparisonText: '전월 대비 0.4%p 소폭 하락',
  },
  {
    id: 'kpi-orders',
    title: '총 주문 수',
    description: '최근 30일 결제 완료 건수',
    value: '3,248건',
    changeRate: 11.2,
    comparisonText: '전월 대비 +327건 증가',
  },
];
