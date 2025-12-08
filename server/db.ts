import { eq, desc, and, or, like, sql, ne, inArray, notInArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, prompts, categories, likes, bookmarks, InsertPrompt, InsertCategory, InsertLike, InsertBookmark, courses, lessons, slides, userProgress, InsertCourse, InsertLesson, InsertSlide, InsertUserProgress, tags, promptTags, InsertTag, InsertPromptTag, comments, InsertComment } from "../drizzle/schema";
import { ENV } from './_core/env';
import { logger } from './_core/logger';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
      logger.info("Database connection established", {
        hasConnection: !!_db,
      });
    } catch (error) {
      const dbError = error instanceof Error ? error : new Error(String(error));
      logger.error("Database connection failed", dbError, {
        errorType: dbError.name,
        errorMessage: dbError.message,
      });
      _db = null;
      // 接続エラーを再スローしない（アプリケーションはデータベースなしでも動作可能）
    }
  } else if (!process.env.DATABASE_URL) {
    logger.debug("Database URL not configured, running without database");
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    logger.warn("Cannot upsert user: database not available", { openId: user.openId });
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
    logger.debug("User upserted successfully", { openId: user.openId, role: values.role });
  } catch (error) {
    logger.error("Failed to upsert user", error instanceof Error ? error : new Error(String(error)), { openId: user.openId });
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    logger.warn("Cannot get user: database not available", { openId });
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Category queries
export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(categories).orderBy(categories.name);
}

export async function getCategoryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCategory(category: InsertCategory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(categories).values(category);
  return result;
}

// Prompt queries
export async function getAllPrompts(
  limit = 50, 
  offset = 0, 
  categorySlug?: string, 
  scene?: string,
  sortBy: 'newest' | 'popular' | 'likes' | 'bookmarks' = 'newest',
  tagSlug?: string
) {
  const db = await getDb();
  if (!db) return [];
  
  let query = db
    .select({
      id: prompts.id,
      title: prompts.title,
      promptText: prompts.promptText,
      examplePromptText: prompts.examplePromptText,
      responseText: prompts.responseText,
      exampleResponseText: prompts.exampleResponseText,
      useScene: prompts.useScene,
      scene: prompts.scene,
      categoryId: prompts.categoryId,
      authorId: prompts.authorId,
      likesCount: prompts.likesCount,
      bookmarksCount: prompts.bookmarksCount,
      viewsCount: prompts.viewsCount,
      copyCount: prompts.copyCount,
      createdAt: prompts.createdAt,
      updatedAt: prompts.updatedAt,
      categoryName: categories.name,
      authorName: users.name,
    })
    .from(prompts)
    .leftJoin(categories, eq(prompts.categoryId, categories.id))
    .leftJoin(users, eq(prompts.authorId, users.id));

  // Apply tag filter if specified
  if (tagSlug) {
    const tag = await getTagBySlug(tagSlug);
    if (tag) {
      query = query
        .innerJoin(promptTags, eq(prompts.id, promptTags.promptId))
        .where(eq(promptTags.tagId, tag.id)) as any;
    }
  }

  // Apply filters
  const conditions: any[] = [];
  if (categorySlug) {
    conditions.push(eq(categories.slug, categorySlug));
  }
  if (scene) {
    conditions.push(sql`${prompts.scene} = ${scene}`);
  }
  if (conditions.length > 0) {
    if (tagSlug) {
      // If tag filter is already applied, add more conditions
      const existingWhere = (query as any)._where;
      query = query.where(and(existingWhere, ...conditions)) as any;
    } else {
      query = query.where(and(...conditions)) as any;
    }
  }

  // Apply sorting
  switch (sortBy) {
    case 'popular':
      query = query.orderBy(desc(prompts.viewsCount)) as any;
      break;
    case 'likes':
      query = query.orderBy(desc(prompts.likesCount)) as any;
      break;
    case 'bookmarks':
      query = query.orderBy(desc(prompts.bookmarksCount)) as any;
      break;
    case 'newest':
    default:
      query = query.orderBy(desc(prompts.createdAt)) as any;
      break;
  }

  return await query.limit(limit).offset(offset);
}

export async function getPromptsByCategory(categoryId: number, limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select({
      id: prompts.id,
      title: prompts.title,
      promptText: prompts.promptText,
      examplePromptText: prompts.examplePromptText,
      responseText: prompts.responseText,
      exampleResponseText: prompts.exampleResponseText,
      useScene: prompts.useScene,
      categoryId: prompts.categoryId,
      authorId: prompts.authorId,
      likesCount: prompts.likesCount,
      bookmarksCount: prompts.bookmarksCount,
      viewsCount: prompts.viewsCount,
      copyCount: prompts.copyCount,
      createdAt: prompts.createdAt,
      updatedAt: prompts.updatedAt,
      categoryName: categories.name,
      authorName: users.name,
    })
    .from(prompts)
    .leftJoin(categories, eq(prompts.categoryId, categories.id))
    .leftJoin(users, eq(prompts.authorId, users.id))
    .where(eq(prompts.categoryId, categoryId))
    .orderBy(desc(prompts.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getTopPrompts(limit = 20) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select({
      id: prompts.id,
      title: prompts.title,
      promptText: prompts.promptText,
      examplePromptText: prompts.examplePromptText,
      responseText: prompts.responseText,
      exampleResponseText: prompts.exampleResponseText,
      useScene: prompts.useScene,
      categoryId: prompts.categoryId,
      authorId: prompts.authorId,
      likesCount: prompts.likesCount,
      bookmarksCount: prompts.bookmarksCount,
      viewsCount: prompts.viewsCount,
      copyCount: prompts.copyCount,
      createdAt: prompts.createdAt,
      updatedAt: prompts.updatedAt,
      categoryName: categories.name,
      authorName: users.name,
    })
    .from(prompts)
    .leftJoin(categories, eq(prompts.categoryId, categories.id))
    .leftJoin(users, eq(prompts.authorId, users.id))
    .orderBy(desc(prompts.likesCount))
    .limit(limit);
}

export async function getPromptById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select({
      id: prompts.id,
      title: prompts.title,
      promptText: prompts.promptText,
      examplePromptText: prompts.examplePromptText,
      responseText: prompts.responseText,
      exampleResponseText: prompts.exampleResponseText,
      usageDescription: prompts.usageDescription,
      useScene: prompts.useScene,
      categoryId: prompts.categoryId,
      authorId: prompts.authorId,
      likesCount: prompts.likesCount,
      bookmarksCount: prompts.bookmarksCount,
      viewsCount: prompts.viewsCount,
      copyCount: prompts.copyCount,
      createdAt: prompts.createdAt,
      updatedAt: prompts.updatedAt,
      categoryName: categories.name,
      authorName: users.name,
    })
    .from(prompts)
    .leftJoin(categories, eq(prompts.categoryId, categories.id))
    .leftJoin(users, eq(prompts.authorId, users.id))
    .where(eq(prompts.id, id))
    .limit(1);
  
  if (result.length === 0) return undefined;
  
  // Get tags for this prompt
  const promptTagsResult = await db
    .select({
      tagId: tags.id,
      tagName: tags.name,
      tagSlug: tags.slug,
    })
    .from(promptTags)
    .leftJoin(tags, eq(promptTags.tagId, tags.id))
    .where(eq(promptTags.promptId, id));
  
  return {
    ...result[0],
    tags: promptTagsResult,
  };
}

export async function createPrompt(prompt: InsertPrompt) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(prompts).values(prompt);
  return { insertId: result[0].insertId };
}

export async function updatePrompt(id: number, updates: Partial<InsertPrompt>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(prompts).set(updates).where(eq(prompts.id, id));
}

export async function deletePrompt(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(prompts).where(eq(prompts.id, id));
}

export async function incrementPromptViews(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(prompts).set({ viewsCount: sql`${prompts.viewsCount} + 1` }).where(eq(prompts.id, id));
}

export async function incrementPromptCopy(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(prompts).set({ copyCount: sql`${prompts.copyCount} + 1` }).where(eq(prompts.id, id));
}

// Like queries
export async function getUserLike(userId: number, promptId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(likes)
    .where(and(eq(likes.userId, userId), eq(likes.promptId, promptId)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createLike(like: InsertLike) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(likes).values(like);
  await db.update(prompts).set({ likesCount: sql`${prompts.likesCount} + 1` }).where(eq(prompts.id, like.promptId));
}

export async function deleteLike(userId: number, promptId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(likes).where(and(eq(likes.userId, userId), eq(likes.promptId, promptId)));
  await db.update(prompts).set({ likesCount: sql`${prompts.likesCount} - 1` }).where(eq(prompts.id, promptId));
}

// Bookmark queries
export async function getUserBookmark(userId: number, promptId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.promptId, promptId)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBookmark(bookmark: InsertBookmark) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(bookmarks).values(bookmark);
  await db.update(prompts).set({ bookmarksCount: sql`${prompts.bookmarksCount} + 1` }).where(eq(prompts.id, bookmark.promptId));
}

export async function deleteBookmark(userId: number, promptId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(bookmarks).where(and(eq(bookmarks.userId, userId), eq(bookmarks.promptId, promptId)));
  await db.update(prompts).set({ bookmarksCount: sql`${prompts.bookmarksCount} - 1` }).where(eq(prompts.id, promptId));
}

export async function getUserBookmarks(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select({
      id: prompts.id,
      title: prompts.title,
      promptText: prompts.promptText,
      examplePromptText: prompts.examplePromptText,
      responseText: prompts.responseText,
      exampleResponseText: prompts.exampleResponseText,
      useScene: prompts.useScene,
      categoryId: prompts.categoryId,
      authorId: prompts.authorId,
      likesCount: prompts.likesCount,
      bookmarksCount: prompts.bookmarksCount,
      viewsCount: prompts.viewsCount,
      copyCount: prompts.copyCount,
      createdAt: prompts.createdAt,
      updatedAt: prompts.updatedAt,
      categoryName: categories.name,
      authorName: users.name,
    })
    .from(bookmarks)
    .innerJoin(prompts, eq(bookmarks.promptId, prompts.id))
    .leftJoin(categories, eq(prompts.categoryId, categories.id))
    .leftJoin(users, eq(prompts.authorId, users.id))
    .where(eq(bookmarks.userId, userId))
    .orderBy(desc(bookmarks.createdAt));
}

export async function getUserPrompts(userId: number, limit: number = 50, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select({
      id: prompts.id,
      title: prompts.title,
      promptText: prompts.promptText,
      examplePromptText: prompts.examplePromptText,
      responseText: prompts.responseText,
      exampleResponseText: prompts.exampleResponseText,
      useScene: prompts.useScene,
      categoryId: prompts.categoryId,
      categorySlug: categories.slug,
      authorId: prompts.authorId,
      likesCount: prompts.likesCount,
      bookmarksCount: prompts.bookmarksCount,
      viewsCount: prompts.viewsCount,
      copyCount: prompts.copyCount,
      createdAt: prompts.createdAt,
      updatedAt: prompts.updatedAt,
      categoryName: categories.name,
      authorName: users.name,
    })
    .from(prompts)
    .leftJoin(categories, eq(prompts.categoryId, categories.id))
    .leftJoin(users, eq(prompts.authorId, users.id))
    .where(eq(prompts.authorId, userId))
    .orderBy(desc(prompts.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function searchPrompts(searchTerm: string, limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  
  const searchPattern = `%${searchTerm}%`;
  
  return await db
    .select({
      id: prompts.id,
      title: prompts.title,
      promptText: prompts.promptText,
      examplePromptText: prompts.examplePromptText,
      responseText: prompts.responseText,
      exampleResponseText: prompts.exampleResponseText,
      useScene: prompts.useScene,
      categoryId: prompts.categoryId,
      authorId: prompts.authorId,
      likesCount: prompts.likesCount,
      bookmarksCount: prompts.bookmarksCount,
      viewsCount: prompts.viewsCount,
      copyCount: prompts.copyCount,
      createdAt: prompts.createdAt,
      updatedAt: prompts.updatedAt,
      categoryName: categories.name,
      authorName: users.name,
    })
    .from(prompts)
    .leftJoin(categories, eq(prompts.categoryId, categories.id))
    .leftJoin(users, eq(prompts.authorId, users.id))
    .where(
      sql`(
        ${prompts.title} LIKE ${searchPattern} OR
        ${prompts.promptText} LIKE ${searchPattern} OR
        ${prompts.responseText} LIKE ${searchPattern}
      )`
    )
    .orderBy(desc(prompts.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getRelatedPrompts(promptId: number, categoryId: number, limit = 6) {
  const db = await getDb();
  if (!db) return [];
  
  // Get tags of the current prompt
  const currentPromptTags = await db
    .select({ tagId: promptTags.tagId })
    .from(promptTags)
    .where(eq(promptTags.promptId, promptId));
  
  const tagIds = currentPromptTags.map(t => t.tagId);
  
  // If prompt has tags, find prompts with same tags
  if (tagIds.length > 0) {
    const relatedByTags = await db
      .select({
        id: prompts.id,
        title: prompts.title,
        promptText: prompts.promptText,
        examplePromptText: prompts.examplePromptText,
        responseText: prompts.responseText,
        exampleResponseText: prompts.exampleResponseText,
        useScene: prompts.useScene,
        categoryId: prompts.categoryId,
        authorId: prompts.authorId,
        likesCount: prompts.likesCount,
        bookmarksCount: prompts.bookmarksCount,
        viewsCount: prompts.viewsCount,
        copyCount: prompts.copyCount,
        createdAt: prompts.createdAt,
        updatedAt: prompts.updatedAt,
        categoryName: categories.name,
        authorName: users.name,
      })
      .from(prompts)
      .leftJoin(categories, eq(prompts.categoryId, categories.id))
      .leftJoin(users, eq(prompts.authorId, users.id))
      .innerJoin(promptTags, eq(prompts.id, promptTags.promptId))
      .where(and(
        inArray(promptTags.tagId, tagIds),
        ne(prompts.id, promptId)
      ))
      .orderBy(desc(prompts.likesCount))
      .limit(limit);
    
    if (relatedByTags.length >= limit) {
      return relatedByTags;
    }
    
    // If not enough, fill with same category prompts
    const relatedByCategory = await db
      .select({
        id: prompts.id,
        title: prompts.title,
        promptText: prompts.promptText,
        examplePromptText: prompts.examplePromptText,
        responseText: prompts.responseText,
        exampleResponseText: prompts.exampleResponseText,
        useScene: prompts.useScene,
        categoryId: prompts.categoryId,
        authorId: prompts.authorId,
        likesCount: prompts.likesCount,
        bookmarksCount: prompts.bookmarksCount,
        viewsCount: prompts.viewsCount,
        copyCount: prompts.copyCount,
        createdAt: prompts.createdAt,
        updatedAt: prompts.updatedAt,
        categoryName: categories.name,
        authorName: users.name,
      })
      .from(prompts)
      .leftJoin(categories, eq(prompts.categoryId, categories.id))
      .leftJoin(users, eq(prompts.authorId, users.id))
      .where(and(
        eq(prompts.categoryId, categoryId),
        ne(prompts.id, promptId),
        notInArray(prompts.id, relatedByTags.map(p => p.id))
      ))
      .orderBy(desc(prompts.likesCount))
      .limit(limit - relatedByTags.length);
    
    return [...relatedByTags, ...relatedByCategory];
  }
  
  // If no tags, return same category prompts
  return await db
    .select({
      id: prompts.id,
      title: prompts.title,
      promptText: prompts.promptText,
      examplePromptText: prompts.examplePromptText,
      responseText: prompts.responseText,
      exampleResponseText: prompts.exampleResponseText,
      useScene: prompts.useScene,
      categoryId: prompts.categoryId,
      authorId: prompts.authorId,
      likesCount: prompts.likesCount,
      bookmarksCount: prompts.bookmarksCount,
      viewsCount: prompts.viewsCount,
      copyCount: prompts.copyCount,
      createdAt: prompts.createdAt,
      updatedAt: prompts.updatedAt,
      categoryName: categories.name,
      authorName: users.name,
    })
    .from(prompts)
    .leftJoin(categories, eq(prompts.categoryId, categories.id))
    .leftJoin(users, eq(prompts.authorId, users.id))
    .where(and(
      eq(prompts.categoryId, categoryId),
      ne(prompts.id, promptId)
    ))
    .orderBy(desc(prompts.likesCount))
    .limit(limit);
}

// ========== Course Functions ==========

export async function getAllCourses() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(courses)
    .orderBy(courses.order);
}

export async function getCourseById(courseId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1);
  
  return result[0] || null;
}

export async function getLessonsByCourseId(courseId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(lessons)
    .where(eq(lessons.courseId, courseId))
    .orderBy(lessons.order);
}

export async function getLessonById(lessonId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(lessons)
    .where(eq(lessons.id, lessonId))
    .limit(1);
  
  return result[0] || null;
}

export async function getSlidesByLessonId(lessonId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(slides)
    .where(eq(slides.lessonId, lessonId))
    .orderBy(slides.order);
}

export async function getUserProgress(userId: number, lessonId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(userProgress)
    .where(and(
      eq(userProgress.userId, userId),
      eq(userProgress.lessonId, lessonId)
    ))
    .limit(1);
  
  return result[0] || null;
}

export async function upsertUserProgress(data: InsertUserProgress) {
  const db = await getDb();
  if (!db) return;
  
  const existing = await getUserProgress(data.userId, data.lessonId);
  
  if (existing) {
    await db
      .update(userProgress)
      .set({
        completed: data.completed,
        lastSlideViewed: data.lastSlideViewed,
        updatedAt: new Date(),
      })
      .where(and(
        eq(userProgress.userId, data.userId),
        eq(userProgress.lessonId, data.lessonId)
      ));
  } else {
    await db.insert(userProgress).values(data);
  }
}

export async function createCourse(data: InsertCourse) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(courses).values(data);
  return result[0];
}

export async function createLesson(data: InsertLesson) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(lessons).values(data);
  return result[0];
}

export async function createSlide(data: InsertSlide) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.insert(slides).values(data);
  return result[0];
}

export async function getCourseWithLessons(courseId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const course = await getCourseById(courseId);
  if (!course) return null;
  
  const courseLessons = await getLessonsByCourseId(courseId);
  
  return {
    ...course,
    lessons: courseLessons,
  };
}

export async function getAllCoursesWithProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const allCourses = await getAllCourses();
  
  const coursesWithProgress = await Promise.all(
    allCourses.map(async (course) => {
      const courseLessons = await getLessonsByCourseId(course.id);
      
      const lessonsWithProgress = await Promise.all(
        courseLessons.map(async (lesson) => {
          const progress = await getUserProgress(userId, lesson.id);
          return {
            ...lesson,
            completed: progress?.completed || 0,
            lastSlideViewed: progress?.lastSlideViewed || 0,
          };
        })
      );
      
      const totalLessons = lessonsWithProgress.length;
      const completedLessons = lessonsWithProgress.filter(l => l.completed === 1).length;
      const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      
      return {
        ...course,
        lessons: lessonsWithProgress,
        totalLessons,
        completedLessons,
        progressPercentage,
      };
    })
  );
  
  return coursesWithProgress;
}

// ==================== Tags ====================

export async function getAllTags() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(tags).orderBy(tags.name);
}

export async function getTagById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(tags).where(eq(tags.id, id)).limit(1);
  return result[0] || null;
}

export async function getTagBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(tags).where(eq(tags.slug, slug)).limit(1);
  return result[0] || null;
}

export async function createTag(tag: InsertTag) {
  const db = await getDb();
  if (!db) return null;
  
  return db.insert(tags).values(tag);
}

export async function getPromptTags(promptId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select({
      id: tags.id,
      name: tags.name,
      slug: tags.slug,
      description: tags.description,
    })
    .from(promptTags)
    .innerJoin(tags, eq(promptTags.tagId, tags.id))
    .where(eq(promptTags.promptId, promptId));
}

export async function addPromptTag(promptId: number, tagId: number) {
  const db = await getDb();
  if (!db) return null;
  
  return db.insert(promptTags).values({ promptId, tagId });
}

export async function removePromptTag(promptId: number, tagId: number) {
  const db = await getDb();
  if (!db) return null;
  
  return db.delete(promptTags).where(
    and(
      eq(promptTags.promptId, promptId),
      eq(promptTags.tagId, tagId)
    )
  );
}

export async function setPromptTags(promptId: number, tagIds: number[]) {
  const db = await getDb();
  if (!db) return null;
  
  // Remove all existing tags
  await db.delete(promptTags).where(eq(promptTags.promptId, promptId));
  
  // Add new tags
  if (tagIds.length > 0) {
    await db.insert(promptTags).values(
      tagIds.map(tagId => ({ promptId, tagId }))
    );
  }
  
  return true;
}

export async function addPromptTags(promptId: number, tagIds: number[]) {
  const db = await getDb();
  if (!db) return null;
  
  const values = tagIds.map(tagId => ({ promptId, tagId }));
  return db.insert(promptTags).values(values);
}

export async function removeAllPromptTags(promptId: number) {
  const db = await getDb();
  if (!db) return null;
  
  return db.delete(promptTags).where(eq(promptTags.promptId, promptId));
}

// Get user's bookmarked prompts
export async function getUserBookmarkedPrompts(userId: number, limit: number = 50, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select({
      id: prompts.id,
      title: prompts.title,
      promptText: prompts.promptText,
      responseText: prompts.responseText,
      categoryId: prompts.categoryId,
      categoryName: categories.name,
      categorySlug: categories.slug,
      authorId: prompts.authorId,
      authorName: users.name,
      likesCount: prompts.likesCount,
      bookmarksCount: prompts.bookmarksCount,
      viewsCount: prompts.viewsCount,
      copyCount: prompts.copyCount,
      createdAt: prompts.createdAt,
      bookmarkedAt: bookmarks.createdAt,
    })
    .from(bookmarks)
    .innerJoin(prompts, eq(bookmarks.promptId, prompts.id))
    .leftJoin(categories, eq(prompts.categoryId, categories.id))
    .leftJoin(users, eq(prompts.authorId, users.id))
    .where(eq(bookmarks.userId, userId))
    .orderBy(desc(bookmarks.createdAt))
    .limit(limit)
    .offset(offset);
}

// Get user's liked prompts
export async function getUserLikedPrompts(userId: number, limit: number = 50, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select({
      id: prompts.id,
      title: prompts.title,
      promptText: prompts.promptText,
      responseText: prompts.responseText,
      categoryId: prompts.categoryId,
      categoryName: categories.name,
      categorySlug: categories.slug,
      authorId: prompts.authorId,
      authorName: users.name,
      likesCount: prompts.likesCount,
      bookmarksCount: prompts.bookmarksCount,
      viewsCount: prompts.viewsCount,
      copyCount: prompts.copyCount,
      createdAt: prompts.createdAt,
      likedAt: likes.createdAt,
    })
    .from(likes)
    .innerJoin(prompts, eq(likes.promptId, prompts.id))
    .leftJoin(categories, eq(prompts.categoryId, categories.id))
    .leftJoin(users, eq(prompts.authorId, users.id))
    .where(eq(likes.userId, userId))
    .orderBy(desc(likes.createdAt))
    .limit(limit)
    .offset(offset);
}


// Comment queries
export async function getCommentsByPromptId(promptId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select({
      id: comments.id,
      promptId: comments.promptId,
      userId: comments.userId,
      userName: users.name,
      content: comments.content,
      rating: comments.rating,
      createdAt: comments.createdAt,
      updatedAt: comments.updatedAt,
    })
    .from(comments)
    .leftJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.promptId, promptId))
    .orderBy(desc(comments.createdAt));
}

export async function createComment(comment: InsertComment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(comments).values(comment);
  return { insertId: result[0].insertId };
}

export async function updateComment(id: number, updates: Partial<InsertComment>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(comments).set(updates).where(eq(comments.id, id));
}

export async function deleteComment(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(comments).where(eq(comments.id, id));
}

export async function getCommentById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(comments).where(eq(comments.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ==================== Gamification Functions ====================
// 注意: これらの関数は feature/gamification-setup ブランチでのみ使用
// 実際のデータベーススキーマが定義されたら、適切に実装します

interface UserStats {
  id: number;
  userId: number;
  totalXP: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: Date | null;
  totalLessonsCompleted: number;
  totalQuizzesPassed: number;
  createdAt: Date;
  updatedAt: Date;
}

interface InsertUserStats {
  userId: number;
  totalXP?: number;
  currentLevel?: number;
  currentStreak?: number;
  longestStreak?: number;
  lastStudyDate?: Date | null;
  totalLessonsCompleted?: number;
  totalQuizzesPassed?: number;
}

/**
 * ユーザー統計を取得
 * 注意: 実際のスキーマが定義されたら実装を更新
 */
export async function getUserStats(userId: number): Promise<UserStats | null> {
  const db = await getDb();
  if (!db) {
    logger.warn("Cannot get user stats: database not available", { userId });
    return null;
  }

  // TODO: 実際のスキーマが定義されたら実装
  // const result = await db.select().from(userStats).where(eq(userStats.userId, userId)).limit(1);
  // return result[0] || null;

  return null;
}

/**
 * ユーザー統計を更新または作成
 */
export async function upsertUserStats(data: InsertUserStats): Promise<void> {
  const db = await getDb();
  if (!db) {
    logger.warn("Cannot upsert user stats: database not available", { userId: data.userId });
    return;
  }

  // TODO: 実際のスキーマが定義されたら実装
  // const existing = await getUserStats(data.userId);
  // if (existing) {
  //   await db.update(userStats).set(data).where(eq(userStats.userId, data.userId));
  // } else {
  //   await db.insert(userStats).values(data);
  // }

  logger.debug("User stats upserted (placeholder)", { userId: data.userId });
}

/**
 * XPを追加
 */
export async function addXP(userId: number, xp: number): Promise<void> {
  const stats = await getUserStats(userId);
  const newTotalXP = (stats?.totalXP || 0) + xp;

  await upsertUserStats({
    userId,
    totalXP: newTotalXP,
  });

  logger.info("XP added", { userId, xp, newTotalXP });
}

/**
 * ユーザーバッジを取得
 */
export async function getUserBadges(userId: number): Promise<Array<{
  id: number;
  userId: number;
  badgeId: string;
  badgeName: string;
  badgeDescription: string | null;
  earnedAt: Date;
}>> {
  const db = await getDb();
  if (!db) {
    logger.warn("Cannot get user badges: database not available", { userId });
    return [];
  }

  // TODO: 実際のスキーマが定義されたら実装
  return [];
}

/**
 * バッジを付与
 */
export async function awardBadge(
  userId: number,
  badgeId: string,
  badgeName: string,
  badgeDescription?: string
): Promise<void> {
  const db = await getDb();
  if (!db) {
    logger.warn("Cannot award badge: database not available", { userId, badgeId });
    return;
  }

  // TODO: 実際のスキーマが定義されたら実装
  logger.info("Badge awarded (placeholder)", { userId, badgeId, badgeName });
}
