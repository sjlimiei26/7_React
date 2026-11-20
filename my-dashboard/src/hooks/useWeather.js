import { useState, useEffect, useCallback } from 'react';
import { fetchCurrentWeather } from '../api/weather.js';
import { WEATHER_REFRESH_INTERVAL_MS } from '../constants/theme.js';

/**
 * 현재 날씨 데이터를 불러오고 로딩/에러/성공 3가지 상태를 관리하는 커스텀 훅
 *
 * * 학습 포인트 1 (커스텀 훅): 컴포넌트 안에서 fetch와 여러 개의 useState를 직접 다루면
 *   UI 코드가 길어지고 재사용이 어렵습니다. `useWeather`로 데이터 로딩 책임을 분리하면
 *   컴포넌트는 `{ data, isLoading, error, refetch }`만 받아 화면 그리기에만 집중할 수 있습니다.
 *
 * * 학습 포인트 2 (useEffect와 cleanup): 비동기 요청이 끝나기 전에 컴포넌트가 화면에서 사라지면(언마운트)
 *   불필요한 상태 업데이트가 발생할 수 있습니다. `AbortController`와 `clearInterval`을 cleanup 함수에서
 *   호출해 진행 중인 요청과 타이머를 안전하게 정리합니다.
 *
 * @returns {{
 *   data: import('../api/weather.js').WeatherViewModel | null,
 *   isLoading: boolean,
 *   error: string | null,
 *   refetch: () => void
 * }}
 */
export const useWeather = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // 사용자가 "다시 시도" 버튼을 눌렀을 때 useEffect를 다시 실행하기 위한 카운터입니다.
  const [reloadCount, setReloadCount] = useState(0);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setReloadCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // 컴포넌트가 사라진 뒤 setState가 호출되지 않도록 이전 네트워크 요청을 취소하는 컨트롤러를 생성합니다.
    const abortController = new AbortController();

    const loadWeather = async () => {
      try {
        const weatherData = await fetchCurrentWeather({
          signal: abortController.signal,
        });
        setData(weatherData);
        setError(null);
      } catch (err) {
        // AbortController에 의해 정상 취소된 요청은 에러 상태로 처리하지 않습니다.
        if (err.name === 'AbortError') {
          return;
        }
        setError(
          err instanceof Error
            ? err.message
            : '날씨 정보를 불러오는 중 오류가 발생했습니다.'
        );
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadWeather();

    // 10분마다 최신 날씨로 자동 갱신합니다.
    const intervalId = window.setInterval(() => {
      loadWeather();
    }, WEATHER_REFRESH_INTERVAL_MS);

    // 언마운트되거나 재시도(reloadCount 변경)될 때 진행 중인 요청을 취소하고 타이머를 해제합니다.
    return () => {
      abortController.abort();
      window.clearInterval(intervalId);
    };
  }, [reloadCount]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
