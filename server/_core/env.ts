/**
 * 環境変数の検証と型安全なアクセス
 * Zodを使用して環境変数を検証し、型安全にアクセスできるようにする
 */

import { z } from "zod";

/**
 * 環境変数のスキーマ定義
 * 必須の環境変数とオプションの環境変数を定義
 */
const envSchema = z.object({
  // Node環境
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // サーバー設定
  PORT: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 3000)),

  // データベース
  DATABASE_URL: z.string().optional(),

  // セッション・認証
  SESSION_SECRET: z.string().optional(),
  COOKIE_SECRET: z.string().optional(),

  // オーナー設定
  OWNER_OPEN_ID: z.string().optional(),
  // 既存コードとの互換性のため（小文字版）
  ownerOpenId: z.string().optional(),

  // アナリティクス（オプション）
  VITE_ANALYTICS_ENDPOINT: z.string().url().optional(),
  VITE_ANALYTICS_WEBSITE_ID: z.string().optional(),

  // Sentry（オプション）
  SENTRY_DSN: z.string().url().optional(),
  VITE_SENTRY_DSN: z.string().url().optional(),

  // Redis（オプション）
  REDIS_URL: z.string().url().optional(),

  // その他
  BASE_PATH: z.string().optional(),
});

/**
 * 環境変数を検証して型安全なオブジェクトとして返す
 */
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((issue) => 
        `${issue.path.join(".")}: ${issue.message}`
      );
      throw new Error(
        `環境変数の検証に失敗しました:\n${missingVars.join("\n")}\n\n` +
          "必須の環境変数が設定されているか確認してください。"
      );
    }
    throw error;
  }
}

/**
 * 検証済みの環境変数
 * このオブジェクトを通じて環境変数にアクセスすることで、型安全性が保証されます
 */
const validatedEnv = validateEnv();

/**
 * 既存コードとの互換性を保つためのENVオブジェクト
 */
export const ENV = {
  ...validatedEnv,
  // 既存コードで使用されているプロパティ名
  ownerOpenId: validatedEnv.OWNER_OPEN_ID,
};

/**
 * 環境変数の型定義（他のファイルで使用）
 */
export type Env = z.infer<typeof envSchema>;

/**
 * 開発環境かどうか
 */
export const isDevelopment = ENV.NODE_ENV === "development";

/**
 * 本番環境かどうか
 */
export const isProduction = ENV.NODE_ENV === "production";

/**
 * テスト環境かどうか
 */
export const isTest = ENV.NODE_ENV === "test";
