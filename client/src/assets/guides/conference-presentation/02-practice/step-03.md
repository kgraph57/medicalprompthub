# ステップ3: 参考文献を効率的に検索する

## 参考文献の重要性

カンファレンス発表では、**エビデンスに基づいた議論**が求められます。適切な参考文献を引用することで、発表の信頼性が高まります。

しかし、文献検索は時間がかかる作業です。AIを活用することで、この作業を効率化できます。

---

## 文献検索に使えるAIツール

### 1. Perplexity（推奨）

**特徴**:
- 最新の文献を自動検索
- 出典を明示
- 日本語でも検索可能

**料金**: 無料 / $20/月（Pro版）

**URL**: [https://www.perplexity.ai](https://www.perplexity.ai)

---

### 2. ChatGPT（文献検索機能付き）

**特徴**:
- ChatGPT Plus（有料版）は文献検索可能
- 無料版は2021年までの知識のみ

**料金**: $20/月（Plus版）

---

### 3. Consensus

**特徴**:
- 学術論文に特化したAI検索
- PubMedなどから自動検索
- 英語のみ

**料金**: 無料 / $8.99/月（Pro版）

**URL**: [https://consensus.app](https://consensus.app)

---

## Perplexityを使った文献検索

### ステップ1: Perplexityを開く

1. [https://www.perplexity.ai](https://www.perplexity.ai) にアクセス
2. ログイン（無料版でOK）

---

### ステップ2: 検索プロンプトを入力する

#### 基本プロンプト

```
[疾患名]について、以下の点に関する最新の文献を教えてください：

1. 診断基準
2. 治療ガイドライン
3. 予後

できれば日本語の文献、または日本のガイドラインを優先してください。
出典（論文名、著者、発行年）を明示してください。
```

---

## 実践例1: 肺塞栓症の文献検索

### 入力プロンプト

```
肺塞栓症について、以下の点に関する最新の文献を教えてください：

1. 診断基準（Wells scoreなど）
2. 治療ガイドライン（抗凝固療法の選択）
3. 予後（死亡率、再発率）

できれば日本語の文献、または日本のガイドラインを優先してください。
出典（論文名、著者、発行年）を明示してください。
```

---

### Perplexityの出力例

```
【肺塞栓症の最新文献】

1. 診断基準
   - Wells score（肺塞栓症の臨床的可能性評価）
     - 出典: "Derivation of a Simple Clinical Model to Categorize Patients Probability of Pulmonary Embolism" 
       Wells PS, et al. Thromb Haemost. 2000.
   
   - 日本循環器学会ガイドライン（2017年改訂版）
     - 出典: 「肺血栓塞栓症および深部静脈血栓症の診断、治療、予防に関するガイドライン（2017年改訂版）」
       日本循環器学会, 2017.

2. 治療ガイドライン
   - DOAC（直接経口抗凝固薬）の使用
     - 出典: "Oral Rivaroxaban for the Treatment of Symptomatic Pulmonary Embolism"
       EINSTEIN–PE Investigators. N Engl J Med. 2012.
   
   - 日本のガイドライン
     - 出典: 「肺血栓塞栓症および深部静脈血栓症の診断、治療、予防に関するガイドライン（2017年改訂版）」
       推奨: ヘパリン→ワルファリンまたはDOAC

3. 予後
   - 30日死亡率: 約10%（重症例では30%）
     - 出典: "Prognostic Value of Right Ventricular Dysfunction in Patients With Haemodynamically Stable Pulmonary Embolism"
       Sanchez O, et al. Eur Respir J. 2008.
```

---

## 実践例2: 急性心不全の文献検索

### 入力プロンプト

```
急性心不全について、以下の点に関する最新の文献を教えてください：

1. 診断基準（Framingham基準、Nohria-Stevenson分類）
2. 治療ガイドライン（利尿薬、血管拡張薬の使い分け）
3. 予後（入院死亡率、再入院率）

日本心不全学会のガイドラインがあれば優先してください。
出典（論文名、著者、発行年）を明示してください。
```

---

### Perplexityの出力例

```
【急性心不全の最新文献】

1. 診断基準
   - Framingham基準
     - 出典: "Congestive Heart Failure: A Study of Prevalence, Incidence, and Mortality"
       McKee PA, et al. N Engl J Med. 1971.
   
   - Nohria-Stevenson分類（wet/dry, warm/cold）
     - 出典: "Clinical Assessment Identifies Hemodynamic Profiles That Predict Outcomes in Patients Admitted With Heart Failure"
       Nohria A, et al. J Am Coll Cardiol. 2003.

2. 治療ガイドライン
   - 日本循環器学会ガイドライン
     - 出典: 「急性・慢性心不全診療ガイドライン（2017年改訂版）」
       日本循環器学会, 2017.
     - 推奨: フロセミド（利尿薬）、ニトログリセリン（血管拡張薬）
   
   - ESCガイドライン（2021年）
     - 出典: "2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure"
       McDonagh TA, et al. Eur Heart J. 2021.

3. 予後
   - 入院死亡率: 約4-7%
   - 1年再入院率: 約30-50%
     - 出典: 「日本心不全学会ガイドライン」
       日本心不全学会, 2021.
```

---

## ChatGPTを使った文献検索（Plus版のみ）

### プロンプト例

```
肺塞栓症の診断と治療について、最新のガイドラインと主要な論文を教えてください。

特に以下の点について：
1. Wells scoreの使い方
2. DOACの選択基準
3. 日本のガイドライン

出典を明示してください。
```

---

## PubMedでの文献検索（従来の方法）

AIツールで見つからない場合は、PubMedで直接検索します。

### PubMedの検索方法

1. [https://pubmed.ncbi.nlm.nih.gov](https://pubmed.ncbi.nlm.nih.gov) にアクセス
2. 検索ボックスにキーワードを入力

#### 検索キーワードの例

```
pulmonary embolism diagnosis guideline
```

#### 検索結果の絞り込み

- **Publication date**: 最近5年以内
- **Article type**: Review, Guideline
- **Language**: English, Japanese

---

## 文献の引用方法

### 引用形式（バンクーバー方式）

```
著者名. 論文タイトル. 雑誌名. 発行年;巻(号):ページ.
```

#### 例

```
Wells PS, et al. Derivation of a Simple Clinical Model to Categorize Patients Probability of Pulmonary Embolism. Thromb Haemost. 2000;83(3):416-420.
```

---

### スライドでの引用方法

#### 方法1: スライド下部に記載

```
【スライド: 診断基準】

Wells score
- DVTの臨床症状: 3点
- PEが最も疑わしい: 3点
- 心拍数>100: 1.5点
...

出典: Wells PS, et al. Thromb Haemost. 2000.
```

---

#### 方法2: 参考文献スライドを作成

```
【スライド: 参考文献】

1. Wells PS, et al. Derivation of a Simple Clinical Model to Categorize Patients Probability of Pulmonary Embolism. Thromb Haemost. 2000;83(3):416-420.

2. 日本循環器学会. 肺血栓塞栓症および深部静脈血栓症の診断、治療、予防に関するガイドライン（2017年改訂版）. 2017.

3. EINSTEIN–PE Investigators. Oral Rivaroxaban for the Treatment of Symptomatic Pulmonary Embolism. N Engl J Med. 2012;366(14):1287-1297.
```

---

## AIで文献の要約を作成する

長い論文を読む時間がない場合、AIで要約を作成できます。

### 要約プロンプト

```
以下の論文について、要点を3つ以内にまとめてください：

【論文情報】
- タイトル: [論文タイトル]
- 著者: [著者名]
- 雑誌: [雑誌名]
- 発行年: [年]

【要約の形式】
1. 研究の目的
2. 主な結果
3. 臨床的意義
```

---

### 実践例

#### 入力プロンプト

```
以下の論文について、要点を3つ以内にまとめてください：

【論文情報】
- タイトル: Oral Rivaroxaban for the Treatment of Symptomatic Pulmonary Embolism
- 著者: EINSTEIN–PE Investigators
- 雑誌: N Engl J Med
- 発行年: 2012

【要約の形式】
1. 研究の目的
2. 主な結果
3. 臨床的意義
```

---

#### AIの出力例

```
【論文要約】

1. 研究の目的
   - 肺塞栓症の治療において、リバーロキサバン（DOAC）が従来のヘパリン→ワルファリン療法と比較して非劣性かを検証

2. 主な結果
   - リバーロキサバン群: 再発率2.1%
   - 標準治療群: 再発率1.8%
   - 非劣性が証明された（p<0.001）
   - 大出血のリスクは両群で同等

3. 臨床的意義
   - DOACは肺塞栓症の治療において、標準治療と同等の効果
   - ヘパリン投与が不要で、外来治療が可能
   - INRモニタリングが不要で、患者の負担が軽減
```

---

## 日本語文献の検索

### 医中誌Web

日本語の医学文献を検索するには、**医中誌Web**を使用します。

**URL**: [https://www.jamas.or.jp](https://www.jamas.or.jp)

**注意**: 有料（多くの医療機関で契約あり）

#### 検索例

```
肺塞栓症 AND 診断 AND ガイドライン
```

---

### J-STAGE

日本の学会誌を無料で検索できます。

**URL**: [https://www.jstage.jst.go.jp](https://www.jstage.jst.go.jp)

#### 検索例

```
肺塞栓症 診断
```

---

## 文献管理ツール

複数の文献を管理するには、**文献管理ツール**を使用します。

### Zotero（無料）

- **特徴**: 無料、ブラウザ拡張機能で簡単に文献を保存
- **URL**: [https://www.zotero.org](https://www.zotero.org)

### Mendeley（無料）

- **特徴**: 無料、PDFの注釈機能あり
- **URL**: [https://www.mendeley.com](https://www.mendeley.com)

---

## まとめ

このステップで学んだこと：

✅ Perplexityで最新文献を効率的に検索  
✅ ChatGPT Plusで文献検索  
✅ PubMedでの直接検索  
✅ 文献の引用方法（バンクーバー方式）  
✅ AIで文献を要約  
✅ 日本語文献の検索（医中誌、J-STAGE）

次のステップでは、発表シナリオを作成する方法を学びます。

---

**所要時間**: 10分  
**次のステップ**: 発表シナリオの作成
