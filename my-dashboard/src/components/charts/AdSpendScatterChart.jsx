import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
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
 * 광고비 대비 매출 상관관계 산점도(Scatter) 차트
 *
 * @param {object} props
 * @param {Array<{ campaign: string, adSpend: number, revenue: number }>} props.data
 */
const AdSpendScatterChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 16, left: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            type="number"
            dataKey="adSpend"
            name="집행 광고비"
            unit="만원"
            tick={{ fill: CHART_COLORS.text, fontSize: 11 }}
          />
          <YAxis
            type="number"
            dataKey="revenue"
            name="발생 매출"
            unit="만원"
            tick={{ fill: CHART_COLORS.text, fontSize: 11 }}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value, name) => [formatManwon(Number(value)), name]}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Scatter
            name="캠페인 성과 (광고비 vs 매출)"
            data={data}
            fill={CHART_COLORS.pink}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdSpendScatterChart;
