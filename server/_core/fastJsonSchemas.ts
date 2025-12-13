/**
 * fast-json-stringify用のJSONスキーマ定義
 * APIレスポンスの高速シリアライゼーションのため
 */

import fastJsonStringify from "fast-json-stringify";

// ヘルスチェックレスポンスのスキーマ
export const healthResponseSchema = fastJsonStringify({
  type: "object",
  properties: {
    status: { type: "string" },
    timestamp: { type: "string", format: "date-time" },
    uptime: { type: "number" },
    environment: { type: "string" },
  },
  required: ["status", "timestamp", "uptime", "environment"],
});

// エラーレスポンスのスキーマ
export const errorResponseSchema = fastJsonStringify({
  type: "object",
  properties: {
    error: { type: "string" },
    message: { type: "string" },
    correlationId: { type: "string" },
  },
  required: ["error"],
});

// メトリクスレスポンスのスキーマ（複雑な構造のためadditionalPropertiesを許可）
export const metricsResponseSchema = fastJsonStringify({
  type: "object",
  properties: {
    timestamp: { type: "string", format: "date-time" },
    metrics: {
      type: "object",
      properties: {
        http: {
          type: "object",
          properties: {
            request_duration: {
              type: "object",
              additionalProperties: true,
            },
            errors_total: {
              type: "object",
              additionalProperties: true,
            },
          },
          additionalProperties: true,
        },
        counters: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: true,
          },
        },
        histograms: {
          type: "object",
          additionalProperties: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: true,
            },
          },
        },
      },
      additionalProperties: true,
    },
  },
  required: ["timestamp", "metrics"],
});

// ログエントリーのスキーマ
export const logEntrySchema = fastJsonStringify({
  type: "object",
  properties: {
    timestamp: { type: "string", format: "date-time" },
    level: { type: "string" },
    message: { type: "string" },
    context: {
      type: "object",
      additionalProperties: true,
    },
    error: {
      type: "object",
      properties: {
        name: { type: "string" },
        message: { type: "string" },
        stack: { type: "string" },
      },
      additionalProperties: true,
    },
    environment: { type: "string" },
    service: { type: "string" },
    correlationId: { type: "string" },
  },
  required: ["timestamp", "level", "message", "environment", "service"],
});
