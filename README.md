# Medical Prompt Hub

医療従事者のためのAIプロンプトライブラリ - AI Prompt Library for Healthcare Professionals

## 🌐 Live Demo
**[https://kgraph57.github.io/medicalprompthub/](https://kgraph57.github.io/medicalprompthub/)**

## 📖 About
Medical Prompt Hubは、医師や研究者がAI（ChatGPT, Claude, Geminiなど）を臨床、研究、教育に効果的に活用するための**実践的なプロンプト集**です。

### 主な特徴
- **100以上の専門プロンプト**: 診断支援、治療計画、論文執筆、学会発表など、医療現場で実際に使えるプロンプトを網羅
- **カテゴリ別整理**: 10のカテゴリに分類され、必要なプロンプトをすぐに見つけられる
- **コピー&ペースト**: すべてのプロンプトはそのままAIチャットにコピーして使用可能
- **実践的なガイド**: 症例報告の書き方、統計解析の方法など、ステップバイステップのワークフローを提供
- **41のAI活用Tips**: プロンプトエンジニアリングの基礎から応用まで、医療従事者向けに解説

## ✨ Features

### 📚 プロンプトライブラリ
10のカテゴリに分類された100以上の専門プロンプト:
- **診断支援**: 鑑別診断、症状分析、検査結果解釈
- **治療計画**: エビデンスに基づいた治療オプションの提示
- **書類作成**: 紹介状、退院サマリー、インシデントレポート
- **薬剤・処方**: 腎機能調整、薬剤相互作用チェック
- **患者対話**: 病状説明、悪い知らせの伝え方（SPIKES）
- **医学文献**: 論文要約、批判的吟味（CASP）
- **研究・学会**: 症例報告、統計解析、学会発表
- **症例分析**: Case Presentation作成
- **教育・学習**: 解剖・生理学の解説
- **管理・運営**: インシデント管理

### 🎯 ワークフローガイド
複雑なタスクを段階的にサポート:
- **症例報告ワークフロー**: 構想から投稿までの完全ガイド
- **統計解析サポート**: Python/Rコード生成と結果解釈
- **学会発表準備**: 抄録作成から質疑応答対策まで

### 💡 AI活用Tips
41個のプロンプトエンジニアリング技術を医療従事者向けに解説:
- プロンプトの基本構造
- 効果的な指示の書き方
- 医療特化のテクニック
- エラー対処法

## 🚀 Getting Started

1. **[Live Demo](https://kgraph57.github.io/medicalprompthub/)** にアクセス
2. 目的に応じてプロンプトを検索またはカテゴリから選択
3. プロンプトをコピーしてAIチャット（ChatGPT, Claude, Geminiなど）に貼り付け
4. 必要に応じてプロンプト内の`[ ]`部分を自分の情報に置き換え

### 使用例
```
診断支援 > 鑑別診断ジェネレーター
↓
プロンプトをコピー
↓
ChatGPTに貼り付け
↓
患者情報を入力
↓
鑑別診断リストを取得
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - 最新のReactフレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - ユーティリティファーストCSS
- **shadcn/ui** - 高品質UIコンポーネント
- **Radix UI** - アクセシブルなプリミティブ
- **Framer Motion** - アニメーション

### Build & Development
- **Vite 7** - 高速ビルドツール
- **Wouter** - 軽量ルーティング
- **Vitest** - ユニットテスト
- **React Testing Library** - コンポーネントテスト

### Deployment
- **GitHub Pages** - 静的ホスティング
- **GitHub Actions** - CI/CD自動化

## 🚀 Development

### Prerequisites
- Node.js 20+
- pnpm 10+

### Installation
```bash
# リポジトリをクローン
git clone https://github.com/kgraph57/medicalprompthub.git
cd medicalprompthub

# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm dev

# ブラウザで http://localhost:5173 を開く
```

### Available Scripts
```bash
# 開発サーバー起動
pnpm dev

# 本番ビルド
pnpm build:client

# テスト実行
pnpm test

# カバレッジ付きテスト
pnpm test:coverage

# 型チェック
pnpm check

# コードフォーマット
pnpm format
```

## 📁 Project Structure
```
medicalprompthub/
├── client/              # フロントエンドアプリケーション
│   ├── src/
│   │   ├── components/  # Reactコンポーネント
│   │   ├── pages/       # ページコンポーネント
│   │   │   ├── Home.tsx
│   │   │   ├── Tips.tsx
│   │   │   └── Guides.tsx
│   │   ├── lib/         # データとユーティリティ
│   │   │   ├── prompts-full.ts  # 全プロンプトデータ
│   │   │   ├── tips.ts          # AI活用Tips
│   │   │   └── journals.ts      # ジャーナルデータベース
│   │   ├── hooks/       # カスタムフック
│   │   └── contexts/    # React Context
│   └── public/          # 静的ファイル
│       └── 404.html     # GitHub Pages用SPAリダイレクト
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions設定
├── docs/                # ドキュメント
├── vite.config.ts       # Vite設定
└── README.md
```

## 🧪 Testing
```bash
# すべてのテストを実行
pnpm test

# ウォッチモードでテスト
pnpm test --watch

# カバレッジレポート生成
pnpm test:coverage

# UIモードでテスト
pnpm test:ui
```

## 🚢 Deployment

### 自動デプロイ
`main`ブランチにプッシュすると、GitHub Actionsが自動的にビルドとデプロイを実行します。

### 手動デプロイ
```bash
# 本番ビルド
pnpm build:client

# dist/ディレクトリがGitHub Pagesにデプロイされます
```

## 🎨 Design Philosophy
- **モダンでクリーン**: Zennやnani.now/jaのようなミニマルデザイン
- **アクセシブル**: ARIA属性、キーボードナビゲーション、スクリーンリーダー対応
- **レスポンシブ**: モバイル、タブレット、デスクトップに最適化
- **高速**: Viteによる高速ビルド、遅延ロード、コード分割

## 🤝 Contributing
プロンプトの追加や改善の提案を歓迎します！

詳細な貢献方法については、[CONTRIBUTING.md](./CONTRIBUTING.md) をご覧ください。

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-prompt`)
3. 変更をコミット (`git commit -m 'Add amazing prompt'`)
4. ブランチにプッシュ (`git push origin feature/amazing-prompt`)
5. プルリクエストを作成

### 行動規範
このプロジェクトは [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md) に従います。

### セキュリティ
セキュリティ上の問題を発見した場合は、[SECURITY.md](./SECURITY.md) に従って報告してください。

## 📄 License
MIT License

## 🙏 Acknowledgments
- すべての医療従事者の皆様
- AIコミュニティの貢献者
- オープンソースプロジェクトの開発者

---

**Made with ❤️ for Healthcare Professionals**
