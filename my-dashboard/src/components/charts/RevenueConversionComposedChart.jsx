import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { CHART_COLORS } from '../../constants/theme.js';
import { formatManwon, formatPercent } from '../../utils/formatters.js';
import styles from './ChartWrapper.module.css';

/**
 * 월별 매출(막대, 좌측 Y축)과 구매 전환율(라인, 우측 Y축)을 한 화면에 비교하는 복합 차트
 * 단위가 서로 다른 두 지표(만원 vs %)를 비교하기 위해 yAxisId를 분리합니다.
 *
 * @param {object} props
 * @param {Array<{ month: string, revenue: number, conversionRate: number }>} props.data
 */
const RevenueConversionComposedChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 16, left: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="month"
            tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: CHART_COLORS.text, fontSize: 11 }}
            tickFormatter={(value) => `${value / 1000}천만`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 6]}
            tick={{ fill: CHART_COLORS.text, fontSize: 11 }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            formatter={(value, name) => {
              if (name === '구매 전환율') {
                return [formatPercent(Number(value)), name];
              }
              return [formatManwon(Number(value)), name];
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar
            yAxisId="left"
            dataKey="revenue"
            name="월간 매출"
            fill={CHART_COLORS.primary}
            radius={[6, 6, 0, 0]}
            barSize={26}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="conversionRate"
            name="구매 전환율"
            stroke={CHART_COLORS.accent}
            strokeWidth={2.5}
            dot={{ r: 3.5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueConversionComposedChart;
