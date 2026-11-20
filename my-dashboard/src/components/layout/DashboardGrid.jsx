import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import {
  GRID_BREAKPOINTS,
  GRID_COLS,
  GRID_ROW_HEIGHT,
  GRID_MARGIN,
} from '../../constants/theme.js';
import styles from './DashboardGrid.module.css';

// 부모 컨테이너의 픽셀 너비를 자동으로 측정해 Responsive 그리드에 주입하는 고차 컴포넌트(HOC)입니다.
const ResponsiveGridLayout = WidthProvider(Responsive);

/**
 * react-grid-layout을 사용해 대시보드 카드를 배치하고 드래그 이동/우하단 리사이즈를 담당하는 컴포넌트
 *
 * * 학습 포인트 (반응형 제어와 터치 오조작 방지): 데스크톱(lg)과 태블릿(md)에서는 편집 모드일 때
 *   자유롭게 카드 크기를 바꾸고 이동할 수 있게 하지만, 화면이 좁은 모바일(sm)에서는 스크롤 중 오조작을 막기 위해
 *   리사이즈와 드래그를 비활성화하고 1열로 깔끔하게 쌓이도록 제어합니다.
 *
 * @param {object} props
 * @param {{ lg: Array<object>, md: Array<object>, sm: Array<object> }} props.layouts - 브레이크포인트별 레이아웃
 * @param {(currentLayout: Array<object>, allLayouts: object) => void} props.onLayoutsChange - 레이아웃 변경 콜백
 * @param {boolean} props.isEditMode - 레이아웃 편집 활성화 여부
 * @param {Array<{ id: string, content: import('react').ReactNode }>} props.items - 렌더링할 카드 목록
 */
const DashboardGrid = ({
  layouts,
  onLayoutsChange,
  isEditMode,
  items,
}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');

  // 모바일(sm)에서는 터치 스크롤 중 카드가 잘못 늘어나지 않도록 리사이즈와 드래그를 비활성화합니다.
  const isMobile = currentBreakpoint === 'sm';
  const canInteract = isEditMode && !isMobile;

  return (
    <div className={styles.gridWrapper}>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={GRID_BREAKPOINTS}
        cols={GRID_COLS}
        rowHeight={GRID_ROW_HEIGHT}
        margin={GRID_MARGIN}
        containerPadding={[0, 0]}
        isDraggable={canInteract}
        isResizable={canInteract}
        resizeHandles={['se']}
        draggableHandle=".card-drag-handle"
        onBreakpointChange={(newBreakpoint) => {
          setCurrentBreakpoint(newBreakpoint);
        }}
        onLayoutChange={(currentLayout, allLayouts) => {
          onLayoutsChange(currentLayout, allLayouts);
        }}
      >
        {/* react-grid-layout은 직계 자식 div에 style, className, ref를 주입하므로 key={item.id}를 가진 div로 감쌉니다. */}
        {items.map((item) => (
          <div key={item.id} className={styles.gridItem}>
            {item.content}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default DashboardGrid;
