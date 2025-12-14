import { Prompt } from "./prompts";

export const fullPrompts: Prompt[] = [
  // 診断支援
  {    id: "diagnosis-differential",
    title: "Differential Diagnosis Generator",
    description: "主訴と現病歴から鑑別診断リストを作成し、見落しを防ぎます。",
    category: "diagnosis",
    riskLevel: "high",
    warningMessage: "⚠️ 重要：このプロンプトは診断の補助ツールです。AIの出力は参考情報であり、最終的な診断は必ず医師の臨床判断に基づいて行ってください。入力情報の不足や誤りがあると、重要な疾患を見落とす可能性があります。",
    tags: ["鑑別診断", "総合診療", "初診", "緊急"],
    template: `あなたは熟練した総合診療医です。以下の症例情報に基づき、鑑別診断リストを作成してください。

# 症例情報
- 主訴: {{chief_complaint}}
- 現病歴: {{present_illness}}
- 既往歴: {{past_history}}
- バイタルサイン: 体温{{temperature}}°C、血圧{{blood_pressure}}mmHg、脈拍{{pulse}}/分、呼吸数{{respiratory_rate}}/分、SpO2 {{spo2}}%

# 出力形式
1. **Critical (見逃してはいけない疾患)**: 3つ
2. **Common (頻度の高い疾患)**: 3つ
3. **Rare (稀だが考慮すべき疾患)**: 2つ

各疾患について、この症例で疑う根拠と、除外するために必要な追加検査を簡潔に記載してください。

⚠️ 注意：この出力は診断の補助であり、最終判断は必ず医師が臨床所見と合わせて行ってください。`,
    inputs: [
      { key: 'chief_complaint', label: '主訴', placeholder: '主訴を選択または入力', type: 'select', options: ['発熱', '頭痛', '胸痛', '腹痛', '呼吸困難', '咳嗽', '嘔気・嘔吐', '下痢', 'めまい', '意識障害', '全身倦怠感', '関節痛', '腰痛', '浮腫', 'その他'] },
      { key: 'present_illness', label: '現病歴', placeholder: '例: 3日前から発熱あり。昨日から咳嗽も出現。解熱剤を内服するも改善せず。', type: 'textarea' },
      { key: 'past_history', label: '既往歴', placeholder: '既往歴を選択または入力', type: 'select', options: ['なし', '高血圧', '糖尿病', '脂質異常症', '心疾患', '脳血管疾患', '慢性腎臓病', '肝疾患', '悪性腫瘍', '喘息・COPD', 'その他'] },
      { key: 'temperature', label: '体温 (°C)', placeholder: '例: 38.5', type: 'text' },
      { key: 'blood_pressure', label: '血圧 (mmHg)', placeholder: '例: 120/80', type: 'text' },
      { key: 'pulse', label: '脈拍 (/分)', placeholder: '例: 90', type: 'text' },
      { key: 'respiratory_rate', label: '呼吸数 (/分)', placeholder: '例: 18', type: 'text' },
      { key: 'spo2', label: 'SpO2 (%)', placeholder: '例: 98', type: 'text' }
    ]
  },
  {
    id: "diagnosis-symptom-analysis",
    title: "Symptom Analysis (OPQRST)",
    description: "症状をOPQRST法に基づいて分析し、問診の不足点を指摘します。",
    category: "diagnosis",
    riskLevel: "high",
    warningMessage: "⚠️ 重要：このプロンプトは問診の補助ツールです。AIの提案を参考にしつつ、必ず直接患者さんと対話して情報を収集してください。",
    template: `以下の症状について、OPQRST法（Onset, Palliative/Provocative, Quality, Region/Radiation, Severity, Time）に基づいて分析してください。
また、診断を絞り込むために追加で聴取すべき問診事項を3つ挙げてください。

# 症状記述
{{symptom}}`,
    inputs: [
      { key: 'symptom', label: '症状記述', placeholder: '例: 昨晩から急に右下腹部が痛くなり、歩くと響く感じがします。', type: 'textarea' }
    ]
  },
  {
    id: "diagnosis-lab-interpretation",
    title: "Lab Result Interpretation",
    description: "異常な検査結果の解釈と、次に考えるべき病態を提示します。",
    category: "diagnosis",
    riskLevel: "high",
    warningMessage: "⚠️ 重要：検査結果の解釈は臨床所見と組み合わせて行う必要があります。AIは数値のみから判断しており、患者背景や臨床文脈を十分に考慮できない可能性があります。",
    template: `以下の検査結果の異常値について、考えられる病態生理学的メカニズムと、鑑別すべき疾患を挙げてください。

# 検査結果
{{lab_results}}
# 患者背景
{{patient_info}}`,
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
    riskLevel: "high",
    warningMessage: "⚠️ 重要：AIが提案する治療計画は、最新のガイドラインと照合して検証してください。薬剤投与量、相互作用、患者背景（腐機能、アレルギーなど）を必ず再確認し、最終判断は医師が行ってください。",
    template: `以下の診断に対する標準的な治療計画を、最新のガイドライン（UpToDateや学会ガイドライン）に基づいて提示してください。

# 診断名
{{diagnosis}}
# 患者背景
{{patient_context}}

# 出力要件
1. 第一選択薬（投与量・期間含む）
2. 代替治療（第一選択が使えない場合）
3. 非薬物療法
4. フォローアップ計画

# エビデンスの明示（必須）
- 各治療オプションについて、以下を明記してください：
  1. 根拠となるガイドライン名、発行年、推奨レベル（例：推奨1A、推奨2Bなど）
  2. エビデンスレベル（例：GRADE分類、メタアナリシス、RCT、観察研究など）
  3. 不確実性：エビデンスが不十分または意見が分かれている点があれば明記する

⚠️ 注意：この出力は参考情報です。必ず最新のガイドラインと照合し、患者個別の状況を考慮して最終判断を行ってください。`,
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
    template: `以下の情報を基に、{{target_dept}}宛の診療情報提供書（紹介状）を作成してください。
丁寧で専門的な文体にしてください。

# 患者情報
- 氏名: {{patient_name}} (年齢/性別)
- 診断名/主訴: {{diagnosis}}

# 紹介目的
{{purpose}}

# 経過要約
{{history}}

# 現在の処方
{{medications}}`,
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
{{course}}`,
    inputs: [
      { key: 'course', label: '経過メモ', placeholder: '例: \nX月X日 入院。抗菌薬開始。\nX月Y日 解熱傾向。食事開始。\nX月Z日 退院決定。', type: 'textarea' }
    ]
  },

  // 薬剤・処方
  {
    id: "med-renal-dosing",
    title: "Renal Dosing Adjustment",
    description: "腔機能（eGFR/CCr）に応じた薬剤の投与量調節を提案します。",
    category: "medication",
    riskLevel: "high",
    warningMessage: "⚠️ 重要：薬剤投与量の決定は患者の生命に直結します。AIの提案は参考情報であり、必ず最新の添付文書、医薬品インタビュー、または信頼できるデータベースで確認してください。",
    template: `以下の患者における{{drug_name}}の適切な投与設計を教えてください。
腎機能に応じた減量基準（添付文書やSanford Guideなど）を参照してください。

# 患者情報
- 年齢/性別: {{patient_age_sex}}
- 血清クレアチニン: {{creatinine}} mg/dL
- 推定eGFR/CCr: {{renal_function}}

# 対象薬剤
{{drug_name}}`,
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
    riskLevel: "high",
    warningMessage: "⚠️ 重要：薬剤相互作用は重篤な副作用を引き起こす可能性があります。AIの出力に加えて、必ず添付文書や信頼できる相互作用データベースで確認してください。",
    template: `以下の薬剤リストに含まれる薬物相互作用をチェックしてください。
特に「併用禁忌」と「併用注意」を明確に区別し、臨床的にどのような影響が出るか（例：血中濃度上昇、QT延長など）を説明してください。

# 薬剤リスト
{{drug_list}}`,
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
{{topic}}
# 対象
{{target}}`,
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
{{news}}
# 患者さんの状況
{{patient_context}}`,
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
{{abstract}}`,
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
{{notes}}

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
{{request}}
# 期限や状況
{{deadline}}`,
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
{{content}}
# 希望条件
{{preferences}}`,
    inputs: [
      { key: 'content', label: '研究内容', placeholder: '例：稀な副作用の症例報告', type: 'textarea' },
      { key: 'preferences', label: '希望条件', placeholder: '例：症例報告を受け付けている国際誌', type: 'text' }
    ]
  },
  {
    id: "aacr-data-structuring",
    title: "[AACR] Case Information Structuring",
    description: "NotebookLM用：症例情報をCARE guidelinesに沿って構造化します（AACR Method Step 1）",
    category: "case-analysis",
    template: `# 指示
アップロードされた以下の症例情報に基づき、CARE guidelinesの主要セクションに対応する形で情報を整理・抽出し、構造化されたサマリーを作成してください。

# 症例情報
{{case_data}}

# 出力形式
## 1. Title（仮）
- 診断名 + "case report"

## 2. Patient Information
- 年齢、性別
- 主訴
- 既往歴、家族歴、社会的背景

## 3. Clinical Findings
- 主要な身体所見
- 主要な検査所見（血液、生化学、画像など）

## 4. Timeline
- 発症から現在までの主要な出来事を時系列でリストアップ

## 5. Diagnostic Assessment
- 診断に至るまでのプロセス
- 実施された主要な検査とその結果
- 鑑別診断
- 最終診断

## 6. Therapeutic Intervention
- 実施された治療（薬剤名、用量、期間）
- 治療の変更とその理由

## 7. Follow-up and Outcomes
- 治療後の経過
- 患者の転帰（改善、不変、悪化など）
- 有害事象の有無`,
    inputs: [
      { key: 'case_data', label: '症例情報', placeholder: 'カルテ記録、検査結果、画像所見などを貼り付けてください', type: 'textarea' }
    ]
  },
  {
    id: "aacr-novelty-analysis",
    title: "[AACR] Case Novelty Analysis",
    description: "Claude 3.5 Sonnet用：症例の新規性と臨床的意義を多角的に分析します（AACR Method Step 1）",
    category: "case-analysis",
    template: `# 指示
あなたは経験豊富な臨床研究者です。以下の症例サマリーを読み、この症例が医学文献において持つ「新規性」と「臨床的意義」を分析してください。

# 症例サマリー
{{case_summary}}

# 分析の観点
1. **疾患の稀少性**: この疾患自体が稀なものか？
2. **臨床像の非典型性**: 症状、所見、経過が典型的なものとどう違うか？
3. **診断の新規性**: 新しい診断モダリティや診断基準を適用したか？
4. **治療の新規性**: 新規治療法の有効性、あるいは既存治療の予期せぬ効果・副作用を示したか？
5. **病態生理への示唆**: 疾患の新たなメカニズムを示唆する所見はあるか？

# 出力
上記分析に基づき、この症例を学術雑誌に報告する価値がある理由を、最も重要なものから3つ、箇条書きで簡潔に述べてください。`,
    inputs: [
      { key: 'case_summary', label: '症例サマリー', placeholder: 'AACR Step 1で作成した構造化サマリーを貼り付けてください', type: 'textarea' }
    ]
  },
  {
    id: "aacr-literature-analysis",
    title: "[AACR] Literature Integration Analysis",
    description: "NotebookLM用：複数論文から横断的な知見を抽出します（AACR Method Step 2）",
    category: "literature",
    template: `# 指示
あなたは臨床研究の専門家です。アップロードされた論文をすべて精読・分析し、以下の問いに答えてください。

# 質問
1. **類似症例の概要**: これまでに報告されている類似症例の数、患者背景、臨床的特徴、治療法、転帰をまとめた表を作成してください。
2. **本症例との比較**: 私の症例（{{my_case_brief}}）と、これらの既報告例との決定的な違いは何ですか？新規性あるいは特筆すべき点を3つ挙げてください。
3. **診断・治療の標準**: これらの文献から、現在の診断および治療のベストプラクティスは何だと考えられますか？
4. **未解決の臨床的疑問**: これらの報告を読んでもなお、解決されていない臨床的な課題や疑問点は何ですか？
5. **引用すべき論文**: 私の症例報告のIntroductionおよびDiscussionで引用すべき最も重要な論文を10本リストアップし、その理由を簡潔に説明してください。

# 出力形式
各質問に対して、明確かつ構造化された回答を生成してください。特に質問1は表形式でお願いします。`,
    inputs: [
      { key: 'my_case_brief', label: '自分の症例の簡潔な説明', placeholder: '例：60代男性、非典型的な画像所見を呈した肺腺癌', type: 'text' }
    ]
  },
  {
    id: "aacr-master-prompt",
    title: "[AACR] Master Prompt (Writing Agent)",
    description: "Claude 3.5 Sonnet用：論文の各セクションを執筆させる包括的プロンプト（AACR Method Step 4）",
    category: "research",
    template: `# マスタープロンプト: 症例報告執筆エージェント

## 1. ペルソナ
あなたはThe New England Journal of Medicineに論文を多数掲載している、経験豊富な臨床研究者です。あなたの文章は、明快、簡潔、かつ論理的で、常に読者へのインパクトを意識しています。

## 2. コンテキスト

### 2-1. 症例サマリー
{{case_summary}}

### 2-2. 文献分析
{{literature_analysis}}

### 2-3. 引用すべき論文リスト
{{references}}

### 2-4. ターゲットジャーナル規定
{{journal_requirements}}

### 2-5. 詳細アウトライン
{{outline}}

## 3. タスク

以上のすべてのコンテキストを完全に理解した上で、以下の指示に従ってください。

**指示**: 詳細アウトラインの【{{section}}】セクションの記述に基づき、症例報告の該当部分のドラフトを作成してください。ターゲットジャーナルの規定に従い、文字数は約{{word_count}}ワード、引用は[1]のように番号で行ってください。CAREガイドラインを遵守し、患者のプライバシーに最大限配慮してください。`,
    inputs: [
      { key: 'case_summary', label: '症例サマリー', placeholder: 'Step 1で作成したサマリー', type: 'textarea' },
      { key: 'literature_analysis', label: '文献分析', placeholder: 'Step 2で作成した分析結果', type: 'textarea' },
      { key: 'references', label: '引用論文リスト', placeholder: 'Step 2で特定した論文リスト', type: 'textarea' },
      { key: 'journal_requirements', label: 'ジャーナル規定', placeholder: 'Step 3で要約した投稿規定', type: 'textarea' },
      { key: 'outline', label: '詳細アウトライン', placeholder: 'Step 3で作成したアウトライン', type: 'textarea' },
      { key: 'section', label: '執筆セクション', placeholder: '例：Introduction, Case Presentation, Discussion', type: 'text' },
      { key: 'word_count', label: '文字数', placeholder: '例：300', type: 'text' }
    ]
  },
  {
    id: "aacr-fact-check",
    title: "[AACR] AIファクトチェック",
    description: "OpenAI o1用：AI生成テキストの事実確認と論理検証（AACR Method Step 4）",
    category: "research",
    template: `# 指示
あなたは査読経験豊富な医学研究者です。以下の論文ドラフト（AI生成）と、その根拠となったコンテキスト情報を比較し、事実と異なる点、論理的に矛盾する点、不適切な引用がないかを徹底的に検証してください。

# 論文ドラフト（一部）
{{draft}}

# 根拠情報
## 症例サマリー
{{case_summary}}

## 引用文献
{{references}}

# 出力
検証結果を以下の形式で報告してください。
- **問題点**: [具体的な問題箇所を指摘]
- **根拠**: [なぜそれが問題なのかを根拠情報に基づいて説明]
- **修正案**: [どのように修正すべきかを提案]

問題がなければ、「問題なし」と報告してください。`,
    inputs: [
      { key: 'draft', label: 'AI生成ドラフト', placeholder: 'Claude 3.5 Sonnetが生成したテキスト', type: 'textarea' },
      { key: 'case_summary', label: '症例サマリー', placeholder: 'Step 1で作成したサマリー', type: 'textarea' },
      { key: 'references', label: '引用文献', placeholder: '引用された文献の要約または本文', type: 'textarea' }
    ]
  },
  {
    id: "res-case-intro",
    title: "Case Report Introduction Writer",
    description: "症例報告の序論（Introduction）を作成します。なぜこの症例を報告するのかを明確にします。",
    category: "research",
    template: `以下の情報を基に、症例報告の序論（Introduction）を作成してください。
簡潔に（1-2パラグラフ）、以下の要素を含めてください：
1. 既知の事実（Known）: 疾患の一般的な知識。
2. 未知の点（Unknown）: まだ解明されていない点や、稀な点。
3. 報告の目的（Purpose）: なぜこの症例を報告するのか（学ぶ点）。
※「世界初」や「非常に稀」という表現は避けてください。

# 疾患・背景
{{background}}
# 本症例の特徴
{{unique_features}}
# 報告する意義
{{significance}}`,
    inputs: [
      { key: 'background', label: '疾患・背景', placeholder: '例：〇〇病は通常〜という経過をたどる。', type: 'textarea' },
      { key: 'significance', label: '報告する意義', placeholder: '例：この治療法が著効した点。', type: 'textarea' }
    ]
  },
  {
    id: "res-case-discussion",
    title: "Case Report Discussion Writer",
    description: "症例報告の考察（Discussion）を作成します。症例の特徴、過去の報告との比較、学ぶ点を論じます。",
    category: "research",
    template: `以下の情報を基に、症例報告の考察（Discussion）の構成案とドラフトを作成してください。
以下の流れで論理を展開してください：
1. 症例の際立った特徴と診断の根拠（要約）。
2. 過去の報告との比較（何が新しく、何が違うのか）。
3. 症例からの新しい知識と応用性（Learning Point）。
4. 結論（Conclusion）。
※過剰な一般化や、確固たる推奨は避けてください。

# 症例の要約
{{summary}}
# 考察のポイント
{{points}}
# 結論・メッセージ
{{conclusion}}`,
    inputs: [
      { key: 'summary', label: '症例の要約', placeholder: '例：非典型的な画像所見を呈した...', type: 'textarea' },
      { key: 'points', label: '考察のポイント', placeholder: '例：過去の文献では〜とされているが、本症例では...', type: 'textarea' }
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
{{text}}`,
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
{{question}}

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
{{pico}}

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
{{literature_summary}}`,
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
{{draft}}`,
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
{{target_style}}

# 元の文献リスト
{{references}}`,
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
    title: "Research Theme Evaluation by FINER Criteria",
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
    title: "Data Collection Item List Creation",
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
  },

  // 論文抄読会 (Journal Club)
  {
    id: "jc-quick-summary",
    title: "3-Minute Paper Summary",
    description: "複雑な医学論文を「背景・方法・結果・結論」の4点に絞って簡潔に要約します。",
    category: "literature",
    template: `以下の論文のAbstract（または本文の一部）を読み、忙しい医師が3分で内容を把握できるように要約してください。
以下の4点に絞って箇条書きで出力してください。

1. **背景 (Background)**: 何が臨床的な課題で、この研究は何を解決しようとしたのか？
2. **方法 (Methods)**: どのような患者を対象に、何を比較したのか？（PICO形式で）
3. **結果 (Results)**: 主要評価項目（Primary Endpoint）の結果はどうだったか？（具体的な数値とp値/信頼区間を含めて）
4. **結論 (Conclusion)**: 著者らの結論は何か？臨床現場を変えるインパクトがあるか？

# 論文テキスト
{{paper_text}}`,
    inputs: [
      { key: 'text', label: '論文テキスト', placeholder: 'Abstractや本文を貼り付け...', type: 'textarea' }
    ]
  },
  {
    id: "jc-critical-appraisal",
    title: "Critical Appraisal (CASP)",
    description: "CASPチェックリストに基づき、論文の質とバイアスを批判的に吟味します。",
    category: "literature",
    template: `以下の論文について、批判的吟味（Critical Appraisal）を行ってください。
CASPチェックリストの視点を取り入れ、以下の点について指摘してください。

1. **妥当性 (Validity)**:
   - ランダム化は適切か？盲検化はされているか？
   - 解析はITT解析か？脱落率は？
2. **結果の重要性 (Importance)**:
   - 効果の大きさ（RR, OR, NNTなど）は臨床的に意味があるか？
   - 信頼区間の幅は適切か？
3. **適用可能性 (Applicability)**:
   - 対象患者は日本の臨床現場（または自分の患者層）と似ているか？
   - 費用対効果や害（副作用）のバランスはどうか？

# 論文テキスト
[MethodsとResultsを中心に貼り付け]`,
    inputs: [
      { key: 'text', label: '論文テキスト', placeholder: 'MethodsとResultsを中心に貼り付け...', type: 'textarea' }
    ]
  },
  {
    id: "jc-clinical-application",
    title: "Clinical Application Discussion",
    description: "論文の結果を自施設の患者に適用できるか、議論のためのポイントを整理します。",
    category: "literature",
    template: `この論文の結果を、実際の臨床現場（自施設）に適用する際の議論ポイントを整理してください。
抄読会でディスカッションを盛り上げるための「問い」を3つ作成してください。

例：
- 「当院の患者層（高齢者が多いなど）にも、この結果は当てはまるだろうか？」
- 「この新薬のコストは、得られるベネフィットに見合うだろうか？」
- 「既存の治療フローチャートをどう変更すべきだろうか？」

# 論文の要約
{{paper_summary}}`,
    inputs: [
      { key: 'summary', label: '論文の要約', placeholder: '論文の結論や要約を入力...', type: 'textarea' }
    ]
  },
  {
    id: "jc-slide-outline",
    title: "Journal Club Slide Outline",
    description: "10分間の抄読会発表用スライド構成案を作成します。",
    category: "research",
    template: `以下の論文を紹介するための、10分間のプレゼンテーション用スライド構成案を作成してください。
スライド枚数は8〜10枚程度とし、各スライドのタイトルと箇条書きの内容を提示してください。

構成案：
1. タイトルスライド
2. 背景（Clinical Question）
3. 方法（PICO）
4. ...
...
10. Take Home Message

# 論文情報
{{paper_info}}`,
    inputs: [
      { key: 'info', label: '論文情報', placeholder: '論文の情報を入力...', type: 'textarea' }
    ]
  },

  // 患者説明 (Patient Explanation)
  {
    id: "pat-term-translation",
    title: "Medical Term Translator",
    description: "専門用語を、小学生でも分かるような日常的な言葉や比喩に変換します。",
    category: "communication",
    template: `以下の医学専門用語を、医学知識のない患者さん（または小学生）にも分かるように、日常的な言葉や比喩を使って説明してください。
正確さよりも「イメージしやすさ」を優先してください。

例：
- 「心不全」→「心臓というポンプの力が弱まって、血液を全身に送り出せなくなり、息切れやむくみが出る状態」
- 「CKD（慢性腎臓病）」→「腎臓というフィルターが目詰まりして、体のゴミを捨てられなくなっている状態」

# 専門用語
{{medical_term}}`,
    inputs: [
      { key: 'term', label: '専門用語', placeholder: '例：心房細動、HbA1c、ステント留置術', type: 'text' }
    ]
  },
  {
    id: "pat-treatment-comparison",
    title: "Treatment Option Comparison",
    description: "複数の治療選択肢（薬物療法 vs 手術など）のメリット・デメリットを比較表形式で整理します。",
    category: "communication",
    template: `以下の疾患に対する治療選択肢（AとB）について、患者さんが意思決定しやすいようにメリット・デメリットを比較整理してください。
専門用語は避け、患者さんの生活への影響（痛み、入院期間、費用、通院頻度など）に焦点を当ててください。

# 疾患と治療選択肢
疾患：[疾患名]
選択肢A：[治療法A]
選択肢B：[治療法B]

# 出力形式
| | [治療法A] | [治療法B] |
|---|---|---|
| 期待できる効果 | ... | ... |
| 体への負担（副作用） | ... | ... |
| 生活への影響 | ... | ... |
| おすすめする人 | ... | ... |`,
    inputs: [
      { key: 'condition', label: '疾患と選択肢', placeholder: '例：早期胃癌に対する「内視鏡治療」と「外科手術」', type: 'textarea' }
    ]
  },
  {
    id: "pat-faq-response",
    title: "Empathic FAQ Response",
    description: "患者さんが抱きがちな不安や質問に対して、共感的かつ医学的に正しい回答を作成します。",
    category: "communication",
    template: `以下の治療や病気に関して、患者さんからよくある質問（FAQ）と、それに対する回答を作成してください。
回答は「共感（Empathy）」を第一にし、その上で正しい情報を伝えてください。
「大丈夫ですよ」と安易に保証するのではなく、「不安ですよね」と寄り添いつつ、確率や事実を伝えてください。

# トピック
[病気や治療の内容]
# 患者さんの主な不安
{{topic}}`,
    inputs: [
      { key: 'topic', label: 'トピック', placeholder: '例：抗がん剤治療の開始', type: 'text' },
      { key: 'concern', label: '主な不安', placeholder: '例：副作用で髪が抜けること、吐き気', type: 'text' }
    ]
  },
  {
    id: "pat-handout-generator",
    title: "Patient Handout Generator",
    description: "そのまま印刷して患者さんに渡せる、分かりやすい説明文書のドラフトを作成します。",
    category: "communication",
    template: `以下の内容について、患者さんに渡す説明用紙（ハンドアウト）の原稿を作成してください。
親しみやすいトーンで、箇条書きや太字を活用して読みやすくしてください。

構成：
1. [病気/治療]とは？（一言で）
2. なぜこの治療が必要なの？
3. 具体的に何をするの？
4. 気をつけてほしいこと（副作用や生活の注意点）
5. こんな時はすぐに連絡を！

# 説明内容
{{content}}`,
    inputs: [
      { key: 'content', label: '説明内容', placeholder: '例：インフルエンザと診断された方へ（自宅療養の注意点）', type: 'textarea' }
    ]
  },
  // ========================================
  // 新規追加: 医療研究関連プロンプト
  // ========================================
  {
    id: "research-literature-review",
    title: "Literature Review Summary",
    description: "特定の医療トピックに関する最新の文献レビューを要約し、研究のギャップを特定します。",
    category: "research",
    template: `以下の医療トピックについて、最近5年間の主要な研究成果を要約し、現在の研究のギャップを特定してください。

# トピック
{{topic}}

# 出力形式
1. 主要な研究成果（3-5件）
2. 現在のコンセンサス
3. 研究のギャップと今後の課題
4. 推奨される追加研究の方向性`,
    inputs: [
      { key: 'topic', label: '研究トピック', placeholder: '例：2型糖尿病に対するSGLT2阻害薬の心血管保護効果', type: 'text' }
    ]
  },
  {
    id: "research-hypothesis-generation",
    title: "Research Hypothesis Generator",
    description: "既存の研究知見から新しい研究仮説を生成し、検証可能な形で提案します。",
    category: "research",
    template: `以下の観察結果や既存の研究知見に基づいて、3つの検証可能な研究仮説を生成してください。
各仮説について、その根拠と検証方法も提案してください。

# 観察結果/既存知見
{{observation}}

# 出力形式
各仮説について：
- 仮説の内容
- 理論的根拠
- 推奨される検証方法（研究デザイン）
- 期待される臨床的意義`,
    inputs: [
      { key: 'observation', label: '観察結果', placeholder: '例：高齢者の認知機能低下と腸内細菌叢の変化に相関が見られる', type: 'textarea' }
    ]
  },
  {
    id: "research-study-design",
    title: "Clinical Study Design Assistant",
    description: "臨床研究のデザインを提案し、バイアスを最小化する方法を助言します。",
    category: "research",
    template: `以下の研究目的に対して、適切な研究デザインを提案してください。
バイアスを最小化する方法、必要なサンプルサイズの考え方、倫理的配慮も含めてください。

# 研究目的
{{objective}}

# 対象集団
{{population}}

# 出力形式
1. 推奨される研究デザイン（RCT、コホート研究、症例対照研究など）
2. バイアスを最小化する具体的方法
3. サンプルサイズの考え方
4. 倫理的配慮事項
5. 実施上の課題と対策`,
    inputs: [
      { key: 'objective', label: '研究目的', placeholder: '例：新規降圧薬Aの有効性を標準治療と比較する', type: 'text' },
      { key: 'population', label: '対象集団', placeholder: '例：60歳以上の高血圧患者', type: 'text' }
    ]
  },
  {
    id: "research-data-analysis-plan",
    title: "Statistical Analysis Planner",
    description: "研究データの統計解析計画を立案し、適切な統計手法を提案します。",
    category: "research",
    template: `以下の研究データに対して、適切な統計解析計画を立案してください。

# 研究デザイン
{{design}}

# データの種類
- アウトカム変数：{{outcome}}
- 説明変数：{{predictors}}

# 出力形式
1. 推奨される統計手法（検定方法、回帰モデルなど）
2. 交絡因子の調整方法
3. 欠損値の取り扱い
4. サブグループ解析の提案
5. 感度分析の方法`,
    inputs: [
      { key: 'design', label: '研究デザイン', placeholder: '例：前向きコホート研究', type: 'text' },
      { key: 'outcome', label: 'アウトカム変数', placeholder: '例：5年後の心血管イベント発生（二値）', type: 'text' },
      { key: 'predictors', label: '説明変数', placeholder: '例：年齢、性別、BMI、血圧、脂質値', type: 'text' }
    ]
  },
  {
    id: "research-grant-proposal",
    title: "Research Grant Proposal Assistant",
    description: "研究助成金申請書の重要セクションのドラフトを作成します。",
    category: "research",
    template: `以下の研究計画について、研究助成金申請書の「研究の意義」セクションのドラフトを作成してください。
学術的意義と社会的意義の両方を明確に示してください。

# 研究テーマ
{{theme}}

# 研究の背景
{{background}}

# 出力形式
1. 研究の学術的意義（なぜこの研究が学問的に重要か）
2. 研究の社会的意義（どのように社会に貢献するか）
3. 独創性・新規性（既存研究との違い）
4. 期待される波及効果`,
    inputs: [
      { key: 'theme', label: '研究テーマ', placeholder: '例：AIを用いた早期認知症診断システムの開発', type: 'text' },
      { key: 'background', label: '研究の背景', placeholder: '例：認知症の早期発見が課題となっている', type: 'textarea' }
    ]
  },
  {
    id: "research-manuscript-abstract",
    title: "Scientific Abstract Writer",
    description: "論文の要旨（Abstract）を構造化された形式で作成します。",
    category: "research",
    template: `以下の研究内容について、学術誌投稿用の構造化抄録（Structured Abstract）を作成してください。
250-300語程度で、Background, Methods, Results, Conclusionsの形式で記載してください。

# 研究内容
{{content}}

# 主要な結果
{{results}}

# 出力形式（英語で作成）
Background: 
Methods: 
Results: 
Conclusions:`,
    inputs: [
      { key: 'content', label: '研究内容', placeholder: '例：高齢者における運動介入の認知機能への効果を検証したRCT', type: 'textarea' },
      { key: 'results', label: '主要な結果', placeholder: '例：介入群で認知機能スコアが有意に改善（p<0.05）', type: 'text' }
    ]
  },
  {
    id: "research-peer-review-response",
    title: "Peer Review Response Generator",
    description: "査読者のコメントに対する返答文を作成します。",
    category: "research",
    template: `以下の査読コメントに対して、丁寧かつ建設的な返答文を作成してください。
コメントを真摯に受け止めつつ、必要に応じて反論や説明も含めてください。

# 査読コメント
{{comment}}

# 対応内容
{{response}}

# 出力形式
We thank the reviewer for this insightful comment. [返答内容]`,
    inputs: [
      { key: 'comment', label: '査読コメント', placeholder: '例：サンプルサイズが小さく、結果の一般化可能性に疑問がある', type: 'textarea' },
      { key: 'response', label: '対応内容', placeholder: '例：Limitationセクションに記載を追加した', type: 'textarea' }
    ]
  },
  {
    id: "research-systematic-review-protocol",
    title: "Systematic Review Protocol",
    description: "システマティックレビューのプロトコル（PICO、検索戦略など）を作成します。",
    category: "research",
    template: `以下のリサーチクエスチョンについて、システマティックレビューのプロトコルを作成してください。
PICO形式で整理し、検索戦略も提案してください。

# リサーチクエスチョン
{{question}}

# 出力形式
1. PICO
   - Population（対象集団）:
   - Intervention（介入）:
   - Comparison（比較対照）:
   - Outcome（アウトカム）:

2. 適格基準（Inclusion/Exclusion criteria）

3. 検索戦略
   - 検索データベース
   - 検索キーワード（英語）
   - 検索式の例

4. データ抽出項目

5. バイアスリスク評価の方法`,
    inputs: [
      { key: 'question', label: 'リサーチクエスチョン', placeholder: '例：高齢者における運動介入は認知機能低下を予防するか？', type: 'textarea' }
    ]
  },
  {
    id: "research-conference-abstract",
    title: "Conference Abstract Creator",
    description: "学会発表用の抄録を作成します（日本語・英語対応）。",
    category: "research",
    template: `以下の研究について、学会発表用の抄録を作成してください。
{{language}}で、指定された文字数制限（{{word_limit}}）内に収めてください。

# 研究内容
{{content}}

# 発表のポイント
{{key_points}}

# 出力形式
【タイトル】
【本文】（背景、方法、結果、結論を含む）`,
    inputs: [
      { key: 'content', label: '研究内容', placeholder: '例：COVID-19患者における血栓症リスク因子の解析', type: 'textarea' },
      { key: 'key_points', label: '発表のポイント', placeholder: '例：D-dimerが独立した予測因子であることを示す', type: 'text' },
      { key: 'language', label: '言語', placeholder: '日本語 or English', type: 'text' },
      { key: 'word_limit', label: '文字数制限', placeholder: '例：400字 or 300 words', type: 'text' }
    ]
  },
  {
    id: "research-ethics-application",
    title: "Ethics Committee Application Helper",
    description: "倫理委員会申請書の主要セクションのドラフトを作成します。",
    category: "research",
    template: `以下の臨床研究について、倫理委員会申請書の重要セクションのドラフトを作成してください。

# 研究概要
{{overview}}

# 出力形式
1. 研究の目的と意義
2. 対象者の選定方針（適格基準）
3. インフォームドコンセントの取得方法
4. 予想されるリスクと対処法
5. 個人情報保護の方法
6. 研究対象者への利益と不利益`,
    inputs: [
      { key: 'overview', label: '研究概要', placeholder: '例：新規抗がん剤の第II相試験', type: 'textarea' }
    ]
  },
  // ========================================
  // 追加: 診療補助・臨床判断支援プロンプト
  // ========================================
  {
    id: "clinical-differential-diagnosis",
    title: "Differential Diagnosis Generator",
    description: "症状から鑑別診断リストを作成し、各疾患の可能性と推奨検査を提案します。",
    category: "diagnosis",
    template: `以下の症状・所見から、鑑別診断リストを作成してください。
各疾患について、可能性の高さ（高/中/低）と推奨される検査を記載してください。

# 患者情報
年齢・性別：{{demographics}}
主訴：{{chief_complaint}}
現病歴：{{history}}
身体所見：{{physical_exam}}

# 出力形式
| 鑑別診断 | 可能性 | 支持する所見 | 推奨検査 |
|---------|---------|--------------|-----------|
| ... | ... | ... | ... |

注意：このツールは診断の補助であり、最終判断は必ず医師が行ってください。`,
    inputs: [
      { key: 'demographics', label: '年齢・性別', placeholder: '例：45歳女性', type: 'text' },
      { key: 'chief_complaint', label: '主訴', placeholder: '例：胸痛', type: 'text' },
      { key: 'history', label: '現病歴', placeholder: '例：3時間前から持続する胸部圧迫感', type: 'textarea' },
      { key: 'physical_exam', label: '身体所見', placeholder: '例：血圧140/90、心音整、呼吸音清', type: 'textarea' }
    ]
  },
  {
    id: "clinical-drug-interaction-check",
    title: "Drug Interaction Checker",
    description: "複数の薬剤間の相互作用をチェックし、注意点を提示します。",
    category: "medication",
    template: `以下の薬剤の組み合わせについて、薬物相互作用をチェックし、臨床的に重要な相互作用と対処法を提示してください。

# 処方薬剤リスト
{{medications}}

# 患者背景
{{patient_background}}

# 出力形式
1. 重大な相互作用（あれば）
   - 薬剤の組み合わせ
   - 相互作用の内容
   - 臨床的影響
   - 対処法

2. 注意が必要な相互作用

3. 問題なし（相互作用なし）

注意：最新の添付文書や相互作用データベースも必ず確認してください。`,
    inputs: [
      { key: 'medications', label: '処方薬剤', placeholder: '例：ワーファリン、ロキソプロフェン、アジスロマイシン', type: 'textarea' },
      { key: 'patient_background', label: '患者背景', placeholder: '例：75歳、腹機能低下（eGFR 35）', type: 'text' }
    ]
  },
  {
    id: "clinical-lab-interpretation",
    title: "Lab Result Interpreter",
    description: "検査結果を解釈し、臨床的意義と追加検査の必要性を評価します。",
    category: "diagnosis",
    template: `以下の検査結果について、臨床的解釈と追加で必要な検査を提案してください。

# 検査結果
{{lab_results}}

# 臨床情報
{{clinical_context}}

# 出力形式
1. 異常値の解釈
   - 各異常値の臨床的意義
   - 考えられる病態

2. 推奨される追加検査

3. 緊急性の評価（緊急/準緊急/定期フォロー）

4. 鑑別診断`,
    inputs: [
      { key: 'lab_results', label: '検査結果', placeholder: '例：AST 120, ALT 150, γ-GTP 200, ALP 正常', type: 'textarea' },
      { key: 'clinical_context', label: '臨床情報', placeholder: '例：50歳男性、健診で肝機能異常を指摘', type: 'text' }
    ]
  },
  {
    id: "clinical-treatment-guideline",
    title: "Evidence-Based Treatment Recommender",
    description: "最新のガイドラインに基づいた治療推奨を提示します。",
    category: "treatment",
    template: `以下の疾患・病態について、最新のガイドラインに基づいた治療推奨を提示してください。
エビデンスレベルも併記してください。

# 疾患・病態
{{condition}}

# 患者背景
{{patient_info}}

# 出力形式
1. 第一選択治療
   - 推奨内容
   - エビデンスレベル
   - 根拠となるガイドライン

2. 第二選択以降

3. この患者での特別な考慮事項

4. 治療目標と評価指標

注意：必ず最新のガイドラインを確認してください。`,
    inputs: [
      { key: 'condition', label: '疾患・病態', placeholder: '例：2型糖尿病（HbA1c 8.5%）', type: 'text' },
      { key: 'patient_info', label: '患者背景', placeholder: '例：60歳男性、肥満（BMI 32）、腹機能正常', type: 'textarea' }
    ]
  },
  {
    id: "clinical-risk-stratification",
    title: "Clinical Risk Calculator",
    description: "各種リスクスコアを計算し、患者のリスク層別化を行います。",
    category: "diagnosis",
    template: `以下の患者情報から、指定されたリスクスコアを計算し、リスク層別化と推奨される管理方針を提示してください。

# リスクスコアの種類
{{risk_score}}

# 患者情報
{{patient_data}}

# 出力形式
1. リスクスコアの計算
   - スコア：
   - リスク分類：（低/中/高リスク）
   - 予測される○○年リスク：

2. 臨床的解釈

3. 推奨される管理方針

4. フォローアップ計画`,
    inputs: [
      { key: 'risk_score', label: 'リスクスコア', placeholder: '例：CHADS2スコア（脳卒中リスク）、FRAXスコア（骨折リスク）', type: 'text' },
      { key: 'patient_data', label: '患者情報', placeholder: '例：75歳女性、心房細動、高血圧、糖尿病なし', type: 'textarea' }
    ]
  },
  {
    id: "clinical-medication-dosing",
    title: "Medication Dosing Calculator",
    description: "腹機能や体重に応じた薬剤用量調整を提案します。",
    category: "medication",
    template: `以下の患者に対する薬剤投与量を、腹機能や体重を考慮して提案してください。

# 薬剤
{{medication}}

# 患者情報
- 年齢・性別：{{age_sex}}
- 体重：{{weight}} kg
- 腹機能：eGFR {{egfr}} mL/min/1.73m²
- その他：{{other_factors}}

# 出力形式
1. 標準用量（腹機能正常時）
2. この患者での推奨用量
3. 用量調整の根拠
4. 投与時の注意点
5. モニタリング項目

注意：必ず添付文書と最新の情報を確認してください。`,
    inputs: [
      { key: 'medication', label: '薬剤名', placeholder: '例：バンコマイシン', type: 'text' },
      { key: 'age_sex', label: '年齢・性別', placeholder: '例：70歳男性', type: 'text' },
      { key: 'weight', label: '体重', placeholder: '例：55', type: 'text' },
      { key: 'egfr', label: 'eGFR', placeholder: '例：35', type: 'text' },
      { key: 'other_factors', label: 'その他の因子', placeholder: '例：肝機能正常、透析なし', type: 'text' }
    ]
  },
  {
    id: "clinical-emergency-protocol",
    title: "Emergency Protocol Guide",
    description: "救急対応のプロトコルを時系列で提示します。",
    category: "treatment",
    template: `以下の救急病態に対する初期対応プロトコルを、時系列で提示してください。
ABC（気道・呼吸・循環）の評価から始めてください。

# 救急病態
{{emergency_condition}}

# 出力形式
【初期評価（0-5分）】
1. ABC評価
2. バイタルサイン確認
3. 緊急度判定

【初期対応（5-15分）】
1. 応急処置
2. モニタリング開始
3. 緊急検査

【診断と治療（15分以降）】
1. 鑑別診断
2. 確定的治療
3. 専門科コンサルトのタイミング

【注意点・Pitfalls】`,
    inputs: [
      { key: 'emergency_condition', label: '救急病態', placeholder: '例：アナフィラキシーショック、急性冠症候群', type: 'text' }
    ]
  },
  {
    id: "clinical-polypharmacy-review",
    title: "Polypharmacy Review Assistant",
    description: "多剤併用患者の処方を見直し、減薬の可能性を検討します。",
    category: "medication",
    template: `以下の患者の処方内容を見直し、減薬の可能性や処方の適切性を評価してください。

# 患者情報
{{patient_info}}

# 現在の処方
{{current_medications}}

# 出力形式
1. 処方の適切性評価
   - 適応のない薬剤
   - 重複している薬効
   - 相互作用のある組み合わせ

2. 減薬の提案
   - 中止を検討すべき薬剤
   - 減量を検討すべき薬剤
   - その根拠

3. 処方の最適化案

4. 患者への説明のポイント`,
    inputs: [
      { key: 'patient_info', label: '患者情報', placeholder: '例：80歳女性、高血圧、糖尿病、不眠', type: 'text' },
      { key: 'current_medications', label: '現在の処方', placeholder: '例：降圧薬3剤、血糖降下薬2剤、睡眠薬、胃薬など計10剤', type: 'textarea' }
    ]
  },
  // ========================================
  // 追加: 業務効率化・文書作成プロンプト
  // ========================================
  {
    id: "admin-discharge-summary",
    title: "Discharge Summary Generator",
    description: "退院サマリーのドラフトを構造化された形式で作成します。",
    category: "documentation",
    template: `以下の入院経過から、退院サマリーを作成してください。
簡潔かつ必要な情報を網羅した形式で記載してください。

# 患者基本情報
{{patient_basic}}

# 入院経過
{{hospital_course}}

# 出力形式
【入院時診断】
【退院時診断】
【入院期間】
【主訴】
【現病歴】
【入院後経過】（簡潔に）
【退院時処方】
【退院時指導】
【今後の方針】`,
    inputs: [
      { key: 'patient_basic', label: '患者基本情報', placeholder: '例：70歳男性、心不全', type: 'text' },
      { key: 'hospital_course', label: '入院経過', placeholder: '例：利尿薬で症状改善、NYHA II度まで回復', type: 'textarea' }
    ]
  },
  {
    id: "admin-referral-letter",
    title: "Referral Letter Writer",
    description: "他院・他科への紹介状を作成します。",
    category: "documentation",
    template: `以下の患者について、{{specialty}}への紹介状を作成してください。
紹介目的と臨床経過を簡潔に記載してください。

# 患者情報
{{patient_info}}

# 紹介目的
{{referral_purpose}}

# これまでの経過
{{clinical_course}}

# 出力形式
【紹介目的】
【現病歴】
【既往歴・内服薬】
【検査所見】
【紹介時のお願い事項】`,
    inputs: [
      { key: 'patient_info', label: '患者情報', placeholder: '例：55歳女性', type: 'text' },
      { key: 'specialty', label: '紹介先', placeholder: '例：循環器内科、整形外科', type: 'text' },
      { key: 'referral_purpose', label: '紹介目的', placeholder: '例：精査加療依頼', type: 'text' },
      { key: 'clinical_course', label: '経過', placeholder: '例：胸痛が持続し、心電図でST変化あり', type: 'textarea' }
    ]
  },
  {
    id: "admin-medical-certificate",
    title: "Medical Certificate Generator",
    description: "診断書・証明書のドラフトを作成します。",
    category: "documentation",
    template: `以下の内容で{{certificate_type}}を作成してください。

# 患者情報
{{patient_info}}

# 診断名
{{diagnosis}}

# 証明内容
{{certificate_content}}

# 出力形式
【診断書/証明書】
上記の者は、{{diagnosis}}にて、{{certificate_content}}。
期間：{{period}}

注意：正式な診断書は医師が内容を確認し、署名・押印が必要です。`,
    inputs: [
      { key: 'certificate_type', label: '証明書の種類', placeholder: '例：診断書、休業証明書、通院証明書', type: 'text' },
      { key: 'patient_info', label: '患者情報', placeholder: '例：山田太郎様', type: 'text' },
      { key: 'diagnosis', label: '診断名', placeholder: '例：急性上気道炎', type: 'text' },
      { key: 'certificate_content', label: '証明内容', placeholder: '例：加療を要し、安静が必要', type: 'text' },
      { key: 'period', label: '期間', placeholder: '例：令和○年○月○日から○日間', type: 'text' }
    ]
  },
  {
    id: "admin-patient-education-material",
    title: "Patient Education Material Creator",
    description: "患者向け教育資材（パンフレット）を作成します。",
    category: "documentation",
    template: `以下のテーマについて、患者さん向けの教育資材を作成してください。
わかりやすい言葉で、図解の提案も含めてください。

# テーマ
{{theme}}

# 対象患者
{{target_audience}}

# 出力形式
【タイトル】
【○○とは？】（疾患の説明）
【なぜ起こるの？】（原因）
【どんな症状？】
【治療方法】
【日常生活で気をつけること】
【こんな時はすぐ受診！】
【図解の提案】（どんな図があるとわかりやすいか）`,
    inputs: [
      { key: 'theme', label: 'テーマ', placeholder: '例：高血圧の管理、糖尿病の食事療法', type: 'text' },
      { key: 'target_audience', label: '対象患者', placeholder: '例：新規に高血圧と診断された方', type: 'text' }
    ]
  },
  {
    id: "admin-informed-consent-document",
    title: "Informed Consent Document Helper",
    description: "インフォームドコンセント説明文書のドラフトを作成します。",
    category: "documentation",
    template: `以下の治療・検査について、インフォームドコンセント用の説明文書を作成してください。
患者さんが理解しやすい言葉で、リスクとベネフィットを明確に記載してください。

# 治療・検査
{{procedure}}

# 出力形式
【○○について】（治療・検査の説明）
【なぜこの治療が必要なのか】
【治療の方法】
【期待される効果（ベネフィット）】
【起こりうる合併症・副作用（リスク）】
【他の治療法との比較】
【治療を受けない場合】
【費用について】
【同意の撤回について】

注意：正式な同意書は施設の規定に従って作成してください。`,
    inputs: [
      { key: 'procedure', label: '治療・検査', placeholder: '例：内視鏡的粘膜下層剥離術（ESD）', type: 'text' }
    ]
  },
  {
    id: "admin-medical-record-summary",
    title: "Medical Record Summarizer",
    description: "長い診療記録を要約し、重要なポイントを抽出します。",
    category: "documentation",
    template: `以下の診療記録を要約し、重要なポイントを抽出してください。
{{word_limit}}以内にまとめてください。

# 診療記録
{{medical_record}}

# 出力形式
【患者背景】
【主要な問題点】
【これまでの経過（時系列）】
【現在の状態】
【今後の方針】`,
    inputs: [
      { key: 'medical_record', label: '診療記録', placeholder: '長い経過記録を貼り付け', type: 'textarea' },
      { key: 'word_limit', label: '文字数制限', placeholder: '例：400字', type: 'text' }
    ]
  },
  // ========================================
  // 追加: 一般的に有用なプロンプト
  // ========================================
  {
    id: "general-meeting-summarizer",
    title: "Meeting Summarizer",
    description: "会議の内容を要約し、アクションアイテムを抽出します。",
    category: "administrative",
    template: `以下の会議の内容を要約し、決定事項とアクションアイテムを明確にしてください。

# 会議内容
{{meeting_content}}

# 出力形式
【会議の目的】
【主な討議内容】
【決定事項】
【アクションアイテム】
- 担当者：
- 期限：
- 内容：
【次回会議の予定】`,
    inputs: [
      { key: 'meeting_content', label: '会議内容', placeholder: '会議のメモや録音の文字起こしを貼り付け', type: 'textarea' }
    ]
  },
  {
    id: "general-email-professional",
    title: "Professional Email Writer",
    description: "ビジネスメールを適切なトーンで作成します。",
    category: "administrative",
    template: `以下の内容でビジネスメールを作成してください。
{{tone}}なトーンで、簡潔かつ丁寧に記載してください。

# 宛先
{{recipient}}

# 目的
{{purpose}}

# 伝えたい内容
{{content}}

# 出力形式
件名：
本文：`,
    inputs: [
      { key: 'recipient', label: '宛先', placeholder: '例：取引先の担当者、上司', type: 'text' },
      { key: 'purpose', label: '目的', placeholder: '例：依頼、報告、お礼', type: 'text' },
      { key: 'content', label: '内容', placeholder: '伝えたい内容を箇条書きで', type: 'textarea' },
      { key: 'tone', label: 'トーン', placeholder: '例：丁寧、フォーマル、フレンドリー', type: 'text' }
    ]
  },
  {
    id: "general-presentation-outline",
    title: "Presentation Outline Creator",
    description: "プレゼンテーションの構成案を作成します。",
    category: "administrative",
    template: `以下のテーマについて、{{duration}}分のプレゼンテーションの構成案を作成してください。

# テーマ
{{theme}}

# 対象聴衆
{{audience}}

# 伝えたいメッセージ
{{key_message}}

# 出力形式
【タイトル】
【オープニング（1分）】
【本論】
- セクション1（○分）：
- セクション2（○分）：
- セクション3（○分）：
【クロージング（1分）】
【各スライドの内容案】`,
    inputs: [
      { key: 'theme', label: 'テーマ', placeholder: '例：新製品の紹介、プロジェクト報告', type: 'text' },
      { key: 'duration', label: '時間', placeholder: '例：10、20、30', type: 'text' },
      { key: 'audience', label: '対象聴衆', placeholder: '例：経営層、一般社員、顧客', type: 'text' },
      { key: 'key_message', label: 'キーメッセージ', placeholder: '最も伝えたいこと', type: 'text' }
    ]
  },
  {
    id: "general-report-writer",
    title: "Business Report Writer",
    description: "ビジネスレポートのドラフトを作成します。",
    category: "administrative",
    template: `以下の内容でビジネスレポートを作成してください。

# レポートの目的
{{purpose}}

# 対象読者
{{audience}}

# 含めるべき内容
{{content}}

# 出力形式
【エグゼクティブサマリー】
【背景】
【現状分析】
【課題】
【提案/推奨事項】
【結論】`,
    inputs: [
      { key: 'purpose', label: '目的', placeholder: '例：四半期業績報告、プロジェクト進捗報告', type: 'text' },
      { key: 'audience', label: '対象読者', placeholder: '例：経営層、プロジェクトメンバー', type: 'text' },
      { key: 'content', label: '含めるべき内容', placeholder: 'データや情報を箇条書きで', type: 'textarea' }
    ]
  },
  {
    id: "general-brainstorming-facilitator",
    title: "Brainstorming Facilitator",
    description: "ブレインストーミングを促進し、アイデアを整理します。",
    category: "administrative",
    template: `以下のテーマについて、ブレインストーミングを行い、アイデアを整理してください。
既存の枠にとらわれない、創造的なアイデアを含めてください。

# テーマ
{{theme}}

# 制約条件（あれば）
{{constraints}}

# 出力形式
【アイデア一覧】（10-15個）
1. アイデア名：
   - 概要：
   - メリット：
   - 実現可能性：

【最も有望なアイデアTop 3】
【次のステップ】`,
    inputs: [
      { key: 'theme', label: 'テーマ', placeholder: '例：新サービスのアイデア、業務改善策', type: 'text' },
      { key: 'constraints', label: '制約条件', placeholder: '例：予算100万円以内、3ヶ月で実現可能', type: 'text' }
    ]
  },
  {
    id: "general-decision-matrix",
    title: "Decision Matrix Creator",
    description: "複数の選択肢を評価し、意思決定を支援します。",
    category: "administrative",
    template: `以下の選択肢について、意思決定マトリクスを作成してください。

# 決定すべきこと
{{decision}}

# 選択肢
{{options}}

# 評価基準
{{criteria}}

# 出力形式
| 選択肢 | 基準1 | 基準2 | 基準3 | 総合評価 |
|--------|---------|---------|---------|----------|
| ... | ... | ... | ... | ... |

【推奨される選択肢】
【理由】
【リスクと対策】`,
    inputs: [
      { key: 'decision', label: '決定すべきこと', placeholder: '例：新オフィスの場所、採用する候補者', type: 'text' },
      { key: 'options', label: '選択肢', placeholder: '例：A案、B案、C案', type: 'text' },
      { key: 'criteria', label: '評価基準', placeholder: '例：コスト、利便性、将来性', type: 'text' }
    ]
  },

  // 共同意思決定 (Shared Decision Making)
  {
    id: "sdm-treatment-options",
    title: "治療選択肢の共有（Shared Decision Making）",
    description: "患者の価値観、生活状況、希望を考慮した治療選択肢の比較と説明を支援します。",
    category: "shared-decision-making",
    riskLevel: "medium",
    warningMessage: "⚠️ 注意：このプロンプトは患者との対話のための参考情報です。患者の個別の状況、価値観、希望を十分に傾聴し、尊重してください。",
    template: `以下の診断に対する治療選択肢を、患者の価値観と生活状況を考慮して比較し、患者が理解しやすい言葉で説明してください。

# 診断名
{{diagnosis}}

# 患者情報
- 年齢・性別：{{patient_demographics}}
- 生活状況：{{lifestyle}}
- 価値観・希望：{{patient_values}}
- 懸念事項：{{concerns}}

# 出力要件
1. **利用可能な治療選択肢**（各選択肢の概要）
2. **各選択肢の比較表**
   - 期待される効果
   - 起こりうるリスク・副作用
   - 生活への影響（通院頻度、仕事への影響、費用など）
   - 治療期間
3. **患者の価値観と各選択肢の適合性**
   - この患者の生活状況や希望を考慮した場合、各選択肢がどのように適合するか
4. **患者への質問例**
   - 意思決定を支援するために、患者に聞くべき質問
5. **次のステップ**
   - 患者が決定を下すために必要な情報や時間

# 重要な原則
- 医学用語を避け、患者が理解しやすい言葉で説明する
- 「正しい答え」を押し付けず、患者が自分で選択できるよう支援する
- 患者の価値観や希望を尊重し、それらが選択にどう影響するかを明確にする
- 不確実性がある場合は、それを正直に伝える

⚠️ 注意：この出力は、患者との対話のための参考情報です。実際の対話では、患者の反応や質問に応じて柔軟に対応してください。`,
    inputs: [
      { key: 'diagnosis', label: '診断名', placeholder: '例: 2型糖尿病', type: 'text' },
      { key: 'patient_demographics', label: '年齢・性別', placeholder: '例: 55歳男性', type: 'text' },
      { key: 'lifestyle', label: '生活状況', placeholder: '例: フルタイム勤務、家族と同居', type: 'text' },
      { key: 'patient_values', label: '価値観・希望', placeholder: '例: 仕事を続けたい、副作用を最小限にしたい', type: 'textarea' },
      { key: 'concerns', label: '懸念事項', placeholder: '例: 注射が苦手、低血糖が怖い', type: 'textarea' }
    ]
  },
  {
    id: "sdm-cancer-screening",
    title: "がん検診の意思決定支援",
    description: "がん検診のメリットとデメリットを患者の状況に応じて説明し、意思決定を支援します。",
    category: "shared-decision-making",
    riskLevel: "medium",
    template: `以下のがん検診について、患者が意思決定をするための情報を、バランスの取れた形で提供してください。

# 検診の種類
{{screening_type}}

# 患者情報
- 年齢・性別：{{patient_demographics}}
- 家族歴：{{family_history}}
- リスク因子：{{risk_factors}}
- 懸念事項：{{concerns}}

# 出力要件
1. **検診の目的と方法**（分かりやすい言葉で）
2. **メリット（検診を受ける利点）**
   - 早期発見の可能性
   - 死亡率の減少（エビデンスがあれば明記）
3. **デメリット（検診のリスクや負担）**
   - 偽陽性（がんではないのに陽性と出る）の可能性
   - 過剰診断（放置しても害のないがんを発見してしまう）の可能性
   - 検診自体の身体的・精神的負担
   - 費用や時間
4. **この患者にとっての推奨事項**
   - 年齢、家族歴、リスク因子を考慮した場合の推奨
   - ガイドラインに基づく推奨
5. **意思決定のための質問**
   - 患者が考えるべきポイント

# 重要な原則
- 検診を「受けるべき」と押し付けず、メリットとデメリットを公平に提示する
- 不確実性や意見が分かれている点があれば、正直に伝える
- 患者が自分の価値観に基づいて選択できるよう支援する`,
    inputs: [
      { key: 'screening_type', label: '検診の種類', placeholder: '例: PSA検査（前立腺がん）', type: 'text' },
      { key: 'patient_demographics', label: '年齢・性別', placeholder: '例: 60歳男性', type: 'text' },
      { key: 'family_history', label: '家族歴', placeholder: '例: 父が前立腺がん', type: 'text' },
      { key: 'risk_factors', label: 'リスク因子', placeholder: '例: 喜煙歴、肥満', type: 'text' },
      { key: 'concerns', label: '懸念事項', placeholder: '例: 検査の痛みが怖い', type: 'textarea' }
    ]
  },
  {
    id: "sdm-end-of-life",
    title: "終末期ケアの意思決定支援",
    description: "終末期の患者と家族が、価値観に基づいたケアの選択をできるよう支援します。",
    category: "shared-decision-making",
    riskLevel: "high",
    warningMessage: "⚠️ 重要：終末期ケアは非常にデリケートなテーマです。AIの出力は参考情報であり、実際の対話では患者と家族の感情、文化的背景、価値観を最大限尊重してください。",
    template: `終末期の患者と家族が、今後のケアについて考え、選択するための情報を、共感的で分かりやすい言葉で提供してください。

# 患者情報
- 診断名と病状：{{diagnosis_and_condition}}
- 予後：{{prognosis}}
- 患者の価値観・希望：{{patient_values}}
- 家族の状況：{{family_situation}}

# 出力要件
1. **現在の状況と今後の見通し**（優しく、正直に）
2. **利用可能なケアの選択肢**
   - 積極的治療（化学療法、放射線療法など）
   - 緙和ケア（症状緩和を中心としたケア）
   - ホスピス・在宅緩和ケア
3. **各選択肢の比較**
   - 期待される効果（症状緩和、生存期間への影響）
   - 身体的・精神的負担
   - 生活の質（QOL）への影響
   - 家族への影響
4. **患者の価値観と各選択肢の適合性**
5. **家族へのサポート**
   - 利用可能なサポートシステム
6. **話し合いのためのガイド**
   - 患者と家族が話し合うべきテーマ

# 重要な原則
- 共感的で、尊重の気持ちを持って接する
- 「正しい選択」はなく、患者と家族の価値観に基づく選択を支援する
- 希望を持ち続けることと、現実的な見通しを伝えることのバランスを取る
- 文化的・宗教的背景を尊重する`,
    inputs: [
      { key: 'diagnosis_and_condition', label: '診断名と病状', placeholder: '例: 進行性膝がん、呼吸困難、痛みあり', type: 'textarea' },
      { key: 'prognosis', label: '予後', placeholder: '例: 余命数ヶ月', type: 'text' },
      { key: 'patient_values', label: '患者の価値観・希望', placeholder: '例: 家で過ごしたい、痛みを減らしたい', type: 'textarea' },
      { key: 'family_situation', label: '家族の状況', placeholder: '例: 配偶者と子供2人、在宅ケア可能', type: 'textarea' }
    ]
  }
];
