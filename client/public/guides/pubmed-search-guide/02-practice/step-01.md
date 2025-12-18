# 実践編 - ステップ1: 検索結果の絞り込み

## はじめに

このステップでは、検索結果を絞り込む方法を学びます。
検索結果が多すぎる場合、適切な絞り込みを行うことで、関連性の高い文献のみを抽出できます。

---

## 検索結果の絞り込み方法

### 1. PubMedのフィルター機能

PubMedには、以下のようなフィルター機能があります：

- **Publication Date**: 出版日の範囲を指定
- **Article Type**: 論文の種類（RCT、レビューなど）を指定
- **Language**: 言語を指定
- **Species**: 対象種を指定
- **Age**: 対象年齢を指定
- **Sex**: 対象性別を指定

### 2. 検索式の修正

検索式を修正して、より具体的な条件を追加します。

**例：**
```
元の検索式:
("Diabetes Mellitus, Type 2"[Mesh] OR "type 2 diabetes") 
AND 
("SGLT2 inhibitor")

絞り込み後:
("Diabetes Mellitus, Type 2"[Mesh] OR "type 2 diabetes") 
AND 
("SGLT2 inhibitor") 
AND 
("Randomized Controlled Trial"[Publication Type] OR "RCT")
AND 
("aged"[Mesh] OR "elderly")
```

### 3. 高度な検索機能

PubMedの高度な検索機能を活用します。

**例：**
- **Field Tags**: [Title], [Abstract], [Author]など
- **Boolean Operators**: AND, OR, NOT
- **Quotation Marks**: フレーズ検索

---

## 絞り込みの戦略

### 1. 段階的な絞り込み

一度に多くの条件を追加せず、段階的に絞り込みます。

**ステップ1**: 基本的な検索式で検索
**ステップ2**: 検索結果を確認
**ステップ3**: 必要に応じて条件を追加
**ステップ4**: 再度検索結果を確認

### 2. フィルターの組み合わせ

複数のフィルターを組み合わせて、より精密な絞り込みを行います。

**例：**
- Publication Date: 過去5年
- Article Type: Randomized Controlled Trial
- Language: English

### 3. 検索結果の評価

検索結果を評価し、必要に応じて検索式を調整します。

---

## AIを活用した絞り込み

AIを活用することで、適切な絞り込み条件を提案できます。

### プロンプト例

```
以下の検索結果を絞り込むための最適な方法を提案してください：

【現在の検索式】
("Diabetes Mellitus, Type 2"[Mesh] OR "type 2 diabetes") 
AND 
("SGLT2 inhibitor")

【検索結果】
約5,000件

【目標】
関連性の高い文献を100件以下に絞り込む

【要件】
- 臨床疑問に最も関連性の高い文献を優先
- 最新のエビデンスを重視
- システマティックレビューやメタアナリシスを優先
```

---

## 実践例

実際に検索結果を絞り込んでみましょう：

1. 基本的な検索式で検索
2. 検索結果の数を確認
3. フィルター機能を活用
4. 検索式を修正
5. 再度検索
6. 検索結果を評価

---

## 次のステップ

検索結果の絞り込みを習得したら、次のステップで検索結果の拡張に進みましょう。

