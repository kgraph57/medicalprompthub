/**
 * ゲーミフィケーション機能用のカスタムフック
 */

import { useEffect } from "react";
// import { trpc } from "@/lib/trpc";

/**
 * ゲーミフィケーション統計を取得
 * 注意: tRPCクライアントが設定されたら実装
 */
export function useGamification() {
  // TODO: tRPCクライアントが設定されたら実装
  // const { data: stats, isLoading } = trpc.gamification.getStats.useQuery();
  // const addXPMutation = trpc.gamification.addXP.useMutation();
  // const updateStreakMutation = trpc.gamification.updateStreak.useMutation();

  // 暫定的な実装（モックデータ）
  const stats = {
    totalXP: 0,
    currentLevel: 1,
    currentStreak: 0,
    longestStreak: 0,
    totalLessonsCompleted: 0,
    totalQuizzesPassed: 0,
  };

  const addXP = async (xp: number, reason?: string) => {
    // TODO: 実装
    console.log("Add XP:", xp, reason);
  };

  const updateStreak = async () => {
    // TODO: 実装
    console.log("Update streak");
  };

  return {
    stats,
    isLoading: false,
    addXP,
    updateStreak,
  };
}
