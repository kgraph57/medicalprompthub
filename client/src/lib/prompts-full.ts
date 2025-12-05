import { Prompt } from "./prompts";

export const fullPrompts: Prompt[] = [
  // 診断支援
  {
    id: "diagnosis-differential",
    title: "Differential Diagnosis Generator",
    description: "主訴と現病歴から鑑別診断リストを作成し、見逃しを防ぎます。",
    category: "diagnosis",
    template: `あなたは熟練した総合診療医です。以下の症例情報に基づき、鑑別診断リストを作成してください。

# 症例情報
- 主訴: [主訴を入力]
- 現病歴: [現病歴を入力]
- 既往歴: [既往歴を入力]
- バイタルサイン: [バイタルサインを入力]

# 出力形式
1. **Critical (見逃してはいけない疾患)**: 3つ
2. **Common (頻度の高い疾患)**: 3つ
3. **Rare (稀だが考慮すべき疾患)**: 2つ

各疾患について、この症例で疑う根拠と、除外するために必要な追加検査を簡潔に記載してください。`,
    inputs: [
      { key: 'case_info', label: '症例情報', placeholder: '主訴、現病歴、既往歴、バイタルサインなどを入力', type: 'textarea' }
    ]
  },
  {
    id: "diagnosis-symptom-analysis",
    title: "Symptom Analysis (OPQRST)",
    description: "症状をOPQRST法に基づいて分析し、問診の不足点を指摘します。",
    category: "diagnosis",
    template: `以下の症状について、OPQRST法（Onset, Palliative/Provocative, Quality, Region/Radiation, Severity, Time）に基づいて分析してください。
また、診断を絞り込むために追加で聴取すべき問診事項を3つ挙げてください。

# 症状記述
[患者の症状や言葉を入力]`,
    inputs: [
      { key: 'symptom', label: '症状記述', placeholder: '例: 昨晩から急に右下腹部が痛くなり、歩くと響く感じがします。', type: 'textarea' }
    ]
  },
  {
    id: "diagnosis-lab-interpretation",
    title: "Lab Result Interpretation",
    description: "異常な検査結果の解釈と、次に考えるべき病態を提示します。",
    category: "diagnosis",
    template: `以下の検査結果の異常値について、考えられる病態生理学的メカニズムと、鑑別すべき疾患を挙げてください。

# 検査結果
[異常な検査項目と数値を入力]
# 患者背景
[年齢、性別、主訴など]`,
    inputs: [
      { key: 'lab_results', label: '検査結果', placeholder: '例: Na 125, K 5.8, Cre 2.1', type: 'textarea' },
      { key: 'patient_info', label: '患者背景', placeholder: '例: 70歳男性、全身倦怠感', type: 'text' }
    ]
  },

  // 治療計画
  {
    id: "treatment-planning",
    title: "Evidence-Based Treatment Plan",
    description: "最新のガイドラインに基づいた治療計画のオプションを提示します。",
    category: "treatment",
    template: `以下の診断に対する標準的な治療計画を、最新のガイドライン（UpToDateや学会ガイドライン）に基づいて提示してください。

# 診断名
[診断名を入力]
# 患者背景
[年齢、合併症、アレルギーなど]

# 出力要件
1. 第一選択薬（投与量・期間含む）
2. 代替治療（第一選択が使えない場合）
3. 非薬物療法
4. フォローアップ計画`,
    inputs: [
      { key: 'diagnosis', label: '診断名', placeholder: '例: 市中肺炎（中等症）', type: 'text' },
      { key: 'patient_context', label: '患者背景', placeholder: '例: 65歳女性、ペニシリンアレルギーあり', type: 'text' }
    ]
  },

  // 書類作成
  {
    id: "doc-referral-letter",
    title: "Referral Letter Generator",
    description: "紹介先の診療科や目的に合わせた、失礼のない紹介状（診療情報提供書）を作成します。",
    category: "documentation",
    template: `以下の情報を基に、[紹介先診療科]宛の診療情報提供書（紹介状）を作成してください。
丁寧で専門的な文体にしてください。

# 患者情報
- 氏名: [患者氏名] (年齢/性別)
- 診断名/主訴: [診断名]

# 紹介目的
[紹介の目的（例：精査加療、手術依頼）]

# 経過要約
[これまでの経過、検査結果、治療内容]

# 現在の処方
[処方薬リスト]`,
    inputs: [
      { key: 'target_dept', label: '紹介先診療科', placeholder: '例: 循環器内科 御机下', type: 'text' },
      { key: 'patient_name', label: '患者情報', placeholder: '例: 山田太郎 殿 (72歳男性)', type: 'text' },
      { key: 'purpose', label: '紹介目的', placeholder: '例: 労作性狭心症の疑いのため、冠動脈造影をお願い申し上げます。', type: 'textarea' },
      { key: 'history', label: '経過要約', placeholder: '経過を入力...', type: 'textarea' }
    ]
  },
  {
    id: "doc-discharge-summary",
    title: "Discharge Summary Helper",
    description: "入院経過を要約し、退院サマリーの「入院後経過」欄を作成します。",
    category: "documentation",
    template: `以下の入院中の出来事を時系列で整理し、退院サマリーの「入院後経過」セクションとしてまとめてください。
簡潔かつ医学的に正確な表現を使用してください。

# 入院中の経過メモ
[日付ごとのイベント、検査、治療変更などを入力]`,
    inputs: [
      { key: 'course', label: '経過メモ', placeholder: '例: \nX月X日 入院。抗菌薬開始。\nX月Y日 解熱傾向。食事開始。\nX月Z日 退院決定。', type: 'textarea' }
    ]
  },

  // 薬剤・処方
  {
    id: "med-renal-dosing",
    title: "Renal Dosing Adjustment",
    description: "腎機能（eGFR/CCr）に応じた薬剤の投与量調節を提案します。",
    category: "medication",
    template: `以下の患者における[薬剤名]の適切な投与設計を教えてください。
腎機能に応じた減量基準（添付文書やSanford Guideなど）を参照してください。

# 患者情報
- 年齢/性別: [年齢/性別]
- 血清クレアチニン: [Cre値] mg/dL
- 推定eGFR/CCr: [eGFRまたはCCr]

# 対象薬剤
[薬剤名]`,
    inputs: [
      { key: 'drug_name', label: '薬剤名', placeholder: '例: レボフロキサシン', type: 'text' },
      { key: 'renal_function', label: '腎機能データ', placeholder: '例: Cre 2.5, eGFR 22', type: 'text' }
    ]
  },
  {
    id: "med-interaction-check",
    title: "Drug Interaction Checker",
    description: "処方薬リスト内の相互作用をチェックし、注意すべき組み合わせを指摘します。",
    category: "medication",
    template: `以下の薬剤リストに含まれる薬物相互作用をチェックしてください。
特に「併用禁忌」と「併用注意」を明確に区別し、臨床的にどのような影響が出るか（例：血中濃度上昇、QT延長など）を説明してください。

# 薬剤リスト
[薬剤名を入力（カンマ区切りまたは改行）]`,
    inputs: [
      { key: 'drug_list', label: '薬剤リスト', placeholder: '例: ワーファリン, アスピリン, クラリスロマイシン', type: 'textarea' }
    ]
  },

  // 患者コミュニケーション
  {
    id: "comm-patient-education",
    title: "Patient Education Material",
    description: "専門用語を使わずに、患者さんに病気や治療を説明するための文章を作成します。",
    category: "communication",
    template: `以下の医学的情報を、医学知識のない一般の方（または高齢者/子供）にもわかるように、専門用語を使わずに噛み砕いて説明してください。
不安を煽らず、かつ重要な注意点は明確に伝わるようにしてください。

# 説明したい内容
[診断名や治療法、生活指導の内容]
# 対象
[例：高齢の患者さん、小学生の子供を持つ親]`,
    inputs: [
      { key: 'topic', label: '説明内容', placeholder: '例: 慢性腎臓病の食事療法（減塩とカリウム制限）', type: 'textarea' },
      { key: 'target', label: '対象患者', placeholder: '例: 80代女性とその家族', type: 'text' }
    ]
  },
  {
    id: "comm-bad-news",
    title: "Breaking Bad News (SPIKES)",
    description: "SPIKESプロトコルに基づき、悪い知らせを伝える際の会話シミュレーションを行います。",
    category: "communication",
    template: `以下の「悪い知らせ」を患者さんに伝えるための準備をSPIKESプロトコルに基づいて行いたいです。
特に「Knowledge（情報の伝え方）」と「Empathy（共感）」のフェーズで、具体的にどのような言葉をかけるべきか、会話例を3パターン作成してください。

# 悪い知らせの内容
[例：癌の再発、治療の中止など]
# 患者さんの状況
[理解度、家族背景など]`,
    inputs: [
      { key: 'news', label: '悪い知らせ', placeholder: '例: 膵臓癌の肝転移が見つかり、手術適応外であること', type: 'textarea' },
      { key: 'patient_context', label: '患者状況', placeholder: '例: 60代男性、治ると信じていた', type: 'text' }
    ]
  },

  // 医学文献
  {
    id: "lit-paper-summary",
    title: "Paper Abstract Summary",
    description: "論文の抄録（Abstract）を構造化して要約し、臨床的意義を抽出します。",
    category: "literature",
    template: `以下の論文Abstractを日本語で要約してください。
以下のフォーマットに従って出力してください。

1. **背景 (Background)**: 何が課題だったのか
2. **方法 (Methods)**: どのような研究デザインか（PICO）
3. **結果 (Results)**: 主要な数字と統計学的有意差
4. **結論 (Conclusion)**: 著者らの主張
5. **臨床的意義 (Clinical Implication)**: 明日の診療にどう役立つか

# Abstract
[Abstractのテキストを貼り付け]`,
    inputs: [
      { key: 'abstract', label: 'Abstract本文', placeholder: 'Paste abstract here...', type: 'textarea' }
    ]
  },

  // 研究・学会
  {
    id: "res-timeline-builder",
    title: "Case Report Timeline Builder",
    description: "カルテのバラバラな記録から、症例報告用の整理された時系列表（Timeline）を作成します。",
    category: "research",
    template: `以下のカルテ記録（メモ）を整理し、症例報告の「経過」セクションで使用できる時系列表（Timeline）を作成してください。
日付（または入院第X病日）、出来事、検査結果、治療内容を明確に分けてください。
症例報告では、経過の細部を記述しすぎると焦点がぼやけるため、診断と鑑別診断に必要な検査所見、重要な陰性所見、結論を導くのに必要な所見を中心に簡潔に記載してください。

# カルテ記録
[日付ごとのメモや経過を入力]

# 出力形式
| 時期 | 出来事・症状 | 検査所見 | 治療・処置 |
|---|---|---|---|
| X月X日 | ... | ... | ... |`,
    inputs: [
      { key: 'notes', label: 'カルテ記録', placeholder: '例：X月X日 入院。発熱あり。抗菌薬開始...', type: 'textarea' }
    ]
  },
  {
    id: "com-mentor-email",
    title: "Email to Mentor (Consultation)",
    description: "指導医に症例報告の指導や添削を依頼するための、礼儀正しく要点を押さえたメールを作成します。",
    category: "communication",
    template: `指導医の先生に、症例報告の指導（または原稿の添削）をお願いするメールを作成してください。
忙しい先生に対して、要件を簡潔に伝え、相手の都合に配慮した文面にしてください。

# 依頼内容
[例：抄録の確認をお願いしたい、学会発表の予演会をお願いしたい]
# 期限や状況
[例：来週の火曜日が締め切り、現在はドラフトが完成した段階]`,
    inputs: [
      { key: 'request', label: '依頼内容', placeholder: '例：作成した抄録の確認をお願いしたい', type: 'text' },
      { key: 'deadline', label: '期限・状況', placeholder: '例：今週中に投稿が必要', type: 'text' }
    ]
  },
  {
    id: "res-journal-finder",
    title: "Journal Selector",
    description: "研究テーマや症例の内容に基づいて、投稿に適したターゲットジャーナル（投稿先候補）を提案します。",
    category: "research",
    template: `以下の研究（または症例報告）の内容に適した、投稿先の医学ジャーナルを3〜5つ提案してください。
それぞれのジャーナルの特徴（Impact Factor、採択率の傾向、オープンアクセスかなど）と、なぜそのジャーナルが適しているかの理由も添えてください。

# 研究タイトル/内容
[タイトルや要旨を入力]
# 希望条件
[例：Impact Factor 3以上、査読が早い、オープンアクセス希望]`,
    inputs: [
      { key: 'content', label: '研究内容', placeholder: '例：稀な副作用の症例報告', type: 'textarea' },
      { key: 'preferences', label: '希望条件', placeholder: '例：症例報告を受け付けている国際誌', type: 'text' }
    ]
  },
  {
    id: "res-english-proofread",
    title: "Academic English Proofreading",
    description: "医学論文の英語を、学術的に自然で洗練された表現に校正します。",
    category: "research",
    template: `以下の英語の文章を、医学論文（Academic Medical Writing）として自然で洗練された表現に校正してください。
以下の点に注意して修正してください：
1. 簡潔で明確な表現（Concise and Clear）: 冗長な語句を避け、1文1思考を心がける。
2. 能動態の使用（Active Voice）: 受動態よりも能動態を優先する（約70%を目安に）。
3. 否定文を避ける: 肯定文の方が理解しやすいため。
4. "be"動詞を避ける: 動作動詞を使用する。
5. "The first report"や"Unique case"などの表現は避ける。

# 原文
[校正したい英文]`,
    inputs: [
      { key: 'text', label: '英文ドラフト', placeholder: '例: We used 30 mice for this experiment.', type: 'textarea' }
    ]
  },
  {
    id: "res-abstract-generator",
    title: "Conference Abstract Generator",
    description: "研究結果のメモから、学会発表用の抄録（Abstract）案を作成します。",
    category: "research",
    template: `以下の研究データを基に、学会発表用の抄録（Abstract）を作成してください。
構成は【目的】【方法】【結果】【結論】の4部構成とし、文字数は[文字数制限]程度に収めてください。
特に以下の点を含めてください：
1. 序論（1-2文）: なぜこの症例/研究が注目すべきなのか（メッセージ）。
2. 症例記述: 年齢、性別、際立った臨床的特徴、診断、治療、経過。
3. 結論（1-2文）: 症例からの新しい知識と応用性（Learning Point）。

# 研究データ
[研究の背景、方法、主な結果データ、結論のメモ]`,
    inputs: [
      { key: 'data', label: '研究データ', placeholder: '研究の要点を入力...', type: 'textarea' },
      { key: 'limit', label: '文字数制限', placeholder: '例: 日本語800文字 または 英語250語', type: 'text' }
    ]
  },

  // 症例分析
  {
    id: "case-presentation",
    title: "Case Presentation Writer",
    description: "日本語の経過メモから、英語論文の「Case Presentation」セクションを作成します。",
    category: "case-analysis",
    template: `以下の症例経過（日本語）を、英語の医学論文の「Case Presentation」セクションとして翻訳・執筆してください。
時系列を明確にし、医学的に適切な用語（"presented with...", "revealed...", "was admitted for..."など）を使用してください。
以下の点に注意してください：
1. 際立った特徴を強調する。
2. 診断と鑑別診断に必要な検査所見、重要な陰性所見を含める。
3. 一般的ではない検査値には基準値を併記する。
4. 結論を導くのに必要な所見は詳細に記載する。
5. "author et al."のような本文中の引用は避ける。

# 症例経過
[日本語での経過メモ]`,
    inputs: [
      { key: 'case_note', label: '症例経過', placeholder: '例: 50歳男性。3日前からの胸痛で救急搬送。心電図でST上昇あり...', type: 'textarea' }
    ]
  },

  // 教育・学習
  {
    id: "edu-anatomy-physiology",
    title: "Anatomy & Physiology Explainer",
    description: "複雑な解剖や生理学のメカニズムを、医学生や研修医向けにわかりやすく解説します。",
    category: "education",
    template: `以下の解剖学的構造または生理学的メカニズムについて、医学生に教えるようにわかりやすく解説してください。
重要な機能、臨床的な関連性（病気との関わり）、覚えるべきポイントを含めてください。

# トピック
[解説してほしいトピック]`,
    inputs: [
      { key: 'topic', label: 'トピック', placeholder: '例: レニン・アンジオテンシン・アルドステロン系', type: 'text' }
    ]
  },

  // 管理・運営
  {
    id: "admin-incident-report",
    title: "Incident Report Helper",
    description: "インシデントレポートの記述を、客観的かつ再発防止に役立つ形式で整理します。",
    category: "administrative",
    template: `以下のインシデント（ヒヤリハット）の状況を、客観的な事実（5W1H）に基づいて整理し、報告書向けの文章を作成してください。
主観的な言い訳や感情的な表現を排除し、事実関係と原因分析、対応内容を明確に分けてください。

# 状況
[インシデントの状況メモ]`,
    inputs: [
      { key: 'situation', label: '状況メモ', placeholder: '例: 点滴の準備中に、隣の患者さんの名前と間違えそうになった...', type: 'textarea' }
    ]
  },
  // 研究支援（高度）
  {
    id: "res-cq-pico",
    title: "Clinical Question to PICO",
    description: "漠然とした臨床上の疑問を、研究可能なPICO形式（Patient, Intervention, Comparison, Outcome）に構造化します。",
    category: "research",
    template: `以下の臨床的な疑問（Clinical Question）を、研究デザインの基礎となるPICO形式に構造化してください。
また、それぞれの要素について、具体的な定義（包含基準・除外基準など）の案も提示してください。

# 臨床的な疑問
[疑問の内容を入力]

# 出力形式
- **P (Patient)**: 対象患者
- **I (Intervention/Exposure)**: 介入または曝露要因
- **C (Comparison)**: 比較対照
- **O (Outcome)**: 主要評価項目と副次評価項目`,
    inputs: [
      { key: 'question', label: '臨床的な疑問', placeholder: '例: 高齢者の心不全で、β遮断薬は本当に予後を改善するのか？', type: 'textarea' }
    ]
  },
  {
    id: "res-pubmed-query",
    title: "PubMed Search Query Builder",
    description: "PICOに基づき、PubMedで効率的に文献を検索するための検索式（MeSH termsを含む）を作成します。",
    category: "research",
    template: `以下の研究テーマ（PICO）に基づいて、PubMedで使用するための最適な検索クエリを作成してください。
適切なMeSH Termsとキーワードを組み合わせ、論理演算子（AND, OR）を正しく使用してください。

# 研究テーマ (PICO)
[PICOの内容を入力]

# 出力
1. **検索クエリ**: コピーしてそのまま使える検索式
2. **解説**: 使用したMeSH Termsとその選定理由`,
    inputs: [
      { key: 'pico', label: 'PICO', placeholder: '例: P: Heart Failure, I: SGLT2 inhibitors, O: Mortality', type: 'textarea' }
    ]
  },
  {
    id: "res-gap-analysis",
    title: "Research Gap Analysis",
    description: "先行研究の要約から、まだ解明されていない点（Research Gap）を特定し、新規性のある研究テーマを提案します。",
    category: "research",
    template: `以下の先行研究の要約リストを読み、現在の知見における「ギャップ（未解明な点）」を特定してください。
そのギャップを埋めるための、新規性のある研究テーマのアイデアを3つ提案してください。

# 先行研究の要約
[先行研究の要約リストを入力]`,
    inputs: [
      { key: 'summaries', label: '先行研究', placeholder: '先行研究1: ...\n先行研究2: ...', type: 'textarea' }
    ]
  },
  {
    id: "res-intro-flow",
    title: "Introduction Structure Builder",
    description: "論文のIntroductionセクションの論理構成（パラグラフごとのトピック）を設計します。",
    category: "research",
    template: `以下の研究テーマについて、論文のIntroduction（緒言）の構成案を作成してください。
一般的な「漏斗型（Broad to Narrow）」の構造に従い、各パラグラフで何を述べるべきかを箇条書きで示してください。

1. **背景（何がわかっているか）**
2. **問題点（何がわかっていないか/Gap）**
3. **研究の目的（本研究で何を明らかにするか）**

# 研究テーマ
[研究のタイトルまたは概要]`,
    inputs: [
      { key: 'topic', label: '研究テーマ', placeholder: '例: 敗血症性ショックにおけるビタミンC投与の効果', type: 'text' }
    ]
  },
  {
    id: "res-cover-letter",
    title: "Cover Letter Generator",
    description: "論文投稿時にエディターへ送るカバーレターを作成します。研究の新規性と重要性をアピールします。",
    category: "research",
    template: `以下の論文情報に基づき、ジャーナルエディター宛のカバーレター（Cover Letter）を作成してください。
この研究がなぜ重要で、なぜこのジャーナルの読者にとって興味深いのかを強調してください。

# 論文情報
- タイトル: [論文タイトル]
- 投稿先ジャーナル: [ジャーナル名]
- 研究の要点（Key Findings）: [主な結果]
- 新規性（Novelty）: [この研究の新しい点]`,
    inputs: [
      { key: 'title', label: '論文タイトル', placeholder: 'Title...', type: 'text' },
      { key: 'journal', label: 'ジャーナル名', placeholder: 'Journal Name...', type: 'text' },
      { key: 'findings', label: '研究の要点', placeholder: 'Key findings...', type: 'textarea' }
    ]
  },
  {
    id: "res-reviewer-response",
    title: "Response to Reviewers",
    description: "査読者からのコメントに対する、礼儀正しく論理的な回答レター（Rebuttal Letter）のドラフトを作成します。",
    category: "research",
    template: `査読者からの以下のコメントに対して、回答（Response）のドラフトを作成してください。
まず査読者の指摘に感謝を示し、指摘に同意する場合は修正内容を、同意できない場合はその理由を論理的かつ丁寧に説明してください。

# 査読コメント
[査読者のコメント]
# こちらの回答方針
[修正したのか、反論するのか、その内容]`,
    inputs: [
      { key: 'comment', label: '査読コメント', placeholder: 'Reviewer says: The sample size is too small...', type: 'textarea' },
      { key: 'strategy', label: '回答方針', placeholder: '例: サンプルサイズは小さいが、パイロット研究としては十分であると説明したい。', type: 'textarea' }
    ]
  },
  {
    id: "res-check-care",
    title: "CARE Checklist Assistant",
    description: "症例報告がCAREガイドライン（報告基準）を満たしているかチェックし、不足項目を指摘します。",
    category: "research",
    template: `以下の症例報告のドラフトを、CAREガイドライン（Case Report Guidelines）に基づいてチェックしてください。
特に以下の項目が含まれているか確認し、不足している場合は具体的に何を追記すべきか指摘してください。

1. **Patient Information**: 患者背景、主訴
2. **Clinical Findings**: 身体所見
3. **Timeline**: 経過の時系列
4. **Diagnostic Assessment**: 診断根拠、鑑別診断
5. **Therapeutic Intervention**: 治療内容
6. **Follow-up and Outcomes**: 転帰
7. **Patient Perspective**: 患者の視点・体験（もしあれば）

# 症例報告ドラフト
[ドラフトを入力]`,
    inputs: [
      { key: 'draft', label: 'ドラフト', placeholder: 'Paste your draft here...', type: 'textarea' }
    ]
  },
  // 統計解析コード生成
  {
    id: "res-stats-python",
    title: "Python Stats Code Generator",
    description: "pandas, scipy, statsmodelsを使用した統計解析用のPythonコードを生成します。",
    category: "research",
    template: `以下のデータ解析を行いたいので、Pythonコード（pandas, scipy, statsmodelsなどを使用）を作成してください。
データフレームの変数名は \`df\` と仮定し、必要なライブラリのインポートも含めてください。

# 解析したい内容
[解析の目的と手法]
# データの構造
[カラム名やデータの型]`,
    inputs: [
      { key: 'analysis', label: '解析内容', placeholder: '例: 2群間（介入群vs対照群）の血圧の平均値をt検定で比較したい。', type: 'textarea' },
      { key: 'data_structure', label: 'データ構造', placeholder: '例: カラムは "group" (0/1) と "bp_systolic" (数値)', type: 'text' }
    ]
  },
  {
    id: "res-stats-r",
    title: "R Stats Code Generator",
    description: "tidyverse, tableone, survivalなどを使用した統計解析用のRコードを生成します。",
    category: "research",
    template: `以下のデータ解析を行いたいので、Rコード（tidyverse, tableone, survivalなどを使用）を作成してください。
データフレーム名は \`data\` と仮定し、コメントで各ステップの説明を加えてください。

# 解析したい内容
[解析の目的と手法]
# データの構造
[カラム名やデータの型]`,
    inputs: [
      { key: 'analysis', label: '解析内容', placeholder: '例: 患者背景表（Table 1）を作成したい。検定も含める。', type: 'textarea' },
      { key: 'data_structure', label: 'データ構造', placeholder: '例: age, sex, bmi, outcomeなどのカラムがある', type: 'text' }
    ]
  },

  // 文献管理・フォーマット
  {
    id: "res-ref-format-convert",
    title: "Reference Formatter",
    description: "引用文献リストを指定されたジャーナルのスタイル（Vancouver, APAなど）に整形します。",
    category: "research",
    template: `以下の文献リストを、[指定スタイル]のフォーマットに整形してください。
ジャーナル名の省略形や、著者名の表記順序（姓・名）などに注意してください。

# 指定スタイル
[例: Vancouver Style, APA Style, New England Journal of Medicine Style]

# 元の文献リスト
[文献リストを入力]`,
    inputs: [
      { key: 'style', label: 'スタイル', placeholder: '例: Vancouver Style', type: 'text' },
      { key: 'references', label: '文献リスト', placeholder: 'Paste references here...', type: 'textarea' }
    ]
  },
  {
    id: "res-bibtex-gen",
    title: "BibTeX Generator",
    description: "論文情報からBibTeX形式の引用データを作成し、文献管理ソフトへのインポートを支援します。",
    category: "research",
    template: `以下の論文情報から、BibTeX形式のエントリーを作成してください。
文献管理ソフト（EndNote, Zotero, Mendeleyなど）にインポート可能な形式にしてください。

# 論文情報
[タイトル、著者、ジャーナル名、年、巻、号、ページなど]`,
    inputs: [
      { key: 'info', label: '論文情報', placeholder: '例: "Deep learning for..." by Smith et al., Nature Medicine 2024', type: 'textarea' }
    ]
  },
  // Research - Paper Writing Guide Prompts
  {
    id: "research-finer-check",
    title: "FINER基準による研究テーマ評価",
    description: "研究テーマをFINER基準（Feasible, Interesting, Novel, Ethical, Relevant）に基づいて多角的に評価し、改善点を提案します。",
    category: "research",
    template: `あなたは経験豊富な臨床研究者です。以下の研究テーマ案をFINER基準に基づいて厳密に評価し、各項目について具体的なフィードバックと改善案を提示してください。

研究テーマ案: {{theme}}
対象患者: {{population}}
介入/要因: {{intervention}}
アウトカム: {{outcome}}

# FINER基準による評価
1. Feasible (実行可能性): 時間、資金、症例数、技術的ハードルについて
2. Interesting (興味深さ): 臨床医や読者にとっての魅力
3. Novel (新規性): 既存の研究との違い、独自性
4. Ethical (倫理的配慮): 患者への侵襲、個人情報、倫理的課題
5. Relevant (妥当性・意義): 臨床現場への貢献度、将来性

# 総合評価と改善アドバイス
- 研究の強み:
- 懸念点・弱点:
- 具体的な改善案（切り口の変更、対象の絞り込みなど）:`,
    inputs: [
      { key: 'theme', label: '研究テーマ案', placeholder: '例：高齢者心不全患者における遠隔モニタリングの再入院予防効果', type: 'textarea' },
      { key: 'population', label: '対象患者 (P)', placeholder: '例：75歳以上の慢性心不全患者', type: 'text' },
      { key: 'intervention', label: '介入/要因 (I/E)', placeholder: '例：スマホアプリを用いた体重・血圧の連日記録', type: 'text' },
      { key: 'outcome', label: 'アウトカム (O)', placeholder: '例：6ヶ月以内の心不全増悪による再入院率', type: 'text' }
    ]
  },
  {
    id: "research-data-collection-list",
    title: "データ収集項目リスト作成",
    description: "研究テーマに基づいて、データ収集シート（CRF）に含めるべき必須項目をリストアップし、入力形式のアドバイスを提供します。",
    category: "research",
    template: `以下の研究テーマについて、データ収集シート（Case Report Form）に含めるべき項目をリストアップしてください。
先行研究で一般的に調整変数として用いられる項目や、解析に必要な項目を網羅してください。また、各項目の推奨入力形式（数値、カテゴリ、二値変数など）も併せて記載してください。

研究テーマ: {{theme}}
主要評価項目: {{primary_endpoint}}

# データ収集項目リスト
## 1. 患者背景 (Patient Characteristics)
- 項目名 (入力形式の推奨): 理由/備考

## 2. 治療・介入内容 (Treatment/Intervention)
- 項目名 (入力形式の推奨): 理由/備考

## 3. 検査データ・測定値 (Laboratory Data/Measurements)
- 項目名 (入力形式の推奨): 理由/備考

## 4. アウトカム・イベント (Outcomes/Events)
- 項目名 (入力形式の推奨): 理由/備考

## データ入力時の注意点
- 欠損値の扱い:
- 単位の統一:
- カテゴリ化の基準:`,
    inputs: [
      { key: 'theme', label: '研究テーマ', placeholder: '例：心房細動患者におけるDOACのアドヒアランスと脳卒中発症リスク', type: 'textarea' },
      { key: 'primary_endpoint', label: '主要評価項目', placeholder: '例：脳卒中または全身性塞栓症の発症', type: 'text' }
    ]
  },
  {
    id: "research-methods-draft",
    title: "Methodsセクションドラフト作成",
    description: "研究デザイン情報を入力すると、医学論文のMethodsセクションのドラフト（英語）を作成します。再現性を重視した記述を行います。",
    category: "research",
    template: `以下の情報を基に、医学論文のMethodsセクションのドラフトを英語で作成してください。
再現性を担保するため、具体的かつ詳細に記述し、標準的な医学論文の構成（Study Design, Participants, Interventions, Outcomes, Statistical Analysis）に従ってください。

Study Design: {{study_design}}
Setting/Location: {{setting}}
Participants (Inclusion/Exclusion): {{participants}}
Interventions/Exposures: {{interventions}}
Outcomes (Primary/Secondary): {{outcomes}}
Statistical Analysis: {{statistics}}

# Methods

## Study Design and Setting

## Participants

## Data Collection and Definitions

## Statistical Analysis`,
    inputs: [
      { key: 'study_design', label: 'Study Design', placeholder: 'e.g., Retrospective cohort study', type: 'text' },
      { key: 'setting', label: 'Setting/Location', placeholder: 'e.g., Single-center, tertiary care hospital in Japan, from Jan 2020 to Dec 2022', type: 'text' },
      { key: 'participants', label: 'Participants', placeholder: 'e.g., Patients aged >18 with type 2 diabetes. Excluded: dialysis patients.', type: 'textarea' },
      { key: 'interventions', label: 'Interventions', placeholder: 'e.g., SGLT2 inhibitors vs DPP-4 inhibitors', type: 'text' },
      { key: 'outcomes', label: 'Outcomes', placeholder: 'e.g., Primary: MACE. Secondary: All-cause mortality.', type: 'textarea' },
      { key: 'statistics', label: 'Statistical Analysis', placeholder: 'e.g., Cox proportional hazards model, Propensity score matching, p<0.05 significance.', type: 'textarea' }
    ]
  },
  {
    id: "research-rebuttal-letter",
    title: "査読コメントへの回答 (Rebuttal) 作成",
    description: "査読者からの厳しい指摘に対して、礼儀正しく、かつ論理的に反論または同意するための回答案（英語）を作成します。",
    category: "research",
    template: `あなたは医学論文の著者です。査読者から以下の指摘を受けました。これに対する回答（Response to Reviewers）を作成してください。
回答のトーンは非常に礼儀正しく（Polite）、かつ科学的に論理的（Logical）である必要があります。
指摘内容が正当であれば素直に認め修正箇所を示し、誤解であれば丁寧に説明してください。

論文タイトル: {{paper_title}}
査読者の指摘: {{reviewer_comment}}
こちらの主張/対応: {{author_response}}

# Response to Reviewer

**Reviewer's Comment:**
"{{reviewer_comment}}"

**Author's Response:**`,
    inputs: [
      { key: 'paper_title', label: '論文タイトル', placeholder: '論文のタイトルを入力', type: 'text' },
      { key: 'reviewer_comment', label: '査読者の指摘', placeholder: '例：The sample size is too small to draw definitive conclusions.', type: 'textarea' },
      { key: 'author_response', label: 'こちらの主張/対応', placeholder: '例：ご指摘に同意します。Limitationセクションにサンプルサイズの限界について追記しました。しかし、希少疾患であるため、この規模でも貴重なデータであると考えています。', type: 'textarea' }
    ]
  }

,
  {
    id: 'res-stat-interpretation',
    title: 'Statistical Result Interpretation',
    description: '統計解析の結果（P値、信頼区間、オッズ比など）を解釈し、論文のResultsセクションに記載する文章を作成します。',
    category: 'research',
    template: `あなたは医学統計の専門家です。以下の統計解析結果を解釈し、医学論文のResultsセクションに適した形式で記述してください。

解析手法: {{analysis_method}}
結果データ: {{result_data}}
比較対象: {{comparison_groups}}

# 出力形式
1. **結果の要約**: 統計的に有意な差があったか、どのような傾向が見られたか。
2. **論文記述案（英語）**: Resultsセクションにそのまま使える英文。
3. **論文記述案（日本語）**: 上記の和訳。
4. **解釈の注意点**: 交絡因子の可能性や、臨床的な意義（Clinical Significance）についてのコメント。`,
    inputs: [
      { key: 'analysis_method', label: '解析手法', placeholder: '例：多変量ロジスティック回帰分析', type: 'text' },
      { key: 'result_data', label: '結果データ', placeholder: '例：OR 2.5 (95% CI 1.2-5.3), p=0.015', type: 'textarea' },
      { key: 'comparison_groups', label: '比較対象', placeholder: '例：治療群 vs 対照群', type: 'text' }
    ]
  },
  {
    id: 'res-slide-structure',
    title: 'Presentation Slide Structure',
    description: '学会発表の抄録や論文要旨から、スライド全体の構成案（アウトライン）を作成します。',
    category: 'research',
    template: `あなたは学会発表の指導医です。以下の研究内容に基づいて、{{slide_count}}枚程度のスライド構成案を作成してください。聴衆に伝わりやすいストーリー構成（Introduction -> Method -> Result -> Discussion -> Conclusion）にしてください。

研究タイトル: {{research_title}}
研究の要旨: {{research_summary}}
発表時間: {{presentation_time}}分

# 出力形式
スライド番号: タイトル
- 含めるべき主な内容（箇条書き）
- 視覚的要素の提案（グラフ、表、写真など）`,
    inputs: [
      { key: 'research_title', label: '研究タイトル', placeholder: '研究のタイトルを入力', type: 'text' },
      { key: 'research_summary', label: '研究の要旨', placeholder: '抄録や要旨を貼り付けてください', type: 'textarea' },
      { key: 'slide_count', label: 'スライド枚数', placeholder: '例：10', type: 'text' },
      { key: 'presentation_time', label: '発表時間（分）', placeholder: '例：7', type: 'text' }
    ]
  },
  {
    id: 'res-slide-content',
    title: 'Slide Content Generator',
    description: '各スライドの具体的な掲載テキスト（箇条書き）と、口頭発表のポイントを生成します。',
    category: 'research',
    template: `特定のスライドについて、掲載するテキストと発表のポイントを作成してください。スライドは文字数を減らし、視覚的にわかりやすくすることが重要です。

スライドのテーマ: {{slide_theme}}
伝えたい内容: {{key_message}}

# 出力形式
1. **スライド掲載テキスト**: 箇条書きで、簡潔に（1行20文字以内推奨）。
2. **図表のイメージ**: どのようなグラフや図を入れるべきか。
3. **強調ポイント**: 聴衆に必ず伝えるべき核心部分。`,
    inputs: [
      { key: 'slide_theme', label: 'スライドのテーマ', placeholder: '例：Methods（患者背景）', type: 'text' },
      { key: 'key_message', label: '伝えたい内容', placeholder: '例：平均年齢は75歳で、男性が60%を占めた。併存疾患として高血圧が最も多かった。', type: 'textarea' }
    ]
  },
  {
    id: 'res-presentation-script',
    title: 'Presentation Script Writer',
    description: 'スライドの内容に合わせて、制限時間内に収まる自然な口頭発表原稿を作成します。',
    category: 'research',
    template: `以下のスライド内容に合わせて、口頭発表用の原稿（スクリプト）を作成してください。話し言葉で、自然な日本語にしてください。

スライドの内容: {{slide_content}}
このスライドの配分時間: {{time_allocation}}秒

# 出力形式
- **発表原稿**: 読み上げた時に指定された時間内に収まる長さで。
- **ト書き**: （ここでスライドを指す）（強調して読む）などの指示。`,
    inputs: [
      { key: 'slide_content', label: 'スライドの内容', placeholder: 'スライドに書かれている箇条書きや図表の説明を入力', type: 'textarea' },
      { key: 'time_allocation', label: '配分時間（秒）', placeholder: '例：45', type: 'text' }
    ]
  },
  {
    id: 'res-qa-prep',
    title: 'Q&A Preparation',
    description: '発表内容に対して想定される質問をリストアップし、それに対する回答案を作成します。',
    category: 'research',
    template: `私の研究発表に対して、座長やフロアから来そうな質問を5つ予想し、それぞれの回答案を作成してください。

研究の要旨: {{research_summary}}
研究の限界（Limitation）: {{limitations}}

# 出力形式
Q1. [想定質問]
A1. [回答案]（まずは感謝を述べ、簡潔に回答する。データがない場合は正直に答える）`,
    inputs: [
      { key: 'research_summary', label: '研究の要旨', placeholder: '抄録や要旨を貼り付けてください', type: 'textarea' },
      { key: 'limitations', label: '研究の限界', placeholder: '例：単施設研究であること、サンプルサイズが小さいこと、後ろ向き研究であることなど', type: 'textarea' }
    ]
  }
];
