import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { CHART_COLORS } from '../../constants/theme.js';
import { formatNumber } from '../../utils/formatters.js';
import styles from './ChartWrapper.module.css';

/**
 * 최근 30일 일별 방문자 수 영역(Area) 차트
 *
 * @param {object} props
 * @param {Array<{ day: string, visitors: number }>} props.data
 */
const VisitorsAreaChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="day"
            interval={4}
            tick={{ fill: CHART_COLORS.text, fontSize: 11 }}
          />
          <YAxis
            tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
            tickFormatter={(value) => `${formatNumber(value)}`}
          />
          <Tooltip
            formatter={(value) => [`${formatNumber(Number(value))}명`, '일별 방문자']}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Area
            type="monotone"
            dataKey="visitors"
            name="일별 방문자 수"
            stroke={CHART_COLORS.secondary}
            fill={CHART_COLORS.secondary}
            fillOpacity={0.22}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorsAreaChart;
