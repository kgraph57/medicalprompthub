/**
 * おすすめプロンプトの定義
 * ホームページで表示する人気・おすすめプロンプトを管理
 */

import { Prompt } from "./prompts";

// おすすめプロンプトIDリスト（人気・よく使われるもの）
export const recommendedPromptIds = [
  "diagnosis-differential", // 鑑別診断ジェネレーター
  "treatment-evidence-based", // エビデンスに基づく治療計画
  "documentation-referral", // 紹介状作成
  "documentation-discharge-summary", // 退院サマリー
  "communication-bad-news", // 悪い知らせの伝え方（SPIKES）
  "research-case-report", // 症例報告作成
  "medication-dose-adjustment", // 腎機能調整
  "literature-summary", // 論文要約
];

// カテゴリ別おすすめプロンプト（各カテゴリから2-3個選出）
export const categoryRecommendedPrompts: Record<string, string[]> = {
  diagnosis: [
    "diagnosis-differential",
    "diagnosis-symptom-analysis",
    "diagnosis-lab-interpretation",
  ],
  treatment: [
    "treatment-evidence-based",
    "treatment-options",
  ],
  documentation: [
    "documentation-referral",
    "documentation-discharge-summary",
    "documentation-incident-report",
  ],
  communication: [
    "communication-bad-news",
    "communication-explanation",
  ],
  research: [
    "research-case-report",
    "research-statistical-analysis",
  ],
};

/**
 * プロンプトリストからおすすめプロンプトを取得
 */
export function getRecommendedPrompts(allPrompts: Prompt[]): Prompt[] {
  return allPrompts.filter((p) => recommendedPromptIds.includes(p.id));
}

/**
 * カテゴリ別のおすすめプロンプトを取得
 */
export function getCategoryRecommendedPrompts(
  allPrompts: Prompt[],
  category: string
): Prompt[] {
  const recommendedIds = categoryRecommendedPrompts[category] || [];
  return allPrompts.filter((p) => recommendedIds.includes(p.id));
}

/**
 * 新着プロンプトを取得（最新のN件）
 */
export function getNewPrompts(allPrompts: Prompt[], limit: number = 6): Prompt[] {
  // プロンプトに順序がないため、ランダムまたは先頭から取得
  // 実際の実装では、作成日時などに基づいてソート
  return allPrompts.slice(0, limit);
}
