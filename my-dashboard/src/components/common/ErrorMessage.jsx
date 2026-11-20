import styles from './ErrorMessage.module.css';

/**
 * 네트워크 오류나 API 요청 실패 시 원인과 재시도 버튼을 함께 표시하는 공용 컴포넌트
 *
 * @param {object} props
 * @param {string} props.message - 사용자에게 보여줄 짧은 에러 메시지
 * @param {() => void} [props.onRetry] - "다시 시도" 버튼 클릭 핸들러
 */
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className={styles.errorBox} role="alert">
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button
          type="button"
          className={styles.retryButton}
          onClick={onRetry}
        >
          다시 시도
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
