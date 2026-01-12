/**
 * レッスンコンテンツを読み込むユーティリティ
 * LessonDetail.tsxのlessonContentとhasLessonContentを再利用
 */

import { lessonContent, hasLessonContent as checkLessonContent } from "@/pages/LessonDetail";

/**
 * レッスンIDからレッスンコンテンツ（Markdown）を取得
 * @param lessonId レッスンID（例: "ai-basics-1"）
 * @returns Markdownコンテンツ、存在しない場合はnull
 */
export function getLessonContent(lessonId: string): string | null {
  if (checkLessonContent(lessonId)) {
    return lessonContent[lessonId] || null;
  }
  return null;
}

/**
 * レッスンコンテンツが存在するかチェック
 * @param lessonId レッスンID
 * @returns コンテンツが存在するかどうか
 */
export function hasLessonContent(lessonId: string): boolean {
  return checkLessonContent(lessonId);
}
