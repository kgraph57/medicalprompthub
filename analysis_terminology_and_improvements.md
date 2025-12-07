# 症例報告執筆ガイド：用語統一と改善点の分析

## 1. 用語の現状分析

### 1.1 Phase vs Step の使用状況

**Phaseを使用しているファイル:**
- `docs/design/guide_case_report_design.md`: Phase 1-5（5段階）
- `docs/implementation/ONBOARDING_IMPLEMENTATION.md`: Phase 1-4（実装計画）

**Stepを使用しているファイル:**
- `docs/design/guide_case_report_detailed_design.md`: Step 0-10（11段階）
- `docs/design/guide_advanced_design.md`: Step 1-5（統計解析、学会発表）
- `docs/design/guide_paper_writing_design.md`: Step 1-4（論文執筆）

### 1.2 統一方針の提案

**推奨: "Step"に統一**

理由:
1. **ユーザー視点**: "Step"は「手順」「ステップバイステップ」という意味で、実行可能なアクションを連想させる
2. **一貫性**: 既存のガイドの大半がStepを使用している
3. **日本語との親和性**: 「ステップ」は日本語でも自然に使われる外来語
4. **実装との整合性**: `client/src/pages/Guides.tsx`のインターフェースでも`WorkflowStep`を使用

**統一ルール:**
- ワークフローガイド内の段階: **Step**
- プロジェクト実装計画: **Phase**（開発フェーズとして区別）
- ユーザー向けコンテンツ: すべて**Step**

## 2. 現状の症例報告ガイドの問題点

### 2.1 設計ドキュメントが複数存在

1. `guide_case_report_design.md`: Phase 1-5（5段階、簡潔版）
2. `guide_case_report_detailed_design.md`: Step 0-10（11段階、詳細版）

→ **問題**: どちらが最終版か不明確。統合が必要。

### 2.2 「読むだけで実行できる」レベルに達していない要素

#### 欠けている具体的情報:

1. **タイムライン・スケジュール感**
   - 各ステップにどれくらい時間がかかるか
   - 全体でどれくらいの期間が必要か
   - 並行して進められる作業は何か

2. **具体的な成果物の例**
   - 各ステップで何を完成させるべきか
   - 完成形のイメージ（テンプレート、サンプル）

3. **チェックリスト**
   - 各ステップ完了の判断基準
   - 次のステップに進む前の確認事項

4. **トラブルシューティング**
   - よくある失敗例
   - 詰まったときの対処法
   - 指導医に相談すべきタイミング

5. **必要なツール・リソースの明示**
   - 各ステップで使うツール（PubMed, Zotero, DeepL等）
   - アカウント登録が必要なサービス
   - 病院で確認すべき規定

6. **プロンプトの具体的な使い方**
   - 入力例と出力例
   - プロンプトのカスタマイズ方法
   - AIの回答をどう活用するか

7. **症例報告の基礎知識**
   - 症例報告とは何か（定義、意義）
   - CAREガイドラインの詳細
   - 倫理的配慮（同意取得、匿名化）

8. **論文の構成要素の詳細説明**
   - Title, Abstract, Introduction, Case Presentation, Discussion, Conclusionの役割
   - 各セクションの文字数目安
   - 図表の配置ルール

## 3. 完全版ガイドに必要な要素

### 3.1 構成案

```
【完全版】症例報告執筆ガイド：構想から投稿まで

■ 導入部
- 症例報告とは何か
- なぜ症例報告を書くのか
- このガイドの使い方
- 全体のロードマップ（視覚化）

■ 準備編（Before You Start）
- 必要なもの・準備すべきこと
- 倫理的配慮と同意取得
- 使用するツール一覧
- 想定スケジュール

■ 実践編（Step-by-Step）
Step 1: 症例の選定と情報収集
Step 2: CAREガイドラインチェック
Step 3: タイムライン作成
Step 4: 文献検索と新規性の確認
Step 5: 症例提示（Case Presentation）の執筆
Step 6: 考察（Discussion）の構成
Step 7: 考察の執筆
Step 8: Introduction/Abstractの作成
Step 9: ジャーナル選定
Step 10: 投稿規定への適合
Step 11: カバーレター作成
Step 12: 投稿と査読対応

■ 各ステップの構成
1. 目的（このステップで何を達成するか）
2. 所要時間（目安）
3. 必要なもの（ツール、情報）
4. 具体的な手順（番号付きリスト）
5. 使用するプロンプト（入力例・出力例付き）
6. チェックリスト（完了基準）
7. よくある問題と対処法
8. 次のステップへ

■ 補足資料
- 用語集
- 参考文献
- テンプレート集
- FAQ
```

### 3.2 視覚的要素

1. **プログレスバー**: 全体の進捗を示す
2. **固定サイドバー**: 現在のステップをハイライト
3. **フローチャート**: 全体の流れを俯瞰
4. **アイコン**: 各ステップの種類を視覚化（文献検索、執筆、チェック等）
5. **カラーコーディング**: ステップの種類別に色分け

### 3.3 インタラクティブ要素

1. **チェックボックス**: 完了したステップをチェック
2. **折りたたみ可能なセクション**: 詳細情報を必要に応じて表示
3. **プロンプトのワンクリックコピー**: ボタンでコピー
4. **推定完了時刻**: チェックした項目から残り時間を計算

## 4. 次世代ツールの統合

### 4.1 文献検索の進化

- **従来**: PubMed + 手動スクリーニング
- **次世代**: 
  - Consensus（AI論文検索）
  - Elicit（研究質問への回答抽出）
  - Connected Papers（関連論文の可視化）
  - NotebookLM（文献の要約と対話）

### 4.2 執筆支援の進化

- **従来**: DeepL + Grammarly
- **次世代**:
  - Claude/ChatGPT（医学論文特化プロンプト）
  - Writefull（学術英語特化）
  - Paperpal（論文校正AI）

### 4.3 文献管理の進化

- **従来**: EndNote, Mendeley
- **次世代**:
  - Zotero + Better BibTeX（オープンソース）
  - Paperpile（Google Docs統合）
  - ReadCube Papers（推薦機能）

### 4.4 図表作成の進化

- **従来**: PowerPoint, Illustrator
- **次世代**:
  - BioRender（生物医学イラスト）
  - Mermaid/D2（コードからフローチャート）
  - Nanobanana（AI画像生成）

## 5. 実装計画

### 5.1 ファイル構成

```
client/src/pages/
  ├── GuideCaseReport.tsx（新規作成）
  └── components/
      ├── CaseReportSidebar.tsx（固定ナビゲーション）
      ├── StepCard.tsx（各ステップのカード）
      ├── ProgressTracker.tsx（進捗管理）
      └── PromptExample.tsx（プロンプト例示）
```

### 5.2 データ構造

```typescript
interface CaseReportStep {
  id: string;
  number: number;
  title: string;
  objective: string;
  duration: string; // "30分", "1-2時間"
  requirements: string[]; // 必要なもの
  instructions: string[]; // 手順
  prompts: {
    id: string;
    name: string;
    inputExample: string;
    outputExample: string;
  }[];
  checklist: string[]; // 完了基準
  troubleshooting: {
    problem: string;
    solution: string;
  }[];
  nextStep: string;
}
```

### 5.3 優先順位

**Phase 1（即座に実装）:**
1. 用語をStepに統一（既存ファイルの修正）
2. 完全版ガイドのコンテンツ執筆（Markdown）
3. 基本的なページレイアウト（GuideCaseReport.tsx）

**Phase 2（短期）:**
4. 固定サイドバーナビゲーション
5. プログレストラッカー
6. プロンプト例の充実

**Phase 3（中期）:**
7. インタラクティブ要素（チェックボックス、折りたたみ）
8. 次世代ツールの詳細ガイド
9. テンプレート・サンプル集

## 6. 成功指標

完全版ガイドが成功したと言えるのは:

1. **自己完結性**: 他の資料を参照せずに症例報告を完成できる
2. **実行可能性**: 各ステップが具体的で、すぐに行動に移せる
3. **時間効率**: 全体の所要時間が明確で、スケジュールを立てられる
4. **トラブル対応**: 詰まったときの解決策が提示されている
5. **品質保証**: チェックリストで最低限の品質が担保される
6. **学習効果**: 一度実行すれば、次回は独力でできるようになる
