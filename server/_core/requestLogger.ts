/**
 * リクエストロギングミドルウェア
 * すべてのリクエストを構造化ログで記録
 */

import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";

/**
 * リクエストをログに記録するミドルウェア
 * 本番環境では重要なリクエストのみ記録（パフォーマンス考慮）
 */
export function requestLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const startTime = Date.now();
  const method = req.method;
  const path = req.path;
  const correlationId = (req as Request & { correlationId?: string }).correlationId;
  const userAgent = req.headers["user-agent"];
  const ip = req.ip || req.socket.remoteAddress;

  // レスポンス終了時にログを記録
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    // 本番環境では重要なリクエストのみ記録（4xx, 5xx、または遅いリクエスト）
    const shouldLog = 
      process.env.NODE_ENV !== "production" ||
      statusCode >= 400 ||
      duration > 1000; // 1秒以上かかったリクエスト

    if (shouldLog) {
      const logLevel = statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info";
      
      const context = {
        method,
        path,
        statusCode,
        duration,
        correlationId,
        userAgent,
        ip,
      };

      if (logLevel === "error") {
        logger.error(`HTTP ${method} ${path} - ${statusCode}`, undefined, context);
      } else if (logLevel === "warn") {
        logger.warn(`HTTP ${method} ${path} - ${statusCode}`, context);
      } else {
        logger.info(`HTTP ${method} ${path} - ${statusCode}`, context);
      }
    }
  });

  next();
}
