/**
 * WMO(세계기상기구) 날씨 코드를 한글 설명과 아이콘(이모지)으로 변환하는 매핑 유틸리티
 * Open-Meteo API는 날씨 상태를 숫자 코드(0~99)로 반환하므로, 화면에 친절하게 표시하기 위해 변환합니다.
 */

export const WEATHER_CODE_MAP = {
  0: { label: '맑음', icon: '☀️' },
  1: { label: '대체로 맑음', icon: '🌤️' },
  2: { label: '구름 조금', icon: '⛅' },
  3: { label: '흐림', icon: '☁️' },
  45: { label: '안개', icon: '🌫️' },
  48: { label: '서리 안개', icon: '🌫️' },
  51: { label: '약한 이슬비', icon: '🌦️' },
  53: { label: '보통 이슬비', icon: '🌦️' },
  55: { label: '강한 이슬비', icon: '🌧️' },
  56: { label: '약한 진눈깨비 이슬비', icon: '🌧️' },
  57: { label: '강한 진눈깨비 이슬비', icon: '🌧️' },
  61: { label: '약한 비', icon: '🌦️' },
  63: { label: '보통 비', icon: '🌧️' },
  65: { label: '강한 비', icon: '🌧️' },
  66: { label: '약한 어는 비', icon: '🌧️' },
  67: { label: '강한 어는 비', icon: '🌧️' },
  71: { label: '약한 눈', icon: '🌨️' },
  73: { label: '보통 눈', icon: '❄️' },
  75: { label: '강한 눈', icon: '❄️' },
  77: { label: '싸락눈', icon: '❄️' },
  80: { label: '약한 소나기', icon: '🌦️' },
  81: { label: '보통 소나기', icon: '🌧️' },
  82: { label: '강한 소나기', icon: '⛈️' },
  85: { label: '약한 눈보라', icon: '🌨️' },
  86: { label: '강한 눈보라', icon: '❄️' },
  95: { label: '뇌우', icon: '⛈️' },
  96: { label: '우박을 동반한 뇌우', icon: '⛈️' },
  99: { label: '강한 우박과 뇌우', icon: '⛈️' },
};

const DEFAULT_WEATHER_INFO = {
  label: '기상 정보 확인 중',
  icon: '🌡️',
};

/**
 * WMO 숫자 코드를 받아 한글 라벨과 아이콘 객체를 반환하는 순수 함수
 * @param {number} code - Open-Meteo current.weather_code 값
 * @returns {{ label: string, icon: string }}
 */
export const getWeatherCodeInfo = (code) => {
  return WEATHER_CODE_MAP[code] ?? DEFAULT_WEATHER_INFO;
};
