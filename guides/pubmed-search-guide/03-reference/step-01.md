# 応用編 - ステップ1: 高度な検索テクニック

## はじめに

このステップでは、PubMed検索の高度なテクニックを学びます。
これらのテクニックを活用することで、より効率的で正確な検索が可能になります。

---

## 高度な検索テクニック

### 1. Field Tagsの活用

Field Tagsを使用して、特定のフィールドのみを検索します。

**主なField Tags：**
- **[Title]**: タイトルのみを検索
- **[Title/Abstract]**: タイトルとアブストラクトを検索
- **[Author]**: 著者名で検索
- **[Journal]**: ジャーナル名で検索
- **[Publication Date]**: 出版日で検索

**例：**
```
("SGLT2 inhibitor"[Title/Abstract]) 
AND 
("cardiovascular events"[Title/Abstract])
```

### 2. ブール演算子の高度な使用

ブール演算子（AND, OR, NOT）を組み合わせて、複雑な検索式を作成します。

**例：**
```
(("Diabetes Mellitus, Type 2"[Mesh] OR "type 2 diabetes") 
AND 
("SGLT2 inhibitor" OR "SGLT-2 inhibitor")) 
NOT 
("animal"[Mesh] OR "mice"[Mesh] OR "rats"[Mesh])
```

### 3. フレーズ検索

引用符を使用して、フレーズ検索を行います。

**例：**
```
"type 2 diabetes" AND "SGLT2 inhibitor"
```

### 4. ワイルドカードの使用

ワイルドカード（*）を使用して、語幹検索を行います。

**例：**
```
diabet* → diabetes, diabetic, diabetics
```

### 5. 検索履歴の活用

複数の検索式を組み合わせて、より複雑な検索を行います。

**例：**
```
#1 AND #2 AND #3
```

---

## システマティックレビュー用の検索

システマティックレビューでは、網羅的な検索が必要です。

### 検索戦略

1. **複数のデータベースを検索**: PubMedだけでなく、他のデータベースも検索
2. **複数の検索式を作成**: 異なるアプローチで検索式を作成
3. **手動検索も実施**: 関連するジャーナルや参考文献を手動で検索
4. **検索式の記録**: 使用した検索式を記録し、再現可能にする

### 検索式の例

```
#1: ("Diabetes Mellitus, Type 2"[Mesh] OR "type 2 diabetes")
#2: ("SGLT2 inhibitor" OR "SGLT-2 inhibitor" OR "Sodium-Glucose Transporter 2 Inhibitors"[Mesh])
#3: ("cardiovascular events" OR "cardiovascular outcomes" OR MACE)
#4: #1 AND #2 AND #3
#5: #4 AND ("Randomized Controlled Trial"[Publication Type] OR "RCT")
```

---

## AIを活用した高度な検索

AIを活用することで、より効率的に高度な検索式を作成できます。

### プロンプト例

```
以下の臨床疑問について、システマティックレビュー用の網羅的な検索式を作成してください：

【臨床疑問】
高齢の2型糖尿病患者に対して、SGLT2阻害薬は従来の治療と比較して、心血管イベントを減少させるか？

【要件】
- 複数の検索アプローチを含める
- MeSH termsとフリーテキストを組み合わせる
- 同義語や関連語を含める
- 動物実験を除外
- システマティックレビューやメタアナリシスを優先
- PubMedで使用可能な形式で出力
```

---

## 実践例

実際に高度な検索テクニックを使ってみましょう：

1. Field Tagsを活用した検索
2. ブール演算子を組み合わせた検索
3. フレーズ検索とワイルドカードの使用
4. 検索履歴の活用
5. システマティックレビュー用の検索

---

## 次のステップ

高度な検索テクニックを習得したら、次のステップで検索結果の管理と評価に進みましょう。

