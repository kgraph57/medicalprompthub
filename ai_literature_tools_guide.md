# AI文献検索・分析ツール総合ガイド（症例報告執筆向け）

## ツール比較表

| ツール | 主な機能 | 料金 | 症例報告での用途 | おすすめ度 |
|--------|---------|------|----------------|-----------|
| **NotebookLM** | 複数文献の同時分析（最大49件） | 無料 | 類似症例の比較分析 | ⭐⭐⭐⭐⭐ |
| **Perplexity** | 最新情報検索・文献検索 | 無料/Pro $20/月 | 疾患の最新情報収集 | ⭐⭐⭐⭐⭐ |
| **Consensus** | 220M+論文からエビデンス検索 | 無料/Pro $8.99/月 | エビデンスの確認 | ⭐⭐⭐⭐ |
| **Elicit** | 系統的レビュー自動化 | 無料/Plus $10/月 | RCT・臨床研究の検索 | ⭐⭐⭐⭐ |
| **SciSpace** | 質問形式の論文検索 | 無料/Premium $12/月 | 論文の読解補助 | ⭐⭐⭐⭐ |
| **scite.ai** | 引用コンテキスト分析 | 無料/Premium $20/月 | 論文の信頼性評価 | ⭐⭐⭐ |
| **Connected Papers** | 論文の関連性を視覚化 | 無料/Premium $7/月 | 関連論文の発見 | ⭐⭐⭐⭐ |
| **Research Rabbit** | 論文ネットワークの可視化 | 無料 | 研究分野の全体把握 | ⭐⭐⭐⭐ |
| **ChatGPT** | 汎用AI・執筆支援 | 無料/Plus $20/月 | 執筆全般 | ⭐⭐⭐⭐⭐ |
| **Claude** | 長文分析・執筆支援 | 無料/Pro $20/月 | 長文論文の分析 | ⭐⭐⭐⭐⭐ |

---

## 各ツールの詳細と活用法

### 1. NotebookLM（Google）

**URL**: https://notebooklm.google/

**特徴**:
- 最大49件の論文を同時アップロード可能
- アップロードした文献のみを情報源とし、ハルシネーションを防止
- 引用元を明示（マーカー表示）
- Audio Overview機能で論文を音声解説

**症例報告での活用**:

#### Step 4: 文献レビュー
```
【アップロード】
- 類似症例報告 10-15件
- 疾患の総説論文 2-3件

【プロンプト】
これらの論文から、器質化肺炎の症例報告を以下の観点で比較表を作成してください：
- 著者・年
- 年齢・性別
- 主要な臨床所見
- 画像所見
- 治療内容（薬剤名・用量）
- 転帰
- 特徴的な点
```

#### Step 6: 考察の構成
```
【プロンプト】
これらの論文のDiscussionセクションで、以下の点がどのように議論されているか要約してください：
1. 診断基準
2. 鑑別診断のポイント
3. 治療のエビデンス
4. 予後因子
```

**詳細**: `/home/ubuntu/medicalprompthub/notebooklm_usage.md` 参照

---

### 2. Perplexity（Deep Research機能）

**URL**: https://www.perplexity.ai/

**特徴**:
- 最新情報を含むリアルタイム検索
- Deep Research機能で深掘り調査レポート生成（Pro版）
- 引用元を明示
- PubMed検索に対応

**症例報告での活用**:

#### Step 2: 症例の新規性確認
```
【プロンプト】
「器質化肺炎 ステロイド治療 症例報告」の最新の文献を2020年以降で検索してください。
特に以下の点に注目してください：
1. 報告数
2. 治療プロトコル
3. 新しい知見
```

#### Step 4: 疾患の最新情報
```
【Deep Research使用】
器質化肺炎の診断と治療について、2024年の最新ガイドラインと臨床研究をまとめてください。
```

#### Step 8: Introduction執筆
```
【プロンプト】
器質化肺炎の疫学について、最新のデータを引用文献付きで教えてください。
```

---

### 3. Consensus

**URL**: https://consensus.app/

**特徴**:
- 220M+の査読済み論文を検索
- 質問に対してエビデンスベースの回答を生成
- 医学研究に最適化されたフィルター（人/動物、研究デザインなど）
- Consensus Meter（コンセンサスの強さを表示）

**症例報告での活用**:

#### Step 4: エビデンスの確認
```
【検索クエリ】
What is the efficacy of corticosteroid therapy for organizing pneumonia?

【フィルター】
- Study Type: Clinical Trial, Systematic Review
- Study Design: Human
- Year: 2015-2025
```

#### Step 6: 考察の根拠
```
【検索クエリ】
What are the risk factors for relapse in organizing pneumonia?

【活用】
Consensus Meterで「再発リスク因子」のコンセンサスの強さを確認
```

---

### 4. Elicit

**URL**: https://elicit.com/

**特徴**:
- 系統的レビューの自動化に特化
- RCT・臨床研究の検索に強い
- データ抽出の自動化
- 論文のスクリーニング支援

**症例報告での活用**:

#### Step 4: RCTの検索
```
【質問形式】
What are the outcomes of corticosteroid therapy for organizing pneumonia?

【自動抽出項目】
- Sample size
- Intervention
- Control
- Primary outcome
- Results
- Conclusion
```

#### Step 6: 治療エビデンスの整理
```
【質問】
What is the optimal dose and duration of corticosteroid therapy for organizing pneumonia?

【活用】
複数のRCTから用量・期間のデータを自動抽出して比較
```

---

### 5. SciSpace

**URL**: https://scispace.com/

**特徴**:
- 質問形式で論文検索（Literature Review）
- より精度の高い検索（Deep Review）
- 論文の読解補助（PDF Copilot）
- 論文の要約を表形式で整理

**症例報告での活用**:

#### Step 4: 質問形式の文献検索
```
【Literature Review】
器質化肺炎の診断基準は何ですか？

【出力】
- Questionに対する引用付きサマリー
- 各論文の考察と結果のリスト
```

#### Step 5: 論文の読解補助
```
【PDF Copilot】
論文PDFをアップロードして質問：
- この論文の統計手法を説明してください
- Figure 2の意味を教えてください
- この論文の限界は何ですか？
```

---

### 6. scite.ai

**URL**: https://scite.ai/

**特徴**:
- Smart Citations（引用コンテキストの分類）
- Supporting（支持）/ Contrasting（反論）/ Mentioning（言及）の3分類
- 論文の信頼性評価
- ブラウザ拡張機能

**症例報告での活用**:

#### Step 4: 論文の信頼性評価
```
【使い方】
気になる論文のDOIやタイトルを検索

【確認項目】
- Supporting citations: この論文を支持する引用数
- Contrasting citations: この論文に反論する引用数
- 引用コンテキストの詳細
```

#### Step 6: 考察での引用
```
【活用】
引用したい論文が後続研究でどう評価されているかを確認
→ 信頼性の高い論文を優先的に引用
```

---

### 7. Connected Papers

**URL**: https://www.connectedpapers.com/

**特徴**:
- 論文の関連性を視覚的なグラフで表示
- 類似論文の発見
- 時系列での研究の流れを把握
- Prior works（先行研究）とDerivative works（派生研究）の表示

**症例報告での活用**:

#### Step 4: 関連論文の網羅的収集
```
【使い方】
1. キーとなる論文（総説や重要な症例報告）を入力
2. グラフで関連論文を視覚的に確認
3. 読むべき論文を優先順位付け

【メリット】
- キーワード検索では見つからない関連論文を発見
- 研究分野の全体像を把握
```

#### Step 8: Introduction執筆
```
【活用】
Prior worksから歴史的な重要論文を特定
→ Introductionで引用
```

---

### 8. Research Rabbit

**URL**: https://www.researchrabbit.ai/

**特徴**:
- 論文ネットワークの可視化
- 類似論文、参考文献、引用、著者で絞り込み検索
- コレクション機能で論文を整理
- 完全無料

**症例報告での活用**:

#### Step 4: 研究分野の全体把握
```
【使い方】
1. 重要な論文を「Collection」に追加
2. 「Similar Work」で類似論文を探索
3. 「Earlier Work」で先行研究を確認
4. 「Later Work」で最新の研究を確認

【メリット】
- 時系列で研究の流れを整理
- 漏れなく関連論文をチェック
```

---

## 症例報告の各ステップでの推奨ツール

### Step 1: 症例の選定
- **Perplexity**: 類似症例の報告数を確認
- **Consensus**: 疾患の臨床的重要性を確認

### Step 2: 症例の新規性確認
- **Perplexity Deep Research**: 最新の類似症例を網羅的に調査
- **PubMed** + **Research Rabbit**: 既報告の全体像を把握

### Step 3: 患者同意
- （ツール不要）

### Step 4: 文献レビュー
1. **Perplexity**: 最新情報の検索
2. **Consensus**: エビデンスの確認
3. **Elicit**: RCTの検索とデータ抽出
4. **Connected Papers** / **Research Rabbit**: 関連論文の網羅的収集
5. **NotebookLM**: 収集した論文の一括分析

### Step 5: 症例データの整理
- **ChatGPT** / **Claude**: データの構造化

### Step 6: 考察の構成
- **NotebookLM**: 複数論文のDiscussionを比較分析
- **Consensus**: エビデンスの強さを確認
- **scite.ai**: 引用論文の信頼性評価

### Step 7: 図表の作成
- **ChatGPT** / **Claude**: 表のフォーマット作成

### Step 8: Introduction執筆
- **Perplexity**: 疾患の最新疫学データ
- **SciSpace**: 総説論文の要約
- **NotebookLM**: ガイドラインの要約

### Step 9: Case Presentation執筆
- **ChatGPT** / **Claude**: 執筆支援

### Step 10: Discussion執筆
- **NotebookLM**: 類似症例との比較
- **Consensus**: エビデンスの引用
- **scite.ai**: 引用論文の評価

### Step 11: Abstract執筆
- **ChatGPT** / **Claude**: 語数調整

### Step 12: タイトル・キーワード
- **ChatGPT** / **Claude**: タイトル案の生成

### Step 13: 参考文献の整理
- **Paperpile** / **Zotero**: 文献管理

### Step 14: 英文校正
- **Grammarly** / **DeepL Write**: 文法チェック
- **ChatGPT** / **Claude**: ネイティブチェック

### Step 15: 投稿準備
- **ChatGPT**: Cover letterの作成

---

## 推奨ワークフロー

### パターンA: 無料ツールのみ
1. **Perplexity**（無料版）: 最新情報検索
2. **Consensus**（無料版）: エビデンス確認
3. **Research Rabbit**（無料）: 関連論文の可視化
4. **NotebookLM**（無料）: 論文の一括分析
5. **ChatGPT**（無料版）: 執筆支援

### パターンB: 効率重視（有料ツール活用）
1. **Perplexity Pro**: Deep Research機能
2. **Consensus Pro**: 高度な検索フィルター
3. **Elicit Plus**: データ抽出の自動化
4. **NotebookLM**（無料）: 論文の一括分析
5. **ChatGPT Plus** / **Claude Pro**: 高度な執筆支援

### パターンC: 最強の組み合わせ
1. **Perplexity Pro**: 最新情報の深掘り調査
2. **Consensus Pro**: エビデンスの網羅的検索
3. **Elicit Plus**: RCTのデータ抽出
4. **Connected Papers Premium**: 関連論文の可視化
5. **NotebookLM**: 論文の一括分析
6. **scite.ai Premium**: 引用分析
7. **ChatGPT Plus** + **Claude Pro**: 執筆支援

---

## 各ツールの料金まとめ

| ツール | 無料版 | 有料版 | 月額料金 |
|--------|-------|-------|---------|
| NotebookLM | ✅ | - | 無料 |
| Perplexity | ✅ | Pro | $20 |
| Consensus | ✅ | Pro | $8.99 |
| Elicit | ✅ | Plus/Pro | $10/$42 |
| SciSpace | ✅ | Premium | $12 |
| scite.ai | ✅ | Premium | $20 |
| Connected Papers | ✅ | Premium | $7 |
| Research Rabbit | ✅ | - | 無料 |
| ChatGPT | ✅ | Plus | $20 |
| Claude | ✅ | Pro | $20 |

**推奨サブスクリプション**（月額約$50）:
- Perplexity Pro ($20)
- ChatGPT Plus ($20)
- Consensus Pro ($8.99)
- Connected Papers Premium ($7)

---

## 注意事項

1. **ファクトチェック必須**: 全てのAI生成情報は必ず原文で確認
2. **個人情報保護**: 患者情報をアップロードしない
3. **引用の確認**: AIが生成した引用文献は必ずPubMedで実在を確認
4. **雑誌規定**: 投稿先雑誌のAI使用規定を確認
5. **組み合わせ活用**: 単一ツールに依存せず、複数ツールを組み合わせる

---

## 参考リンク

- NotebookLM: https://notebooklm.google/
- Perplexity: https://www.perplexity.ai/
- Consensus: https://consensus.app/
- Elicit: https://elicit.com/
- SciSpace: https://scispace.com/
- scite.ai: https://scite.ai/
- Connected Papers: https://www.connectedpapers.com/
- Research Rabbit: https://www.researchrabbit.ai/
