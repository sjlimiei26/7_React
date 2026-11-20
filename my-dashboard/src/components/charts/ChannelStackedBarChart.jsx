import {
  ResponsiveContainer,
  BarChart,
  Bar,
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
 * 분기별 채널(온라인/모바일/오프라인) 매출 누적 막대 차트
 * 동일한 `stackId`를 지정해 한 분기의 채널별 매출 비중과 총합을 함께 보여줍니다.
 *
 * @param {object} props
 * @param {Array<{ quarter: string, online: number, mobile: number, offline: number }>} props.data
 */
const ChannelStackedBarChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 16, left: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="quarter"
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
          <Bar
            dataKey="mobile"
            name="모바일 앱"
            stackId="channel"
            fill={CHART_COLORS.primary}
          />
          <Bar
            dataKey="online"
            name="PC 웹(온라인)"
            stackId="channel"
            fill={CHART_COLORS.secondary}
          />
          <Bar
            dataKey="offline"
            name="오프라인 매장"
            stackId="channel"
            fill={CHART_COLORS.accent}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChannelStackedBarChart;
