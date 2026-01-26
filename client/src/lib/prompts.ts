export type PromptCategory = 'diagnosis' | 'treatment' | 'documentation' | 'medication' | 'communication' | 'literature' | 'research' | 'case-analysis' | 'education' | 'administrative' | 'shared-decision-making';

// シンプル化されたカテゴリ（UI表示用）
export type SimpleCategory = 'diagnosis' | 'treatment' | 'research' | 'documentation' | 'education';

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
  riskLevel?: 'high' | 'medium' | 'low';
  warningMessage?: string;
  tags?: string[];
}

// レガシーカテゴリから新カテゴリへのマッピング
export const categoryMapping: Record<PromptCategory, SimpleCategory> = {
  'diagnosis': 'diagnosis',
  'case-analysis': 'diagnosis',
  'treatment': 'treatment',
  'medication': 'treatment',
  'shared-decision-making': 'treatment',
  'research': 'research',
  'literature': 'research',
  'documentation': 'documentation',
  'communication': 'documentation',
  'administrative': 'documentation',
  'education': 'education',
};

// シンプル化されたカテゴリ定義（UI表示用）
export const simpleCategories: { id: SimpleCategory; label: string; description: string; icon: string }[] = [
  { id: 'diagnosis', label: '診断', description: '鑑別診断・症例分析', icon: '🔍' },
  { id: 'treatment', label: '治療', description: '治療計画・薬剤・意思決定', icon: '💊' },
  { id: 'research', label: '研究', description: '論文・文献・学会発表', icon: '📚' },
  { id: 'documentation', label: '文書', description: '書類作成・患者対応・管理', icon: '📝' },
  { id: 'education', label: '教育', description: '学習・OSCE・国試対策', icon: '🎓' },
];

// プロンプトのシンプルカテゴリを取得
export function getSimpleCategory(prompt: Prompt): SimpleCategory {
  return categoryMapping[prompt.category];
}

// レガシーカテゴリ（後方互換性のため維持）
export const categories: { id: PromptCategory; label: string; description: string }[] = [
  { id: 'diagnosis', label: '診断支援', description: '症状や検査結果からの鑑別診断・分析' },
  { id: 'treatment', label: '治療計画', description: 'エビデンスに基づいた治療方針の立案' },
  { id: 'documentation', label: '書類作成', description: '紹介状・サマリー・診断書の作成支援' },
  { id: 'medication', label: '薬剤・処方', description: '投与量調整・相互作用チェック' },
  { id: 'communication', label: '患者対話', description: '患者説明・教育・同意取得の支援' },
  { id: 'shared-decision-making', label: '共同意思決定', description: '患者の価値観を尊重した治療選択の支援' },
  { id: 'literature', label: '医学文献', description: '論文要約・エビデンス評価' },
  { id: 'research', label: '研究・学会', description: '論文校正・抄録作成・統計解釈' },
  { id: 'case-analysis', label: '症例分析', description: '症例報告・カンファレンス資料作成' },
  { id: 'education', label: '教育・学習', description: '解剖生理・OSCE・国試対策' },
  { id: 'administrative', label: '管理・運営', description: 'インシデントレポート・議事録' },
];

export const prompts: Prompt[] = []; // prompts-full.ts will populate this
