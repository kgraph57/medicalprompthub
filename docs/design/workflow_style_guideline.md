# Workflow/Guide スタイルガイドライン

## 概要

このドキュメントは、今後作成するすべてのWorkflowとGuideのUI/UXデザインの標準を定義します。
**Zennの記事スタイル**を基準とし、読みやすく、使いやすいデザインを提供します。

参考: https://zenn.dev/catnose99/articles/nani-translate

## レイアウト構造

### 基本構成

```
┌─────────────────────────────────────────────────────┐
│ Header (固定)                                        │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│  Sidebar     │  Main Content                        │
│  (固定)      │  (スクロール可能)                     │
│              │                                      │
│  - 進捗表示  │  - 記事コンテンツ                     │
│  - 目次      │  - Markdown表示                      │
│              │  - 最大幅: 680px                     │
│              │  - padding: 48px 40px                │
│              │                                      │
└──────────────┴──────────────────────────────────────┘
```

### 実装のポイント

1. **ヘッダー**
   - `position: sticky`で固定
   - 「ガイド一覧に戻る」ボタンを配置
   - ガイドのタイトルを表示

2. **サイドバー（左側）**
   - `position: sticky`で固定
   - スクロールは**ページ全体**で行う（ScrollAreaを使わない）
   - 幅: lg:col-span-1（グリッドの1/4）

3. **メインコンテンツ（右側）**
   - 幅: lg:col-span-3（グリッドの3/4）
   - 通常のページスクロール
   - ScrollAreaコンポーネントは使用しない

## コンテンツスタイル

### 記事エリア（.zenn-article）

```css
.zenn-article {
  max-width: 680px;
  margin: 0 auto;
  padding: 48px 40px;
  background: white;
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.9;
  color: #333;
}
```

### タイポグラフィ

| 要素 | フォントサイズ | 余白（上/下） | 行間 |
|------|--------------|--------------|------|
| 本文（p） | 16px | 24px / 24px | 1.9 |
| 見出しH2 | 28px | 48px / 24px | 1.4 |
| 見出しH3 | 24px | 32px / 16px | 1.4 |
| 見出しH4 | 20px | 24px / 12px | 1.4 |

### リスト

- **リスト全体の余白**: 上下24px
- **左padding**: 24px
- **リスト項目間**: 上下8px

### コードブロック

```css
.zenn-article code {
  background: #f6f6f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
  font-family: 'Consolas', 'Monaco', monospace;
}

.zenn-article pre {
  background: #f6f6f6;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin-top: 24px;
  margin-bottom: 24px;
}
```

### 引用（blockquote）

```css
.zenn-article blockquote {
  border-left: 4px solid #ddd;
  padding-left: 16px;
  margin-top: 24px;
  margin-bottom: 24px;
  color: #666;
}
```

### テーブル

```css
.zenn-article table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
  margin-bottom: 24px;
}

.zenn-article th,
.zenn-article td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.zenn-article th {
  background: #f6f6f6;
  font-weight: 600;
}
```

### 画像

```css
.zenn-article img {
  max-width: 100%;
  height: auto;
  margin-top: 24px;
  margin-bottom: 24px;
  border-radius: 8px;
}
```

## 文字のはみ出し防止

すべての要素に以下を適用：

```css
.zenn-article * {
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

サイドバーの目次ボタンにも適用：

```tsx
className="... break-words"
```

## サイドバーコンポーネント

### 進捗状況

- 完了したステップ数 / 総ステップ数
- プログレスバー（視覚的な進捗表示）
- パーセンテージ表示

### 目次

- フェーズごとにグループ化
- 現在のステップをハイライト
- 完了したステップにチェックマーク
- 所要時間の表示
- **長いタイトルは折り返す**（break-words）

## ダークモード対応

すべてのスタイルにダークモード対応を追加：

```css
.dark .zenn-article {
  background: oklch(0.16 0.015 260);
  color: oklch(0.98 0.002 260);
}

.dark .zenn-article code,
.dark .zenn-article pre {
  background: oklch(0.22 0.015 260);
}

.dark .zenn-article blockquote {
  border-left-color: oklch(0.4 0.01 260);
  color: oklch(0.7 0.003 260);
}

.dark .zenn-article th,
.dark .zenn-article td {
  border-color: oklch(0.3 0.01 260);
}

.dark .zenn-article th {
  background: oklch(0.22 0.015 260);
}
```

## タイトルの命名規則

### 長いタイトルの短縮

文字数が多く、サイドバーからはみ出す場合は、以下のルールで短縮：

1. **「の執筆」を削除**
   - ❌ `Step 10: 症例提示(Case Presentation)の執筆`
   - ✅ `Step 10: 症例提示(Case Presentation)`

2. **「の作成」を削除**（必要に応じて）
   - ❌ `Step 7: 図表の作成`
   - ✅ `Step 7: 図表`

3. **英語部分を省略**（最終手段）
   - ❌ `Step 10: 症例提示(Case Presentation)`
   - ✅ `Step 10: 症例提示`

## 実装チェックリスト

新しいWorkflow/Guideを作成する際は、以下を確認：

- [ ] ヘッダーは`position: sticky`で固定
- [ ] サイドバーは`position: sticky`で固定
- [ ] メインコンテンツは`.zenn-article`クラスを使用
- [ ] 最大幅は680px
- [ ] padding は 48px 40px
- [ ] 行間は1.9
- [ ] 段落間は24px
- [ ] 見出しの余白は適切（H2: 48px/24px、H3: 32px/16px）
- [ ] すべての要素に`word-wrap: break-word`と`overflow-wrap: break-word`
- [ ] サイドバーの目次ボタンに`break-words`クラス
- [ ] ダークモード対応
- [ ] ScrollAreaコンポーネントは使用しない
- [ ] 長いタイトルは「の執筆」「の作成」を削除

## 参考実装

- **ファイル**: `client/src/pages/CaseReportGuide.tsx`
- **スタイル**: `client/src/index.css`（.zenn-articleクラス）
- **データ**: `client/src/lib/case-report-guide-data.ts`

## まとめ

このガイドラインに従うことで、すべてのWorkflow/Guideが統一されたデザインと使いやすさを持ち、Zennのような高品質な読書体験を提供できます。
