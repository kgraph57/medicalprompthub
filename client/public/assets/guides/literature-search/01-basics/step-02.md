
# ステップ2: AIプロンプトで論文を検索・要約する

## AIをリサーチアシスタントにする

PICOで臨床疑問を構造化したら、次はいよいよ論文検索です。AIにPICOを渡すだけで、PubMedなどのデータベースで使える検索式を生成させ、さらには見つかった論文の要約まで、一気通貫で行わせることができます。

---

## 論文検索＆要約の基本プロンプト

このプロンプトは、PICOに基づいて関連性の高い論文を探し、その要点を素早く把握するためのものです。

### 📋 基本プロンプト（コピペ用）

```
あなたはEBMと医学情報検索の専門家です。以下のPICOに基づいて、私の臨床疑問に答える上で最も重要だと思われる論文を探し、その要点をまとめてください。

【PICO】
*   P (Patient/Problem): [PICOのPを記述]
*   I (Intervention): [PICOのIを記述]
*   C (Comparison): [PICOのCを記述]
*   O (Outcome): [PICOのOを記述]

【タスク】
1.  このPICOに最適なPubMedの検索式（キーワードとMeSHタームを含む）を生成してください。
2.  その検索式でヒットするであろう、最も影響力のある臨床試験（RCT）またはシステマティックレビュー/メタアナリシスを3つ挙げてください（論文名、著者、雑誌名、発行年）。
3.  上記のうち、最も重要と思われる論文1つについて、アブストラクト（抄録）を日本語で分かりやすく要約してください。
```

---

## 実践例: DOAC vs ワルファリン

前のステップで作成したPICOを実際に使ってみましょう。

### 入力プロンプト

```
あなたはEBMと医学情報検索の専門家です。以下のPICOに基づいて、私の臨床疑問に答える上で最も重要だと思われる論文を探し、その要点をまとめてください。

【PICO】
*   P (Patient/Problem): 非弁膜症性心房細動の患者
*   I (Intervention): 直接経口抗凝固薬（DOAC）の投与
*   C (Comparison): ワルファリンの投与
*   O (Outcome): 脳卒中または全身性塞栓症の発生率（有効性）、および重大な出血イベントの発生率（安全性）

【タスク】
1.  このPICOに最適なPubMedの検索式（キーワードとMeSHタームを含む）を生成してください。
2.  その検索式でヒットするであろう、最も影響力のある臨床試験（RCT）またはシステマティックレビュー/メタアナリシスを3つ挙げてください（論文名、著者、雑誌名、発行年）。
3.  上記のうち、最も重要と思われる論文1つについて、アブストラクト（抄録）を日本語で分かりやすく要約してください。
```

### AIの出力例

```
承知いたしました。ご指定のPICOに基づいて、論文検索と要約を行います。

### 1. PubMed検索式

```
(\"Atrial Fibrillation\"[Mesh] OR atrial fibrillation[tiab]) 
AND 
(\"Direct Oral Anticoagulants\"[Mesh] OR DOAC[tiab] OR dabigatran[tiab] OR rivaroxaban[tiab] OR apixaban[tiab] OR edoxaban[tiab]) 
AND 
(\"Warfarin\"[Mesh] OR warfarin[tiab]) 
AND 
(\"Stroke\"[Mesh] OR stroke[tiab] OR \"Embolism\"[Mesh] OR embolism[tiab]) 
AND 
(\"Hemorrhage\"[Mesh] OR hemorrhage[tiab] OR bleeding[tiab]) 
AND 
(randomized controlled trial[pt] OR systematic review[pt] OR meta-analysis[pt])
```

### 2. 主要な関連論文

1.  **RE-LY試験:** Connolly SJ, et al. Dabigatran versus warfarin in patients with atrial fibrillation. N Engl J Med. 2009.
2.  **ROCKET AF試験:** Patel MR, et al. Rivaroxaban versus warfarin in nonvalvular atrial fibrillation. N Engl J Med. 2011.
3.  **ARISTOTLE試験:** Granger CB, et al. Apixaban versus warfarin in patients with atrial fibrillation. N Engl J Med. 2011.

（補足: これらは各DOACとワルファリンを直接比較した、ランドマークとなる大規模臨床試験です）

### 3. 最重要論文の要約（例: ARISTOTLE試験）

**論文:** Apixaban versus Warfarin in Patients with Atrial Fibrillation (心房細動患者におけるアピキサバンとワルファリンの比較)

**要約:**
この研究（ARISTOTLE試験）は、心房細動を持つ18,201人の患者を対象に、新しい抗凝固薬であるアピキサバンが、従来の標準薬であるワルファリンと比べて、脳卒中を防ぐ効果と安全性がどうかを比較した大規模な臨床試験です。

**結果のポイント:**
*   **有効性:** アピキサバンを服用したグループは、ワルファリンのグループに比べて、脳卒中または全身性塞栓症になる確率が**21%低かった**です。
*   **安全性:** アピキサバンを服用したグループは、ワルファリンのグループに比べて、重大な出血（命に関わるような出血）を起こす確率が**31%低かった**です。
*   **死亡率:** さらに、アピキサバンを服用したグループは、ワルファリンのグループに比べて、死亡率も**11%低い**という結果でした。

**結論:**
心房細動患者において、アピキサバンは、ワルファリンと比較して、**脳卒中の予防効果がより高く、かつ、大出血のリスクはより低い**ことが示されました。この結果から、アピキサバンはワルファリンに代わる優れた治療選択肢であると言えます。
```

---

## AI要約のポイント

AIに論文を要約させる際は、ただ「要約して」と頼むだけでなく、**「誰のために」「どのような形式で」**要約してほしいかを明確に指示することが重要です。例えば、以下のような指示を追加できます。

*   **患者さんへの説明に使えるように、専門用語を避けて要約してください。**
*   **PICOの各項目に沿って、結果を整理してください。**
*   **この論文の限界（Limitation）や、結果を解釈する上での注意点も指摘してください。**

---

## まとめ

このステップで学んだこと:

✅ PICOを基に、AIにPubMedの検索式を生成させる方法
✅ 関連する主要な論文をAIにリストアップさせる方法
✅ 論文のアブストラクトを、日本語で分かりやすく要約させる基本プロンプト

AIを使えば、このようにわずか数分で、臨床疑問に関連する重要なエビデンスの概要を掴むことができます。次のステップでは、実践編として、論文全体を構造的に深く読み解くためのプロンプトを学びます。

---

**所要時間**: 5分
**次のステップ**: 実践編 - 論文全体を構造化要約する
