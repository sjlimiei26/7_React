import styles from './DashboardLayout.module.css';

/**
 * 페이지 전체 골격(Header + 안내 배너 + Main 영역)을 잡아주는 레이아웃 컴포넌트
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.header - 상단 헤더 컴포넌트
 * @param {boolean} props.isEditMode - 편집 모드 활성화 여부 (키보드 안내 문구 표시용)
 * @param {import('react').ReactNode} props.children - 대시보드 본문(그리드)
 */
const DashboardLayout = ({ header, isEditMode, children }) => {
  return (
    <div className={styles.layout}>
      {header}
      <main className={styles.main}>
        {/* AGENTS.md 7번 주의사항: 키보드 사용자를 위해 편집 모드가 켜진 경우 안내 문구를 화면에 표시합니다. */}
        {isEditMode && (
          <div className={styles.noticeBanner} role="note">
            <span>
              💡 <strong>레이아웃 편집 모드:</strong> 카드 제목 영역을 끌어 위치를 옮기거나 우하단 핸들로 크기를 바꿀 수 있습니다. (크기 조절은 마우스/터치 드래그로 지원됩니다)
            </span>
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
