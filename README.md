# Medical Prompt Hub

医療従事者のためのAIプロンプトライブラリ - AI Prompt Library for Healthcare Professionals

## 🌐 Live Demo
[https://kgraph57.github.io/medicalprompthub/](https://kgraph57.github.io/medicalprompthub/)

## 📖 About
Medical Prompt Hubは、医師や研究者がAI（ChatGPT, Claudeなど）を臨床、研究、教育に効果的に活用するためのプロンプト集です。
症例報告の作成、統計解析のコード生成、学会発表の準備など、具体的なタスクに特化した「使える」プロンプトを提供します。

## ✨ Features
- **Case Report Guide**: 構想から投稿までをサポートする完全ガイド
- **Statistical Analysis Support**: 初心者でもできるPython/Rコード生成
- **Conference Presentation**: 抄録作成から質疑応答対策まで
- **Journal Database**: 主要医学雑誌の投稿規定・IF検索
- **Consent Templates**: 各種同意書のダウンロード

## 🚀 Getting Started
1. 上記のLive Demoにアクセスします。
2. 目的のガイド（症例報告、統計解析など）を選択します。
3. ステップごとの解説を読み、必要なプロンプトをコピーしてAIチャットに貼り付けます。

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS, shadcn/ui
- **Build Tool**: Vite 7
- **Routing**: Wouter (Hash-based routing for GitHub Pages)
- **UI Components**: Radix UI, Framer Motion
- **Testing**: Vitest, React Testing Library
- **PWA**: Vite PWA Plugin

## 🚀 Development

### Prerequisites
- Node.js 20+
- pnpm 10+

### Installation
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build:client

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Type checking
pnpm check

# Format code
pnpm format
```

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_BASE_PATH=/medicalprompthub/
VITE_ANALYTICS_ENDPOINT=https://your-analytics-endpoint.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

## 📁 Project Structure
```
medical-prompt-hub/
├── client/              # フロントエンドアプリケーション
│   ├── src/
│   │   ├── components/  # Reactコンポーネント
│   │   ├── pages/       # ページコンポーネント
│   │   ├── lib/         # ユーティリティとデータ
│   │   ├── hooks/       # カスタムフック
│   │   ├── contexts/    # React Context
│   │   └── test/        # テスト設定とヘルパー
│   └── public/          # 静的ファイル
├── server/              # バックエンドAPI
├── shared/              # 共有コード
├── docs/                # ドキュメント
│   ├── design/          # デザイン/設計ドキュメント
│   ├── implementation/  # 実装メモ
│   ├── data/            # データファイル
│   └── share/           # シェア用メッセージ
├── drizzle/            # データベースマイグレーション
└── .github/             # GitHub Actions ワークフロー
```

## 🧪 Testing
プロジェクトはVitestを使用してテストを実行します。

```bash
# すべてのテストを実行
pnpm test

# ウォッチモードでテストを実行
pnpm test --watch

# カバレッジレポートを生成
pnpm test:coverage

# UIモードでテストを実行
pnpm test:ui
```

## 🚢 Deployment
GitHub Pagesへのデプロイは自動化されています。`main`ブランチにプッシュすると、GitHub Actionsが自動的にビルドとデプロイを実行します。

### 手動デプロイ
```bash
# ビルド
VITE_BASE_PATH=/medicalprompthub/ pnpm build:client

# ビルド成果物は dist/public/ に生成されます
```

## ♿ Accessibility
- ARIA属性の適切な使用
- キーボードナビゲーションのサポート
- スクリーンリーダー対応
- セマンティックHTMLの使用

## 🔍 SEO
- メタタグの最適化
- Open Graphタグ
- Twitter Card対応
- 構造化データ（将来実装予定）

## 📄 License
MIT License









