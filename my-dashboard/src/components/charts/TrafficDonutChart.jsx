import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { CHART_PALETTE } from '../../constants/theme.js';
import { formatPercent } from '../../utils/formatters.js';
import styles from './ChartWrapper.module.css';

/**
 * 유입 경로 비율 도넛 차트 (PieChart의 innerRadius를 설정해 도넛 형태로 표현)
 *
 * @param {object} props
 * @param {Array<{ source: string, ratio: number }>} props.data
 */
const TrafficDonutChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="ratio"
            nameKey="source"
            cx="50%"
            cy="48%"
            innerRadius="48%"
            outerRadius="76%"
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.source}
                fill={CHART_PALETTE[index % CHART_PALETTE.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [formatPercent(Number(value)), name]}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficDonutChart;
