# Step 8: タイトル・抄録作成

### 📋 このステップの目的

論文の「顔」であり「要約」であるタイトルと抄録（アブストラクト）を作成します。多忙な臨床医や研究者は、タイトルと抄録を読んで、その論文を続きを読むかを数秒で判断します。このステップでは、読者の心を掴み、論文の核心を的確に伝える、魅力的で簡潔なタイトルと抄録を作成する技術を学びます。

![タイトル・抄録作成](https://files.manuscdn.com/user_upload_by_module/session_file/90346460/rSudmqzjhiXDfecf.png)

### ⏱️ 所要時間

**2〜3時間**

### 🎯 達成基準

- 論文の核心を表すタイトル案が3つ以上作成されている。
- 投稿規定の文字数制限内に収まる構造化抄録が完成している。
- タイトルと抄録を読んだだけで、症例の新規性と臨床的教訓が理解できる。
- 指導医のレビューを受け、承認されている。

### 📝 詳細手順

![タイトル・抄録作成](./title_abstract_creation.png)

#### 手順1: タイトルの作成

タイトルは、論文の内容を最も短く表現するものです。魅力的で、かつ検索されやすいキーワードを含める必要があります。

1.  **キーワードの洗い出し**: 論文の核心となる単語（疾患名、治療法、特異な所見など）を5つほどリストアップします。
2.  **タイトル形式の選択**: 
    *   **記述的タイトル (Descriptive)**: 症例の内容を客観的に記述する。（例: "A Case of Steroid-Resistant Organizing Pneumonia Treated with Cyclophosphamide"）
    *   **宣言的タイトル (Declarative)**: 論文の結論を明確に主張する。（例: "Cyclophosphamide as an Effective Treatment for Steroid-Resistant Organizing Pneumonia"）
3.  **AIによるブレインストーミング**: 洗い出したキーワードとタイトル形式をAIに与え、複数のタイトル案を生成させます。その中から最も響きの良いものを選び、洗練させます。

#### 手順2: 抄録（アブストラクト）の作成

多くの医学雑誌では、構造化抄録（Structured Abstract）が求められます。これは通常、以下のセクションから構成されます。

1.  **背景 (Background/Introduction)**: なぜこの症例が重要なのか、問題提起を1〜2文で記述します。
2.  **症例提示 (Case Presentation)**: 患者背景、主要な症状、検査所見、治療経過、転帰を簡潔に記述します。Step 5で作成したサマリーが役立ちます。
3.  **結論 (Conclusions)**: この症例から得られた最も重要な臨床的教訓（Learning Point）を1〜2文で明確に述べます。これが抄録の「魂」です。

平賀先生の論文[1]で強調されているアブストラクトの4つの重要点（①正確・簡潔・明瞭、②独立性、③Learning Pointの明記、④学会規定の遵守）を常に意識しながら執筆しましょう。

### 🤖 推奨AIツール

| ツール | 用途 | 優先度 |
|---|---|---|
| **ChatGPT / Claude** | タイトル案の生成、抄録の草案作成、文字数調整 | ⭐⭐⭐⭐⭐ |

### 💡 プロンプト集

#### プロンプト1: 魅力的なタイトル案を複数生成する

```
# 指示
あなたはキャッチーな論文タイトルを考える専門家です。以下の論文の要点に基づき、読者の興味を引くような魅力的なタイトル案を、記述的スタイルと宣言的スタイルでそれぞれ3つずつ提案してください。

# 論文の要点
- **疾患**: 器質化肺炎 (Organizing Pneumonia)
- **特徴**: 中等量のステロイド治療に早期から抵抗性を示した
- **治療**: シクロホスファミド間欠療法 (IVCY) が著効した
- **新規性**: 早期のステロイド抵抗性と、IVCYの有効性を示した稀な症例
- **キーワード**: Organizing Pneumonia, Steroid-Resistant, Cyclophosphamide, Case Report
```

#### プロンプト2: 構造化抄録の草案を作成する

```
# 指示
あなたは経験豊富なメディカルライターです。以下の症例情報と投稿規定に基づき、構造化抄録（Structured Abstract）の草案を作成してください。特に「結論」では、この症例から得られる臨床的教訓が明確に伝わるように記述してください。

# 症例情報
- **背景**: 器質化肺炎(OP)は通常ステロイドによく反応するが、稀に抵抗性を示す症例が存在し、その治療法は確立されていない。
- **症例提示**: 45歳男性。乾性咳嗽と呼吸困難を主訴に来院。胸部CTで両側肺に浸潤影を認め、OPと診断。プレドニゾロン30mg/日で治療を開始したが、臨床症状および画像所見は増悪した。シクロホスファミド間欠療法を追加したところ、速やかに症状と画像所見の改善を認め、寛解に至った。
- **結論の骨子**: 早期からステロイド抵抗性を示すOPが存在することを認識し、そのような症例に対してシクロホスファミドが有効な治療選択肢となりうること。

# 投稿規定
- **形式**: 構造化抄録 (Background, Case Presentation, Conclusions)
- **文字数**: 全体で250ワード以内
```

**活用例**: このプロンプトで生成された草案を基に、投稿規定に合わせて表現を微調整するだけで、質の高い抄録を効率的に完成させることができます。

### 📚 実践例

**症例**: ステロイド抵抗性OP

- **タイトル案 (AI生成)**:
  - (記述的) Early-onset Steroid-Resistant Organizing Pneumonia Successfully Treated with Cyclophosphamide: A Case Report
  - (宣言的) Cyclophosphamide Pulses Overcome Early Steroid Resistance in Organizing Pneumonia
- **抄録 (AI生成＋リファイン)**:
  - **Background**: While organizing pneumonia (OP) typically responds well to corticosteroids, some cases exhibit resistance, for which optimal treatment strategies remain unclear.
  - **Case Presentation**: A 45-year-old man presented with non-productive cough and dyspnea. Chest computed tomography revealed bilateral consolidations, leading to a diagnosis of OP. Treatment with prednisolone (30 mg/day) was initiated; however, his clinical symptoms and radiological findings worsened. Subsequent addition of intermittent intravenous cyclophosphamide therapy resulted in rapid clinical and radiological improvement, leading to remission.
  - **Conclusions**: Clinicians should be aware of OP cases showing early resistance to moderate-dose corticosteroids. Our case suggests that cyclophosphamide can be an effective therapeutic option for such steroid-resistant OP.

### ⚠️ よくある失敗と対処法

- **失敗**: タイトルで結論を誇張しすぎる（例: 「画期的な新治療法」）。
  - **対処法**: 症例報告はあくまで一つの事例提示です。断定的な表現は避け、"A case of..." や "...suggests..." のように、客観的で控えめな表現を心がけましょう。

- **失敗**: 抄録が単なるデータの羅列で、臨床的教訓（結論）が不明確。
  - **対処法**: 抄録の最後の一文が最も重要です。「So what?（だから何？）」という問いに答える、明確なメッセージを記述してください。

- **失敗**: 本文を書き終えた後に、内容を要約して抄録を作成する。
  - **対処法**: むしろ、抄録を先に書く「Abstract-first」アプローチをお勧めします。抄録を論文全体の設計図と位置づけることで、本文の論理構成がぶれなくなり、執筆全体がスムーズに進みます。

### 💪 上級者向けTIPS

完成したタイトルと抄録を、専門外の同僚や友人に読んでもらいましょう。「面白そう」「なるほど、そういう教訓があるんだね」という反応が返ってくれば成功です。専門用語を知らない人にも価値が伝わるか、という視点で推敲すると、より洗練されたものになります。

### ✅ チェックリスト

- [ ] タイトルに重要なキーワードが含まれているか？
- [ ] 抄録は投稿規定の形式と文字数を満たしているか？
- [ ] 抄録の「結論」は、明確な臨床的教訓を示しているか？

### 🔗 関連リソース

- [1] 平賀陽之. 経験した症例をまとめる：アブストラクトの効果的な書き方. 臨床神経学. 2025;65(1):48-52. [https://www.jstage.jst.go.jp/article/clinicalneurol/65/1/65_cn-002034/_article/-char/ja](https://www.jstage.jst.go.jp/article/clinicalneurol/65/1/65_cn-002034/_article/-char/ja)
