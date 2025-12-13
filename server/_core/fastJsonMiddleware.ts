/**
 * fast-json-stringifyを使用したExpressレスポンス最適化ミドルウェア
 * res.json()を高速化するためのヘルパー関数
 */

import { Response } from "express";
import {
  healthResponseSchema,
  errorResponseSchema,
  metricsResponseSchema,
} from "./fastJsonSchemas";

/**
 * ExpressのResponse型を拡張してfast-json-stringifyのメソッドを追加
 */
declare global {
  namespace Express {
    interface Response {
      fastJson?: {
        health: (data: {
          status: string;
          timestamp: string;
          uptime: number;
          environment: string;
        }) => void;
        error: (data: {
          error: string;
          message?: string;
          correlationId?: string;
        }) => void;
        metrics: (data: {
          timestamp: string;
          metrics: unknown;
        }) => void;
      };
    }
  }
}

/**
 * fast-json-stringifyを使用したJSONレスポンスヘルパー
 * 既存のres.json()を拡張し、特定のエンドポイントで高速化を提供
 */
export function fastJsonResponse(res: Response): void {
  res.fastJson = {
    health: (data) => {
      res.setHeader("Content-Type", "application/json");
      res.send(healthResponseSchema(data));
    },
    error: (data) => {
      res.setHeader("Content-Type", "application/json");
      res.send(errorResponseSchema(data));
    },
    metrics: (data) => {
      res.setHeader("Content-Type", "application/json");
      res.send(metricsResponseSchema(data));
    },
  };
}

/**
 * Expressミドルウェアとしてfast-json-stringifyを有効化
 * すべてのレスポンスオブジェクトにfastJsonメソッドを追加
 */
export function fastJsonMiddleware(
  _req: unknown,
  res: Response,
  next: () => void
): void {
  fastJsonResponse(res);
  next();
}
