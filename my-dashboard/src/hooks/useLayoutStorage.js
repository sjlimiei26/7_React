import { useState, useCallback } from 'react';
import { LAYOUT_STORAGE_KEY } from '../constants/theme.js';
import {
  DASHBOARD_CARD_IDS,
  defaultLayouts,
  cloneDefaultLayouts,
} from '../data/defaultLayouts.js';

/**
 * 저장된 단일 브레이크포인트 배열이 현재 카드 목록(DASHBOARD_CARD_IDS)과 정확히 일치하는지 검증합니다.
 * 카드가 추가/삭제되어 id가 어긋나거나 잘못된 좌표가 들어있으면 false를 반환합니다.
 *
 * @param {unknown} layoutList
 * @param {Array<object>} fallbackList
 * @returns {Array<object> | null}
 */
const sanitizeSingleLayout = (layoutList, fallbackList) => {
  if (!Array.isArray(layoutList) || layoutList.length !== DASHBOARD_CARD_IDS.length) {
    return null;
  }

  const itemMap = new Map();
  for (const item of layoutList) {
    if (
      !item ||
      typeof item !== 'object' ||
      typeof item.i !== 'string' ||
      typeof item.x !== 'number' ||
      typeof item.y !== 'number' ||
      typeof item.w !== 'number' ||
      typeof item.h !== 'number'
    ) {
      return null;
    }
    itemMap.set(item.i, item);
  }

  // 모든 필수 카드 ID가 빠짐없이 존재하는지 확인합니다.
  for (const requiredId of DASHBOARD_CARD_IDS) {
    if (!itemMap.has(requiredId)) {
      return null;
    }
  }

  // onLayoutChange가 minW/maxW 등을 생략하고 저장하더라도 기본 제약 조건(minW, maxW, minH, maxH)을 보존합니다.
  return fallbackList.map((defaultItem) => {
    const savedItem = itemMap.get(defaultItem.i);
    return {
      ...defaultItem,
      x: savedItem.x,
      y: savedItem.y,
      w: Math.min(Math.max(savedItem.w, defaultItem.minW), defaultItem.maxW),
      h: Math.min(Math.max(savedItem.h, defaultItem.minH), defaultItem.maxH),
    };
  });
};

/**
 * localStorage에서 레이아웃을 안전하게 읽어옵니다.
 *
 * * 학습 포인트 (방어적 localStorage 파싱): 브라우저의 localStorage 값은 사용자가 개발자 도구에서
 *   임의로 수정하거나 이전 버전의 데이터가 남아 형식이 깨져 있을 수 있습니다.
 *   반드시 `try / catch`로 `JSON.parse`를 감싸고, 카드 ID가 어긋나면 기본 레이아웃으로 복구해야 앱이 멈추지 않습니다.
 *
 * @returns {{ lg: Array<object>, md: Array<object>, sm: Array<object> }}
 */
const loadSavedLayouts = () => {
  try {
    const raw = window.localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!raw) {
      return cloneDefaultLayouts();
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return cloneDefaultLayouts();
    }

    const lg = sanitizeSingleLayout(parsed.lg, defaultLayouts.lg);
    const md = sanitizeSingleLayout(parsed.md, defaultLayouts.md);
    const sm = sanitizeSingleLayout(parsed.sm, defaultLayouts.sm);

    if (!lg || !md || !sm) {
      return cloneDefaultLayouts();
    }

    return { lg, md, sm };
  } catch {
    // 잘못된 JSON 문자열이거나 스토리지 접근이 차단된 경우 기본 배치로 안전하게 되돌립니다.
    return cloneDefaultLayouts();
  }
};

/**
 * 대시보드 카드 레이아웃을 상태와 localStorage에 동기화하는 커스텀 훅
 */
export const useLayoutStorage = () => {
  const [layouts, setLayouts] = useState(() => loadSavedLayouts());

  const handleLayoutsChange = useCallback((_currentLayout, allLayouts) => {
    setLayouts((prevLayouts) => {
      const nextLayouts = {
        lg: sanitizeSingleLayout(allLayouts?.lg, defaultLayouts.lg) ?? prevLayouts.lg,
        md: sanitizeSingleLayout(allLayouts?.md, defaultLayouts.md) ?? prevLayouts.md,
        sm: sanitizeSingleLayout(allLayouts?.sm, defaultLayouts.sm) ?? prevLayouts.sm,
      };

      try {
        window.localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(nextLayouts));
      } catch {
        // 시크릿 모드나 용량 초과 등으로 저장이 실패해도 화면 동작은 계속 유지합니다.
      }

      return nextLayouts;
    });
  }, []);

  const resetLayouts = useCallback(() => {
    const freshDefaults = cloneDefaultLayouts();
    setLayouts(freshDefaults);
    try {
      window.localStorage.removeItem(LAYOUT_STORAGE_KEY);
    } catch {
      // 스토리지 삭제 실패 무시
    }
  }, []);

  return {
    layouts,
    onLayoutsChange: handleLayoutsChange,
    resetLayouts,
  };
};
