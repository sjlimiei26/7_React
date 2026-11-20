import styles from './Header.module.css';

/**
 * 대시보드 상단 헤더 컴포넌트
 * 좌측에는 서비스 제목, 우측 상단에는 레이아웃 제어 버튼과 날씨 위젯을 고정 배치합니다.
 *
 * @param {object} props
 * @param {boolean} props.isEditMode - 카드 크기 조절 및 이동 편집 모드 여부
 * @param {() => void} props.onToggleEditMode - 편집 모드 토글 핸들러
 * @param {() => void} props.onResetLayout - 레이아웃 초기화 핸들러
 * @param {import('react').ReactNode} [props.weatherWidget] - 우측 상단에 고정 배치할 날씨 위젯
 */
const Header = ({
  isEditMode,
  onToggleEditMode,
  onResetLayout,
  weatherWidget,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brandGroup}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>커머스 인사이트 대시보드</h1>
            <span className={styles.badge}>참고용 </span>
          </div>
          <p className={styles.subtitle}>
            카드 헤더를 드래그해 이동하고 우하단 모서리를 끌어 크기를 조절해 보세요.
          </p>
        </div>

        <div className={styles.rightGroup}>
          <div className={styles.controls}>
            <button
              type="button"
              className={`${styles.button} ${isEditMode ? styles.buttonActive : ''}`}
              onClick={onToggleEditMode}
              aria-pressed={isEditMode}
            >
              {isEditMode ? '✓ 레이아웃 편집 켜짐' : '레이아웃 편집 잠금'}
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={onResetLayout}
            >
              레이아웃 초기화
            </button>
          </div>

          {/* AGENTS.md 5번 사양: 헤더 우측 상단에 날씨 위젯을 고정 배치합니다. */}
          {weatherWidget && (
            <div className={styles.weatherSlot}>{weatherWidget}</div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
