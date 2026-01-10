# 環境変数ドキュメント

## 概要

このプロジェクトでは、GitHub Pagesでのデプロイとローカル開発の両方に対応するため、環境変数を使用しています。

## 環境変数一覧

### VITE_BASE_PATH

**説明**: GitHub Pagesのベースパスを指定します。

**デフォルト値**: `/medicalprompthub/`

**使用箇所**:
- `vite.config.ts` - Viteの`base`設定
- `client/src/lib/seo.ts` - BASE_URLの生成

**設定例**:
```bash
# 開発環境（.env.local）
VITE_BASE_PATH=/medicalprompthub/

# 本番環境（GitHub Actions）
VITE_BASE_PATH=/medicalprompthub/
```

### VITE_BASE_URL

**説明**: 完全なベースURLを指定します。`VITE_BASE_PATH`より優先されます。

**デフォルト値**: 未設定（`VITE_BASE_PATH`から自動生成）

**設定例**:
```bash
# カスタムドメインを使用する場合
VITE_BASE_URL=https://medicalprompthub.example.com
```

### VITE_ANALYTICS_ENDPOINT

**説明**: アナリティクスのエンドポイントURL。

**デフォルト値**: 未設定

**設定例**:
```bash
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
```

### VITE_ANALYTICS_WEBSITE_ID

**説明**: アナリティクスのウェブサイトID。

**デフォルト値**: 未設定

**設定例**:
```bash
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

## 環境変数の優先順位

1. `VITE_BASE_URL` - 完全なURLが指定されている場合、これが使用されます
2. `VITE_BASE_PATH` - パスから自動生成されます
3. デフォルト値 - `https://kgraph57.github.io/medicalprompthub`

## 設定ファイル

### 開発環境

`.env.local`ファイルを作成して、ローカル開発用の環境変数を設定できます：

```bash
# .env.local
VITE_BASE_PATH=/medicalprompthub/
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=
```

### 本番環境（GitHub Actions）

`.github/workflows/deploy.yml`で環境変数を設定：

```yaml
env:
  NODE_ENV: production
  VITE_BASE_PATH: /medicalprompthub/
```

## BASE_URLの生成ロジック

`client/src/lib/seo.ts`でのBASE_URL生成：

```typescript
export const BASE_URL = import.meta.env.VITE_BASE_URL || 
  (import.meta.env.VITE_BASE_PATH 
    ? `https://kgraph57.github.io${import.meta.env.VITE_BASE_PATH.replace(/\/$/, '')}`
    : "https://kgraph57.github.io/medicalprompthub");
```

## 使用方法

### コード内での使用

```typescript
import { BASE_URL } from "@/lib/seo";

// BASE_URLを使用
const url = `${BASE_URL}/courses/ai-basics`;
```

### 環境変数の確認

開発サーバー起動時に環境変数が正しく読み込まれているか確認：

```bash
# 開発サーバー起動
pnpm dev

# ブラウザのコンソールで確認
console.log(import.meta.env.VITE_BASE_PATH);
```

## トラブルシューティング

### 環境変数が読み込まれない

1. `.env.local`ファイルがプロジェクトルートに存在するか確認
2. 環境変数名が`VITE_`で始まっているか確認
3. 開発サーバーを再起動

### BASE_URLが正しく生成されない

1. `VITE_BASE_PATH`が正しく設定されているか確認
2. パスの末尾に`/`が含まれているか確認
3. `client/src/lib/seo.ts`の生成ロジックを確認

### GitHub Pagesでパスが正しく動作しない

1. GitHub Actionsのワークフローファイルで`VITE_BASE_PATH`が設定されているか確認
2. `vite.config.ts`の`base`設定が`VITE_BASE_PATH`と一致しているか確認
3. ビルド後の`dist`フォルダの構造を確認

## 関連ドキュメント

- [GitHub Pages セットアップガイド](./GITHUB_PAGES_SETUP.md)
- [デザイン改善計画書](./DESIGN_IMPROVEMENT_PLAN.md)
