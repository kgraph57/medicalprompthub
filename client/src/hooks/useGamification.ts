/**
 * ゲーミフィケーション機能用のカスタムフック
 */

import { useEffect, useState } from "react";
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

  // ローカルストレージから統計を読み込む
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("gamification-stats");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load stats from localStorage", e);
      }
    }
    return {
      totalXP: 0,
      currentLevel: 1,
      currentStreak: 0,
      longestStreak: 0,
      totalLessonsCompleted: 0,
      totalQuizzesPassed: 0,
    };
  });

  // レベル計算関数
  const calculateLevel = (totalXP: number): number => {
    if (totalXP < 100) return 1;
    if (totalXP < 300) return 2;
    if (totalXP < 600) return 3;
    if (totalXP < 1000) return 4;
    return 5;
  };

  const addXP = async (xp: number, reason?: string) => {
    // ローカルストレージに保存（暫定実装）
    const currentXP = stats.totalXP || 0;
    const newXP = currentXP + xp;
    
    // 統計を更新
    const updatedStats = {
      ...stats,
      totalXP: newXP,
      currentLevel: calculateLevel(newXP),
    };
    
    setStats(updatedStats);
    
    // ローカルストレージに保存
    localStorage.setItem("gamification-stats", JSON.stringify(updatedStats));
    
    console.log("Add XP:", xp, reason, "Total:", newXP);
    
    // TODO: バックエンドAPIに送信（tRPC実装後）
  };

  const updateStreak = async () => {
    // TODO: 実装（ストリーク機能は削除済み）
    console.log("Update streak (not implemented)");
  };

  return {
    stats,
    isLoading: false,
    addXP,
    updateStreak,
  };
}
