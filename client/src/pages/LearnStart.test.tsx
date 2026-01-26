/**
 * LearnStart のモバイル対応テスト
 * スマホでも問題なく表示・操作できることを検証する
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import LearnStart from "./LearnStart";

const mockSetLocation = vi.fn();

vi.mock("wouter", () => ({
  useLocation: () => ["/learn/start", mockSetLocation],
  Link: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

vi.mock("@/lib/seo", () => ({
  updateSEO: vi.fn(),
}));

vi.mock("@/lib/course-mapper", () => ({
  learningPaths: [
    { id: "ai-tools", title: "AIツールを使う", description: "ChatGPTなどを活用", courseIds: ["chatgpt-practice"] },
    { id: "medical-ai", title: "医療でAI活用", description: "医療現場でのAI活用", courseIds: ["medical-ai-overview"] },
  ],
}));

const mockGetLessonsForCourse = vi.fn();
vi.mock("@/pages/CourseDetail", () => ({
  getLessonsForCourse: (id: string) => mockGetLessonsForCourse(id),
}));

const mockHasLessonContent = vi.fn();
vi.mock("@/lib/lesson-content-loader", () => ({
  hasLessonContent: (id: string) => mockHasLessonContent(id),
}));

describe("LearnStart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetLessonsForCourse.mockReturnValue([]);
    mockHasLessonContent.mockReturnValue(false);
  });

  describe("モバイル表示", () => {
    it("「はじめに」カードにモバイル用スタイル（p-4 sm:p-6, touch-manipulation, min-h）が含まれる", () => {
      render(<LearnStart />);
      const btn = screen.getByRole("button", { name: /はじめに/i });
      expect(btn).toBeInTheDocument();
      expect(btn.className).toContain("p-4");
      expect(btn.className).toContain("sm:p-6");
      expect(btn.className).toContain("touch-manipulation");
      expect(btn.className).toContain("min-h-[44px]");
    });

    it("未完了時にヒント欄が表示され、モバイル用padding（p-4 sm:p-5）がある", () => {
      render(<LearnStart />);
      const hint = screen.getByText(/「はじめに」を完了すると、さらに多くの学習パスが表示されます/);
      expect(hint).toBeInTheDocument();
      const container = hint.closest(".rounded-lg");
      expect(container).toBeInTheDocument();
      expect(container?.className).toContain("p-4");
      expect(container?.className).toContain("sm:p-5");
    });

    it("メインにモバイル用余白（px-4 sm:px-6）が使われている", () => {
      render(<LearnStart />);
      const main = screen.getByRole("main");
      expect(main.className).toContain("px-4");
      expect(main.className).toContain("sm:px-6");
    });

    it("タイトルがモバイルで小さく、sm以上で拡大する（text-2xl sm:text-3xl）", () => {
      render(<LearnStart />);
      const h1 = screen.getByRole("heading", { level: 1, name: /学習を始めましょう/ });
      expect(h1.className).toContain("text-2xl");
      expect(h1.className).toContain("sm:text-3xl");
    });

    it("長文が折り返される（break-words）", () => {
      render(<LearnStart />);
      const desc = screen.getByText(/AIの基礎と生成AIの仕組みを学ぶ/);
      expect(desc.className).toContain("break-words");
    });

    it("「すべてのコースを見る」リンクにタッチ用padding（py-3 px-4）がある", () => {
      render(<LearnStart />);
      const link = screen.getByRole("link", { name: /すべてのコースを見る/ });
      expect(link).toBeInTheDocument();
      expect(link.className).toContain("py-3");
      expect(link.className).toContain("px-4");
      expect(link.className).toContain("touch-manipulation");
    });
  });

  describe("完了時（学習パス表示）", () => {
    const lesson = { id: "lesson-1", title: "L1", description: "D1", duration: 5, slides: 3 };

    beforeEach(() => {
      mockGetLessonsForCourse.mockReturnValue([lesson]);
      mockHasLessonContent.mockReturnValue(true);
      const store: Record<string, string> = {};
      vi.spyOn(Storage.prototype, "getItem").mockImplementation((key: string) => store[key] ?? null);
      vi.spyOn(Storage.prototype, "setItem").mockImplementation((key: string, val: string) => { store[key] = val; });
      const progress = JSON.stringify({ completedLessons: [lesson.id] });
      store["course-progress-ai-basics"] = progress;
      store["course-progress-generative-ai-basics"] = progress;
    });

    it("学習パスが grid-cols-1 sm:grid-cols-2 でモバイル1列・タブレット以上2列になる", () => {
      render(<LearnStart />);
      const grid = document.querySelector(".grid.grid-cols-1.sm\\:grid-cols-2");
      expect(grid).toBeInTheDocument();
    });

    it("学習パスカードにモバイル用 padding とタッチ操作スタイルがある", () => {
      render(<LearnStart />);
      const pathButtons = screen.getAllByRole("button").filter((b) => b.textContent?.includes("AIツール") || b.textContent?.includes("医療でAI"));
      expect(pathButtons.length).toBeGreaterThan(0);
      pathButtons.forEach((btn) => {
        expect(btn.className).toContain("p-4");
        expect(btn.className).toContain("sm:p-5");
        expect(btn.className).toContain("touch-manipulation");
        expect(btn.className).toContain("min-h-[44px]");
      });
    });
  });
});
