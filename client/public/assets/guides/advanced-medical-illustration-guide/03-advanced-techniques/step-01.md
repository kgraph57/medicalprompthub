# プロンプトエンジニアリング：高品質な医学図解を生成するための技術

## プロンプトの構造

Nanobananaで高品質な医学図解を生成するためには、適切な構造を持ったプロンプトを作成することが重要です。効果的なプロンプトは、以下の要素で構成されます。

### 1. スタイル指定

最初に、生成したい図解のスタイルを明確に指定します。これにより、AIは全体的な視覚的方向性を理解できます。

**例：**
- "Create a professional BioRender-style medical illustration..."
- "Design a clean vector-style scientific diagram..."
- "Generate a photorealistic medical visualization..."

### 2. 主題と目的

図解の主題と、何を伝えたいのかを明確にします。

**例：**
- "...showing the pathophysiology of myocardial infarction..."
- "...illustrating the immune response to viral infection..."
- "...depicting the drug metabolism pathway..."

### 3. 構成とレイアウト

図解の構成要素と、それらの配置を具体的に指示します。

**例：**
- "Layout from left to right: 1) Normal tissue, 2) Early stage disease, 3) Advanced stage..."
- "Circular layout centered on the virus particle, surrounded by immune cells..."
- "Top to bottom flowchart with decision boxes and arrows..."

### 4. 視覚的要素

色、形、矢印、ラベルなど、具体的な視覚的要素を指定します。

**例：**
- "Color scheme: healthy tissue in pink, diseased tissue in purple, arrows in blue..."
- "Use consistent line weights and rounded corners..."
- "Include labels: 'Absorption', 'Distribution', 'Metabolism', 'Excretion'..."

### 5. 技術的要件

解像度、背景、明るさなど、技術的な要件を指定します。

**例：**
- "White background, high resolution, bright lighting..."
- "Suitable for publication in academic journals..."
- "Professional medical illustration style..."

---

## プロンプトの最適化テクニック

### テクニック1：段階的な詳細化

複雑な図解を作成する場合は、段階的に詳細を追加していくことで、より正確な結果が得られます。

**基本プロンプト：**
```
Create a medical illustration of heart anatomy
```

**詳細化したプロンプト：**
```
Create a professional BioRender-style cross-sectional illustration of human heart anatomy. Show the four chambers (right atrium, right ventricle, left atrium, left ventricle) in different colors: right side in blue (deoxygenated blood), left side in red (oxygenated blood). Include major vessels: superior and inferior vena cava, pulmonary arteries and veins, aorta. Show valves between chambers. Use clean vector style with consistent line weights. Label all major structures. White background, suitable for medical education.
```

### テクニック2：参照スタイルの明示

特定のスタイルを再現したい場合は、そのスタイルの特徴を具体的に記述します。

**BioRenderスタイルの特徴：**
- Clean vector illustrations
- Consistent line weights
- Professional color schemes
- Simple, clear iconography
- Minimal but effective labeling
- White or light backgrounds

**プロンプト例：**
```
Create an illustration in BioRender style (clean vector graphics, consistent line weights, professional color scheme, simple icons, minimal labels, white background)...
```

### テクニック3：色の意味付け

色を情報伝達の手段として活用し、その意味を明確に指定します。

**効果的な色の使い方：**

| 色 | 医学図解での一般的な意味 | 使用例 |
| :--- | :--- | :--- |
| **赤** | 動脈血、炎症、緊急、危険 | 動脈、炎症部位、緊急経路 |
| **青** | 静脈血、正常、安全 | 静脈、正常細胞、安全経路 |
| **緑** | 治療、改善、進行 | 治療薬、改善効果、次のステップ |
| **黄/オレンジ** | 注意、警告、中間状態 | リスク因子、注意事項 |
| **紫/ピンク** | 異常、疾患、変異 | がん細胞、病変部位 |
| **グレー** | 不活性、対照群、補助情報 | プラセボ、背景情報 |

### テクニック4：矢印と流れの明確化

プロセスや因果関係を示す場合は、矢印の種類と意味を明確に指定します。

**プロンプト例：**
```
Use blue arrows to show the progression between stages, red arrows for inhibitory effects, green arrows for stimulatory effects. Arrow thickness should indicate strength of effect.
```

---

## よくある失敗とその対処法

### 失敗1：情報過多で見づらい図解

**問題：** プロンプトに詳細を詰め込みすぎると、ごちゃごちゃした図解になる。

**対処法：** 最も重要な3-5つの要素に絞り、「シンプルに」「主要な要素のみ」と明示する。

**改善例：**
```
悪い例：Show all 20 steps of glycolysis with every enzyme, cofactor, and intermediate...

良い例：Show a simplified glycolysis pathway with 3 main stages: glucose input, energy investment phase, energy payoff phase. Use simple arrows and minimal labels.
```

### 失敗2：スタイルの不統一

**問題：** 図解内で線の太さ、色のトーン、アイコンのスタイルがバラバラになる。

**対処法：** "consistent line weights", "unified color scheme", "same style for all icons" などを明示する。

### 失敗3：ラベルが読みにくい

**問題：** ラベルが小さすぎる、背景と同化する、配置が悪い。

**対処法：** "clear, readable labels", "high contrast text", "labels positioned outside main elements" などを指定する。

---

## プロンプトテンプレート集

### テンプレート1：病態生理図

```
Create a professional BioRender-style medical illustration showing [疾患名] pathophysiology. 
Layout: [left to right / top to bottom / circular]
Stages: 1) [正常状態], 2) [初期変化], 3) [進行状態], 4) [最終状態]
Color scheme: [正常=色], [異常=色], arrows in [色]
Style: Clean vector illustration, consistent line weights, white background
Labels: [主要な構造名をリスト]
Technical: High resolution, bright lighting, suitable for [用途]
```

### テンプレート2：Visual Abstract

```
Create a professional Visual Abstract in BioRender style for [研究テーマ].
Layout from left to right:
1) Study Population: [対象者数と特徴]
2) Intervention: [介入内容] in [色]
3) Control: [対照群] in [色]
4) Outcomes: [測定項目をアイコンで]
5) Results: [主要な結果をグラフで]
Bottom: Conclusion: [結論を一文で]
Style: Clean vector, professional colors, minimal text, clear hierarchy
Background: White, suitable for journal publication
```

### テンプレート3：診断フローチャート

```
Create a professional medical flowchart for [診断対象].
Flow: Top to bottom
Structure:
1) Start: [初期症状] in rounded blue box
2) Assessment: [評価項目] in rectangular box
3) Decision: [判断基準] in diamond shape with Yes/No paths
4) [Yes path]: [処置A] in [色] box
5) [No path]: [処置B] in [色] box
6) Convergence: [次のステップ] in [色] box
7) End: [最終決定] in [色] box
Style: Clean vector, rounded corners, clear arrows
Colors: [色の意味付けを指定]
Background: White, suitable for clinical guidelines
```

---

## 次のステップ

プロンプトエンジニアリングの基本を理解したら、次のセクションで実際の応用例を見ていきましょう。様々な医学図解のケーススタディを通じて、これらのテクニックがどのように実践されるかを学びます。
