import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { CHART_COLORS } from '../../constants/theme.js';
import { formatManwon } from '../../utils/formatters.js';
import styles from './ChartWrapper.module.css';

/**
 * 최근 12개월 매출 추이 라인 차트 (실제 매출 vs 목표 매출 2개 시리즈 비교)
 *
 * * 학습 포인트 (props를 통한 데이터 주입): 차트 컴포넌트가 직접 더미 데이터 파일을 import하지 않고
 *   부모 페이지로부터 `data`를 props로 전달받으면, 나중에 실제 서버 데이터로 교체할 때
 *   차트 컴포넌트를 수정하지 않고도 그대로 재사용할 수 있습니다.
 *
 * @param {object} props
 * @param {Array<{ month: string, currentYear: number, targetRevenue: number }>} props.data
 */
const RevenueLineChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 16, left: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="month"
            tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
          />
          <YAxis
            tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}천만`}
          />
          <Tooltip
            formatter={(value, name) => [formatManwon(Number(value)), name]}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line
            type="monotone"
            dataKey="currentYear"
            name="올해 매출"
            stroke={CHART_COLORS.primary}
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="targetRevenue"
            name="목표 매출"
            stroke={CHART_COLORS.secondary}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 2.5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueLineChart;
