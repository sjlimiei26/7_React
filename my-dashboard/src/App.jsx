import { useState, useMemo } from 'react';
import Header from './components/layout/Header.jsx';
import DashboardLayout from './components/layout/DashboardLayout.jsx';
import DashboardGrid from './components/layout/DashboardGrid.jsx';
import WeatherWidget from './components/weather/WeatherWidget.jsx';
import Card from './components/common/Card.jsx';
import KpiCard from './components/common/KpiCard.jsx';

import RevenueLineChart from './components/charts/RevenueLineChart.jsx';
import VisitorsAreaChart from './components/charts/VisitorsAreaChart.jsx';
import CategoryBarChart from './components/charts/CategoryBarChart.jsx';
import ChannelStackedBarChart from './components/charts/ChannelStackedBarChart.jsx';
import TrafficDonutChart from './components/charts/TrafficDonutChart.jsx';
import SatisfactionRadarChart from './components/charts/SatisfactionRadarChart.jsx';
import AdSpendScatterChart from './components/charts/AdSpendScatterChart.jsx';
import RevenueConversionComposedChart from './components/charts/RevenueConversionComposedChart.jsx';
import RecentOrdersTable from './components/charts/RecentOrdersTable.jsx';

import { useLayoutStorage } from './hooks/useLayoutStorage.js';

// AGENTS.md 6번 사양: 더미 데이터 import는 페이지(App)에서만 수행하고 각 차트에는 props로 전달합니다.
import { kpiListData } from './data/kpiData.js';
import { monthlyRevenueData } from './data/monthlyRevenueData.js';
import { dailyVisitorsData } from './data/dailyVisitorsData.js';
import { categorySalesData } from './data/categorySalesData.js';
import { quarterlyChannelData } from './data/quarterlyChannelData.js';
import { trafficSourceData } from './data/trafficSourceData.js';
import { productSatisfactionData } from './data/productSatisfactionData.js';
import { adSpendScatterData } from './data/adSpendScatterData.js';
import { revenueConversionData } from './data/revenueConversionData.js';
import { recentOrdersData } from './data/recentOrdersData.js';

/**
 * 대시보드 메인 페이지 컴포넌트
 *
 * * 학습 포인트 1 (useState를 통한 UI 상태 관리): `isEditMode` 상태를 두어 사용자가 원할 때만
 *   카드 드래그/리사이즈를 켜거나 잠글 수 있게 제어합니다.
 * * 학습 포인트 2 (단방향 데이터 흐름): 모든 정적 더미 데이터는 최상위 페이지인 `App`에서 불러와
 *   하위 차트와 테이블 컴포넌트에 `props`로 내려줍니다.
 */
function App() {
  const [isEditMode, setIsEditMode] = useState(true);
  const { layouts, onLayoutsChange, resetLayouts } = useLayoutStorage();

  const dashboardItems = useMemo(() => {
    const kpiItems = kpiListData.map((kpi) => ({
      id: kpi.id,
      content: (
        <KpiCard
          title={kpi.title}
          description={kpi.description}
          value={kpi.value}
          changeRate={kpi.changeRate}
          comparisonText={kpi.comparisonText}
          isEditable={isEditMode}
        />
      ),
    }));

    const chartAndTableItems = [
      {
        id: 'chart-line-revenue',
        content: (
          <Card
            title="최근 12개월 매출 추이"
            description="올해 실제 매출과 목표 매출 비교 (단위: 만원)"
            isEditable={isEditMode}
          >
            <RevenueLineChart data={monthlyRevenueData} />
          </Card>
        ),
      },
      {
        id: 'chart-area-visitors',
        content: (
          <Card
            title="일별 방문자 수 (30일)"
            description="최근 30일간 일별 순 방문자(UV) 추이"
            isEditable={isEditMode}
          >
            <VisitorsAreaChart data={dailyVisitorsData} />
          </Card>
        ),
      },
      {
        id: 'chart-bar-category',
        content: (
          <Card
            title="카테고리별 판매량"
            description="주요 제품 카테고리별 누적 판매 건수"
            isEditable={isEditMode}
          >
            <CategoryBarChart data={categorySalesData} />
          </Card>
        ),
      },
      {
        id: 'chart-stacked-channel',
        content: (
          <Card
            title="분기별 채널 매출"
            description="모바일, PC 온라인, 오프라인 매장 누적 매출"
            isEditable={isEditMode}
          >
            <ChannelStackedBarChart data={quarterlyChannelData} />
          </Card>
        ),
      },
      {
        id: 'chart-donut-traffic',
        content: (
          <Card
            title="방문자 유입 경로 비율"
            description="채널별 유입 비중 (%)"
            isEditable={isEditMode}
          >
            <TrafficDonutChart data={trafficSourceData} />
          </Card>
        ),
      },
      {
        id: 'chart-radar-satisfaction',
        content: (
          <Card
            title="제품별 만족도 항목 비교"
            description="프로 모델 vs 스탠다드 모델 6대 항목 평가"
            isEditable={isEditMode}
          >
            <SatisfactionRadarChart data={productSatisfactionData} />
          </Card>
        ),
      },
      {
        id: 'chart-scatter-adspend',
        content: (
          <Card
            title="광고비 대비 매출"
            description="마케팅 캠페인별 광고 집행비와 매출 분포"
            isEditable={isEditMode}
          >
            <AdSpendScatterChart data={adSpendScatterData} />
          </Card>
        ),
      },
      {
        id: 'chart-composed-conversion',
        content: (
          <Card
            title="월간 매출 및 구매 전환율"
            description="매출(막대, 좌측 축)과 전환율(라인, 우측 축) 복합 비교"
            isEditable={isEditMode}
          >
            <RevenueConversionComposedChart data={revenueConversionData} />
          </Card>
        ),
      },
      {
        id: 'table-recent-orders',
        content: (
          <Card
            title="최근 주문 목록"
            description="최근 접수된 주문 8건의 결제 및 배송 상태"
            isEditable={isEditMode}
          >
            <RecentOrdersTable orders={recentOrdersData} />
          </Card>
        ),
      },
    ];

    return [...kpiItems, ...chartAndTableItems];
  }, [isEditMode]);

  return (
    <DashboardLayout
      isEditMode={isEditMode}
      header={
        <Header
          isEditMode={isEditMode}
          onToggleEditMode={() => setIsEditMode((prev) => !prev)}
          onResetLayout={resetLayouts}
          weatherWidget={<WeatherWidget />}
        />
      }
    >
      <DashboardGrid
        layouts={layouts}
        onLayoutsChange={onLayoutsChange}
        isEditMode={isEditMode}
        items={dashboardItems}
      />
    </DashboardLayout>
  );
}

export default App;
