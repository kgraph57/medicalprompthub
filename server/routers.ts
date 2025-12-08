import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  categories: router({
    list: publicProcedure.query(async () => {
      return await db.getAllCategories();
    }),
  }),

  prompts: router({
    list: publicProcedure
      .input(z.object({
        categorySlug: z.string().optional(),
        scene: z.enum(["ward", "outpatient", "research", "education", "oncall", "emergency"]).optional(),
        tagSlug: z.string().optional(),
        searchTerm: z.string().optional(),
        sortBy: z.enum(["newest", "popular", "likes", "bookmarks"]).default("newest"),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }))
      .query(async ({ input }) => {
        if (input.searchTerm) {
          return await db.searchPrompts(input.searchTerm, input.limit, input.offset);
        }
        return await db.getAllPrompts(input.limit, input.offset, input.categorySlug, input.scene, input.sortBy, input.tagSlug);
      }),

    top: publicProcedure
      .input(z.object({
        limit: z.number().min(1).max(50).default(20),
      }))
      .query(async ({ input }) => {
        return await db.getTopPrompts(input.limit);
      }),

    byId: publicProcedure
      .input(z.object({
        id: z.number(),
      }))
      .query(async ({ input }) => {
        const prompt = await db.getPromptById(input.id);
        if (!prompt) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Prompt not found" });
        }
        await db.incrementPromptViews(input.id);
        return prompt;
      }),

    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1).max(200),
        promptText: z.string().min(1),
        responseText: z.string().min(1),
        categoryId: z.number(),
        tagIds: z.array(z.number()).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { tagIds, ...promptData } = input;
        const result = await db.createPrompt({
          ...promptData,
          authorId: ctx.user.id,
        });
        
        // Add tags if provided
        if (tagIds && tagIds.length > 0 && result.insertId) {
          await db.addPromptTags(Number(result.insertId), tagIds);
        }
        
        return { success: true };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).max(200).optional(),
        promptText: z.string().min(1).optional(),
        responseText: z.string().min(1).optional(),
        examplePromptText: z.string().optional(),
        exampleResponseText: z.string().optional(),
        usageDescription: z.string().optional(),
        useScene: z.string().optional(),
        categoryId: z.number().optional(),
        scene: z.enum(["ward", "outpatient", "research", "education", "oncall", "emergency"]).optional(),
        tagIds: z.array(z.number()).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const prompt = await db.getPromptById(input.id);
        if (!prompt) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Prompt not found" });
        }
        if (prompt.authorId !== ctx.user.id && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "You can only edit your own prompts" });
        }
        
        const { id, tagIds, ...updates } = input;
        await db.updatePrompt(id, updates);
        
        // Update tags if provided
        if (tagIds !== undefined) {
          // Remove all existing tags
          await db.removeAllPromptTags(id);
          // Add new tags
          if (tagIds.length > 0) {
            await db.addPromptTags(id, tagIds);
          }
        }
        
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        const prompt = await db.getPromptById(input.id);
        if (!prompt) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Prompt not found" });
        }
        if (prompt.authorId !== ctx.user.id && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "You can only delete your own prompts" });
        }
        
        await db.deletePrompt(input.id);
        return { success: true };
      }),

    myPrompts: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserPrompts(ctx.user.id);
    }),

    incrementCopy: publicProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input }) => {
        await db.incrementPromptCopy(input.id);
        return { success: true };
      }),

    related: publicProcedure
      .input(z.object({
        promptId: z.number(),
        categoryId: z.number(),
        limit: z.number().min(1).max(20).default(6),
      }))
      .query(async ({ input }) => {
        return await db.getRelatedPrompts(input.promptId, input.categoryId, input.limit);
      }),
  }),

  likes: router({
    toggle: protectedProcedure
      .input(z.object({
        promptId: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        const existing = await db.getUserLike(ctx.user.id, input.promptId);
        
        if (existing) {
          await db.deleteLike(ctx.user.id, input.promptId);
          return { liked: false };
        } else {
          await db.createLike({
            userId: ctx.user.id,
            promptId: input.promptId,
          });
          return { liked: true };
        }
      }),

    check: protectedProcedure
      .input(z.object({
        promptId: z.number(),
      }))
      .query(async ({ input, ctx }) => {
        const like = await db.getUserLike(ctx.user.id, input.promptId);
        return { liked: !!like };
      }),
  }),

  bookmarks: router({
    toggle: protectedProcedure
      .input(z.object({
        promptId: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        const existing = await db.getUserBookmark(ctx.user.id, input.promptId);
        
        if (existing) {
          await db.deleteBookmark(ctx.user.id, input.promptId);
          return { bookmarked: false };
        } else {
          await db.createBookmark({
            userId: ctx.user.id,
            promptId: input.promptId,
          });
          return { bookmarked: true };
        }
      }),

    check: protectedProcedure
      .input(z.object({
        promptId: z.number(),
      }))
      .query(async ({ input, ctx }) => {
        const bookmark = await db.getUserBookmark(ctx.user.id, input.promptId);
        return { bookmarked: !!bookmark };
      }),

    myBookmarks: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserBookmarks(ctx.user.id);
    }),
  }),

  tags: router({
    list: publicProcedure.query(async () => {
      return await db.getAllTags();
    }),

    getPromptTags: publicProcedure
      .input(z.object({
        promptId: z.number(),
      }))
      .query(async ({ input }) => {
        return await db.getPromptTags(input.promptId);
      }),
  }),

  courses: router({
    list: publicProcedure.query(async () => {
      return await db.getAllCourses();
    }),

    listWithProgress: protectedProcedure.query(async ({ ctx }) => {
      return await db.getAllCoursesWithProgress(ctx.user.id);
    }),

    get: publicProcedure
      .input(z.object({
        courseId: z.number(),
      }))
      .query(async ({ input }) => {
        return await db.getCourseWithLessons(input.courseId);
      }),
  }),

  lessons: router({
    get: publicProcedure
      .input(z.object({
        lessonId: z.number(),
      }))
      .query(async ({ input }) => {
        const lesson = await db.getLessonById(input.lessonId);
        if (!lesson) return null;
        
        const lessonSlides = await db.getSlidesByLessonId(input.lessonId);
        
        return {
          ...lesson,
          slides: lessonSlides,
        };
      }),

    updateProgress: protectedProcedure
      .input(z.object({
        lessonId: z.number(),
        completed: z.number().min(0).max(1),
        lastSlideViewed: z.number().min(0),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.upsertUserProgress({
          userId: ctx.user.id,
          lessonId: input.lessonId,
          completed: input.completed,
          lastSlideViewed: input.lastSlideViewed,
        });
        return { success: true };
      }),

    getProgress: protectedProcedure
      .input(z.object({
        lessonId: z.number(),
      }))
      .query(async ({ input, ctx }) => {
        const progress = await db.getUserProgress(ctx.user.id, input.lessonId);
        return progress || { completed: 0, lastSlideViewed: 0 };
      }),
  }),

  mypage: router({
    myPrompts: protectedProcedure
      .input(z.object({
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }))
      .query(async ({ input, ctx }) => {
        return await db.getUserPrompts(ctx.user.id, input.limit, input.offset);
      }),

    myBookmarkedPrompts: protectedProcedure
      .input(z.object({
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }))
      .query(async ({ input, ctx }) => {
        return await db.getUserBookmarkedPrompts(ctx.user.id, input.limit, input.offset);
      }),

    myLikedPrompts: protectedProcedure
      .input(z.object({
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }))
      .query(async ({ input, ctx }) => {
        return await db.getUserLikedPrompts(ctx.user.id, input.limit, input.offset);
      }),
  }),

  comments: router({
    list: publicProcedure
      .input(z.object({
        promptId: z.number(),
      }))
      .query(async ({ input }) => {
        return await db.getCommentsByPromptId(input.promptId);
      }),

    create: protectedProcedure
      .input(z.object({
        promptId: z.number(),
        content: z.string().min(1).max(2000),
        rating: z.number().min(1).max(5).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.createComment({
          promptId: input.promptId,
          userId: ctx.user.id,
          content: input.content,
          rating: input.rating,
        });
        return { success: true };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        content: z.string().min(1).max(2000).optional(),
        rating: z.number().min(1).max(5).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const comment = await db.getCommentById(input.id);
        if (!comment) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Comment not found" });
        }
        if (comment.userId !== ctx.user.id && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "You can only edit your own comments" });
        }
        
        const { id, ...updates } = input;
        await db.updateComment(id, updates);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        const comment = await db.getCommentById(input.id);
        if (!comment) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Comment not found" });
        }
        if (comment.userId !== ctx.user.id && ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "You can only delete your own comments" });
        }
        
        await db.deleteComment(input.id);
        return { success: true };
      }),
  }),

  // ゲーミフィケーション機能（feature/gamification-setup ブランチ）
  gamification: router({
    // ユーザー統計を取得
    getStats: protectedProcedure.query(async ({ ctx }) => {
      const stats = await db.getUserStats(ctx.user.id);
      if (!stats) {
        // 統計が存在しない場合は初期値で作成
        await db.upsertUserStats({
          userId: ctx.user.id,
          totalXP: 0,
          currentLevel: 1,
          currentStreak: 0,
          longestStreak: 0,
          totalLessonsCompleted: 0,
          totalQuizzesPassed: 0,
        });
        return {
          totalXP: 0,
          currentLevel: 1,
          currentStreak: 0,
          longestStreak: 0,
          totalLessonsCompleted: 0,
          totalQuizzesPassed: 0,
        };
      }
      return stats;
    }),

    // XPを追加
    addXP: protectedProcedure
      .input(z.object({
        xp: z.number().min(1).max(100),
        reason: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.addXP(ctx.user.id, input.xp);
        return { success: true };
      }),

    // バッジ一覧を取得
    getBadges: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserBadges(ctx.user.id);
    }),

    // ストリークを更新
    updateStreak: protectedProcedure.mutation(async ({ ctx }) => {
      const stats = await db.getUserStats(ctx.user.id);
      if (!stats) return { success: false };

      const { updateStreak } = await import("./_core/gamification");
      const today = new Date();
      const lastStudyDate = stats.lastStudyDate ? new Date(stats.lastStudyDate) : null;

      const { newStreak, longestStreak, updated } = updateStreak(
        stats.currentStreak,
        lastStudyDate,
        today
      );

      if (updated) {
        await db.upsertUserStats({
          userId: ctx.user.id,
          currentStreak: newStreak,
          longestStreak: Math.max(stats.longestStreak, longestStreak),
          lastStudyDate: today,
        });
      }

      return { success: true, newStreak, updated };
    }),
  }),
});

export type AppRouter = typeof appRouter;
