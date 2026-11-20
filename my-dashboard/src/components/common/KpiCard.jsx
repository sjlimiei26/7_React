import Card from './Card.jsx';
import styles from './KpiCard.module.css';

/**
 * 핵심 성과 지표(KPI)를 숫자와 증감률(▲▼)로 보여주는 카드 컴포넌트
 *
 * * 학습 포인트 (props 전달과 조건부 스타일링): 부모 컴포넌트로부터 데이터(title, value, changeRate 등)를
 *   props로 전달받아 화면을 그리며, 증감 방향(isPositive)에 따라 알맞은 스타일 클래스와 기호를 선택합니다.
 *
 * @param {object} props
 * @param {string} props.title - 지표 이름 (예: 총 매출)
 * @param {string} props.description - 지표 기준 설명
 * @param {string} props.value - 포맷팅된 지표 값
 * @param {number} props.changeRate - 전월 대비 증감률 (%)
 * @param {string} props.comparisonText - 비교 기준 텍스트
 * @param {boolean} [props.isEditable=true] - 편집 모드 활성화 여부
 */
const KpiCard = ({
  title,
  description,
  value,
  changeRate,
  comparisonText,
  isEditable = true,
}) => {
  const isPositive = changeRate >= 0;
  const arrowSymbol = isPositive ? '▲' : '▼';
  const badgeClass = isPositive ? styles.badgeUp : styles.badgeDown;
  const formattedRate = `${Math.abs(changeRate).toFixed(1)}%`;

  return (
    <Card title={title} description={description} isEditable={isEditable}>
      <div className={styles.kpiBody}>
        <div className={styles.valueRow}>
          <strong className={styles.value}>{value}</strong>
          <span
            className={`${styles.badge} ${badgeClass}`}
            aria-label={`${isPositive ? '증가' : '감소'} ${formattedRate}`}
          >
            <span aria-hidden="true">{arrowSymbol}</span>
            {formattedRate}
          </span>
        </div>
        <p className={styles.subtext}>{comparisonText}</p>
      </div>
    </Card>
  );
};

export default KpiCard;
