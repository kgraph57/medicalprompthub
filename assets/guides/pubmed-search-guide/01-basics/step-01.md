# 基本編 - ステップ1: PICOに基づいた検索式の作成

## はじめに

このステップでは、PICOに基づいた検索式の作成方法を学びます。
PICOは、臨床疑問を構造化するためのフレームワークで、効果的な検索式を作成するための基礎となります。

---

## PICOとは？

PICOは、臨床疑問を構造化するためのフレームワークです：

- **P (Patient/Problem)**: 患者または問題
- **I (Intervention)**: 介入
- **C (Comparison)**: 比較
- **O (Outcome)**: アウトカム

### PICOの例

**臨床疑問**: 「高齢の2型糖尿病患者に対して、SGLT2阻害薬は従来の治療と比較して、心血管イベントを減少させるか？」

- **P**: 高齢の2型糖尿病患者
- **I**: SGLT2阻害薬
- **C**: 従来の治療（メトホルミンなど）
- **O**: 心血管イベントの減少

---

## PICOから検索式への変換

### ステップ1: 各PICO要素のキーワードを抽出

各PICO要素から、検索に使用するキーワードを抽出します。

**例：**
- **P**: "elderly", "older adults", "aged", "type 2 diabetes", "diabetes mellitus type 2"
- **I**: "SGLT2 inhibitor", "SGLT2 inhibitors", "empagliflozin", "canagliflozin"
- **C**: "metformin", "conventional therapy", "standard care"
- **O**: "cardiovascular events", "cardiovascular outcomes", "MACE"

![Boolean Operators](/Helix/assets/guides/pubmed-search-guide/boolean_operators.png)

### ステップ2: ブール演算子で結合

各PICO要素内のキーワードはORで結合し、PICO要素間はANDで結合します。

**基本構造：**
```
(P要素のキーワード1 OR P要素のキーワード2 OR ...) 
AND 
(I要素のキーワード1 OR I要素のキーワード2 OR ...) 
AND 
(C要素のキーワード1 OR C要素のキーワード2 OR ...) 
AND 
(O要素のキーワード1 OR O要素のキーワード2 OR ...)
```

**例：**
```
(elderly OR "older adults" OR aged) 
AND 
("type 2 diabetes" OR "diabetes mellitus type 2") 
AND 
("SGLT2 inhibitor" OR "SGLT2 inhibitors" OR empagliflozin OR canagliflozin) 
AND 
("cardiovascular events" OR "cardiovascular outcomes" OR MACE)
```

---

## AIを活用した検索式の作成

AIを活用することで、より効率的に検索式を作成できます。

### プロンプト例

```
以下の臨床疑問について、PubMed検索用の検索式を作成してください：

【臨床疑問】
高齢の2型糖尿病患者に対して、SGLT2阻害薬は従来の治療と比較して、心血管イベントを減少させるか？

【PICO要素】
- P: 高齢の2型糖尿病患者
- I: SGLT2阻害薬
- C: 従来の治療
- O: 心血管イベントの減少

【要件】
- MeSH termsを含める
- 同義語や関連語を含める
- ブール演算子（AND, OR）を使用
- PubMedで使用可能な形式で出力
```

---

## 検索式の最適化

### 1. キーワードの拡張

同義語や関連語を追加して、検索の網羅性を向上させます。

### 2. 検索結果の確認

検索結果を確認し、必要に応じて検索式を調整します。

### 3. フィルターの活用

PubMedのフィルター機能を活用して、検索結果を絞り込みます。

---

## 実践例

実際にPICOから検索式を作成してみましょう：

1. 臨床疑問をPICOに分解
2. 各PICO要素のキーワードを抽出
3. ブール演算子で結合
4. PubMedで検索
5. 検索結果を確認し、必要に応じて調整

---

## 次のステップ

PICOに基づいた検索式の作成を習得したら、次のステップでMeSH termsの活用に進みましょう。

