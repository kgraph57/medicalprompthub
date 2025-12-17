# BioRender風図解の基本原則

BioRender風の医学図解を作成するための基本原則と実践方法を解説します。

## BioRenderとは

**BioRender**は、科学論文や学会発表で広く使用されている医学・生物学図解作成サービスです。その特徴的なビジュアルスタイルは、以下の要素で構成されています：

- **統一された色彩パレット**：医学的意味を持つ色の体系的使用
- **クリーンなアイコンデザイン**：シンプルで認識しやすい視覚要素
- **階層的な情報構造**：重要度に応じた視覚的強調
- **プロフェッショナルな仕上がり**：学術出版に適した品質

## 5つの基本デザイン原則

### 1. シンプルさを保つ（Keep it Simple）

**原則：** 1つの図解で伝えるメッセージは1つに絞る

- 不要な要素を削除し、核心的な情報のみを残す
- 視覚的なノイズを最小限に抑える
- 読者が3秒で主要なメッセージを理解できるように設計

**プロンプト例：**
```
Create a simple, clean BioRender-style illustration showing [主題]. 
Focus on the core concept only, avoiding unnecessary details. 
Use minimal elements with clear visual hierarchy.
```

### 2. 一貫性のある色使い（Consistent Color Scheme）

**原則：** 色には意味を持たせ、図解全体で一貫して使用する

医学図解における標準的な色の意味：
- **赤**：炎症、損傷、病理学的変化
- **青**：正常な生理学的プロセス、血管系
- **緑**：治療効果、改善、健康な状態
- **黄色/オレンジ**：警告、注意が必要な状態
- **紫**：神経系、特殊な細胞タイプ

**プロンプト例：**
```
Create a BioRender-style medical illustration with consistent color coding:
- Red for inflammatory/pathological processes
- Blue for normal physiological structures
- Green for therapeutic interventions
Use these colors consistently throughout the figure.
```

### 3. 明確な視覚的階層（Clear Visual Hierarchy）

**原則：** サイズ、色、配置で情報の重要度を表現する

- **最重要要素**：大きく、中央に配置、鮮やかな色
- **補助要素**：小さく、周辺に配置、控えめな色
- **説明テキスト**：簡潔で、図の流れを妨げない配置

**プロンプト例：**
```
Create a BioRender-style illustration with clear visual hierarchy:
- Main concept: large, central, bold colors
- Supporting elements: smaller, peripheral, muted colors
- Minimal text labels in clean sans-serif font
```

### 4. 適切な余白とスペーシング（Proper White Space）

**原則：** 要素間に十分な余白を確保し、視認性を高める

- 密集した配置を避ける
- 要素間の関係性を余白で表現
- 読者の視線の流れを誘導

**プロンプト例：**
```
Create a clean BioRender-style illustration with generous white space.
Elements should be well-spaced, not crowded.
Use white space to guide the viewer's eye through the figure.
```

### 5. プロフェッショナルな仕上げ（Professional Polish）

**原則：** 学術出版に適した品質を確保する

- 高解像度（最低300 DPI）
- 一貫したフォント使用
- 適切なラベリングと凡例
- 色覚異常に配慮した配色

**プロンプト例：**
```
Create a publication-quality BioRender-style illustration suitable for academic journals.
Use professional design standards: clean lines, consistent typography, 
colorblind-friendly palette, and appropriate labeling.
```

## 実践例：心筋梗塞の病態生理

以下は、これらの原則を適用した心筋梗塞の病態生理図解の例です。

**プロンプト：**
```
Create a professional BioRender-style medical illustration showing the pathophysiology of myocardial infarction. Include:
1. Normal coronary artery (blue, healthy)
2. Atherosclerotic plaque formation (yellow/orange, warning)
3. Plaque rupture and thrombus formation (red, pathological)
4. Myocardial ischemia and necrosis (dark red, severe damage)

Use a left-to-right progression showing the disease stages.
Include simple labels and arrows to show the progression.
Maintain generous white space and clean, professional styling.
Style: BioRender-like, flat design, medical illustration, clean and professional
```

![心筋梗塞の病態生理](/Helix/assets/guides/advanced-medical-illustration-guide/images/myocardial_infarction_pathophysiology.png)

この図解は以下の原則を実践しています：
- ✅ シンプルな構成（4つの主要ステージのみ）
- ✅ 一貫した色使い（青→黄→赤の進行）
- ✅ 明確な視覚的階層（左から右への流れ）
- ✅ 適切な余白（各ステージ間のスペース）
- ✅ プロフェッショナルな仕上げ

## 次のステップ

次のセクションでは、これらの原則を応用して、より複雑な医学図解を作成する方法を学びます。

---

**参考文献：**
- [BioRender Design Tips](https://www.biorender.com/learn/top-5-design-tips-for-better-publication-figures)
- [Visual Communication in Science](https://www.nature.com/articles/nmeth.2258)
