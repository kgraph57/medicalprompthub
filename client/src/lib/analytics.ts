/**
 * Google Analytics 4 (GA4) の実装
 * 環境変数 VITE_GA4_MEASUREMENT_ID が設定されている場合のみ有効
 */

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "set" | "js" | "consent",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

/**
 * Google Analytics 4を初期化
 */
export function initGA4(): void {
  // 本番環境で、かつMEASUREMENT_IDが設定されている場合のみ初期化
  if (!GA4_MEASUREMENT_ID || import.meta.env.DEV) {
    return;
  }

  // gtag.jsを読み込む
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // dataLayerとgtag関数を初期化
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    if (window.dataLayer) {
      window.dataLayer.push(arguments);
    }
  };

  // GA4を設定
  window.gtag("js", new Date());
  window.gtag("config", GA4_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

/**
 * ページビューを送信
 */
export function trackPageView(path: string, title?: string): void {
  if (!GA4_MEASUREMENT_ID || !window.gtag || import.meta.env.DEV) {
    return;
  }

  window.gtag("config", GA4_MEASUREMENT_ID, {
    page_path: path,
    page_title: title || document.title,
  });
}

/**
 * カスタムイベントを送信
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
): void {
  if (!GA4_MEASUREMENT_ID || !window.gtag || import.meta.env.DEV) {
    return;
  }

  window.gtag("event", eventName, eventParams);
}

/**
 * プロンプトコピーイベント
 */
export function trackPromptCopy(promptId: string, promptTitle?: string): void {
  trackEvent("prompt_copy", {
    prompt_id: promptId,
    prompt_title: promptTitle,
  });
}

/**
 * プロンプト閲覧イベント
 */
export function trackPromptView(promptId: string, promptTitle?: string): void {
  trackEvent("prompt_view", {
    prompt_id: promptId,
    prompt_title: promptTitle,
  });
}

/**
 * 検索イベント
 */
export function trackSearch(searchTerm: string, resultCount?: number): void {
  trackEvent("search", {
    search_term: searchTerm,
    result_count: resultCount,
  });
}

/**
 * カテゴリ選択イベント
 */
export function trackCategorySelect(categoryId: string, categoryName?: string): void {
  trackEvent("category_select", {
    category_id: categoryId,
    category_name: categoryName,
  });
}

/**
 * お気に入り追加イベント
 */
export function trackFavoriteAdd(promptId: string): void {
  trackEvent("favorite_add", {
    prompt_id: promptId,
  });
}

/**
 * お気に入り削除イベント
 */
export function trackFavoriteRemove(promptId: string): void {
  trackEvent("favorite_remove", {
    prompt_id: promptId,
  });
}
