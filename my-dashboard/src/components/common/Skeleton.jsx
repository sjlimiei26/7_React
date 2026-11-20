import styles from './Skeleton.module.css';

/**
 * 비동기 데이터를 불러오는 동안 빈자리를 채워 레이아웃 흔들림(CLS)을 막아주는 스켈레톤 컴포넌트
 *
 * @param {object} props
 * @param {string} [props.width='100%'] - 가로 너비
 * @param {string} [props.height='16px'] - 세로 높이
 * @param {string} [props.label='데이터 로딩 중'] - 스크린 리더용 안내 문구
 */
const Skeleton = ({
  width = '100%',
  height = '16px',
  label = '데이터 로딩 중',
}) => {
  return (
    <span
      className={styles.skeleton}
      style={{ width, height }}
      role="status"
      aria-label={label}
    />
  );
};

export default Skeleton;
