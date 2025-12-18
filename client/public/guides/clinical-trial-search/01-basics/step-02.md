# 01-basics/step-02.md: 臨床疑問の構造化：PICO/PECOフレームワークとAIプロンプトへの変換

## 臨床疑問の構造化：PICO/PECOフレームワーク

効率的かつ網羅的な臨床試験検索を行うための第一歩は、臨床疑問（Clinical Question）を明確に構造化することです。そのための標準的な手法がPICO（または観察研究の場合はPECO）フレームワークです。

| 要素 | 意味 | 臨床試験検索における役割 |
| :--- | :--- | :--- |
| Patient/Population | 対象となる患者集団や疾患 | 検索対象の絞り込み（例：疾患名、年齢層、重症度） |
| Intervention | 介入（治療法、診断法など） | 検索の核となるキーワード（例：薬剤名、手術手技） |
| Comparison | 比較対照となる介入 | 介入効果の比較対象（例：プラセボ、標準治療） |
| Outcome | 評価したい結果（アウトカム） | 臨床試験の主要評価項目（例：死亡率、QOL、副作用） |
| Exposure (PECOの場合) | 曝露（危険因子、環境要因など） | 観察研究における原因側の要素 |

## AIを活用したPICO要素の抽出と整理

臨床疑問が複雑な場合や、複数の要素が絡み合う場合、AIにPICO要素を抽出・整理させることで、検索戦略の策定を大幅に効率化できます。

### 実用的なプロンプト例：PICO要素の抽出

目的: 複雑な症例や臨床シナリオから、検索に必要なPICO要素を正確に抽出させる。

```
あなたは経験豊富な臨床研究者です。以下の臨床疑問を分析し、PICOフレームワークに従って各要素を日本語と英語で明確に抽出してください。

【臨床疑問】
「非弁膜症性心房細動患者において、新規経口抗凝固薬（NOAC）はワルファリンと比較して、脳卒中予防効果と大出血リスクの点で優れているか？」

【出力形式】
- P (Patient/Population): [日本語] / [英語]
- I (Intervention): [日本語] / [英語]
- C (Comparison): [日本語] / [英語]
- O (Outcome): [日本語] / [英語]
```

AIの期待される応答（例）:
- P (Patient/Population): 非弁膜症性心房細動患者 / Patients with non-valvular atrial fibrillation
- I (Intervention): 新規経口抗凝固薬（NOAC） / Novel Oral Anticoagulants (NOACs)
- C (Comparison): ワルファリン / Warfarin
- O (Outcome): 脳卒中予防効果、大出血リスク / Stroke prevention, major bleeding risk

## 検索クエリへの変換とMeSHタームの活用

PICO要素が明確になったら、それをClinicalTrials.govやPubMedなどの検索エンジンで使える検索クエリに変換します。この際、MeSH（Medical Subject Headings）タームの活用は必須です。

### AIを活用した検索クエリの生成

目的: 抽出したPICO要素に基づき、ClinicalTrials.govでの検索に適したキーワードとMeSHタームの組み合わせを提案させる。

```
あなたは医療情報専門家です。以下のPICO要素に基づき、ClinicalTrials.govで最も網羅的かつ特異的な臨床試験を検索するための検索クエリを提案してください。

【PICO要素】
- P: 非弁膜症性心房細動患者
- I: 新規経口抗凝固薬（NOAC）
- C: ワルファリン
- O: 脳卒中予防効果、大出血リスク

【提案形式】
1. 主要キーワード（英語）:
2. 推奨MeSHターム:
3. 検索クエリ例（AND/OR結合）:
```

AIの期待される応答（例）:
1. 主要キーワード（英語）: Non-valvular atrial fibrillation, NOAC, Warfarin, Stroke, Major bleeding
2. 推奨MeSHターム: "Atrial Fibrillation"[Mesh], "Anticoagulants"[Mesh], "Warfarin"[Mesh], "Stroke"[Mesh], "Hemorrhage"[Mesh]
3. 検索クエリ例（AND/OR結合）: ("Atrial Fibrillation"[Mesh] AND ("NOAC" OR "Novel Oral Anticoagulants") AND "Warfarin"[Mesh] AND ("Stroke" OR "Hemorrhage"))

---
注意点とTips:
*   MeSHタームの確認: AIが提案したMeSHタームは、必ずPubMedのMeSHデータベースで確認し、適切な階層構造（Tree Structure）にあるかを確認してください。
*   検索エンジンの特性: ClinicalTrials.govはキーワード検索が中心ですが、PubMedはMeSH検索が強力です。検索エンジンに応じてAIへの指示を調整しましょう。

---
次のステップへ:
ステップ03からは実践編に入ります。ステップ03では、実際に検索結果の試験概要（Summary）をAIに読み込ませ、迅速に要約・評価する具体的な手法を学びます。
