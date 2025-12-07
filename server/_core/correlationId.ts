/**
 * 相関ID（Correlation ID）の実装
 * リクエストを追跡するための一意のIDを生成・管理
 */

import { randomUUID } from "crypto";

/**
 * 相関IDを生成
 */
export function generateCorrelationId(): string {
  return randomUUID();
}

/**
 * リクエストヘッダーから相関IDを取得、なければ生成
 */
export function getCorrelationId(req: { headers: Record<string, string | string[] | undefined> }): string {
  const headerValue = req.headers["x-correlation-id"] || req.headers["x-request-id"];
  
  if (typeof headerValue === "string") {
    return headerValue;
  }
  
  if (Array.isArray(headerValue) && headerValue.length > 0) {
    return headerValue[0];
  }
  
  return generateCorrelationId();
}

/**
 * レスポンスヘッダーに相関IDを設定するミドルウェア
 */
import { Request, Response, NextFunction } from "express";

export function correlationIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const correlationId = getCorrelationId(req);
  
  // レスポンスヘッダーに相関IDを設定
  res.setHeader("X-Correlation-ID", correlationId);
  
  // リクエストオブジェクトに相関IDを追加（後でログで使用）
  (req as Request & { correlationId: string }).correlationId = correlationId;
  
  next();
}
