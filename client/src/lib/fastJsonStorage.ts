/**
 * fast-json-stringifyを使用したlocalStorage操作の最適化
 * よく使われるデータ構造に対して高速シリアライゼーションを提供
 */

import fastJsonStringify from "fast-json-stringify";

// よく使われるデータ構造のスキーマ定義

// お気に入りリストのスキーマ
const favoritesSchema = fastJsonStringify({
  type: "array",
  items: { type: "string" },
});

// レッスン進捗のスキーマ
const lessonProgressSchema = fastJsonStringify({
  type: "object",
  properties: {
    completed: { type: "boolean" },
    completedAt: { type: "string", format: "date-time" },
  },
  required: ["completed", "completedAt"],
});

// コース進捗のスキーマ
const courseProgressSchema = fastJsonStringify({
  type: "object",
  properties: {
    completedLessons: {
      type: "array",
      items: { type: "string" },
    },
    lastUpdated: { type: "string", format: "date-time" },
  },
  required: ["completedLessons"],
});

// コース完了のスキーマ
const courseCompletedSchema = fastJsonStringify({
  type: "object",
  properties: {
    completed: { type: "boolean" },
    completedDate: { type: "string" },
    completedAt: { type: "string", format: "date-time" },
  },
  required: ["completed", "completedDate", "completedAt"],
});

// ゲーミフィケーション統計のスキーマ
const gamificationStatsSchema = fastJsonStringify({
  type: "object",
  properties: {
    totalXP: { type: "number" },
    currentLevel: { type: "number" },
    currentStreak: { type: "number" },
    longestStreak: { type: "number" },
    totalLessonsCompleted: { type: "number" },
    totalQuizzesPassed: { type: "number" },
    lastStudyDate: { type: "string", format: "date-time" },
  },
  required: ["totalXP", "currentLevel", "currentStreak", "longestStreak"],
});

/**
 * fast-json-stringifyを使用したlocalStorage操作ヘルパー
 */
export const fastStorage = {
  /**
   * お気に入りリストを保存
   */
  setFavorites: (favorites: string[]): void => {
    try {
      localStorage.setItem("favorites", favoritesSchema(favorites));
    } catch (e) {
      console.error("Failed to save favorites with fast-json-stringify", e);
      // フォールバック
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  },

  /**
   * お気に入りリストを取得
   */
  getFavorites: (): string[] => {
    const saved = localStorage.getItem("favorites");
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse favorites from localStorage", e);
      return [];
    }
  },

  /**
   * レッスン進捗を保存
   */
  setLessonProgress: (
    lessonId: string | number,
    progress: { completed: boolean; completedAt: string }
  ): void => {
    const key = `lesson-progress-${lessonId}`;
    try {
      localStorage.setItem(key, lessonProgressSchema(progress));
    } catch (e) {
      console.error(
        `Failed to save lesson progress with fast-json-stringify for ${lessonId}`,
        e
      );
      // フォールバック
      localStorage.setItem(key, JSON.stringify(progress));
    }
  },

  /**
   * レッスン進捗を取得
   */
  getLessonProgress: (
    lessonId: string | number
  ): { completed: boolean; completedAt: string } | null => {
    const key = `lesson-progress-${lessonId}`;
    const saved = localStorage.getItem(key);
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(
        `Failed to parse lesson progress from localStorage for ${lessonId}`,
        e
      );
      return null;
    }
  },

  /**
   * コース進捗を保存
   */
  setCourseProgress: (
    courseId: string | number,
    progress: {
      completedLessons: string[];
      lastUpdated?: string;
    }
  ): void => {
    const key = `course-progress-${courseId}`;
    try {
      localStorage.setItem(key, courseProgressSchema(progress));
    } catch (e) {
      console.error(
        `Failed to save course progress with fast-json-stringify for ${courseId}`,
        e
      );
      // フォールバック
      localStorage.setItem(key, JSON.stringify(progress));
    }
  },

  /**
   * コース進捗を取得
   */
  getCourseProgress: (
    courseId: string | number
  ): { completedLessons: string[]; lastUpdated?: string } | null => {
    const key = `course-progress-${courseId}`;
    const saved = localStorage.getItem(key);
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(
        `Failed to parse course progress from localStorage for ${courseId}`,
        e
      );
      return null;
    }
  },

  /**
   * コース完了を保存
   */
  setCourseCompleted: (
    courseId: string | number,
    data: {
      completed: boolean;
      completedDate: string;
      completedAt: string;
    }
  ): void => {
    const key = `course-completed-${courseId}`;
    try {
      localStorage.setItem(key, courseCompletedSchema(data));
    } catch (e) {
      console.error(
        `Failed to save course completion with fast-json-stringify for ${courseId}`,
        e
      );
      // フォールバック
      localStorage.setItem(key, JSON.stringify(data));
    }
  },

  /**
   * ゲーミフィケーション統計を保存
   */
  setGamificationStats: (stats: {
    totalXP: number;
    currentLevel: number;
    currentStreak: number;
    longestStreak: number;
    totalLessonsCompleted: number;
    totalQuizzesPassed: number;
    lastStudyDate?: string;
  }): void => {
    try {
      localStorage.setItem("gamification-stats", gamificationStatsSchema(stats));
    } catch (e) {
      console.error(
        "Failed to save gamification stats with fast-json-stringify",
        e
      );
      // フォールバック
      localStorage.setItem("gamification-stats", JSON.stringify(stats));
    }
  },
};
