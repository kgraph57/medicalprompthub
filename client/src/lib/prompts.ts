export type PromptCategory = 'diagnosis' | 'treatment' | 'communication' | 'literature' | 'case-analysis';

export interface Prompt {
  id: string;
  title: string;
  category: PromptCategory;
  description: string;
  template: string;
  inputs: {
    key: string;
    label: string;
    placeholder: string;
    type: 'text' | 'textarea' | 'select';
    options?: string[];
  }[];
  example?: string;
}

export const categories: { id: PromptCategory; label: string; description: string }[] = [
  { id: 'diagnosis', label: '診断支援', description: '症状や検査結果からの鑑別診断・分析' },
  { id: 'treatment', label: '治療計画', description: 'エビデンスに基づいた治療方針の立案' },
  { id: 'communication', label: '患者対話', description: '患者説明・教育・同意取得の支援' },
  { id: 'literature', label: '医学文献', description: '論文要約・エビデンス評価' },
  { id: 'case-analysis', label: '症例分析', description: '症例報告・カンファレンス資料作成' },
];

export const prompts: Prompt[] = [
  {
    id: 'differential-diagnosis',
    title: '鑑別診断',
    category: 'diagnosis',
    description: '患者情報から考えられる疾患をリストアップし、優先順位付けを行います。',
    template: `あなたは経験豊富な臨床医です。以下の患者情報に基づいて、鑑別診断を行ってください。

【患者情報】
- 年齢・性別: {{age}}歳 {{gender}}
- 主訴: {{chief_complaint}}
- 現病歴: {{history_present_illness}}
- 既往歴: {{past_medical_history}}
- 内服薬: {{medications}}
- バイタルサイン: {{vitals}}
- 身体所見: {{physical_exam}}

【依頼内容】
以下の形式で鑑別診断を提示してください：

1. **最も可能性の高い診断（Top 3）**
   - 各診断名
   - その診断を支持する所見
   - 確定診断のために必要な追加検査

2. **除外すべき重要な疾患（Must not miss）**
   - 緊急性の高い疾患
   - 見逃すと重大な結果をもたらす疾患

3. **推奨される初期対応**
   - 追加で行うべき検査
   - 初期治療の方針`,
    inputs: [
      { key: 'age', label: '年齢', placeholder: '例: 55', type: 'text' },
      { key: 'gender', label: '性別', placeholder: '例: 男性', type: 'select', options: ['男性', '女性', 'その他'] },
      { key: 'chief_complaint', label: '主訴', placeholder: '例: 胸痛', type: 'text' },
      { key: 'history_present_illness', label: '現病歴', placeholder: '例: 3時間前から持続する胸部圧迫感...', type: 'textarea' },
      { key: 'past_medical_history', label: '既往歴', placeholder: '例: 高血圧、糖尿病', type: 'textarea' },
      { key: 'medications', label: '内服薬', placeholder: '例: アムロジピン5mg', type: 'textarea' },
      { key: 'vitals', label: 'バイタルサイン', placeholder: '例: BP 150/95, HR 98', type: 'text' },
      { key: 'physical_exam', label: '身体所見', placeholder: '例: 冷汗あり、心音整', type: 'textarea' },
    ]
  },
  {
    id: 'symptom-analysis',
    title: '症状分析',
    category: 'diagnosis',
    description: '症状の重症度評価と緊急性の判断を支援します。',
    template: `あなたは救急医療に精通した臨床医です。以下の症状について詳細な分析を行ってください。

【患者基本情報】
- 年齢・性別: {{age}}歳 {{gender}}
- 主訴: {{chief_complaint}}

【症状の詳細】
- 発症時期: {{onset}}
- 症状の程度: {{severity}}
- 随伴症状: {{associated_symptoms}}

【依頼内容】
以下の観点から症状を分析してください：

1. **重症度評価**（軽症/中等症/重症）
2. **緊急性の判断**（Red flagsの有無）
3. **推奨される対応**（救急受診/外来受診/経過観察）`,
    inputs: [
      { key: 'age', label: '年齢', placeholder: '例: 28', type: 'text' },
      { key: 'gender', label: '性別', placeholder: '例: 女性', type: 'select', options: ['男性', '女性', 'その他'] },
      { key: 'chief_complaint', label: '主訴', placeholder: '例: 頭痛', type: 'text' },
      { key: 'onset', label: '発症時期・様式', placeholder: '例: 今朝から突然', type: 'text' },
      { key: 'severity', label: '症状の程度', placeholder: '例: 今まで経験したことのない激しい痛み', type: 'text' },
      { key: 'associated_symptoms', label: '随伴症状', placeholder: '例: 嘔気、光過敏', type: 'textarea' },
    ]
  },
  {
    id: 'lab-interpretation',
    title: '検査結果解釈',
    category: 'diagnosis',
    description: '臨床検査データの解釈と追加検査の提案を行います。',
    template: `あなたは臨床検査医学に精通した専門医です。以下の検査結果について、臨床的解釈を行ってください。

【患者情報】
- 年齢・性別: {{age}}歳 {{gender}}
- 臨床症状: {{symptoms}}

【検査結果】
{{lab_results}}

【依頼内容】
1. **異常値のまとめと臨床的意義**
2. **考えられる疾患・病態**
3. **推奨される追加検査**`,
    inputs: [
      { key: 'age', label: '年齢', placeholder: '例: 62', type: 'text' },
      { key: 'gender', label: '性別', placeholder: '例: 男性', type: 'select', options: ['男性', '女性', 'その他'] },
      { key: 'symptoms', label: '臨床症状', placeholder: '例: 健診異常指摘、自覚症状なし', type: 'textarea' },
      { key: 'lab_results', label: '検査結果', placeholder: '例:\nWBC: 7200\nHb: 10.2\nAST: 45', type: 'textarea' },
    ]
  },
  {
    id: 'treatment-planning',
    title: '治療計画立案',
    category: 'treatment',
    description: 'エビデンスに基づいた治療オプションを提示します。',
    template: `あなたはEBMに精通した臨床医です。以下の患者に対する治療計画を立案してください。

【患者情報】
- 年齢・性別: {{age}}歳 {{gender}}
- 診断名: {{diagnosis}}
- 重症度・病期: {{severity}}
- 既往歴・合併症: {{comorbidities}}

【依頼内容】
1. **治療目標**（短期・中長期）
2. **推奨される治療オプション**（エビデンスレベル、効果、副作用）
3. **第一選択の治療計画**
4. **患者教育のポイント**`,
    inputs: [
      { key: 'age', label: '年齢', placeholder: '例: 68', type: 'text' },
      { key: 'gender', label: '性別', placeholder: '例: 女性', type: 'select', options: ['男性', '女性', 'その他'] },
      { key: 'diagnosis', label: '診断名', placeholder: '例: 2型糖尿病', type: 'text' },
      { key: 'severity', label: '重症度・病期', placeholder: '例: HbA1c 8.2%, 合併症なし', type: 'text' },
      { key: 'comorbidities', label: '既往歴・合併症', placeholder: '例: 高血圧、変形性膝関節症', type: 'textarea' },
    ]
  },
  {
    id: 'patient-education',
    title: '患者教育',
    category: 'communication',
    description: '患者にわかりやすい疾患・治療の説明文を作成します。',
    template: `あなたは患者教育に精通した医療従事者です。以下の内容について、患者とその家族が理解しやすい説明文を作成してください。

【対象患者】
- 年齢: {{age}}歳
- 診断名: {{diagnosis}}
- 理解度: {{literacy}}

【説明したい内容】
{{content}}

【依頼内容】
専門用語を避け、平易な言葉で、共感的なトーンの説明文を作成してください。`,
    inputs: [
      { key: 'age', label: '年齢', placeholder: '例: 55', type: 'text' },
      { key: 'diagnosis', label: '診断名', placeholder: '例: 高血圧症', type: 'text' },
      { key: 'literacy', label: '理解度・健康リテラシー', placeholder: '例: 一般成人レベル', type: 'select', options: ['小学生レベル', '中学生レベル', '一般成人レベル', '高齢者（わかりやすく）'] },
      { key: 'content', label: '説明したい内容', placeholder: '例: なぜ薬を飲み続ける必要があるのか、生活習慣の改善点', type: 'textarea' },
    ]
  },
  {
    id: 'paper-summary',
    title: '論文要約',
    category: 'literature',
    description: '医学論文を構造化して要約し、臨床的意義を評価します。',
    template: `あなたは医学論文の批判的吟味に精通した研究者です。以下の論文について、構造化された要約を作成してください。

【論文情報】
- タイトル: {{title}}
- 論文の内容:
{{content}}

【依頼内容】
1. **研究の背景と目的**
2. **研究方法**（PICO/PECO）
3. **主要な結果**
4. **臨床的意義と限界**
5. **要点まとめ（3行）**`,
    inputs: [
      { key: 'title', label: '論文タイトル', placeholder: '例: Effect of...', type: 'text' },
      { key: 'content', label: '論文の内容（Abstractなど）', placeholder: 'Abstractや本文を貼り付けてください', type: 'textarea' },
    ]
  },
  {
    id: 'case-presentation',
    title: '症例提示',
    category: 'case-analysis',
    description: '教育的な症例報告の作成を支援します。',
    template: `あなたは症例提示に精通した臨床医です。以下の症例情報を、教育的で構造化された症例提示の形式にまとめてください。

【症例情報】
- 患者: {{patient_info}}
- 主訴・現病歴: {{history}}
- 検査所見: {{findings}}
- 経過・転帰: {{course}}

【提示の目的】
{{purpose}}

【依頼内容】
教育的な価値を強調し、臨床推論のプロセスがわかるようにまとめてください。`,
    inputs: [
      { key: 'patient_info', label: '患者基本情報', placeholder: '例: 72歳女性、無職', type: 'text' },
      { key: 'history', label: '主訴・現病歴', placeholder: '例: 発熱と呼吸困難...', type: 'textarea' },
      { key: 'findings', label: '身体・検査所見', placeholder: '例: 右下肺野浸潤影...', type: 'textarea' },
      { key: 'course', label: '経過・転帰', placeholder: '例: 抗菌薬投与により改善...', type: 'textarea' },
      { key: 'purpose', label: '提示の目的', placeholder: '例: 研修医向けカンファレンス', type: 'text' },
    ]
  },
];
