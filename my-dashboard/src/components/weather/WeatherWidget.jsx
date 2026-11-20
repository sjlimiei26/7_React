import { useWeather } from '../../hooks/useWeather.js';
import Skeleton from '../common/Skeleton.jsx';
import ErrorMessage from '../common/ErrorMessage.jsx';
import styles from './WeatherWidget.module.css';

/**
 * 헤더 우측 상단에 현재 서울 날씨를 표시하는 위젯 컴포넌트
 *
 * * 학습 포인트 (비동기 UI의 3가지 상태 분리): 네트워크 요청은 언제나 즉시 성공하지 않습니다.
 *   1) 로딩 중(isLoading)일 때는 스켈레톤 UI를,
 *   2) 실패(error)했을 때는 에러 메시지와 "다시 시도" 버튼을,
 *   3) 성공(data)했을 때만 실제 날씨 정보를 조건부 렌더링하여 사용자 경험을 지킵니다.
 */
const WeatherWidget = () => {
  const { data, isLoading, error, refetch } = useWeather();

  if (isLoading) {
    return (
      <div className={styles.widget} aria-busy="true" aria-label="날씨 정보 불러오는 중">
        <div className={styles.skeletonGroup}>
          <Skeleton width="32px" height="32px" label="날씨 아이콘 로딩 중" />
          <div className={styles.skeletonCol}>
            <Skeleton width="120px" height="14px" label="현재 기온 로딩 중" />
            <Skeleton width="170px" height="12px" label="세부 날씨 로딩 중" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <ErrorMessage
        message="날씨 정보를 불러오지 못했습니다."
        onRetry={refetch}
      />
    );
  }

  return (
    <aside className={styles.widget} aria-label={`${data.cityName} 현재 날씨`}>
      <div className={styles.mainInfo}>
        <span
          className={styles.icon}
          role="img"
          aria-label={data.weatherLabel}
        >
          {data.weatherIcon}
        </span>
        <div className={styles.primaryText}>
          <div className={styles.cityRow}>
            <span className={styles.city}>{data.cityName}</span>
            <strong className={styles.temp}>{data.temperature}°C</strong>
          </div>
          <span className={styles.statusLabel}>{data.weatherLabel}</span>
        </div>
      </div>

      <ul className={styles.metaList}>
        <li className={styles.metaItem}>
          <span className={styles.metaLabel}>체감</span>
          <span className={styles.metaValue}>{data.apparentTemperature}°C</span>
        </li>
        <li className={styles.metaItem}>
          <span className={styles.metaLabel}>습도</span>
          <span className={styles.metaValue}>{data.humidity}%</span>
        </li>
        <li className={styles.metaItem}>
          <span className={styles.metaLabel}>풍속</span>
          <span className={styles.metaValue}>
            {data.windSpeed}
            {data.windUnit}
          </span>
        </li>
      </ul>

      <button
        type="button"
        className={styles.refreshBtn}
        onClick={refetch}
        aria-label="날씨 새로고침"
        title="날씨 새로고침"
      >
        ↻
      </button>
    </aside>
  );
};

export default WeatherWidget;
