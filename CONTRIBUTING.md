# Contributing to Medical Prompt Hub

Medical Prompt Hubへの貢献をありがとうございます！このドキュメントは、プロジェクトへの貢献方法を説明します。

## 🚀 はじめに

### 開発環境のセットアップ

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/kgraph57/medicalprompthub.git
   cd medicalprompthub
   ```

2. **依存関係をインストール**
   ```bash
   pnpm install
   ```

3. **開発サーバーを起動**
   ```bash
   pnpm dev
   ```
   ブラウザで `http://localhost:5173` を開きます。

## 📝 貢献の種類

### プロンプトの追加・改善

1. **新しいプロンプトを追加**
   - `client/src/lib/prompts-full.ts` にプロンプトを追加
   - 適切なカテゴリに分類
   - 説明と使用例を含める

2. **既存プロンプトの改善**
   - より明確な指示に改善
   - 医療現場での実用性を向上
   - 誤字・脱字の修正

### バグ修正

1. Issueを確認または作成
2. バグを再現できる最小限のケースを特定
3. 修正を実装
4. テストを追加（可能な場合）

### 機能追加

1. まずIssueで提案を議論
2. 実装前に設計を確認
3. 実装とテスト
4. ドキュメントの更新

## 🔄 開発ワークフロー

### ブランチ戦略

1. **mainブランチから新しいブランチを作成**
   ```bash
   git checkout -b feature/your-feature-name
   # または
   git checkout -b fix/your-bug-fix
   ```

2. **変更をコミット**
   - 明確で説明的なコミットメッセージを使用
   - 可能であれば、Conventional Commits形式を使用:
     - `feat: 新機能を追加`
     - `fix: バグを修正`
     - `docs: ドキュメントを更新`
     - `style: コードスタイルの変更`
     - `refactor: リファクタリング`
     - `test: テストを追加`
     - `chore: ビルドプロセスやツールの変更`

3. **変更をプッシュ**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **プルリクエストを作成**
   - 変更内容を明確に説明
   - 関連するIssueがあればリンク
   - スクリーンショットや動画があると助かります

## ✅ プルリクエストのチェックリスト

プルリクエストを作成する前に、以下を確認してください:

- [ ] コードがローカルで動作する
- [ ] テストが通る (`pnpm test`)
- [ ] 型チェックが通る (`pnpm check`)
- [ ] コードがフォーマットされている (`pnpm format`)
- [ ] 新しい機能には適切なドキュメントがある
- [ ] コミットメッセージが明確で説明的

## 🧪 テスト

```bash
# すべてのテストを実行
pnpm test

# ウォッチモードでテスト
pnpm test --watch

# カバレッジレポートを生成
pnpm test:coverage
```

## 📚 コードスタイル

- **Prettier**: コードは自動的にフォーマットされます
- **TypeScript**: 型安全性を重視
- **命名規則**: 
  - コンポーネント: PascalCase (`MyComponent.tsx`)
  - 関数・変数: camelCase (`myFunction`)
  - 定数: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🐛 Issueの報告

バグを発見した場合:

1. 既存のIssueを確認
2. 新しいIssueを作成
3. 以下の情報を含める:
   - バグの説明
   - 再現手順
   - 期待される動作
   - 実際の動作
   - 環境情報（ブラウザ、OSなど）
   - スクリーンショット（可能な場合）

## 💡 機能提案

新しい機能を提案する場合:

1. 既存のIssueを確認
2. 新しいIssueを作成
3. 以下の情報を含める:
   - 機能の説明
   - 使用例
   - 期待される利点
   - 実装の難易度の見積もり（可能な場合）

## 📖 ドキュメント

- README.md: プロジェクトの概要
- このCONTRIBUTING.md: 貢献方法
- コード内のコメント: 複雑なロジックの説明

## ❓ 質問がある場合

- Issueを作成して質問してください
- コミュニティのメンバーがサポートします

## 🙏 ありがとうございます！

あなたの貢献が、Medical Prompt Hubをより良いものにします。感謝しています！
