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
import { formatNumber } from '../../utils/formatters.js';
import styles from './ChartWrapper.module.css';

/**
 * 카테고리별 판매량 세로 막대 차트
 *
 * @param {object} props
 * @param {Array<{ category: string, salesCount: number }>} props.data
 */
const CategoryBarChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="category"
            tick={{ fill: CHART_COLORS.text, fontSize: 11 }}
          />
          <YAxis tick={{ fill: CHART_COLORS.text, fontSize: 12 }} />
          <Tooltip
            formatter={(value) => [`${formatNumber(Number(value))}건`, '판매량']}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar
            dataKey="salesCount"
            name="판매 수량(건)"
            fill={CHART_COLORS.primary}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryBarChart;
