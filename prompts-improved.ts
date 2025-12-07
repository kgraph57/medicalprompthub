import type { Prompt } from "./prompts";

// 改善版プロンプト - diagnosis-differential
export const improvedDiagnosisDifferential: Prompt = {
  id: "diagnosis-differential",
  title: "Differential Diagnosis Generator",
  description: "主訴と現病歴から鑑別診断リストを作成し、見逃しを防ぎます。",
  category: "diagnosis",
  template: `あなたは熟練した総合診療医です。以下の症例情報に基づき、鑑別診断リストを作成してください。

# 症例情報
- 主訴: {{chief_complaint}}
- 現病歴: {{present_illness}}
- 既往歴: {{past_history}}
- バイタルサイン: 
  - 体温: {{temperature}}°C
  - 血圧: {{blood_pressure}} mmHg
  - 脈拍: {{pulse}}/分
  - 呼吸数: {{respiratory_rate}}/分
  - SpO2: {{spo2}}%

# 出力形式
1. **Critical (見逃してはいけない疾患)**: 3つ
2. **Common (頻度の高い疾患)**: 3つ
3. **Rare (稀だが考慮すべき疾患)**: 2つ

各疾患について、この症例で疑う根拠と、除外するために必要な追加検査を簡潔に記載してください。`,
  inputs: [
    { 
      key: 'chief_complaint', 
      label: '主訴', 
      placeholder: '主訴を選択または入力', 
      type: 'select',
      options: [
        '発熱',
        '頭痛',
        '胸痛',
        '腹痛',
        '呼吸困難',
        '咳嗽',
        '嘔気・嘔吐',
        '下痢',
        'めまい',
        '意識障害',
        '全身倦怠感',
        '関節痛',
        '腰痛',
        '浮腫',
        'その他'
      ]
    },
    { 
      key: 'present_illness', 
      label: '現病歴', 
      placeholder: '例: 3日前から発熱あり。昨日から咳嗽も出現。解熱剤を内服するも改善せず。', 
      type: 'textarea' 
    },
    { 
      key: 'past_history', 
      label: '既往歴', 
      placeholder: '既往歴を選択または入力', 
      type: 'select',
      options: [
        'なし',
        '高血圧',
        '糖尿病',
        '脂質異常症',
        '心疾患',
        '脳血管疾患',
        '慢性腎臓病',
        '肝疾患',
        '悪性腫瘍',
        '喘息・COPD',
        'その他'
      ]
    },
    { 
      key: 'temperature', 
      label: '体温', 
      placeholder: '例: 38.5', 
      type: 'text' 
    },
    { 
      key: 'blood_pressure', 
      label: '血圧', 
      placeholder: '例: 120/80', 
      type: 'text' 
    },
    { 
      key: 'pulse', 
      label: '脈拍', 
      placeholder: '例: 90', 
      type: 'text' 
    },
    { 
      key: 'respiratory_rate', 
      label: '呼吸数', 
      placeholder: '例: 18', 
      type: 'text' 
    },
    { 
      key: 'spo2', 
      label: 'SpO2', 
      placeholder: '例: 98', 
      type: 'text' 
    }
  ]
};
