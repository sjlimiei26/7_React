import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from 'recharts';
import { CHART_COLORS } from '../../constants/theme.js';
import styles from './ChartWrapper.module.css';

/**
 * 주력 제품별 만족도 항목 비교 레이더 차트
 *
 * @param {object} props
 * @param {Array<{ metric: string, standardModel: number, proModel: number }>} props.data
 */
const SatisfactionRadarChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke={CHART_COLORS.grid} />
          <PolarAngleAxis
            dataKey="metric"
            tick={{ fill: CHART_COLORS.text, fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: CHART_COLORS.text, fontSize: 10 }}
          />
          <Tooltip formatter={(value, name) => [`${value}점`, name]} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Radar
            name="프로 모델"
            dataKey="proModel"
            stroke={CHART_COLORS.primary}
            fill={CHART_COLORS.primary}
            fillOpacity={0.28}
          />
          <Radar
            name="스탠다드 모델"
            dataKey="standardModel"
            stroke={CHART_COLORS.purple}
            fill={CHART_COLORS.purple}
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SatisfactionRadarChart;
