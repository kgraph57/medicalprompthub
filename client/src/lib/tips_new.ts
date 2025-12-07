// Prompt Engineering Tips - 41 techniques
// Last updated: 2025-12-07 05:00 JST

export interface PromptTip {
  id: string;
  title: string;
  category: 'basic' | 'quality' | 'advanced' | 'medical' | 'interactive';
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  why: string;
  when: string[];
  template: string;
  example: string;
  applications: string[];
  relatedTips: string[];
  tags: string[];
}

export const tips: PromptTip[] = [
  {
    id: "depth-method",
    title: "DEPTH Method: 包括的プロンプト構造",
    category: "quality",
    level: "intermediate",
    description: "Direction（方向性）、Examples（例示）、Persona（役割）、Tone（トーン）、High-level goal（高次目標）の5要素を体系的に組み込むプロンプト設計フレームワークです。",
    why: "プロンプトの各要素を明示的に定義することで、AIの出力品質と一貫性が向上します。特に複雑なタスクや専門的な内容を扱う際に有効です。",
    when: [
      "複雑な医療文書を作成する場合",
      "一貫した品質の出力が必要な場合",
      "チーム内でプロンプトを標準化したい場合"
    ],
    template: `【Direction（方向性）】\n[具体的な指示内容]\n\n【Examples（例示）】\n[期待する出力の例]\n\n【Persona（役割）】\nあなたは[専門家の役割]です。\n\n【Tone（トーン）】\n[文体・口調の指定]\n\n【High-level goal（高次目標）】\n[最終的な目的]`,
    example: `【Direction】\n糖尿病患者向けの食事指導資料を作成してください。\n\n【Examples】\n- 1日の推奨カロリー摂取量\n- 避けるべき食品リスト\n- 推奨される食事パターン\n\n【Persona】\nあなたは10年以上の経験を持つ管理栄養士です。\n\n【Tone】\n患者に寄り添う、わかりやすく親しみやすい表現で。\n\n【High-level goal】\n患者が自宅で実践できる具体的な食事管理方法を提供する。`,
    applications: [
      "診療ガイドライン作成",
      "患者教育資料の作成",
      "医療スタッフ向けマニュアル作成"
    ],
    relatedTips: ["role-based-prompting", "few-shot-prompting"],
    tags: ["構造化", "品質向上", "標準化"]
  },
  {
    id: "chain-of-thought",
    title: "Chain-of-Thought (CoT): 思考の連鎖",
    category: "advanced",
    level: "intermediate",
    description: "AIに段階的な推論プロセスを明示的に示させることで、複雑な問題解決能力を向上させる手法です。",
    why: "複雑な医学的判断や診断プロセスでは、中間ステップを明示することで、推論の透明性が高まり、エラーを発見しやすくなります。",
    when: [
      "鑑別診断を行う場合",
      "治療方針を決定する場合",
      "複雑な症例を分析する場合"
    ],
    template: `[問題文]\n\nステップバイステップで考えてください：\n1. まず、[最初のステップ]\n2. 次に、[次のステップ]\n3. そして、[最終ステップ]\n\n最終的な結論：`,
    example: `患者：65歳男性、急性胸痛で来院。\nバイタル：BP 150/90, HR 110, SpO2 98%\n\nステップバイステップで鑑別診断を考えてください：\n1. まず、緊急性の高い疾患（急性冠症候群、大動脈解離、肺塞栓症）を除外\n2. 次に、症状の特徴から最も可能性の高い疾患を特定\n3. そして、必要な検査を優先順位付け\n\n最終的な診断と初期対応：`,
    applications: [
      "鑑別診断支援",
      "治療方針決定",
      "症例検討会の準備"
    ],
    relatedTips: ["zero-shot-cot", "tree-of-thoughts"],
    tags: ["推論", "診断支援", "透明性"]
  },
  {
    id: "zero-shot-cot",
    title: "Zero-Shot CoT: 例示なし思考連鎖",
    category: "basic",
    level: "beginner",
    description: "「ステップバイステップで考えてください」という簡単な指示を追加するだけで、AIの推論能力を向上させる手法です。",
    why: "具体的な例を用意しなくても、AIに段階的な思考を促すことができます。医療現場で迅速に使える実用的な手法です。",
    when: [
      "素早く推論が必要な場合",
      "例を準備する時間がない場合",
      "初めて扱う問題の場合"
    ],
    template: `[問題文]\n\nステップバイステップで考えてください。`,
    example: `患者の症状から最も可能性の高い診断を考えてください。\n症状：発熱、咳嗽、呼吸困難\n\nステップバイステップで考えてください。`,
    applications: [
      "迅速な診断支援",
      "緊急時の判断支援",
      "日常診療での活用"
    ],
    relatedTips: ["chain-of-thought", "few-shot-prompting"],
    tags: ["簡単", "実用的", "推論"]
  }
];
