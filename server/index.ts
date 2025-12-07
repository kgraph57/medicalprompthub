import express, { Request, Response } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { securityHeaders } from "./_core/securityHeaders";
import { logger } from "./_core/logger";
import { correlationIdMiddleware } from "./_core/correlationId";
import { metricsMiddleware, metrics } from "./_core/metrics";
import { requestLoggerMiddleware } from "./_core/requestLogger";
import { ENV } from "./_core/env";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // 相関IDミドルウェア（セキュリティヘッダーの前に設定）
  app.use((req, res, next) => {
    correlationIdMiddleware(req, res, () => {
      // リクエストごとにロガーに相関IDを設定
      const correlationId = (req as Request & { correlationId?: string }).correlationId;
      if (correlationId) {
        logger.setCorrelationId(correlationId);
      }
      next();
    });
  });

  // メトリクス収集ミドルウェア
  app.use(metricsMiddleware);

  // リクエストロギングミドルウェア
  app.use(requestLoggerMiddleware);

  // セキュリティヘッダーを設定（すべてのリクエストに適用）
  app.use(securityHeaders);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // ヘルスチェックエンドポイント
  app.get("/health", (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: ENV.NODE_ENV,
    });
  });

  // メトリクスエンドポイント（管理者用、本番環境では認証を追加推奨）
  app.get("/metrics", (req: Request, res: Response) => {
    // 本番環境では認証チェックを追加することを推奨
    if (ENV.NODE_ENV === "production") {
      // 簡単な認証チェック（環境変数で設定）
      const authToken = req.headers.authorization?.replace("Bearer ", "");
      if (authToken !== process.env.METRICS_AUTH_TOKEN) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    }

    const allMetrics = metrics.getAllMetrics();
    const httpStats = metrics.getHistogramStats("http_request_duration_ms");
    const errorCount = metrics.getCounter("http_errors_total");

    res.json({
      timestamp: new Date().toISOString(),
      metrics: {
        http: {
          request_duration: httpStats,
          errors_total: errorCount,
        },
        counters: allMetrics.counters,
        histograms: Object.fromEntries(
          Object.entries(allMetrics.histograms).map(([name, histograms]) => [
            name,
            histograms.map((h) => ({
              labels: h.labels,
              stats: metrics.getHistogramStats(name, h.labels),
            })),
          ])
        ),
      },
    });
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // グローバルエラーハンドラー
  app.use((err: Error, req: Request, res: Response, next: express.NextFunction) => {
    const correlationId = (req as Request & { correlationId?: string }).correlationId;
    
    logger.error("Unhandled error in request", err, {
      method: req.method,
      path: req.path,
      correlationId,
    });

    // メトリクスにエラーを記録
    metrics.incrementCounter("http_errors_total", {
      method: req.method,
      path: req.path,
      type: "unhandled_error",
    });

    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal Server Error",
        message: process.env.NODE_ENV === "production" 
          ? "An error occurred while processing your request."
          : err.message,
        correlationId,
      });
    }
  });

  // 404ハンドラー（すべてのルートの最後に配置）
  app.use((req: Request, res: Response) => {
    logger.warn("Route not found", {
      method: req.method,
      path: req.path,
      correlationId: (req as Request & { correlationId?: string }).correlationId,
    });

    res.status(404).json({
      error: "Not Found",
      message: `Route ${req.method} ${req.path} not found`,
      correlationId: (req as Request & { correlationId?: string }).correlationId,
    });
  });

  const port = ENV.PORT;

  server.listen(port, () => {
    logger.info("Server started", {
      port,
      environment: process.env.NODE_ENV || "development",
      staticPath,
    });
  });
}

startServer().catch((error) => {
  logger.fatal("Failed to start server", error);
  process.exit(1);
});
