/**
 * 基本的なメトリクス収集
 * レスポンス時間、リクエスト数、エラー率などを追跡
 */

interface MetricData {
  timestamp: number;
  value: number;
  labels?: Record<string, string>;
}

interface Counter {
  count: number;
  labels?: Record<string, string>;
}

interface Histogram {
  values: number[];
  labels?: Record<string, string>;
}

class MetricsCollector {
  private counters: Map<string, Counter[]> = new Map();
  private histograms: Map<string, Histogram[]> = new Map();
  private readonly maxHistorySize = 1000; // 保持するメトリクスの最大数

  /**
   * カウンターをインクリメント
   */
  incrementCounter(name: string, labels?: Record<string, string>): void {
    const key = this.getKey(name, labels);
    let counters = this.counters.get(name);
    
    if (!counters) {
      counters = [];
      this.counters.set(name, counters);
    }

    const existing = counters.find(c => this.labelsMatch(c.labels, labels));
    if (existing) {
      existing.count++;
    } else {
      counters.push({ count: 1, labels });
    }

    // 履歴サイズを制限
    if (counters.length > this.maxHistorySize) {
      counters.shift();
    }
  }

  /**
   * ヒストグラムに値を記録
   */
  recordHistogram(name: string, value: number, labels?: Record<string, string>): void {
    const key = this.getKey(name, labels);
    let histograms = this.histograms.get(name);
    
    if (!histograms) {
      histograms = [];
      this.histograms.set(name, histograms);
    }

    const existing = histograms.find(h => this.labelsMatch(h.labels, labels));
    if (existing) {
      existing.values.push(value);
      // 履歴サイズを制限
      if (existing.values.length > this.maxHistorySize) {
        existing.values.shift();
      }
    } else {
      histograms.push({ values: [value], labels });
    }
  }

  /**
   * カウンターの値を取得
   */
  getCounter(name: string, labels?: Record<string, string>): number {
    const counters = this.counters.get(name);
    if (!counters) return 0;

    const counter = labels
      ? counters.find(c => this.labelsMatch(c.labels, labels))
      : counters[0];

    return counter ? counter.count : 0;
  }

  /**
   * ヒストグラムの統計情報を取得
   */
  getHistogramStats(name: string, labels?: Record<string, string>): {
    count: number;
    sum: number;
    min: number;
    max: number;
    avg: number;
    p50: number;
    p95: number;
    p99: number;
  } | null {
    const histograms = this.histograms.get(name);
    if (!histograms) return null;

    const histogram = labels
      ? histograms.find(h => this.labelsMatch(h.labels, labels))
      : histograms[0];

    if (!histogram || histogram.values.length === 0) return null;

    const sorted = [...histogram.values].sort((a, b) => a - b);
    const count = sorted.length;
    const sum = sorted.reduce((a, b) => a + b, 0);
    const min = sorted[0];
    const max = sorted[count - 1];
    const avg = sum / count;
    const p50 = sorted[Math.floor(count * 0.5)];
    const p95 = sorted[Math.floor(count * 0.95)];
    const p99 = sorted[Math.floor(count * 0.99)];

    return { count, sum, min, max, avg, p50, p95, p99 };
  }

  /**
   * すべてのメトリクスを取得（デバッグ用）
   */
  getAllMetrics(): {
    counters: Record<string, Counter[]>;
    histograms: Record<string, Histogram[]>;
  } {
    return {
      counters: Object.fromEntries(this.counters),
      histograms: Object.fromEntries(this.histograms),
    };
  }

  /**
   * メトリクスをリセット
   */
  reset(): void {
    this.counters.clear();
    this.histograms.clear();
  }

  private getKey(name: string, labels?: Record<string, string>): string {
    if (!labels) return name;
    const labelStr = Object.entries(labels)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join(",");
    return `${name}{${labelStr}}`;
  }

  private labelsMatch(a?: Record<string, string>, b?: Record<string, string>): boolean {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (Object.keys(a).length !== Object.keys(b).length) return false;
    
    for (const [key, value] of Object.entries(a)) {
      if (b[key] !== value) return false;
    }
    
    return true;
  }
}

// シングルトンインスタンス
export const metrics = new MetricsCollector();

/**
 * レスポンス時間を計測するミドルウェア
 */
import { Request, Response, NextFunction } from "express";

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const startTime = Date.now();
  const method = req.method;
  const path = req.route?.path || req.path;

  // リクエスト数をカウント
  metrics.incrementCounter("http_requests_total", {
    method,
    path,
  });

  // レスポンス終了時にメトリクスを記録
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    // レスポンス時間を記録
    metrics.recordHistogram("http_request_duration_ms", duration, {
      method,
      path,
      status: statusCode.toString(),
    });

    // ステータスコード別のカウント
    metrics.incrementCounter("http_responses_total", {
      method,
      path,
      status: statusCode.toString(),
    });

    // エラー率の計算用（4xx, 5xx）
    if (statusCode >= 400) {
      metrics.incrementCounter("http_errors_total", {
        method,
        path,
        status: statusCode.toString(),
      });
    }
  });

  next();
}
