# 症例報告執筆ガイド - Web統合実装計画

## 現状分析

### 既存の構造
- **フレームワーク**: React + TypeScript + Wouter (ルーティング)
- **既存のガイドページ**: `/guides/:id` で GuideDetail.tsx が表示
- **ガイドデータ**: ハードコードされたJavaScriptオブジェクト
- **Markdownファイル**: `guides/case-report/` に18ステップ分のファイルが存在

### 課題
1. Markdownファイルを読み込んで表示する機能が未実装
2. 固定ナビゲーション（目次）が未実装
3. 進捗表示機能が未実装

## 実装方針

### アプローチ1: 既存GuideDetailを拡張（推奨）

**メリット**:
- 既存のルーティング `/guides/case-report-complete` を活用
- 既存のUIコンポーネントを再利用
- 最小限の変更で実装可能

**実装内容**:
1. Markdownファイルをpublicディレクトリにコピー
2. GuideDetailで特定のID (`case-report-complete`) の場合、Markdownを動的に読み込み
3. react-markdownでレンダリング
4. 固定ナビゲーションコンポーネントを追加

### アプローチ2: 新規ページ作成

**メリット**:
- 完全にカスタマイズ可能
- 既存コードに影響なし

**デメリット**:
- 新規ルート追加が必要
- 実装量が多い

## 選択: アプローチ1（既存GuideDetail拡張）

## 詳細設計

### 1. ファイル配置
```
public/
└── guides/
    └── case-report/
        ├── 00-introduction.md
        ├── 01-preparation/
        │   ├── step-01.md
        │   ├── step-02.md
        │   ...
        ├── 02-writing/
        ├── 03-finishing/
        └── 04-submission/
```

### 2. データ構造

```typescript
interface CaseReportGuide {
  id: string;
  title: string;
  description: string;
  phases: Phase[];
}

interface Phase {
  id: string;
  title: string;
  steps: Step[];
}

interface Step {
  id: string;
  title: string;
  markdownPath: string;
  estimatedTime: string;
}
```

### 3. UIコンポーネント構成

```
CaseReportGuidePage
├── Header (タイトル、説明)
├── Layout (2カラム)
│   ├── FixedNavigation (左サイド、固定)
│   │   ├── PhaseList
│   │   │   └── StepList
│   │   └── ProgressIndicator
│   └── ContentArea (右サイド、スクロール可能)
│       └── MarkdownRenderer
└── Footer
```

### 4. 固定ナビゲーション仕様

- **位置**: 左サイド、画面に固定
- **幅**: 280px
- **内容**:
  - Phase 1: 準備
    - ✓ Step 1: 症例の選定
    - □ Step 2: 症例の新規性確認
    - ...
  - Phase 2: 執筆
    - ...
- **機能**:
  - 現在表示中のStepをハイライト
  - クリックで該当Stepにジャンプ
  - 完了したStepにチェックマーク（localStorage保存）

### 5. 進捗表示

- **位置**: ナビゲーション上部
- **形式**: プログレスバー + パーセンテージ
- **計算**: 完了Step数 / 総Step数 × 100

## 実装手順

### Step 1: Markdownファイルの配置
```bash
cp -r guides/case-report public/guides/
```

### Step 2: 必要なパッケージのインストール
```bash
npm install react-markdown remark-gfm rehype-raw
```

### Step 3: ガイドデータの定義
`client/src/lib/case-report-guide-data.ts` を作成

### Step 4: MarkdownViewerコンポーネント作成
`client/src/components/MarkdownViewer.tsx` を作成

### Step 5: FixedNavigationコンポーネント作成
`client/src/components/CaseReportNavigation.tsx` を作成

### Step 6: GuideDetailの拡張
`case-report-complete` IDの場合の分岐処理を追加

### Step 7: Guidesページへのリンク追加
既存のGuidesページに新しいガイドカードを追加

## 技術スタック

- **Markdown解析**: react-markdown
- **Markdown拡張**: remark-gfm (GitHub Flavored Markdown)
- **HTML対応**: rehype-raw
- **スクロール検出**: Intersection Observer API
- **状態管理**: useState + localStorage (進捗保存)
- **スタイリング**: Tailwind CSS + shadcn/ui

## 参考デザイン

- Zenn記事ページ (https://zenn.dev)
- nani.now/ja のクリーンなデザイン
- 固定サイドバー + スクロールコンテンツのレイアウト
