import { trpc } from "@/lib/trpc";
import { useEffect, useRef } from "react";

/**
 * アナリティクスイベントを追跡するカスタムフック
 */
export function useAnalytics() {
  const trackPageViewMutation = trpc.analytics.trackPageView.useMutation();
  const trackEventMutation = trpc.analytics.trackEvent.useMutation();
  const lastPathRef = useRef<string | null>(null);

  /**
   * ページビューを手動で追跡（必要に応じて呼び出す）
   */
  const trackPageView = (path: string) => {
    // 同じパスを連続して追跡しない
    if (lastPathRef.current === path) {
      return;
    }
    lastPathRef.current = path;

    const referrer = document.referrer || undefined;
    const userAgent = navigator.userAgent || undefined;
    
    trackPageViewMutation.mutate({
      path,
      referrer,
      userAgent,
    });
  };

  /**
   * カスタムイベントを追跡
   */
  const trackEvent = (
    eventType: string,
    eventData?: Record<string, any>,
    promptId?: number
  ) => {
    trackEventMutation.mutate({
      eventType,
      eventData: eventData ? JSON.stringify(eventData) : undefined,
      promptId,
    });
  };

  /**
   * プロンプトコピーイベントを追跡
   */
  const trackCopy = (promptId: number, promptTitle?: string) => {
    trackEvent("prompt_copy", { promptTitle }, promptId);
  };

  /**
   * プロンプトいいねイベントを追跡
   */
  const trackLike = (promptId: number, action: "like" | "unlike") => {
    trackEvent("prompt_like", { action }, promptId);
  };

  /**
   * プロンプトブックマークイベントを追跡
   */
  const trackBookmark = (promptId: number, action: "bookmark" | "unbookmark") => {
    trackEvent("prompt_bookmark", { action }, promptId);
  };

  /**
   * 検索イベントを追跡
   */
  const trackSearch = (searchTerm: string, resultCount?: number) => {
    trackEvent("search", { searchTerm, resultCount });
  };

  /**
   * プロンプト閲覧イベントを追跡
   */
  const trackPromptView = (promptId: number, promptTitle?: string) => {
    trackEvent("prompt_view", { promptTitle }, promptId);
  };

  /**
   * プロンプト作成イベントを追跡
   */
  const trackPromptCreate = (promptId: number, title: string) => {
    trackEvent("prompt_create", { title }, promptId);
  };

  /**
   * プロンプト編集イベントを追跡
   */
  const trackPromptUpdate = (promptId: number, title: string) => {
    trackEvent("prompt_update", { title }, promptId);
  };

  /**
   * コメント投稿イベントを追跡
   */
  const trackComment = (promptId: number, action: "create" | "update" | "delete") => {
    trackEvent("comment", { action }, promptId);
  };

  return {
    trackPageView,
    trackEvent,
    trackCopy,
    trackLike,
    trackBookmark,
    trackSearch,
    trackPromptView,
    trackPromptCreate,
    trackPromptUpdate,
    trackComment,
  };
}

