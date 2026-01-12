/**
 * コースデータをCursor Learn形式に変換するユーティリティ
 */

import { courses } from "@/pages/Courses";
import { getLessonsForCourse } from "@/pages/CourseDetail";

export interface LearnTopic {
  id: string;
  title: string;
  description: string;
  courseId: string;
  lessons?: Array<{
    id: string;
    title: string;
    description: string;
    duration: number;
    slides: number;
  }>;
  comingSoon?: boolean;
  // コースのメタデータ
  level?: number;
  xpReward?: number;
  badge?: string;
  category?: string;
}

export interface LearnSection {
  id: string;
  title: string;
  topics: LearnTopic[];
}

/**
 * コースをセクションに分類してCursor Learn形式に変換
 */
export function organizeCoursesIntoSections(): LearnSection[] {
  const sections: LearnSection[] = [
    {
      id: "ai-basics",
      title: "AI基礎",
      topics: []
    },
    {
      id: "medical-ai-basics",
      title: "医療AI基礎",
      topics: []
    },
    {
      id: "practice-tools",
      title: "実践ツール",
      topics: []
    },
    {
      id: "coming-soon",
      title: "近日公開",
      topics: []
    }
  ];

  // コースをセクションに分類
  courses.forEach(course => {
    // レッスンデータを取得
    const lessons = getLessonsForCourse(course.id);
    
    const topic: LearnTopic = {
      id: course.id,
      title: course.title,
      description: course.description,
      courseId: course.id,
      lessons: lessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        duration: lesson.duration,
        slides: lesson.slides
      })),
      comingSoon: course.locked,
      level: course.level,
      xpReward: course.xpReward,
      badge: course.badge,
      category: course.category
    };

    // カテゴリに基づいてセクションに追加
    if (course.locked) {
      // ロックされているコースは「近日公開」セクションに
      sections[3].topics.push(topic);
    } else if (
      course.category === "AI基礎" || 
      course.category === "生成AI基礎" ||
      course.category === "機械学習" ||
      course.category === "AI基礎"
    ) {
      // AI基礎セクション
      sections[0].topics.push(topic);
    } else if (
      course.category.includes("医療") || 
      course.category === "診断支援" ||
      course.category === "データサイエンス"
    ) {
      // 医療AI基礎セクション
      sections[1].topics.push(topic);
    } else if (
      course.category === "AIチャットツール" || 
      course.category === "医療特化ツール" ||
      course.category === "API・MCP"
    ) {
      // 実践ツールセクション
      sections[2].topics.push(topic);
    } else {
      // その他はAI基礎セクションにデフォルトで追加
      sections[0].topics.push(topic);
    }
  });

  // 空のセクションを除外
  return sections.filter(section => section.topics.length > 0);
}

/**
 * コースIDからトピックを取得
 */
export function getTopicByCourseId(courseId: string): LearnTopic | null {
  const sections = organizeCoursesIntoSections();
  
  for (const section of sections) {
    const topic = section.topics.find(t => t.id === courseId);
    if (topic) {
      return topic;
    }
  }
  
  return null;
}

/**
 * セクションIDからセクションを取得
 */
export function getSectionById(sectionId: string): LearnSection | null {
  const sections = organizeCoursesIntoSections();
  return sections.find(s => s.id === sectionId) || null;
}
