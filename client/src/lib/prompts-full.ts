import { Prompt } from './prompts';

export const fullPrompts: Prompt[] = [
  // --- Diagnosis (1-15) ---
  {
    id: 'diag-001',
    title: '鑑別診断リスト作成',
    category: 'diagnosis',
    description: '主訴と現病歴から可能性のある疾患を確率順にリストアップします。',
    template: `あなたは熟練した総合診療医です。以下の症例情報に基づき、鑑別診断のリストを作成してください。

【症例情報】
- 患者: {{age}}歳 {{gender}}
- 主訴: {{chief_complaint}}
- 現病歴: {{history}}
- バイタルサイン: {{vitals}}

【依頼内容】
1. 最も可能性が高い疾患トップ3
2. 見逃してはならない重篤な疾患（Red Flags）
3. 鑑別のために追加すべき問診・身体診察・検査`,
    inputs: [
      { key: 'age', label: '年齢', placeholder: '例: 65', type: 'text' },
      { key: 'gender', label: '性別', placeholder: '例: 男性', type: 'select', options: ['男性', '女性'] },
      { key: 'chief_complaint', label: '主訴', placeholder: '例: 急性の胸痛', type: 'text' },
      { key: 'history', label: '現病歴', placeholder: '例: 今朝から突然の胸部圧迫感があり...', type: 'textarea' },
      { key: 'vitals', label: 'バイタルサイン', placeholder: '例: BP 150/90, HR 110, SpO2 98%', type: 'text' },
    ]
  },
  {
    id: 'diag-002',
    title: '症状分析（Symptom Analysis）',
    category: 'diagnosis',
    description: '特定の症状について、OPQRST法などを用いて詳細に分析します。',
    template: `以下の症状について、医学的な観点から詳細な分析を行ってください。

【患者背景】
{{patient_background}}

【症状】
{{symptom_description}}

【依頼内容】
この症状から考えられる病態生理と、緊急性の有無について解説してください。`,
    inputs: [
      { key: 'patient_background', label: '患者背景', placeholder: '例: 30代女性、既往歴なし', type: 'text' },
      { key: 'symptom_description', label: '症状詳記', placeholder: '例: 持続する片頭痛、前兆あり', type: 'textarea' },
    ]
  },
  {
    id: 'diag-003',
    title: '検査結果解釈（Lab Interpretation）',
    category: 'diagnosis',
    description: '異常な検査値の解釈と、次に考えるべき病態を提示します。',
    template: `以下の検査結果の異常値について、臨床的な解釈を行ってください。

【検査結果】
{{lab_results}}

【患者情報】
{{patient_context}}

【依頼内容】
1. 異常値の原因として考えられる病態
2. 追加で確認すべき検査項目
3. 経過観察でよいか、専門医紹介が必要かの判断基準`,
    inputs: [
      { key: 'lab_results', label: '検査結果', placeholder: '例: AST 120, ALT 150, γ-GTP 80', type: 'textarea' },
      { key: 'patient_context', label: '患者情報', placeholder: '例: アルコール多飲歴あり', type: 'text' },
    ]
  },
  {
    id: 'diag-004',
    title: '心電図所見の読影補助',
    category: 'diagnosis',
    description: '心電図の記述的所見から、考えられる診断を推論します。',
    template: `以下の心電図所見から、考えられる診断と対応を教えてください。

【心電図所見】
{{ecg_findings}}

【臨床症状】
{{symptoms}}

【依頼内容】
診断名と、緊急カテーテル検査などの処置の必要性について。`,
    inputs: [
      { key: 'ecg_findings', label: '心電図所見', placeholder: '例: II, III, aVFでST上昇、V1-V2でST低下', type: 'textarea' },
      { key: 'symptoms', label: '臨床症状', placeholder: '例: 冷や汗を伴う胸痛', type: 'text' },
    ]
  },
  {
    id: 'diag-005',
    title: '画像所見レポート作成支援（X-ray）',
    category: 'diagnosis',
    description: '胸部X線の所見記述から、標準的な読影レポート案を作成します。',
    template: `あなたは放射線科医です。以下の所見メモから、胸部X線の読影レポートを作成してください。

【所見メモ】
{{findings}}

【依頼内容】
所見（Findings）と診断（Impression）に分けた、プロフェッショナルなレポート形式で出力してください。`,
    inputs: [
      { key: 'findings', label: '所見メモ', placeholder: '例: 右下肺野に浸潤影あり、CP angle鈍化なし、心拡大なし', type: 'textarea' },
    ]
  },
  // ... (Continuing to add prompts to reach 100)
  // Note: Due to file size limits, I will implement a representative subset first and then expand.
  // I will generate 20 high-quality prompts first to ensure the structure works, then append more.
];

// --- Treatment (16-30) ---
const treatmentPrompts: Prompt[] = [
  {
    id: 'tx-001',
    title: '標準治療ガイドライン検索',
    category: 'treatment',
    description: '特定の疾患に対する最新の標準治療ガイドラインを提示します。',
    template: `{{disease}}の治療について、最新のガイドライン（日本または国際的なもの）に基づいた標準治療方針を教えてください。

【患者背景】
{{patient_status}}

【依頼内容】
第一選択薬、治療期間、代替治療の選択肢について簡潔にまとめてください。`,
    inputs: [
      { key: 'disease', label: '疾患名', placeholder: '例: 市中肺炎', type: 'text' },
      { key: 'patient_status', label: '患者背景', placeholder: '例: 軽症、基礎疾患なし', type: 'text' },
    ]
  },
  {
    id: 'tx-002',
    title: '抗菌薬選択支援',
    category: 'treatment',
    description: '感染臓器と想定起炎菌に基づき、適切な抗菌薬を提案します。',
    template: `以下の感染症に対して、エンピリック治療として適切な抗菌薬を提案してください。

【感染巣・診断】
{{infection_site}}

【患者リスク】
{{risk_factors}}

【依頼内容】
推奨される抗菌薬、投与量、治療期間、およびカバーすべき起炎菌について。`,
    inputs: [
      { key: 'infection_site', label: '感染巣・診断', placeholder: '例: 急性腎盂腎炎', type: 'text' },
      { key: 'risk_factors', label: '患者リスク', placeholder: '例: ESBL産生菌のリスクあり', type: 'text' },
    ]
  },
  {
    id: 'tx-003',
    title: '生活習慣指導プラン',
    category: 'treatment',
    description: '慢性疾患患者向けの具体的な生活習慣改善プランを作成します。',
    template: `{{condition}}の患者に対して、明日から実践できる具体的な生活習慣指導プランを作成してください。

【患者の現状】
{{current_lifestyle}}

【依頼内容】
食事、運動、その他の生活習慣について、実行可能な3つのスモールステップを提案してください。`,
    inputs: [
      { key: 'condition', label: '疾患名', placeholder: '例: 2型糖尿病', type: 'text' },
      { key: 'current_lifestyle', label: '現状', placeholder: '例: 運動習慣なし、外食が多い', type: 'textarea' },
    ]
  }
];

// --- Documentation (31-45) ---
const documentationPrompts: Prompt[] = [
  {
    id: 'doc-001',
    title: '紹介状（診療情報提供書）',
    category: 'documentation',
    description: '他院への紹介状（診療情報提供書）のドラフトを作成します。',
    template: `あなたは医療事務作業に精通した医師です。以下の情報に基づいて、適切な敬語を用いた診療情報提供書（紹介状）のドラフトを作成してください。

【宛先】
- 医療機関名: {{destination_hospital}}
- 科・医師名: {{destination_doctor}}

【患者情報】
- 氏名: {{patient_name}}
- 年齢・性別: {{age}}歳 {{gender}}

【紹介内容】
- 傷病名: {{diagnosis}}
- 紹介目的: {{purpose}}
- 既往歴: {{past_history}}

【経過・所見】
{{clinical_course}}

【依頼内容】
丁寧な医療用語と敬語を使用し、拝啓/敬具を含む標準的な書式で作成してください。`,
    inputs: [
      { key: 'destination_hospital', label: '紹介先医療機関', placeholder: '例: 〇〇大学病院', type: 'text' },
      { key: 'destination_doctor', label: '紹介先医師（科）', placeholder: '例: 循環器内科 御机下', type: 'text' },
      { key: 'patient_name', label: '患者氏名', placeholder: '例: 医療 太郎', type: 'text' },
      { key: 'age', label: '年齢', placeholder: '例: 72', type: 'text' },
      { key: 'gender', label: '性別', placeholder: '例: 男性', type: 'select', options: ['男性', '女性'] },
      { key: 'diagnosis', label: '傷病名', placeholder: '例: 狭心症の疑い', type: 'text' },
      { key: 'purpose', label: '紹介目的', placeholder: '例: 精査加療のお願い', type: 'text' },
      { key: 'past_history', label: '既往歴', placeholder: '例: 高血圧', type: 'textarea' },
      { key: 'clinical_course', label: '経過・所見', placeholder: '例: 労作時の胸痛を主訴に来院され...', type: 'textarea' },
    ]
  },
  {
    id: 'doc-002',
    title: '退院サマリー',
    category: 'documentation',
    description: '入院経過をまとめた退院サマリーのドラフトを作成します。',
    template: `あなたは病棟担当医です。以下の入院経過に基づいて、退院サマリーを作成してください。

【患者情報】
- 入院期間: {{admission_period}}
- 入院時診断: {{admission_diagnosis}}
- 退院時診断: {{discharge_diagnosis}}

【入院経過】
{{hospital_course}}

【退院時処方・指示】
{{discharge_plan}}

【依頼内容】
SOAP形式または時系列形式で、医学的に簡潔かつ正確なサマリーを作成してください。`,
    inputs: [
      { key: 'admission_period', label: '入院期間', placeholder: '例: 2024/12/01 - 2024/12/15', type: 'text' },
      { key: 'admission_diagnosis', label: '入院時診断', placeholder: '例: 誤嚥性肺炎', type: 'text' },
      { key: 'discharge_diagnosis', label: '退院時診断', placeholder: '例: 誤嚥性肺炎（治癒）', type: 'text' },
      { key: 'hospital_course', label: '入院経過', placeholder: '例: 入院後、抗菌薬ABPC/SBTを開始し...', type: 'textarea' },
      { key: 'discharge_plan', label: '退院時処方・指示', placeholder: '例: 処方継続、1週間後に外来受診', type: 'textarea' },
    ]
  },
  {
    id: 'doc-003',
    title: '手術記録（Operative Note）',
    category: 'documentation',
    description: '手術の要点を入力し、標準的な手術記録フォーマットを生成します。',
    template: `以下の手術情報に基づいて、標準的な手術記録（Operative Note）を作成してください。

【手術情報】
- 術式: {{procedure_name}}
- 術者: {{surgeon}}
- 麻酔: {{anesthesia}}
- 所見・経過: {{findings_procedure}}

【依頼内容】
Preoperative Diagnosis, Postoperative Diagnosis, Procedure, Findings, Complicationsの項目を含む英語（または日本語）のレポートを作成してください。`,
    inputs: [
      { key: 'procedure_name', label: '術式', placeholder: '例: Laparoscopic Cholecystectomy', type: 'text' },
      { key: 'surgeon', label: '術者', placeholder: '例: Dr. Smith', type: 'text' },
      { key: 'anesthesia', label: '麻酔', placeholder: '例: General Anesthesia', type: 'text' },
      { key: 'findings_procedure', label: '所見・経過', placeholder: '例: 胆嚢の炎症は軽度で...', type: 'textarea' },
    ]
  }
];

fullPrompts.push(...treatmentPrompts, ...documentationPrompts);

// --- Medication (46-60) ---
const medicationPrompts: Prompt[] = [
  {
    id: 'med-001',
    title: '腎機能別投与量計算',
    category: 'medication',
    description: '患者の腎機能（eGFR/CCr）に基づいた適切な薬剤投与量を提案します。',
    template: `以下の患者情報と薬剤について、腎機能を考慮した適切な投与設計を行ってください。

【患者情報】
- 年齢: {{age}}歳
- 体重: {{weight}}kg
- 血清クレアチニン: {{scr}} mg/dL
- eGFR/CCr: {{renal_function}}

【対象薬剤】
- 薬剤名: {{drug_name}}
- 通常用量: {{standard_dose}}

【依頼内容】
1. 腎機能評価（CKDステージ）
2. 推奨投与量
3. 投与時の注意点`,
    inputs: [
      { key: 'age', label: '年齢', placeholder: '例: 75', type: 'text' },
      { key: 'weight', label: '体重', placeholder: '例: 50', type: 'text' },
      { key: 'scr', label: '血清クレアチニン', placeholder: '例: 1.8', type: 'text' },
      { key: 'renal_function', label: 'eGFR/CCr', placeholder: '例: eGFR 30', type: 'text' },
      { key: 'drug_name', label: '薬剤名', placeholder: '例: レボフロキサシン', type: 'text' },
      { key: 'standard_dose', label: '通常用量', placeholder: '例: 500mg 1日1回', type: 'text' },
    ]
  },
  {
    id: 'med-002',
    title: '薬剤相互作用チェック',
    category: 'medication',
    description: '複数の薬剤間の相互作用と注意点をチェックします。',
    template: `以下の処方薬について、相互作用のチェックを行ってください。

【処方薬リスト】
{{medication_list}}

【依頼内容】
1. 併用禁忌・併用注意の組み合わせ
2. 相互作用の機序
3. 臨床的な対処法`,
    inputs: [
      { key: 'medication_list', label: '処方薬リスト', placeholder: '例:\nワーファリン\nロキソプロフェン', type: 'textarea' },
    ]
  }
];

// --- Communication (61-75) ---
const communicationPrompts: Prompt[] = [
  {
    id: 'comm-001',
    title: '悪い知らせ（Bad News）の伝達',
    category: 'communication',
    description: 'SPIKESプロトコルを用いた、悪い知らせを伝えるための対話スクリプト。',
    template: `以下の状況において、患者に悪い知らせを伝えるための対話スクリプトを作成してください。

【患者情報】
- 相手: {{recipient}}
- 理解度: {{mental_state}}

【伝える内容】
{{bad_news_content}}

【依頼内容】
SPIKESプロトコル（Setting, Perception, Invitation, Knowledge, Emotion, Strategy）に基づき、共感的かつ明確なスクリプトを作成してください。`,
    inputs: [
      { key: 'recipient', label: '相手', placeholder: '例: 本人（60代男性）', type: 'text' },
      { key: 'mental_state', label: '理解度', placeholder: '例: 不安を感じている', type: 'text' },
      { key: 'bad_news_content', label: '伝える内容', placeholder: '例: 癌の再発', type: 'textarea' },
    ]
  },
  {
    id: 'comm-002',
    title: '検査・処置の説明（インフォームドコンセント）',
    category: 'communication',
    description: '患者に検査や処置の必要性、リスク、代替案を分かりやすく説明します。',
    template: `{{procedure}}について、専門知識のない患者さんに分かりやすく説明するためのスクリプトを作成してください。

【説明すべき項目】
1. 検査・処置の目的
2. 具体的な方法
3. 合併症・リスク
4. 代替手段

【依頼内容】
専門用語を避け、例え話を用いて平易な言葉で説明してください。`,
    inputs: [
      { key: 'procedure', label: '検査・処置名', placeholder: '例: 上部消化管内視鏡検査（胃カメラ）', type: 'text' },
    ]
  }
];

// --- Literature (76-85) ---
const literaturePrompts: Prompt[] = [
  {
    id: 'lit-001',
    title: '論文要約（PICO形式）',
    category: 'literature',
    description: '医学論文のAbstractをPICO形式で構造化して要約します。',
    template: `以下の医学論文のAbstractを読み、PICO形式で要約してください。

【Abstract】
{{abstract_text}}

【依頼内容】
- P (Patient): 対象患者
- I (Intervention): 介入
- C (Comparison): 比較対照
- O (Outcome): 結果
- Conclusion: 結論`,
    inputs: [
      { key: 'abstract_text', label: 'Abstract本文', placeholder: 'Paste abstract here...', type: 'textarea' },
    ]
  }
];

// --- Research (86-95) ---
const researchPrompts: Prompt[] = [
  {
    id: 'res-001',
    title: '医学英語論文の校正',
    category: 'research',
    description: '医学英語論文のドラフトを、学術的に自然で正確な英語に校正します。',
    template: `以下の英文ドラフトを、一流医学ジャーナルへの投稿に適した学術的な英語に校正してください。

【ドラフト】
{{draft}}

【依頼内容】
1. 校正後の英文
2. 主な修正点と理由`,
    inputs: [
      { key: 'draft', label: '英文ドラフト', placeholder: 'Paste your draft here...', type: 'textarea' },
    ]
  },
  {
    id: 'res-002',
    title: '学会抄録作成',
    category: 'research',
    description: '研究結果から学会発表用の抄録を作成します。',
    template: `以下の情報に基づいて、学会発表用の抄録（Abstract）を作成してください。

【学会・文字数】
{{conference_info}}

【内容】
- 背景: {{background}}
- 方法: {{methods}}
- 結果: {{results}}
- 結論: {{conclusion}}

【依頼内容】
規定の文字数以内で、論理的な抄録を作成してください。`,
    inputs: [
      { key: 'conference_info', label: '学会・文字数', placeholder: '例: 日本内科学会 800文字', type: 'text' },
      { key: 'background', label: '背景', placeholder: '...', type: 'textarea' },
      { key: 'methods', label: '方法', placeholder: '...', type: 'textarea' },
      { key: 'results', label: '結果', placeholder: '...', type: 'textarea' },
      { key: 'conclusion', label: '結論', placeholder: '...', type: 'textarea' },
    ]
  }
];

// --- Case Analysis (96-100) ---
const caseAnalysisPrompts: Prompt[] = [
  {
    id: 'case-001',
    title: '症例報告のタイトル案作成',
    category: 'case-analysis',
    description: '症例の概要から、魅力的で学術的な症例報告のタイトル案を複数提案します。',
    template: `以下の症例報告について、学会発表や論文投稿に適したタイトル案を5つ提案してください。

【症例概要】
{{case_summary}}

【依頼内容】
- 学術的で正確なタイトル
- 興味を引くキャッチーなタイトル
- 診断の難しさを強調したタイトル
など、バリエーションを持たせてください。`,
    inputs: [
      { key: 'case_summary', label: '症例概要', placeholder: '例: 稀な副作用である...を呈した一例', type: 'textarea' },
    ]
  }
];

fullPrompts.push(...medicationPrompts, ...communicationPrompts, ...literaturePrompts, ...researchPrompts, ...caseAnalysisPrompts);

// --- Education (101-115) ---
const educationPrompts: Prompt[] = [
  {
    id: 'edu-001',
    title: '解剖学の解説（医学生向け）',
    category: 'education',
    description: '特定の解剖学的構造について、位置関係、支配神経、血管などを詳細に解説します。',
    template: `医学生に対して、{{structure}}の解剖学的特徴を解説してください。

【解説項目】
1. 位置と隣接臓器
2. 支配神経と栄養血管
3. 臨床的な重要性（関連する疾患や手技）
4. 覚え方の語呂合わせ（あれば）`,
    inputs: [
      { key: 'structure', label: '解剖学的構造', placeholder: '例: 鼠径管', type: 'text' },
    ]
  },
  {
    id: 'edu-002',
    title: '病態生理のメカニズム説明',
    category: 'education',
    description: '複雑な病態生理をステップバイステップで分かりやすく説明します。',
    template: `{{pathology}}の病態生理について、医学生にも分かるようにステップバイステップで解説してください。

【依頼内容】
- 原因から発症までのメカニズム
- 主要な症状が出現する理由
- 治療のターゲットとなるポイント`,
    inputs: [
      { key: 'pathology', label: '病態', placeholder: '例: 敗血症性ショック', type: 'text' },
    ]
  },
  {
    id: 'edu-003',
    title: 'OSCEシナリオ作成',
    category: 'education',
    description: '医学生のOSCE練習用の模擬患者シナリオを作成します。',
    template: `医学生のOSCE（客観的臨床能力試験）練習用に、{{complaint}}を主訴とする模擬患者シナリオを作成してください。

【設定】
- 患者年齢・性別: {{patient_demographics}}
- 難易度: {{difficulty}}

【出力内容】
1. 患者設定（現病歴、既往歴、社会歴）
2. 演技のポイント（感情、話し方）
3. 学生への課題（問診で聞き出すべき項目）`,
    inputs: [
      { key: 'complaint', label: '主訴', placeholder: '例: 腹痛', type: 'text' },
      { key: 'patient_demographics', label: '患者年齢・性別', placeholder: '例: 20代女性', type: 'text' },
      { key: 'difficulty', label: '難易度', placeholder: '例: 初級', type: 'select', options: ['初級', '中級', '上級'] },
    ]
  }
];

// --- Administrative (116-125) ---
const adminPrompts: Prompt[] = [
  {
    id: 'admin-001',
    title: '医療安全インシデントレポート',
    category: 'administrative',
    description: '発生したインシデントについて、客観的かつ再発防止に役立つレポートを作成します。',
    template: `以下の事実に基づいて、医療安全管理室に提出するインシデントレポートの記述案を作成してください。

【発生日時・場所】
{{datetime_location}}

【事実経過】
{{incident_details}}

【依頼内容】
5W1Hを明確にし、主観を交えず客観的事実のみを記述してください。また、当面の対応と再発防止策の案も含めてください。`,
    inputs: [
      { key: 'datetime_location', label: '発生日時・場所', placeholder: '例: 2024/12/10 10:00 病棟処置室', type: 'text' },
      { key: 'incident_details', label: '事実経過', placeholder: '例: 点滴準備中に...', type: 'textarea' },
    ]
  },
  {
    id: 'admin-002',
    title: '会議議事録の要約',
    category: 'administrative',
    description: '医療チームのカンファレンスや会議のメモから、決定事項とTo Doをまとめた議事録を作成します。',
    template: `以下の会議メモから、議事録を作成してください。

【会議名】
{{meeting_name}}

【メモ内容】
{{meeting_notes}}

【出力フォーマット】
1. 決定事項
2. 保留事項
3. Next Action（担当者・期限）`,
    inputs: [
      { key: 'meeting_name', label: '会議名', placeholder: '例: 感染対策委員会', type: 'text' },
      { key: 'meeting_notes', label: 'メモ内容', placeholder: 'Paste notes here...', type: 'textarea' },
    ]
  }
];

fullPrompts.push(...educationPrompts, ...adminPrompts);

// --- Research: Ideation & CQ (201-210) ---
const researchIdeationPrompts: Prompt[] = [
  {
    id: 'res-cq-pico',
    title: 'CQの構造化 (PICO/PECO)',
    category: 'research',
    description: '漠然とした臨床的疑問を、研究可能なPICO/PECO形式に構造化します。',
    template: `以下の臨床的な疑問や興味のあるテーマを、研究可能なPICO（またはPECO）形式に整理してください。

【臨床的疑問・テーマ】
{{clinical_question}}

【依頼内容】
1. **P (Patient/Population)**: 対象となる患者群
2. **I/E (Intervention/Exposure)**: 介入または曝露要因
3. **C (Comparison)**: 比較対照
4. **O (Outcome)**: アウトカム（主要評価項目・副次評価項目）
5. **Study Design**: 適していると思われる研究デザインの提案`,
    inputs: [
      { key: 'clinical_question', label: '臨床的疑問・テーマ', placeholder: '例: 高齢者の心不全患者に対して、早期リハビリは予後を改善するか？', type: 'textarea' },
    ]
  },
  {
    id: 'res-finer-check',
    title: 'FINER基準チェック',
    category: 'research',
    description: 'リサーチクエスチョンがFINER基準（実現可能性、興味深さ、新規性、倫理性、妥当性）を満たすか評価します。',
    template: `以下のリサーチクエスチョンについて、FINER基準に基づいた批判的吟味を行ってください。

【リサーチクエスチョン (PICO)】
{{pico_question}}

【依頼内容】
以下の各項目について、強みと課題点（クリアすべきハードル）を指摘してください。
1. **Feasible (実現可能性)**: 症例数、時間、費用、技術的課題
2. **Interesting (興味深さ)**: 臨床医や研究者にとっての魅力
3. **Novel (新規性)**: 既存の知見との違い、新しい点
4. **Ethical (倫理性)**: 患者への不利益、プライバシー、同意取得
5. **Relevant (妥当性・重要性)**: 臨床現場や医学知識への貢献度`,
    inputs: [
      { key: 'pico_question', label: 'リサーチクエスチョン (PICO)', placeholder: '例: P: 心不全患者, I: 遠隔モニタリング, C: 通常ケア, O: 再入院率', type: 'textarea' },
    ]
  },
];

// --- Research: Literature Review (211-220) ---
const researchReviewPrompts: Prompt[] = [
  {
    id: 'res-pubmed-query',
    title: 'PubMed検索クエリ作成',
    category: 'research',
    description: 'PICOに基づいて、PubMedで効率的に文献を検索するための検索式（MeSH Term含む）を作成します。',
    template: `以下のPICOに基づいて、PubMedで使用する検索クエリを作成してください。

【PICO】
- P: {{patient}}
- I: {{intervention}}
- C: {{comparison}}
- O: {{outcome}}

【依頼内容】
1. **Key Concepts**: 各要素に対応するキーワードとMeSH Termsのリストアップ
2. **Search Strategy**: Boolean演算子（AND, OR）を用いた具体的な検索式
3. **Filters**: 推奨されるフィルター設定（出版年、言語、研究デザインなど）`,
    inputs: [
      { key: 'patient', label: 'P (対象)', placeholder: '例: Heart failure', type: 'text' },
      { key: 'intervention', label: 'I (介入)', placeholder: '例: Telemonitoring', type: 'text' },
      { key: 'comparison', label: 'C (比較)', placeholder: '例: Standard care', type: 'text' },
      { key: 'outcome', label: 'O (アウトカム)', placeholder: '例: Readmission', type: 'text' },
    ]
  },
  {
    id: 'res-gap-analysis',
    title: '先行研究のギャップ特定',
    category: 'research',
    description: '既存の知見や先行研究の要約から、まだ解明されていない点（Research Gap）を特定します。',
    template: `以下の先行研究の知見に基づいて、まだ解明されていない「Research Gap」を特定し、本研究の意義を言語化してください。

【先行研究の知見・現状】
{{background_knowledge}}

【本研究のテーマ】
{{my_research_topic}}

【依頼内容】
1. **何が分かっているか**: 既存のコンセンサス
2. **何が分かっていないか**: データの不足、結果の不一致、未検討の集団など
3. **本研究の独自性**: どのようにギャップを埋めるか（新規性のアピールポイント）`,
    inputs: [
      { key: 'background_knowledge', label: '先行研究の知見', placeholder: '例: 欧米の研究では有効性が示されているが、アジア人でのデータは乏しい...', type: 'textarea' },
      { key: 'my_research_topic', label: '本研究のテーマ', placeholder: '例: 日本人高齢心不全患者における遠隔モニタリングの効果', type: 'text' },
    ]
  },
];

// --- Research: Study Design & Protocol (221-230) ---
const researchProtocolPrompts: Prompt[] = [
  {
    id: 'res-variable-list',
    title: '変数リストの作成支援',
    category: 'research',
    description: '研究目的に必要な主要評価項目、副次評価項目、交絡因子のリストアップを支援します。',
    template: `以下の研究テーマにおいて、データ収集が必要な変数をリストアップしてください。

【研究テーマ (PICO)】
{{research_theme}}

【依頼内容】
以下のカテゴリーに分けて、具体的な変数を提案してください。
1. **Outcome Variables (目的変数)**: 主要評価項目、副次評価項目
2. **Exposure/Intervention Variables (説明変数)**: 介入の有無、用量、期間など
3. **Confounding Factors (交絡因子)**: 結果に影響を与えうる患者背景（年齢、性別、併存疾患、重症度スコアなど）
4. **Effect Modifiers (効果修飾因子)**: 効果の大きさを変えうる因子`,
    inputs: [
      { key: 'research_theme', label: '研究テーマ (PICO)', placeholder: '例: 敗血症患者における新規抗菌薬の腎保護効果', type: 'textarea' },
    ]
  },
  {
    id: 'res-ethics-draft',
    title: '倫理委員会申請書のドラフト',
    category: 'research',
    description: '研究概要から、倫理的配慮（個人情報保護、インフォームドコンセント）に関する記述案を作成します。',
    template: `以下の研究概要に基づいて、倫理委員会申請書の「倫理的配慮」および「個人情報の保護」のセクションのドラフトを作成してください。

【研究デザイン】
{{study_design}}

【データ収集方法】
{{data_collection}}

【依頼内容】
以下の点を含めて、倫理指針に準拠した表現で記述してください。
1. **ヘルシンキ宣言・倫理指針の遵守**
2. **個人情報の匿名化・管理方法**（連結可能匿名化など）
3. **インフォームド・コンセント**（オプトアウトの適用可否とその理由、または同意取得の方法）
4. **対象者への不利益・利益**`,
    inputs: [
      { key: 'study_design', label: '研究デザイン', placeholder: '例: 後方視的カルテ調査（観察研究）', type: 'text' },
      { key: 'data_collection', label: 'データ収集方法', placeholder: '例: 電子カルテより診療情報を抽出', type: 'textarea' },
    ]
  },
];

fullPrompts.push(...researchIdeationPrompts, ...researchReviewPrompts, ...researchProtocolPrompts);

// --- Research: Data Analysis (231-240) ---
const researchAnalysisPrompts: Prompt[] = [
  {
    id: 'res-stat-plan',
    title: '統計解析計画の立案',
    category: 'research',
    description: '変数の種類と研究デザインに基づいて、適切な統計検定方法を提案します。',
    template: `以下の研究データに対して、適切な統計解析手法を提案してください。

【比較したい群】
{{groups}}

【比較したい変数（アウトカム）】
{{outcome_variable}}

【変数の種類】
{{variable_type}}

【依頼内容】
1. **単変量解析**: 2群間比較（パラメトリック/ノンパラメトリック）、3群以上の場合
2. **多変量解析**: 調整すべき因子を考慮した解析手法（回帰分析の種類など）
3. **必要な前提条件**: 正規性の確認、等分散性など`,
    inputs: [
      { key: 'groups', label: '比較したい群', placeholder: '例: 薬剤A投与群 vs 薬剤B投与群（独立2群）', type: 'text' },
      { key: 'outcome_variable', label: '比較したい変数', placeholder: '例: 入院期間（日数）', type: 'text' },
      { key: 'variable_type', label: '変数の種類', placeholder: '例: 連続変数（正規分布しない可能性あり）', type: 'text' },
    ]
  },
  {
    id: 'res-result-interpretation',
    title: '統計結果の解釈と言語化',
    category: 'research',
    description: '統計解析の結果（p値、信頼区間、オッズ比など）を入力し、論文の結果セクションで使える表現を作成します。',
    template: `以下の統計解析結果を、医学論文の「Results」セクションに適した英語（または日本語）の文章に変換し、臨床的な解釈を加えてください。

【解析内容】
{{analysis_method}}

【結果データ】
{{result_data}}

【依頼内容】
1. **結果の記述**: 数値を正確に引用した客観的な記述
2. **統計学的解釈**: 有意差の有無、信頼区間の幅についての言及
3. **臨床的解釈**: この結果が臨床的に何を意味するか（Discussionのヒント）`,
    inputs: [
      { key: 'analysis_method', label: '解析内容', placeholder: '例: 多変量ロジスティック回帰分析', type: 'text' },
      { key: 'result_data', label: '結果データ', placeholder: '例: Odds Ratio 0.65 (95% CI: 0.45-0.92), p=0.015', type: 'textarea' },
    ]
  },
];

// --- Research: Writing & Submission (241-250) ---
const researchWritingPrompts: Prompt[] = [
  {
    id: 'res-intro-flow',
    title: 'Introductionの構成案',
    category: 'research',
    description: '「既知の事実」から「本研究の目的」に至るロジックフローを構築します。',
    template: `以下の要素をつなげて、論理的で説得力のあるIntroductionの構成案（パラグラフごとのトピック）を作成してください。

【背景（Known）】
{{background}}

【未解決の問題（Unknown/Gap）】
{{gap}}

【本研究の目的・仮説（Purpose/Hypothesis）】
{{purpose}}

【依頼内容】
3〜4つのパラグラフ構成で、各パラグラフの主題とつなぎのロジック（Flow）を説明してください。`,
    inputs: [
      { key: 'background', label: '背景（既知の事実）', placeholder: '例: 心不全の再入院は大きな問題である...', type: 'textarea' },
      { key: 'gap', label: '未解決の問題', placeholder: '例: しかし、高齢者における遠隔モニタリングの効果は定まっていない...', type: 'textarea' },
      { key: 'purpose', label: '本研究の目的', placeholder: '例: 日本人高齢心不全患者における有効性を検証する', type: 'textarea' },
    ]
  },
  {
    id: 'res-cover-letter',
    title: '投稿用カバーレター作成',
    category: 'research',
    description: 'ジャーナルエディターに対して、研究の新規性と重要性をアピールするカバーレターを作成します。',
    template: `以下の論文を投稿するためのカバーレター（英語）を作成してください。

【投稿先ジャーナル】
{{journal_name}}

【論文タイトル】
{{paper_title}}

【研究のハイライト・新規性】
{{highlights}}

【依頼内容】
エディター（Editor-in-Chief）宛の標準的なフォーマットで、以下の点を含めてください。
1. 投稿の意思表示
2. 研究の重要性とジャーナルの読者層への適合性（Why this journal?）
3. 利益相反、二重投稿がないことの宣誓
4. 著者全員の同意`,
    inputs: [
      { key: 'journal_name', label: '投稿先ジャーナル', placeholder: '例: The New England Journal of Medicine', type: 'text' },
      { key: 'paper_title', label: '論文タイトル', placeholder: '例: Efficacy of...', type: 'text' },
      { key: 'highlights', label: '研究のハイライト', placeholder: '例: 世界初の大規模RCTであること、ガイドラインを変える可能性があること', type: 'textarea' },
    ]
  },
];

// --- Research: Peer Review Response (251-260) ---
const researchReviewResponsePrompts: Prompt[] = [
  {
    id: 'res-review-todo',
    title: '査読コメントのToDoリスト化',
    category: 'research',
    description: '査読者からの長いコメントを分解し、具体的な修正タスクのリストに変換します。',
    template: `以下の査読者からのコメント（Reviewer Comments）を読み解き、対応が必要な具体的なアクション（ToDoリスト）に分解してください。

【査読コメント】
{{reviewer_comments}}

【依頼内容】
各指摘について、以下の形式で整理してください。
1. **指摘の要約**: 何を問題視しているか
2. **必要なアクション**: 追加解析、本文修正、図表修正、反論のみ、など
3. **難易度/所要時間**: 推定（高/中/低）`,
    inputs: [
      { key: 'reviewer_comments', label: '査読コメント', placeholder: 'Paste reviewer comments here...', type: 'textarea' },
    ]
  },
  {
    id: 'res-rebuttal-draft',
    title: '回答レター（Rebuttal）のドラフト',
    category: 'research',
    description: '査読者の指摘に対する、礼儀正しく論理的な回答案（英語）を作成します。',
    template: `査読者の以下の指摘に対して、回答レター（Response to Reviewers）のドラフト（英語）を作成してください。

【査読者の指摘】
{{comment}}

【こちらの対応・回答内容】
{{response_content}}

【依頼内容】
1. **感謝の言葉**: 指摘に対する感謝（"We thank the reviewer for this insightful comment..."）
2. **対応の明示**: 修正した場合はその箇所（"We have revised the manuscript..."）、修正しなかった場合はその理由
3. **トーン**: 礼儀正しく、かつ科学的に主張するトーン`,
    inputs: [
      { key: 'comment', label: '査読者の指摘', placeholder: '例: The sample size is too small to draw this conclusion.', type: 'textarea' },
      { key: 'response_content', label: 'こちらの対応・回答', placeholder: '例: 確かにサンプルサイズは小さいが、探索的研究としては十分である。Limitationに追記した。', type: 'textarea' },
    ]
  },
];

fullPrompts.push(...researchAnalysisPrompts, ...researchWritingPrompts, ...researchReviewResponsePrompts);

// --- Research: Statistical Code Generation (261-270) ---
const researchStatsCodePrompts: Prompt[] = [
  {
    id: 'res-code-python-preprocessing',
    title: 'Python: データ前処理コード生成',
    category: 'research',
    description: 'pandasを用いたデータの読み込み、欠損値処理、カテゴリ変数の変換を行うPythonコードを生成します。',
    template: `以下のデータセットに対して、前処理を行うPythonコード（pandas）を作成してください。

【データ形式】
{{data_format}}

【変数の詳細】
{{variables}}

【依頼内容】
1. データの読み込み（pd.read_csvなど）
2. 欠損値の確認と処理（数値は平均値/中央値埋め、カテゴリは最頻値/欠損カテゴリ作成など、適切な方法をコメント付きで）
3. カテゴリ変数のダミー変数化（pd.get_dummies）
4. 基本的な情報の表示（info, describe）`,
    inputs: [
      { key: 'data_format', label: 'データ形式', placeholder: '例: data.csv (UTF-8 encoding)', type: 'text' },
      { key: 'variables', label: '変数の詳細', placeholder: '例: age(数値), sex(カテゴリ: 0=F, 1=M), outcome(2値)', type: 'textarea' },
    ]
  },
  {
    id: 'res-code-r-tableone',
    title: 'R: Table 1作成コード生成',
    category: 'research',
    description: 'Rのtableoneパッケージを使用して、論文投稿用の背景因子表（Table 1）を作成するコードを生成します。',
    template: `Rのtableoneパッケージを使用して、以下の条件でTable 1を作成するコードを書いてください。

【データフレーム名】
{{df_name}}

【層別化（群分け）変数】
{{strata_var}}

【変数リスト】
- 正規分布する連続変数: {{normal_vars}}
- 非正規分布の連続変数: {{non_normal_vars}}
- カテゴリ変数: {{cat_vars}}

【依頼内容】
1. 必要なライブラリの読み込み
2. CreateTableOne関数の実行
3. print関数での出力設定（SMDの表示、p値の表示、nonnormal指定など）`,
    inputs: [
      { key: 'df_name', label: 'データフレーム名', placeholder: '例: df', type: 'text' },
      { key: 'strata_var', label: '層別化変数', placeholder: '例: treatment_group', type: 'text' },
      { key: 'normal_vars', label: '正規分布変数', placeholder: '例: age, height, weight', type: 'text' },
      { key: 'non_normal_vars', label: '非正規分布変数', placeholder: '例: crp, bnp, los', type: 'text' },
      { key: 'cat_vars', label: 'カテゴリ変数', placeholder: '例: sex, hypertension, diabetes', type: 'text' },
    ]
  },
  {
    id: 'res-code-python-logistic',
    title: 'Python: ロジスティック回帰分析',
    category: 'research',
    description: 'statsmodelsまたはscikit-learnを用いて、多変量ロジスティック回帰分析を行い、オッズ比と95%信頼区間を出力するコードを生成します。',
    template: `Python (statsmodels) を使用して、多変量ロジスティック回帰分析を行うコードを作成してください。

【目的変数 (Y)】
{{target_var}}

【説明変数 (X)】
{{explanatory_vars}}

【依頼内容】
1. 定数項の追加 (sm.add_constant)
2. モデルの構築とフィット (sm.Logit)
3. 結果の表示 (summary)
4. **オッズ比と95%信頼区間の算出・表示**（ここが重要）`,
    inputs: [
      { key: 'target_var', label: '目的変数', placeholder: '例: death (0/1)', type: 'text' },
      { key: 'explanatory_vars', label: '説明変数リスト', placeholder: '例: age, sex, bmi, smoking, hypertension', type: 'textarea' },
    ]
  },
  {
    id: 'res-code-r-survival',
    title: 'R: 生存時間解析 (Kaplan-Meier & Cox)',
    category: 'research',
    description: 'Rのsurvival/survminerパッケージを用いて、Kaplan-Meier曲線の描画とCox比例ハザードモデルを実行するコードを生成します。',
    template: `Rを使用して生存時間解析を行うコードを作成してください。

【データセット名】
{{df_name}}

【時間変数・イベント変数】
- 時間: {{time_var}}
- イベント: {{event_var}}

【比較したい群】
{{group_var}}

【調整因子（Cox回帰用）】
{{covariates}}

【依頼内容】
1. Kaplan-Meier曲線の描画 (ggsurvplot): p値、リスクテーブル付き
2. Log-rank検定の実行
3. 多変量Cox比例ハザードモデルの実行とハザード比(HR)の出力`,
    inputs: [
      { key: 'df_name', label: 'データセット名', placeholder: '例: data', type: 'text' },
      { key: 'time_var', label: '時間変数', placeholder: '例: days_to_event', type: 'text' },
      { key: 'event_var', label: 'イベント変数', placeholder: '例: status (0=censor, 1=event)', type: 'text' },
      { key: 'group_var', label: '群分け変数', placeholder: '例: drug_group', type: 'text' },
      { key: 'covariates', label: '調整因子', placeholder: '例: age + sex + diabetes', type: 'text' },
    ]
  },
];

// --- Research: Reference Management (271-280) ---
const researchReferencePrompts: Prompt[] = [
  {
    id: 'res-ref-bibtex',
    title: 'BibTeX/RIS形式への変換',
    category: 'research',
    description: '論文情報を入力すると、EndNoteやZoteroにインポート可能なBibTeX形式のテキストを出力します。',
    template: `以下の論文情報を、文献管理ソフト（Zotero, EndNote, Mendeley）で読み込める**BibTeX形式**に変換してください。

【論文情報】
{{paper_info}}

【依頼内容】
- 正確なBibTeXフォーマット（@article{...}）で出力してください。
- 著者名は "Lastname, Firstname" の形式で記述してください。
- 欠落している情報があれば、適当なプレースホルダー（例: {MISSING_YEAR}）を入れてください。`,
    inputs: [
      { key: 'paper_info', label: '論文情報', placeholder: '例: "Efficacy of X..." by Smith J et al. NEJM 2024;390:123-130.', type: 'textarea' },
    ]
  },
  {
    id: 'res-ref-format-convert',
    title: '引用フォーマット変換',
    category: 'research',
    description: '論文リストを指定されたジャーナルの投稿規定（Vancouver, APAなど）に合わせて整形します。',
    template: `以下の参考文献リストを、**{{style}}形式**に整形し直してください。

【参考文献リスト】
{{reference_list}}

【スタイル例】
- Vancouver: 1. Author AA, Author BB. Title. Journal. Year;Vol(Issue):Page.
- APA: Author, A. A., & Author, B. B. (Year). Title. *Journal*, *Vol*(Issue), Page.

【依頼内容】
- 番号付けやインデントも含めて、そのままコピー＆ペーストできる形式で出力してください。`,
    inputs: [
      { key: 'style', label: '変換先スタイル', placeholder: '例: Vancouver style (NEJM準拠)', type: 'text' },
      { key: 'reference_list', label: '元のリスト', placeholder: 'Paste reference list here...', type: 'textarea' },
    ]
  },
];

// --- Research: Reporting Guidelines (281-290) ---
const researchGuidelinePrompts: Prompt[] = [
  {
    id: 'res-check-consort',
    title: 'CONSORTチェックリスト (RCT)',
    category: 'research',
    description: 'ランダム化比較試験のドラフトがCONSORT声明の必須項目を満たしているかチェックします。',
    template: `以下のRCT（ランダム化比較試験）の論文ドラフトについて、**CONSORT 2010声明**のチェックリストに基づいた評価を行ってください。

【論文ドラフト（Methods/Results）】
{{manuscript_text}}

【依頼内容】
特に以下の重要項目について、記載の有無と不十分な点を指摘してください。
1. **Randomisation**: シークエンス生成方法、割り付け隠蔽（Allocation concealment）
2. **Blinding**: 誰が盲検化されたか（参加者、医療者、評価者）
3. **Sample size**: サンプルサイズ計算の根拠
4. **Outcomes**: 主要評価項目と副次評価項目の定義
5. **Flow diagram**: 患者フローの記述（除外理由など）`,
    inputs: [
      { key: 'manuscript_text', label: '論文ドラフト', placeholder: 'Paste Methods and Results sections here...', type: 'textarea' },
    ]
  },
  {
    id: 'res-check-strobe',
    title: 'STROBEチェックリスト (観察研究)',
    category: 'research',
    description: '観察研究のドラフトがSTROBE声明の必須項目を満たしているかチェックします。',
    template: `以下の観察研究（コホート/ケースコントロール/横断研究）の論文ドラフトについて、**STROBE声明**に基づいた評価を行ってください。

【論文ドラフト】
{{manuscript_text}}

【依頼内容】
以下の項目について、記載漏れや改善点を指摘してください。
1. **Study Design**: 研究デザインの明確な記述
2. **Setting**: 場所、期間、フォローアップ期間
3. **Participants**: 適格基準、除外基準、選択方法
4. **Variables**: 全ての変数（曝露、アウトカム、交絡因子、効果修飾因子）の定義
5. **Bias**: バイアスの評価と対処
6. **Study Size**: サンプルサイズの決定方法`,
    inputs: [
      { key: 'manuscript_text', label: '論文ドラフト', placeholder: 'Paste Methods section here...', type: 'textarea' },
    ]
  },
  {
    id: 'res-check-care',
    title: 'CAREチェックリスト (症例報告)',
    category: 'research',
    description: '症例報告のドラフトがCAREガイドラインに沿っているかチェックします。',
    template: `以下の症例報告のドラフトについて、**CAREガイドライン**に基づいたチェックを行ってください。

【症例報告ドラフト】
{{case_report_text}}

【依頼内容】
以下の項目が適切に含まれているか確認し、不足していれば具体的な加筆案を提示してください。
1. **Timeline**: 発症から診断、治療、転帰までの時系列
2. **Diagnostic Challenges**: 診断における課題や推論プロセス
3. **Intervention**: 治療内容の詳細（用量、期間など）
4. **Outcomes**: 治療後の経過（客観的データと患者の主観的評価）
5. **Patient Perspective**: 患者の視点や体験（可能な場合）`,
    inputs: [
      { key: 'case_report_text', label: '症例報告ドラフト', placeholder: 'Paste Case Presentation here...', type: 'textarea' },
    ]
  },
];

// --- Research: Workflow Automation (291-300) ---
const researchWorkflowPrompts: Prompt[] = [
  {
    id: 'res-gantt-chart',
    title: '研究スケジュール作成 (Gantt)',
    category: 'research',
    description: '研究のマイルストーンから、具体的なタスクと期限をリストアップし、Mermaid記法のガントチャートコードを生成します。',
    template: `以下の研究プロジェクトについて、現実的なスケジュール（ガントチャート）を作成してください。

【研究テーマ】
{{research_topic}}

【開始日】
{{start_date}}

【目標（学会・投稿）】
{{target_deadline}}

【依頼内容】
1. **タスク分解**: 倫理申請、データ収集、解析、執筆、投稿などの主要フェーズ
2. **スケジュール表**: 各タスクの開始・終了時期の目安
3. **Mermaid Code**: これをガントチャートとして可視化するためのMermaid記法のコード`,
    inputs: [
      { key: 'research_topic', label: '研究テーマ', placeholder: '例: 新規抗がん剤の第II相試験', type: 'text' },
      { key: 'start_date', label: '開始日', placeholder: '例: 2025/04/01', type: 'text' },
      { key: 'target_deadline', label: '目標期限', placeholder: '例: 2026/03の学会で発表', type: 'text' },
    ]
  },
];

fullPrompts.push(...researchStatsCodePrompts, ...researchReferencePrompts, ...researchGuidelinePrompts, ...researchWorkflowPrompts);
