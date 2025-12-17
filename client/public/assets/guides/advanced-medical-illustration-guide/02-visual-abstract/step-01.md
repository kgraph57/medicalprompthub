# Visual Abstractの作成

Visual Abstractは、研究論文の内容を1枚の図で要約したものです。SNSでの共有や学会発表で非常に効果的です。

## Visual Abstractとは

**Visual Abstract（ビジュアルアブストラクト）**は、論文の主要な発見や結論を視覚的に要約した図解です。特にTwitter/X、LinkedIn、学会ポスターなどで広く使用されています。

### Visual Abstractの利点

1. **高い共有率**：テキストのみの投稿と比較して3〜5倍の共有率
2. **理解の促進**：複雑な研究内容を直感的に理解できる
3. **アクセシビリティ**：言語の壁を超えて情報を伝達
4. **プロフェッショナルな印象**：研究の質と信頼性を視覚的に示す

## Visual Abstractの10のルール

以下は、PLoS Computational Biologyで発表された「Ten Simple Rules for Visual Abstracts」に基づく原則です。

### Rule 1: 主要なメッセージを1つに絞る

**原則：** Visual Abstractは論文全体ではなく、最も重要な発見1つに焦点を当てる

❌ **悪い例：** 研究の全ステップを詰め込む  
✅ **良い例：** 「治療Xは疾患Yの予後を50%改善した」という核心的発見のみ

### Rule 2: シンプルなレイアウトを使用

**推奨レイアウト：**
- **横向き（Landscape）**：Twitter/SNS投稿に最適（16:9または4:3）
- **縦向き（Portrait）**：学会ポスターに最適（3:4または9:16）

**構成要素：**
1. タイトル（上部）
2. 主要な図解（中央）
3. 結論（下部）
4. 著者情報・所属（最下部）

### Rule 3: 色を戦略的に使用

**色の使用原則：**
- メインカラー：2〜3色に限定
- 強調色：重要な発見を示すために1色
- 背景色：白または明るいグレー（読みやすさ優先）

**色覚異常への配慮：**
- 赤と緑の組み合わせを避ける
- 色だけでなく、形状やパターンでも区別する

### Rule 4: テキストを最小限に

**テキストの原則：**
- タイトル：15語以内
- 本文：50語以内
- 箇条書き：3〜5項目まで

**フォント選択：**
- サンセリフ体（Arial, Helvetica, Calibri）
- 最小フォントサイズ：14pt（印刷時）、18pt（スクリーン表示）

### Rule 5: アイコンとシンボルを活用

**効果的なアイコン使用：**
- 患者：人型アイコン
- 治療：薬のアイコン、注射器
- 結果：グラフ、矢印（上昇/下降）
- 統計：パーセンテージ、p値

**無料アイコンリソース：**
- BioRender（医学専門）
- The Noun Project
- Flaticon

### Rule 6: データを視覚化

**効果的なデータ表示：**
- 棒グラフ：グループ間比較
- 折れ線グラフ：時系列変化
- 円グラフ：割合（3〜4カテゴリまで）
- インフォグラフィック：統計的発見

### Rule 7: ロジカルな流れを作る

**視線の流れ：**
1. 左上から右下（西洋文化）
2. 矢印で流れを明示
3. 番号付けで順序を示す

### Rule 8: ブランディング要素を含める

**必須要素：**
- 論文タイトル
- 著者名
- 所属機関
- ジャーナル名（掲載後）
- DOI（掲載後）

**オプション要素：**
- 機関ロゴ
- QRコード（論文へのリンク）
- ハッシュタグ

### Rule 9: ターゲットオーディエンスを考慮

**オーディエンス別の調整：**
- **専門家向け**：専門用語OK、詳細なデータ
- **一般向け**：平易な言葉、シンプルな概念
- **SNS向け**：キャッチーなタイトル、視覚的インパクト

### Rule 10: フィードバックを得て改善

**レビュープロセス：**
1. 同僚からのフィードバック
2. 非専門家の理解度テスト
3. 複数のバージョンを作成して比較

## 実践例：胸痛診断フローチャート

以下は、Visual Abstractの原則を適用した胸痛診断フローチャートの例です。

**プロンプト：**
```
Create a professional BioRender-style medical flowchart for chest pain diagnosis. 
Include:
1. Patient presentation (top, blue box)
2. Initial assessment (light blue box with bullet points)
3. Decision diamond: Emergency signs? (teal diamond)
4. Two pathways:
   - YES path (red): Immediate ECG & Cardiac Markers
   - NO path (green): Risk Stratification
5. Both converge to: Diagnostic Testing (purple box)
6. Final outcome: Treatment Decision (green box at bottom)

Use clear arrows to show the flow.
Include simple medical icons (heart, ECG, clipboard).
Style: Clean, professional, BioRender-like, suitable for medical education
Color palette: Blues for assessment, red for urgent, green for stable, purple for testing
```

![胸痛診断フローチャート](/Helix/assets/guides/advanced-medical-illustration-guide/images/chest_pain_diagnostic_flow.png)

この Visual Abstract は以下の原則を実践しています：
- ✅ 主要メッセージ：胸痛の体系的診断アプローチ
- ✅ シンプルなレイアウト：上から下への明確な流れ
- ✅ 戦略的な色使い：緊急度に応じた色分け
- ✅ 最小限のテキスト：各ステップは簡潔に
- ✅ アイコンの活用：医療シンボルで視認性向上

## Nanobananaで Visual Abstract を作成するコツ

### 1. レイアウトを明確に指定

```
Create a visual abstract with the following layout:
- Top section (20%): Title and authors
- Middle section (60%): Main illustration
- Bottom section (20%): Key findings and conclusion
```

### 2. 要素の配置を具体的に

```
Position elements as follows:
- Left side: Problem/Background
- Center: Intervention/Method
- Right side: Results/Outcome
Use arrows to connect these three sections.
```

### 3. テキストの内容を事前に決定

```
Include the following text:
Title: "Treatment X Improves Outcome Y by 50%"
Subtitle: "A Randomized Controlled Trial"
Key Finding: "Significant reduction in mortality (p<0.001)"
```

## 次のステップ

次のセクションでは、より高度なプロンプトエンジニアリング技術を学び、複雑な医学図解を効率的に作成する方法を解説します。

---

**参考文献：**
- Ibrahim AM, et al. (2017). [Ten Simple Rules for Creating a Visual Abstract](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005484)
- Pferschy-Wenzig EM, et al. (2024). [Visual Abstracts in Scientific Publications](https://pmc.ncbi.nlm.nih.gov/articles/PMC10833524/)
