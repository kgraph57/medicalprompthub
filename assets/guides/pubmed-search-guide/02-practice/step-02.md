# 実践編 - ステップ2: 検索結果の拡張

## はじめに

このステップでは、検索結果を拡張する方法を学びます。
検索結果が少なすぎる場合、適切な拡張を行うことで、重要な文献を見落とさないようにできます。

---

## 検索結果の拡張方法

### 1. キーワードの追加

同義語や関連語を追加して、検索の網羅性を向上させます。

**例：**
```
元の検索式:
("SGLT2 inhibitor")

拡張後:
("SGLT2 inhibitor" OR "SGLT2 inhibitors" OR "SGLT-2 inhibitor" 
OR empagliflozin OR canagliflozin OR dapagliflozin)
```

### 2. MeSH termsの階層構造の活用

より広い概念のMeSH termを使用して、検索範囲を拡張します。

**例：**
```
元の検索式:
"Sodium-Glucose Transporter 2 Inhibitors"[Mesh]

拡張後:
("Sodium-Glucose Transporter 2 Inhibitors"[Mesh] 
OR "Hypoglycemic Agents"[Mesh])
```

### 3. フリーテキストの追加

MeSH termsに加えて、フリーテキストも追加します。

**例：**
```
("Sodium-Glucose Transporter 2 Inhibitors"[Mesh] 
OR "SGLT2 inhibitor" OR "SGLT-2 inhibitor")
```

### 4. 関連するMeSH termsの追加

関連するMeSH termsを追加して、検索範囲を拡張します。

**例：**
```
("Diabetes Mellitus, Type 2"[Mesh] 
OR "Diabetes Mellitus"[Mesh] 
OR "Glucose Metabolism Disorders"[Mesh])
```

---

## 拡張の戦略

### 1. 段階的な拡張

一度に多くの条件を追加せず、段階的に拡張します。

**ステップ1**: 基本的な検索式で検索
**ステップ2**: 検索結果が少ない場合、キーワードを追加
**ステップ3**: さらに少ない場合、MeSH termsの階層構造を活用
**ステップ4**: 再度検索結果を確認

### 2. バランスの取れた拡張

検索の網羅性と精度のバランスを考慮します。

- **網羅性**: 重要な文献を見落とさない
- **精度**: 関連性の低い文献を除外

### 3. 検索結果の評価

拡張後の検索結果を評価し、必要に応じて調整します。

---

## AIを活用した拡張

AIを活用することで、適切な拡張方法を提案できます。

### プロンプト例

```
以下の検索結果を拡張するための最適な方法を提案してください：

【現在の検索式】
("Diabetes Mellitus, Type 2"[Mesh]) 
AND 
("SGLT2 inhibitor")

【検索結果】
約50件

【目標】
関連性の高い文献を200件以上に拡張

【要件】
- 重要な文献を見落とさない
- 関連性の低い文献は除外
- 同義語や関連語を含める
- MeSH termsの階層構造を活用
```

---

## 実践例

実際に検索結果を拡張してみましょう：

1. 基本的な検索式で検索
2. 検索結果の数を確認
3. キーワードを追加
4. MeSH termsの階層構造を活用
5. 再度検索
6. 検索結果を評価

---

## 次のステップ

検索結果の拡張を習得したら、次のステップで高度な検索テクニックに進みましょう。

