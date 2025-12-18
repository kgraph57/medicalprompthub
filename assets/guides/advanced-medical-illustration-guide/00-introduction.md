# 【応用編】高度な医学図解作成ガイド：Nanobananaによるプロフェッショナルな図解作成

## はじめに

このガイドでは、基本的な図解作成から一歩進んで、Nanobanana（AI画像生成）を活用して**出版品質の高度な医学図解**を作成するためのテクニックを紹介します。具体的には、多くの研究者に利用されている[BioRender](https://biorender.com/)のようなプロフェッショナルなスタイルや、論文の要点を視覚的に伝える**Visual Abstract**の作成方法に焦点を当てます。

AIの能力を最大限に引き出すためのプロンプトエンジニアリングを学ぶことで、専門的なデザインスキルがなくても、複雑な医学情報を正確かつ美しく表現することが可能になります。

---

## 高度な医学図解の基本原則

高品質な図解を作成するためには、AIに指示を出すプロンプトに以下の基本原則を反映させることが重要です。これらの原則は、[BioRenderの設計思想](https://www.biorender.com/learn/top-5-design-tips-for-better-publication-figures)や[Visual Abstractの設計ルール](https://pmc.ncbi.nlm.nih.gov/articles/PMC10833524/)に基づいています。

| 原則 | Nanobananaプロンプトへの応用 |
| :--- | :--- |
| **明確性と簡潔性** | 図解の最も重要なメッセージをプロンプトの中心に据え、不要な専門用語や複雑すぎる要求を避ける。「〜をシンプルに図解」「主要な要素のみを強調」のように指示する。 |
| **一貫性** | 「BioRender風のベクタースタイルで統一」「全体を青と緑を基調とした配色で」のように、スタイル、線の太さ、配色、アイコンのトンマナを具体的に指定する。 |
| **視覚的階層** | 「最も重要な要素を中央に大きく配置」「補助的な情報は小さく、色を薄く」のように、情報の優先順位を視覚的な大小や配置、色の濃淡で表現するよう指示する。 |
| **意図的な配色** | 「正常な細胞は青、がん細胞は赤で表現」「緊急経路は赤い矢印で示す」のように、色が持つ意味を明確に定義し、情報の理解を助ける配色を指示する。 |
| **論理的な流れ** | 「左から右へ時系列で進行するように配置」「矢印を使ってプロセスの流れを明確に示す」のように、視線の自然な動きに沿ったレイアウトを指示する。 |

---

## 実践テクニック1：BioRender風イラストレーション

BioRender風のイラストは、クリーンなベクタースタイル、統一された配色、そして科学的な正確さが特徴です。このスタイルをNanobananaで再現するためのプロンプト例と生成結果を見ていきましょう。

### 例1：心筋梗塞の病態生理

**プロンプト：**
```
Create a professional BioRender-style medical illustration showing the pathophysiology of myocardial infarction. The image should show a clear progression from left to right: 1) Normal coronary artery and healthy heart muscle with pink color, 2) Coronary artery occlusion with a red blood clot blocking the vessel, 3) Myocardial ischemia shown as pale/white tissue, 4) Myocardial necrosis shown as dark damaged tissue, and 5) Decreased cardiac function with weakened heart contraction. Use clean, simple vector-style illustrations with consistent line weights. Include blue arrows showing the progression between stages. Use a white or light blue background. The style should be clean, professional, and suitable for academic presentations. Color scheme: healthy tissue in pink/red, ischemic tissue in pale blue/white, necrotic tissue in dark purple/gray, blood vessels in red, arrows in blue. High resolution, bright lighting, medical illustration style similar to BioRender.
```

**生成例：**
![心筋梗塞の病態生理](/assets/guides/advanced-medical-illustration-guide/images/myocardial_infarction_pathophysiology.png)

### 例2：細胞シグナル伝達経路

**プロンプト：**
```
Create a professional BioRender-style illustration of a cell signaling pathway. Show a cross-section of a cell membrane with extracellular space above and cytoplasm below. Left to right flow: 1) Extracellular ligand (small green molecule) approaching cell surface, 2) Ligand binding to membrane receptor (blue transmembrane protein with extracellular and intracellular domains), 3) Receptor activation shown with conformational change (orange glow), 4) Intracellular signaling cascade with 3-4 proteins in sequence (purple, pink, yellow spheres) connected by arrows, 5) Final protein entering nucleus (shown as large circular structure with DNA inside in blue), 6) Gene transcription activation shown with DNA unwinding and mRNA production (red strand). Use clean vector style, consistent line weights, professional color coding: membrane in beige/tan, proteins in distinct bright colors, arrows in black, background in light blue gradient. Include small labels: 'Ligand', 'Receptor', 'Signal Cascade', 'Nucleus', 'Gene Expression'. White or light background, medical/scientific illustration style, bright and clear, suitable for publication.
```

**生成例：**
![細胞シグナル伝達経路](/assets/guides/advanced-medical-illustration-guide/images/cell_signaling_pathway.png)

### 例3：がんの進行ステージ

**プロンプト：**
```
Create a professional BioRender-style illustration showing cancer progression stages from normal tissue to metastasis. Horizontal layout from left to right showing 5 stages: 1) Normal Tissue: organized pink cells in regular arrangement with clear boundaries, 2) Hyperplasia: slightly increased cell number, still organized, light pink, 3) Dysplasia: cells showing irregular shapes and sizes, darker pink with some purple cells, disorganized arrangement, 4) Carcinoma in situ: cluster of dark purple abnormal cells breaking through basement membrane (shown as thin line), 5) Invasive Cancer & Metastasis: large mass of purple cancer cells invading surrounding tissue, with blood vessel (red tube) nearby, cancer cells (small purple dots) entering bloodstream and traveling to distant site shown in corner. Use blue arrows between stages showing progression. Clean vector illustration, consistent line weights, color progression from healthy pink to diseased purple, clear anatomical details. Include labels for each stage. White background, oncology textbook style, high contrast, suitable for medical education and presentations.
```

**生成例：**
![がんの進行ステージ](/assets/guides/advanced-medical-illustration-guide/images/cancer_progression_stages.png)

---

## 実践テクニック2：Visual Abstract

Visual Abstractは、研究のPECO（Population, Exposure/Intervention, Comparison, Outcome）や結論を一枚の画像にまとめたものです。情報を整理し、視覚的なストーリーとして構成することが重要です。

### 例4：架空の研究に関するVisual Abstract

**プロンプト：**
```
Create a professional Visual Abstract in BioRender style for a medical research study. Layout from left to right: 1) Left section: 'Study Population' with simple icon showing 500 patients, diverse group silhouettes in blue, 2) Center-left: 'Intervention' box showing a medication pill icon and syringe in green, with text 'Novel Drug Treatment', 3) Center: Large arrow pointing right with 'vs' text, then 'Control' box with placebo pill icon in gray, 4) Center-right: 'Outcomes Measured' with three small icons - heart rate monitor, blood pressure cuff, survival curve graph, 5) Right section: 'Results' with bar chart showing 30% improvement in primary outcome (green bar higher than gray bar), with p<0.001 annotation. Bottom banner: 'Conclusion: Significant improvement in cardiovascular outcomes'. Use clean vector illustrations, consistent line weights, professional color scheme (blue, green, gray, red accents), white background, minimal text, clear visual hierarchy. Medical illustration style similar to journal graphical abstracts, bright and clear, suitable for publication.
```

**生成例：**
![Visual Abstract](/assets/guides/advanced-medical-illustration-guide/images/visual_abstract_example.png)

---

## 実践テクニック3：フローチャートとアルゴリズム

診断や治療のプロセスを示すフローチャートも、Nanobananaで作成できます。各ステップの形状（四角、ひし形など）や色、矢印を明確に指示することが、わかりやすいフローチャートを作成する鍵です。

### 例5：胸痛の診断フロー

**プロンプト：**
```
Create a professional BioRender-style medical flowchart for chest pain diagnosis. The flowchart should flow from top to bottom with clear decision boxes and arrows. Structure: 1) Top: 'Patient with Chest Pain' in a rounded blue box with a simple icon of a person holding their chest, 2) 'Symptom Assessment' in a light blue rectangular box with bullet points: Duration, Quality, Radiation, Associated symptoms, 3) Diamond-shaped decision box 'Emergency Signs?' with Yes/No paths, 4) Yes path (red arrow) leads to 'Immediate ECG & Cardiac Markers' in red box, 5) No path (green arrow) leads to 'Risk Stratification' in yellow box, 6) Both paths converge to 'Diagnostic Testing' in purple box (ECG, Troponin, Imaging), 7) Final box 'Treatment Decision' in green box at bottom. Use clean vector style with consistent rounded corners, simple medical icons, clear arrows showing flow direction. Color scheme: blue for assessment, red for emergency, yellow for caution, green for safe/proceed, purple for testing. White background, professional medical illustration style, high contrast, suitable for educational presentations.
```

**生成例：**
![胸痛の診断フロー](/assets/guides/advanced-medical-illustration-guide/images/chest_pain_diagnostic_flow.png)

---

## まとめ

Nanobanana（AI画像生成）を使いこなすことで、医学図解の作成は、単なる情報の伝達から、魅力的で理解しやすい**ビジュアルストーリーテリング**へと進化します。このガイドで紹介した原則とテクニックを応用し、ぜひあなたの研究や教育活動に、プロフェッショナルな医学図解を取り入れてみてください。
