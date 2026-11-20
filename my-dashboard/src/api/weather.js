import { getWeatherCodeInfo } from '../utils/weatherCode.js';

/**
 * Open-Meteo 현재 날씨 API 호출 모듈
 * AGENTS.md 4, 5번 사양: 모든 fetch 로직은 이 파일 한 곳에만 두고,
 * 위도/경도/도시명은 상단 상수로 분리해 수강생이 다른 지역으로 쉽게 바꿔볼 수 있게 합니다.
 */

export const DEFAULT_LOCATION = {
  cityName: '서울',
  latitude: 37.5665,
  longitude: 126.978,
  timezone: 'Asia/Seoul',
};

export const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

const CURRENT_WEATHER_FIELDS = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'weather_code',
  'wind_speed_10m',
].join(',');

/**
 * @typedef {object} WeatherViewModel
 * @property {string} cityName - 표시할 도시 이름
 * @property {number} temperature - 현재 기온 (°C)
 * @property {number} apparentTemperature - 체감 온도 (°C)
 * @property {number} humidity - 상대 습도 (%)
 * @property {number} windSpeed - 풍속 (m/s 또는 km/h)
 * @property {string} windUnit - 풍속 단위
 * @property {number} weatherCode - WMO 날씨 코드
 * @property {string} weatherLabel - 한글 날씨 상태 설명
 * @property {string} weatherIcon - 날씨 상태 이모지 아이콘
 * @property {string} observedAt - 측정 시각 문자열
 */

/**
 * Open-Meteo API의 원본 응답을 UI 컴포넌트가 쓰기 편한 형태(WeatherViewModel)로 변환합니다.
 * 컴포넌트가 서버 API의 중첩된 필드명(current.temperature_2m 등)을 직접 알지 않게 보호하기 위함입니다.
 *
 * @param {object} rawResponse - Open-Meteo JSON 응답
 * @param {string} cityName - 도시명
 * @returns {WeatherViewModel}
 */
const toWeatherViewModel = (rawResponse, cityName) => {
  const current = rawResponse?.current;
  if (!current || typeof current.temperature_2m !== 'number') {
    throw new Error('날씨 응답 데이터 형식이 올바르지 않습니다.');
  }

  const codeInfo = getWeatherCodeInfo(current.weather_code);

  return {
    cityName,
    temperature: Number(current.temperature_2m.toFixed(1)),
    apparentTemperature: Number(current.apparent_temperature.toFixed(1)),
    humidity: Math.round(current.relative_humidity_2m),
    windSpeed: Number(current.wind_speed_10m.toFixed(1)),
    windUnit: rawResponse?.current_units?.wind_speed_10m ?? 'km/h',
    weatherCode: current.weather_code,
    weatherLabel: codeInfo.label,
    weatherIcon: codeInfo.icon,
    observedAt: current.time ?? '',
  };
};

/**
 * 현재 날씨 정보를 Open-Meteo에서 조회합니다.
 *
 * @param {object} [options]
 * @param {AbortSignal} [options.signal] - 언마운트 시 요청 취소를 위한 AbortSignal
 * @param {string} [options.baseUrl=OPEN_METEO_BASE_URL] - 테스트나 재시도 확인을 위한 엔드포인트
 * @returns {Promise<WeatherViewModel>}
 */
export const fetchCurrentWeather = async ({
  signal,
  baseUrl = OPEN_METEO_BASE_URL,
} = {}) => {
  const params = new URLSearchParams({
    latitude: String(DEFAULT_LOCATION.latitude),
    longitude: String(DEFAULT_LOCATION.longitude),
    current: CURRENT_WEATHER_FIELDS,
    timezone: DEFAULT_LOCATION.timezone,
  });

  const requestUrl = `${baseUrl}?${params.toString()}`;
  const response = await fetch(requestUrl, { signal });

  if (!response.ok) {
    throw new Error(`날씨 정보를 가져오지 못했습니다. (HTTP ${response.status})`);
  }

  const json = await response.json();
  return toWeatherViewModel(json, DEFAULT_LOCATION.cityName);
};
