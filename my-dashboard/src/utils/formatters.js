/**
 * 차트 툴팁, 축 라벨, 테이블에서 숫자와 통화를 읽기 쉽게 변환하는 순수 함수 모음
 */

/**
 * 숫자를 천 단위 콤마가 포함된 문자열로 변환합니다. (예: 12500 -> "12,500")
 * @param {number} value
 * @returns {string}
 */
export const formatNumber = (value) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '0';
  }
  return value.toLocaleString('ko-KR');
};

/**
 * 원화(₩) 금액을 만원/억원 단위 또는 콤마 포맷으로 보기 좋게 변환합니다.
 * @param {number} amount - 원 단위 또는 만원 단위 숫자
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    return '₩0';
  }
  return `₩${amount.toLocaleString('ko-KR')}`;
};

/**
 * 만원 단위 숫자를 "1,240만원" 형태로 포맷팅합니다.
 * @param {number} manwon
 * @returns {string}
 */
export const formatManwon = (manwon) => {
  if (typeof manwon !== 'number' || Number.isNaN(manwon)) {
    return '0만원';
  }
  return `${manwon.toLocaleString('ko-KR')}만원`;
};

/**
 * 백분율 숫자를 "3.8%" 형태로 포맷팅합니다.
 * @param {number} rate
 * @returns {string}
 */
export const formatPercent = (rate) => {
  if (typeof rate !== 'number' || Number.isNaN(rate)) {
    return '0.0%';
  }
  return `${rate.toFixed(1)}%`;
};
