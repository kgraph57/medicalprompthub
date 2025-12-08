/**
 * ゲーミフィケーション機能のロジック
 * XP、レベル、ストリークの計算
 */

/**
 * レベル計算
 * XPに基づいて現在のレベルを計算
 */
export function calculateLevel(totalXP: number): number {
  if (totalXP < 100) return 1;
  if (totalXP < 300) return 2;
  if (totalXP < 600) return 3;
  if (totalXP < 1000) return 4;
  return 5;
}

/**
 * 次のレベルまでのXPを計算
 */
export function getXPForNextLevel(currentLevel: number): number {
  const levelThresholds: Record<number, number> = {
    1: 100,
    2: 300,
    3: 600,
    4: 1000,
    5: Infinity,
  };
  return levelThresholds[currentLevel] || Infinity;
}

/**
 * 現在のレベルでのXP進捗を計算
 */
export function getXPProgress(totalXP: number): {
  currentLevel: number;
  currentLevelXP: number;
  nextLevelXP: number;
  progress: number; // 0-1
} {
  const currentLevel = calculateLevel(totalXP);
  const nextLevelXP = getXPForNextLevel(currentLevel);
  const previousLevelXP = currentLevel === 1 ? 0 : getXPForNextLevel(currentLevel - 1);
  const currentLevelXP = totalXP - previousLevelXP;
  const levelRange = nextLevelXP - previousLevelXP;
  const progress = levelRange === Infinity ? 1 : currentLevelXP / levelRange;

  return {
    currentLevel,
    currentLevelXP,
    nextLevelXP,
    progress: Math.min(1, Math.max(0, progress)),
  };
}

/**
 * ストリーク更新
 * 最後の学習日を確認してストリークを更新
 */
export function updateStreak(
  currentStreak: number,
  lastStudyDate: Date | null,
  today: Date = new Date()
): {
  newStreak: number;
  longestStreak: number;
  updated: boolean;
} {
  const todayStr = today.toISOString().split("T")[0];
  const lastStudyStr = lastStudyDate ? lastStudyDate.toISOString().split("T")[0] : null;

  // 今日既に学習している場合
  if (lastStudyStr === todayStr) {
    return {
      newStreak: currentStreak,
      longestStreak: currentStreak,
      updated: false,
    };
  }

  // 昨日学習していた場合（ストリーク継続）
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (lastStudyStr === yesterdayStr) {
    const newStreak = currentStreak + 1;
    return {
      newStreak,
      longestStreak: newStreak,
      updated: true,
    };
  }

  // ストリークが切れた場合
  if (lastStudyStr && lastStudyStr < yesterdayStr) {
    return {
      newStreak: 1, // 今日から新しいストリーク
      longestStreak: currentStreak, // 過去の最長ストリークは保持
      updated: true,
    };
  }

  // 初めての学習
  return {
    newStreak: 1,
    longestStreak: 1,
    updated: true,
  };
}

/**
 * XP獲得アクションの定義
 */
export const XP_ACTIONS = {
  LESSON_COMPLETE: 10,
  QUIZ_CORRECT: 5,
  PROMPT_USE: 2,
  DAILY_GOAL_COMPLETE: 5,
  STREAK_7_DAYS: 20,
  STREAK_30_DAYS: 50,
} as const;

/**
 * バッジIDの定義
 */
export const BADGE_IDS = {
  FIRST_LESSON: "first_lesson",
  STREAK_7: "streak_7",
  STREAK_30: "streak_30",
  COURSE_COMPLETE: "course_complete",
  ALL_LESSONS: "all_lessons",
  PROMPT_MASTER: "prompt_master",
  LEVEL_5: "level_5",
} as const;

/**
 * バッジの定義
 */
export const BADGES = [
  {
    id: BADGE_IDS.FIRST_LESSON,
    name: "初めてのレッスン",
    description: "最初のレッスンを完了しました",
    icon: "🎉",
    category: "beginner",
  },
  {
    id: BADGE_IDS.STREAK_7,
    name: "7日連続学習",
    description: "7日間連続で学習を続けました",
    icon: "🔥",
    category: "streak",
  },
  {
    id: BADGE_IDS.STREAK_30,
    name: "30日連続学習",
    description: "30日間連続で学習を続けました",
    icon: "💪",
    category: "streak",
  },
  {
    id: BADGE_IDS.COURSE_COMPLETE,
    name: "コース完了",
    description: "1つのコースを完了しました",
    icon: "📚",
    category: "achievement",
  },
  {
    id: BADGE_IDS.ALL_LESSONS,
    name: "全レッスン完了",
    description: "すべてのレッスンを完了しました",
    icon: "⭐",
    category: "achievement",
  },
  {
    id: BADGE_IDS.PROMPT_MASTER,
    name: "プロンプトマスター",
    description: "100回以上プロンプトを使用しました",
    icon: "💡",
    category: "usage",
  },
  {
    id: BADGE_IDS.LEVEL_5,
    name: "エキスパート",
    description: "レベル5に到達しました",
    icon: "🏆",
    category: "level",
  },
] as const;
