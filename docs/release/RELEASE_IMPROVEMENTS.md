# Medical Prompt Hub - リリース前改善提案と実装ガイド

## 📊 現在の実装状況

### ✅ 既に実装されている機能
- エラーハンドリング（ErrorBoundary）
- アナリティクス（useAnalyticsフック、データベーステーブル）
- レート制限（インメモリ実装）
- 認証・認可（OpenID、protectedProcedure）
- 法的表記ページ（Legal.tsx）
- 管理者ダッシュボード
- PWA基盤（Service Worker、manifest.json）

### ⚠️ 改善が必要な項目

---

## 🔴 最優先改善項目

### 1. エラートラッキングの導入

**現状**: エラーログはコンソールに出力されるのみ

**推奨**: Sentryの導入

```typescript
// client/src/lib/sentry.ts
import * as Sentry from "@sentry/react";

export function initSentry() {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay(),
      ],
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
}
```

**実装手順**:
1. `@sentry/react`をインストール
2. `client/src/lib/sentry.ts`を作成
3. `client/src/main.tsx`で初期化
4. ErrorBoundaryでSentryにエラーを送信

---

### 2. レート制限の本番環境対応

**現状**: インメモリ実装（サーバー再起動でリセット）

**推奨**: Redisへの移行

```typescript
// server/_core/rateLimit.ts の改善
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export function createRateLimiter(options: RateLimitOptions) {
  return async (userId: number | undefined, ip: string): Promise<void> => {
    const key = keyGenerator
      ? keyGenerator(userId, ip)
      : userId
      ? `user:${userId}`
      : `ip:${ip}`;

    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, Math.ceil(options.windowMs / 1000));
    }

    if (count > options.maxRequests) {
      const ttl = await redis.ttl(key);
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: `レート制限に達しました。${ttl}秒後に再試行してください。`,
      });
    }
  };
}
```

**実装手順**:
1. Redisサーバーのセットアップ（Upstash等）
2. `ioredis`をインストール
3. レート制限ロジックをRedis対応に変更
4. フォールバック（Redis接続失敗時はインメモリ）を実装

---

### 3. SEO最適化

**現状**: 基本的なメタタグのみ

**推奨**: 各ページに適切なメタタグを追加

```typescript
// client/src/components/SEO.tsx
export function SEO({
  title,
  description,
  ogImage,
  path,
}: {
  title: string;
  description: string;
  ogImage?: string;
  path: string;
}) {
  const fullTitle = `${title} | Medical Prompt Hub`;
  const url = `https://kgraph57.github.io/medicalprompthub${path}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url} />
    </>
  );
}
```

**実装手順**:
1. SEOコンポーネントを作成
2. 各ページに適用
3. `robots.txt`を作成
4. `sitemap.xml`を生成（動的または静的）

---

### 4. プライバシーポリシー・利用規約の充実

**現状**: 基本的な内容のみ（Legal.tsx）

**改善点**:
- GDPR/個人情報保護法への準拠を明記
- Cookieポリシーの詳細化
- データ削除権の明記
- お問い合わせ先の追加

**実装手順**:
1. 法的レビュー（可能であれば）
2. Legal.tsxの内容を充実
3. Cookie同意バナーの実装（必要に応じて）

---

### 5. テストカバレッジの向上

**現状**: ErrorBoundaryとutilsのテストのみ

**推奨**: 主要コンポーネントのテスト追加

```typescript
// client/src/components/SearchAutocomplete.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchAutocomplete from "./SearchAutocomplete";

describe("SearchAutocomplete", () => {
  it("should render search input", () => {
    render(<SearchAutocomplete />);
    expect(screen.getByPlaceholderText(/検索/i)).toBeInTheDocument();
  });

  it("should call onSearch when typing", () => {
    const onSearch = vi.fn();
    render(<SearchAutocomplete onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(/検索/i);
    fireEvent.change(input, { target: { value: "test" } });
    expect(onSearch).toHaveBeenCalledWith("test");
  });
});
```

**実装手順**:
1. 主要コンポーネントのテストを追加
2. APIエンドポイントのテストを追加
3. カバレッジ80%を目標に

---

## 🟡 高優先度改善項目

### 6. オンボーディングウィザードの実装

**設計**: `docs/implementation/ONBOARDING_IMPLEMENTATION.md`参照

**実装手順**:
1. OnboardingWizardコンポーネントの作成
2. ロール選択画面
3. シナリオ選択画面
4. 最初のプロンプト試用画面
5. ローカルストレージに完了状態を保存

---

### 7. パフォーマンス最適化

**現状**: 基本的なコード分割は実装済み

**改善点**:
- 画像の最適化（WebP形式、遅延読み込み）
- フォントの最適化
- バンドルサイズの削減

```typescript
// 画像の遅延読み込み
<img
  src={imageSrc}
  loading="lazy"
  decoding="async"
  alt={alt}
/>
```

**実装手順**:
1. Lighthouseでパフォーマンススコアを測定
2. 問題点を特定
3. 段階的に改善

---

### 8. アクセシビリティの改善

**現状**: Radix UIを使用しているため基本的な対応はある

**改善点**:
- キーボードナビゲーションの確認
- スクリーンリーダーのテスト
- 色のコントラスト比の確認

**実装手順**:
1. axe DevToolsでアクセシビリティ監査
2. 問題点を修正
3. 実際のスクリーンリーダーでテスト

---

### 9. PWA機能の本番有効化

**現状**: 開発環境のみ有効

**改善点**:
- 本番環境でのPWA有効化
- Service Workerの最適化
- オフライン機能の改善

```typescript
// vite.config.ts
VitePWA({
  registerType: "autoUpdate",
  // 本番環境でも有効化
  includeAssets: ["favicon.ico", "apple-touch-icon.png"],
  manifest: {
    // ... 設定
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\./,
        handler: "NetworkFirst",
        options: {
          cacheName: "api-cache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60, // 1時間
          },
        },
      },
    ],
  },
})
```

---

### 10. モニタリング・アラートの設定

**現状**: アナリティクスは実装済み

**改善点**:
- エラー率の監視
- パフォーマンスメトリクスの監視
- アラートの設定

**実装手順**:
1. Sentryでエラー監視
2. パフォーマンス監視（Sentry Performance）
3. アラートルールの設定

---

## 🟢 中優先度改善項目

### 11. E2Eテストの導入

**推奨**: Playwright

```typescript
// e2e/prompt-creation.spec.ts
import { test, expect } from "@playwright/test";

test("should create a new prompt", async ({ page }) => {
  await page.goto("/");
  await page.click("text=ログイン");
  // ... テストコード
});
```

---

### 12. ドキュメントの充実

**改善点**:
- APIドキュメントの作成
- アーキテクチャドキュメント
- デプロイ手順書

---

### 13. 多言語対応の検討

**将来的な改善**:
- i18nライブラリの導入
- 英語版の追加

---

## 📋 実装優先順位

### Phase 1（リリース前必須）
1. ✅ エラートラッキング（Sentry）
2. ✅ SEO最適化
3. ✅ プライバシーポリシーの充実
4. ✅ テストカバレッジ向上（最低限）

### Phase 2（リリース後1-2週間）
1. レート制限のRedis移行
2. オンボーディングウィザード
3. パフォーマンス最適化
4. モニタリング・アラート

### Phase 3（リリース後1ヶ月）
1. E2Eテスト
2. アクセシビリティ完全対応
3. PWA機能の充実
4. ドキュメントの充実

---

## 🛠️ 実装チェックリスト

各項目を実装する際は、以下を確認：

- [ ] コードレビュー
- [ ] テストの追加
- [ ] ドキュメントの更新
- [ ] 本番環境での動作確認
- [ ] パフォーマンスへの影響確認

---

## 📝 注意事項

1. **段階的な実装**: 一度にすべてを実装せず、優先度に従って段階的に進める
2. **テスト**: 各機能を実装したら必ずテストを追加
3. **ドキュメント**: 実装と同時にドキュメントも更新
4. **モニタリング**: 本番環境にデプロイ後、モニタリングを確認

---

**最終更新日**: 2025-01-XX
