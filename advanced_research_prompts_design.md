# 高度研究支援プロンプト設計案

## 1. 統計解析コード生成 (Statistical Code Generation)
### Python (pandas, scipy, statsmodels, scikit-learn)
- **データ前処理 (Data Cleaning)**: 欠損値処理、外れ値の検出・除外、カテゴリ変数のダミー変数化を行うコード。
- **記述統計・可視化 (Descriptive Stats & Viz)**: Table 1作成用の集計、ヒストグラム、箱ひげ図、散布図行列を描画するコード。
- **仮説検定 (Hypothesis Testing)**: t検定、Mann-Whitney U検定、カイ二乗検定、Fisherの正確検定を自動選択して実行する関数。
- **回帰モデル (Regression Models)**: ロジスティック回帰、線形回帰、Cox比例ハザードモデル（lifelines）の実行と結果出力（Odds Ratio/Hazard Ratio, 95%CI, p値）。
- **傾向スコア (Propensity Score)**: 傾向スコアマッチングまたはIPTW（逆確率重み付け）を実行し、共変量のバランスをチェックするコード。

### R (tidyverse, survival, tableone)
- **Table 1作成 (tableone)**: 論文投稿用の美しい背景因子表（Table 1）を一発で出力するコード。
- **生存時間解析 (Survival Analysis)**: Kaplan-Meier曲線の描画（ggsurvplot）とLog-rank検定、Cox回帰を実行するコード。
- **サンプルサイズ計算 (Power Analysis)**: 研究デザイン（t検定、カイ二乗、生存解析）に基づいた必要症例数計算コード。

## 2. 文献管理・引用 (Reference Management)
- **BibTeX/RIS形式への変換**: 論文情報（タイトル、著者、ジャーナル、年、巻、号、ページ）を入力すると、EndNoteやZoteroにインポート可能なBibTeXまたはRIS形式のテキストを出力する。
- **引用フォーマット変換**: 論文リストを、指定されたジャーナルの投稿規定（AMA, APA, Vancouver, Harvardなど）に合わせて整形する。
- **文献マトリックス作成**: 複数の論文の要約を入力し、PICO、結果、限界などを比較する表（Evidence Matrix）のMarkdown/CSV形式を作成する。

## 3. ガイドライン準拠チェック (Reporting Guidelines)
- **CONSORTチェックリスト (RCT)**: ランダム化比較試験のドラフトを入力し、CONSORT声明の必須項目（ランダム化の方法、盲検化、フローチャートなど）が記述されているかチェックし、不足点を指摘する。
- **STROBEチェックリスト (観察研究)**: 観察研究（コホート、ケースコントロール、横断）のドラフトを入力し、STROBE声明に基づいて記載漏れ（バイアス、交絡因子の調整、欠損値の扱いなど）がないか確認する。
- **PRISMAチェックリスト (システマティックレビュー)**: システマティックレビュー・メタ解析のドラフトを入力し、PRISMA声明（検索式、選択基準、バイアスリスク評価など）への準拠度を判定する。
- **CAREチェックリスト (症例報告)**: 症例報告のドラフトを入力し、CAREガイドライン（患者情報の匿名化、タイムライン、患者の視点など）に沿っているか確認する。

## 4. 研究効率化・自動化 (Workflow Automation)
- **研究スケジュール作成 (Gantt Chart)**: 研究の開始日から学会発表・論文投稿までのマイルストーンを逆算し、具体的なタスクと期限をリストアップする（Mermaid記法のガントチャート用コードも出力）。
- **倫理審査・利益相反 (COI) 申告書**: 利益相反の状況（講演料、奨学寄付金など）を入力し、COI申告書の記述案を作成する。
