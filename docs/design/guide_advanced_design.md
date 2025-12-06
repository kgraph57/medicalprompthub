# 高度研究支援ガイド コンテンツ設計書

## 1. 統計解析ガイド (Statistical Analysis Guide)
**タイトル**: 【実践】AIと行う統計解析：Python/Rコード生成から解釈まで
**ターゲット**: 統計ソフトの操作に不慣れな医師、データ解析を効率化したい研究者
**コンセプト**: 「コーディングはAIに任せ、人間は解釈に集中する」

### ステップ構成
1.  **Step 1: 解析計画の立案 (Analysis Planning)**
    *   目的: 研究デザインに合った解析手法（t検定、カイ二乗検定、回帰分析など）を決定する。
    *   プロンプト: `res-stat-plan` (統計解析計画)
2.  **Step 2: データセットの準備 (Data Preparation)**
    *   目的: 解析に適した形式（tidy data）にデータを整形する。欠損値の扱いや変数変換を定義する。
    *   プロンプト: `res-data-cleaning` (データクリーニング)
3.  **Step 3: コード生成 - Table 1作成 (Generating Code for Table 1)**
    *   目的: 患者背景表（Table 1）を作成するためのPython/Rコードを生成する。
    *   プロンプト: `res-code-python` / `res-code-r`
4.  **Step 4: コード生成 - 主要解析 (Generating Code for Main Analysis)**
    *   目的: 主要評価項目の解析（単変量・多変量解析、生存時間解析など）のコードを生成する。
    *   プロンプト: `res-code-python` / `res-code-r`
5.  **Step 5: 結果の解釈と報告 (Interpretation & Reporting)**
    *   目的: 出力された統計量（P値、信頼区間、オッズ比）を正しく解釈し、論文に記載する文章を作成する。
    *   プロンプト: `res-stat-interpretation` (統計結果解釈 - 新規作成必要)

## 2. 学会発表ガイド (Conference Presentation Guide)
**タイトル**: 【完遂】学会発表ロードマップ：抄録からスライド、発表原稿まで
**ターゲット**: 学会発表の準備を効率化したい若手医師
**コンセプト**: 「ストーリーテリングを重視し、聴衆に伝わる発表を作る」

### ステップ構成
1.  **Step 1: 抄録の作成 (Abstract Writing)**
    *   目的: 限られた文字数で研究の魅力を伝える抄録を作成する。
    *   プロンプト: `res-abstract-generator` (学会抄録作成)
2.  **Step 2: 発表構成の設計 (Presentation Structure)**
    *   目的: スライド全体の構成（アウトライン）と、各スライドの要点を設計する。
    *   プロンプト: `res-slide-structure` (スライド構成案 - 新規作成必要)
3.  **Step 3: スライドコンテンツの作成 (Slide Content)**
    *   目的: 各スライドに載せる具体的なテキスト（箇条書き）と図表の配置を決める。
    *   プロンプト: `res-slide-content` (スライド内容生成 - 新規作成必要)
4.  **Step 4: 発表原稿の作成 (Script Writing)**
    *   目的: スライドに合わせて、制限時間内に収まる発表原稿（スクリプト）を作成する。
    *   プロンプト: `res-presentation-script` (発表原稿作成 - 新規作成必要)
5.  **Step 5: 質疑応答対策 (Q&A Preparation)**
    *   目的: 想定される質問をリストアップし、回答を準備する。
    *   プロンプト: `res-qa-prep` (質疑応答対策 - 新規作成必要)

## 新規追加プロンプト一覧
1.  `res-stat-interpretation`: 統計結果の解釈と論文記述
2.  `res-slide-structure`: 学会発表スライド構成案
3.  `res-slide-content`: スライドごとの詳細コンテンツ
4.  `res-presentation-script`: 発表用スクリプト作成
5.  `res-qa-prep`: 想定問答集作成
