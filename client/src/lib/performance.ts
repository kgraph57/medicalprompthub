/**
 * パフォーマンス監視ユーティリティ
 * Core Web Vitalsやその他のパフォーマンスメトリクスを測定
 */

interface PerformanceMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  timestamp: number;
}

/**
 * Core Web Vitalsを測定
 */
export function measureCoreWebVitals(): void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return;
  }

  // LCP (Largest Contentful Paint)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
        renderTime?: number;
        loadTime?: number;
      };

      const lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
      const rating = lcp < 2500 ? "good" : lcp < 4000 ? "needs-improvement" : "poor";

      logMetric({
        name: "LCP",
        value: lcp,
        rating,
        timestamp: Date.now(),
      });
    });

    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
  } catch (e) {
    // PerformanceObserverがサポートされていない場合
    console.warn("LCP measurement not supported");
  }

  // FID (First Input Delay)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fidEntry = entry as PerformanceEntry & {
          processingStart?: number;
          startTime?: number;
        };
        if (fidEntry.processingStart && fidEntry.startTime) {
          const fid = fidEntry.processingStart - fidEntry.startTime;
          const rating = fid < 100 ? "good" : fid < 300 ? "needs-improvement" : "poor";

          logMetric({
            name: "FID",
            value: fid,
            rating,
            timestamp: Date.now(),
          });
        }
      });
    });

    fidObserver.observe({ entryTypes: ["first-input"] });
  } catch (e) {
    console.warn("FID measurement not supported");
  }

  // CLS (Cumulative Layout Shift)
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const clsEntry = entry as PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        };
        if (!clsEntry.hadRecentInput && clsEntry.value !== undefined) {
          clsValue += clsEntry.value;
        }
      });

      const rating = clsValue < 0.1 ? "good" : clsValue < 0.25 ? "needs-improvement" : "poor";

      logMetric({
        name: "CLS",
        value: clsValue,
        rating,
        timestamp: Date.now(),
      });
    });

    clsObserver.observe({ entryTypes: ["layout-shift"] });
  } catch (e) {
    console.warn("CLS measurement not supported");
  }
}

/**
 * メトリクスをログに記録
 */
function logMetric(metric: PerformanceMetric): void {
  // 開発環境ではコンソールに出力
  if (import.meta.env.DEV) {
    console.log(`[Performance] ${metric.name}:`, metric);
  }

  // 本番環境ではLocalStorageに保存（後で分析可能）
  if (import.meta.env.PROD && typeof window !== 'undefined') {
    try {
      const metrics = JSON.parse(localStorage.getItem('performance-metrics') || '[]');
      metrics.push(metric);
      // 最新100件のみ保持
      const recentMetrics = metrics.slice(-100);
      localStorage.setItem('performance-metrics', JSON.stringify(recentMetrics));
    } catch (e) {
      // LocalStorageが使用できない場合は無視
    }
  }
}

/**
 * 保存されたパフォーマンスメトリクスを取得
 */
export function getStoredMetrics(): PerformanceMetric[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('performance-metrics') || '[]');
  } catch {
    return [];
  }
}

/**
 * パフォーマンスメトリクスをクリア
 */
export function clearStoredMetrics(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('performance-metrics');
  }
}

/**
 * ページ読み込み時間を測定
 */
export function measurePageLoad(): void {
  if (typeof window === "undefined" || !window.performance) {
    return;
  }

  window.addEventListener("load", () => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      
      logMetric({
        name: "PageLoad",
        value: loadTime,
        rating: loadTime < 2000 ? "good" : loadTime < 4000 ? "needs-improvement" : "poor",
        timestamp: Date.now(),
      });
    }
  });
}

/**
 * パフォーマンス監視を開始
 */
export function startPerformanceMonitoring(): void {
  measureCoreWebVitals();
  measurePageLoad();
}
