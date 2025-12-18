# 基本編 - ステップ2: MeSH termsの活用

## はじめに

このステップでは、MeSH termsの効果的な活用方法を学びます。
MeSH (Medical Subject Headings) は、PubMedで使用される統制語彙で、検索の精度と網羅性を向上させるために重要です。

---

![MeSH Terms階層構造](/assets/guides/pubmed-search-guide/mesh_terms.png)

## MeSHとは？

MeSH (Medical Subject Headings) は、医学文献を分類・索引付けするための統制語彙です。

### MeSHの特徴

- **統制語彙**: 標準化された用語を使用
- **階層構造**: より広い概念からより狭い概念へと階層的に組織化
- **同義語の統合**: 複数の同義語を1つのMeSH termに統合
- **PubMedでの自動適用**: PubMedでは、MeSH termsが自動的に文献に付与される

---

## MeSH termsの検索方法

### 1. MeSH Databaseでの検索

PubMedのMeSH Databaseで、適切なMeSH termを検索します。

**手順：**
1. PubMedのトップページで「MeSH」を選択
2. キーワードを入力して検索
3. 適切なMeSH termを選択
4. 「Add to search builder」をクリック

### 2. MeSH termの階層構造の活用

MeSH termには階層構造があり、より広い概念やより狭い概念を活用できます。

**例：**
- **Diabetes Mellitus, Type 2** (より狭い概念)
  - **Diabetes Mellitus** (より広い概念)
    - **Glucose Metabolism Disorders** (さらに広い概念)

### 3. MeSH termのサブヘディング

MeSH termには、サブヘディング（副見出し語）を追加できます。

**例：**
- **Diabetes Mellitus, Type 2/therapy** (治療)
- **Diabetes Mellitus, Type 2/drug therapy** (薬物療法)
- **Diabetes Mellitus, Type 2/complications** (合併症)

---

## MeSH termsを使った検索式

### 基本構造

MeSH termsは、[Mesh]タグを付けて検索します。

**例：**
```
"Diabetes Mellitus, Type 2"[Mesh] 
AND 
"Sodium-Glucose Transporter 2 Inhibitors"[Mesh]
```

### フリーテキストとの組み合わせ

MeSH termsとフリーテキストを組み合わせることで、検索の網羅性を向上させます。

**例：**
```
("Diabetes Mellitus, Type 2"[Mesh] OR "type 2 diabetes" OR "T2DM") 
AND 
("Sodium-Glucose Transporter 2 Inhibitors"[Mesh] OR "SGLT2 inhibitor")
```

---

## AIを活用したMeSH termsの特定

AIを活用することで、適切なMeSH termsを迅速に特定できます。

### プロンプト例

```
以下の臨床疑問について、適切なMeSH termsを特定してください：

【臨床疑問】
高齢の2型糖尿病患者に対して、SGLT2阻害薬は従来の治療と比較して、心血管イベントを減少させるか？

【要件】
- 各PICO要素に対応するMeSH termsを特定
- MeSH termの階層構造を考慮
- サブヘディングも提案
- PubMedで使用可能な形式で出力
```

---

## 実践例

実際にMeSH termsを使った検索を行ってみましょう：

1. 臨床疑問からキーワードを抽出
2. MeSH DatabaseでMeSH termsを検索
3. 適切なMeSH termsを選択
4. 検索式に組み込む
5. PubMedで検索
6. 検索結果を確認

---

## 次のステップ

MeSH termsの活用を習得したら、次のステップで検索結果の絞り込みと拡張に進みましょう。

