import { TRPCError } from "@trpc/server";

// シンプルなインメモリレート制限（本番環境ではRedis推奨）
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

const store: RateLimitStore = {};

// 定期的に古いエントリをクリーンアップ（1時間ごと）
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetAt < now) {
      delete store[key];
    }
  });
}, 60 * 60 * 1000);

export interface RateLimitOptions {
  windowMs: number; // 時間窓（ミリ秒）
  maxRequests: number; // 最大リクエスト数
  keyGenerator?: (userId: number | undefined, ip: string) => string;
}

export function createRateLimiter(options: RateLimitOptions) {
  const { windowMs, maxRequests, keyGenerator } = options;

  return (userId: number | undefined, ip: string): void => {
    const key = keyGenerator
      ? keyGenerator(userId, ip)
      : userId
      ? `user:${userId}`
      : `ip:${ip}`;

    const now = Date.now();
    const entry = store[key];

    if (!entry || entry.resetAt < now) {
      // 新しい時間窓を開始
      store[key] = {
        count: 1,
        resetAt: now + windowMs,
      };
      return;
    }

    // 既存の時間窓内でカウントを増やす
    entry.count++;

    if (entry.count > maxRequests) {
      const remainingSeconds = Math.ceil((entry.resetAt - now) / 1000);
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: `レート制限に達しました。${remainingSeconds}秒後に再試行してください。`,
      });
    }
  };
}

// よく使うレート制限のプリセット
export const rateLimiters = {
  // API呼び出し: 1分間に60リクエスト
  api: createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 60,
  }),

  // プロンプト投稿: 1時間に10回
  promptCreate: createRateLimiter({
    windowMs: 60 * 60 * 1000,
    maxRequests: 10,
    keyGenerator: (userId) => `prompt:create:${userId}`,
  }),

  // コメント投稿: 1分間に20回
  commentCreate: createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 20,
    keyGenerator: (userId) => `comment:create:${userId}`,
  }),

  // いいね/ブックマーク: 1分間に100回
  likeBookmark: createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 100,
  }),

  // 検索: 1分間に30回
  search: createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 30,
  }),
};




