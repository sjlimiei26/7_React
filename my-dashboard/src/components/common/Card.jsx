import styles from './Card.module.css';

/**
 * 대시보드의 모든 위젯(KPI, 차트, 테이블)을 감싸는 공용 카드 컴포넌트
 *
 * * 학습 포인트 (관심사 분리): Card 컴포넌트는 자신이 그리드 위에서 어떻게 리사이즈되는지 직접 알지 못합니다.
 *   부모(DashboardGrid)가 정해준 영역을 100% 채우고, 헤더에 `.card-drag-handle` 클래스만 제공해
 *   차트 내부의 툴팁/클릭 이벤트와 카드 드래그 이동이 서로 충돌하지 않게 역할을 나눕니다.
 *
 * @param {object} props
 * @param {string} props.title - 카드 상단 제목
 * @param {string} [props.description] - 제목 아래 한 줄 설명
 * @param {boolean} [props.isEditable=true] - 편집 모드 활성화 여부 (안내 표시용)
 * @param {import('react').ReactNode} [props.headerAction] - 헤더 우측 보조 요소
 * @param {import('react').ReactNode} props.children - 카드 본문 콘텐츠
 */
const Card = ({
  title,
  description,
  isEditable = true,
  headerAction,
  children,
}) => {
  return (
    <section className={styles.card} aria-label={title}>
      {/* card-drag-handle 클래스를 헤더에만 지정하여 본문 차트를 마우스로 탐색할 때 카드가 움직이지 않도록 합니다. */}
      <div className={`${styles.header} card-drag-handle`}>
        <div className={styles.headerText}>
          <div className={styles.titleRow}>
            {isEditable && (
              <span
                className={styles.dragIcon}
                aria-hidden="true"
                title="드래그하여 카드 이동"
              >
                ⠿
              </span>
            )}
            <h2 className={styles.title}>{title}</h2>
          </div>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {headerAction && (
          <div className={styles.headerAction}>{headerAction}</div>
        )}
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
};

export default Card;
