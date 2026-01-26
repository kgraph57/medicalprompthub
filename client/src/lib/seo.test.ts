/**
 * SEOユーティリティのテスト
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { updateSEO, addStructuredData } from "./seo";

describe("seo", () => {
  beforeEach(() => {
    // 各テスト前にDOMをクリア
    document.head.innerHTML = "";
    document.title = "";
  });

  afterEach(() => {
    // テスト後にDOMをクリア
    document.head.innerHTML = "";
    document.title = "";
  });

  describe("updateSEO", () => {
    it("タイトルを更新する", () => {
      updateSEO({
        title: "テストタイトル",
        description: "テスト説明",
        path: "/test",
      });

      expect(document.title).toBe("テストタイトル | HELIX");
    });

    it("メタタグを追加・更新する", () => {
      updateSEO({
        title: "テスト",
        description: "テスト説明",
        path: "/test",
      });

      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription).not.toBeNull();
      expect(metaDescription?.getAttribute("content")).toBe("テスト説明");
    });

    it("OGPタグを追加・更新する", () => {
      updateSEO({
        title: "テスト",
        description: "テスト説明",
        path: "/test",
      });

      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle).not.toBeNull();
      expect(ogTitle?.getAttribute("content")).toContain("テスト");
    });

    it("Canonical URLを追加・更新する", () => {
      updateSEO({
        title: "テスト",
        description: "テスト説明",
        path: "/test",
      });

      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical).not.toBeNull();
      expect(canonical?.getAttribute("href")).toContain("/test");
    });
  });

  describe("addStructuredData", () => {
    it("構造化データを追加する", () => {
      const data = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Test Site",
      };

      addStructuredData(data);

      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script).not.toBeNull();
      
      const content = script?.textContent;
      expect(content).toContain("WebSite");
      expect(content).toContain("Test Site");
    });

    it("同じ@typeの構造化データを置き換える", () => {
      const data1 = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Site 1",
      };

      const data2 = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Site 2",
      };

      addStructuredData(data1);
      addStructuredData(data2);

      const scripts = document.querySelectorAll('script[type="application/ld+json"][data-type="WebSite"]');
      expect(scripts.length).toBe(1);
      expect(scripts[0]?.textContent).toContain("Site 2");
    });
  });
});
