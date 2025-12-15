/**
 * SEO関連のユーティリティ関数
 * 各ページでメタタグとタイトルを動的に更新する
 */

// 環境変数からBASE_URLを取得、フォールバックはGitHub PagesのURL
function getBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const basePath = import.meta.env.VITE_BASE_PATH;
  if (baseUrl) return baseUrl;
  if (basePath) {
    return `https://kgraph57.github.io${basePath.replace(/\/$/, '')}`;
  }
  return "https://kgraph57.github.io/Helix";
}

export const BASE_URL = getBaseUrl();
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image-new.png`;

interface SEOData {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string;
  noindex?: boolean;
}

/**
 * ページのSEO情報を更新
 */
export function updateSEO(data: SEOData): void {
  const fullTitle = `${data.title} | Helix`;
  const url = `${BASE_URL}${data.path}`;
  const ogImage = data.ogImage || DEFAULT_OG_IMAGE;

  // タイトルを更新
  document.title = fullTitle;

  // 既存のメタタグを更新または作成
  updateMetaTag("name", "title", fullTitle);
  updateMetaTag("name", "description", data.description);
  if (data.keywords) {
    updateMetaTag("name", "keywords", data.keywords);
  }

  // robots
  if (data.noindex) {
    updateMetaTag("name", "robots", "noindex, nofollow");
  } else {
    updateMetaTag("name", "robots", "index, follow");
  }

  // Open Graph
  updateMetaTag("property", "og:title", fullTitle);
  updateMetaTag("property", "og:description", data.description);
  updateMetaTag("property", "og:url", url);
  updateMetaTag("property", "og:image", ogImage);
  updateMetaTag("property", "og:type", "website");
  updateMetaTag("property", "og:locale", "ja_JP");
  updateMetaTag("property", "og:site_name", "Helix");

  // Twitter Card
  updateMetaTag("property", "twitter:card", "summary_large_image");
  updateMetaTag("property", "twitter:title", fullTitle);
  updateMetaTag("property", "twitter:description", data.description);
  updateMetaTag("property", "twitter:image", ogImage);
  updateMetaTag("property", "twitter:url", url);

  // Canonical URL
  updateCanonical(url);
}

/**
 * メタタグを更新または作成
 */
function updateMetaTag(attribute: "name" | "property", key: string, content: string): void {
  let meta = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  
  meta.content = content;
}

/**
 * Canonical URLを更新または作成
 */
function updateCanonical(url: string): void {
  let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
  
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  
  canonical.href = url;
}

/**
 * 構造化データ（JSON-LD）を追加
 */
export function addStructuredData(data: {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}): void {
  // 既存の構造化データを削除（同じ@typeの場合）
  const existing = document.querySelector(`script[type="application/ld+json"][data-type="${data["@type"]}"]`);
  if (existing) {
    existing.remove();
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-type", data["@type"] as string);
  script.textContent = JSON.stringify(data, null, 2);
  document.head.appendChild(script);
}

/**
 * ホームページ用の構造化データ
 */
export function addHomeStructuredData(): void {
  addStructuredData({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Helix",
    "description": "医療従事者のためのAIプロンプトライブラリ",
    "url": BASE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  });

  addStructuredData({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Helix",
    "url": BASE_URL,
    "logo": DEFAULT_OG_IMAGE,
    "description": "医療従事者のためのAIプロンプトライブラリ"
  });
}

/**
 * FAQページ用の構造化データ
 */
export function addFAQStructuredData(faqs: Array<{ question: string; answer: string }>): void {
  addStructuredData({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });
}

/**
 * 記事ページ用の構造化データ
 */
export function addArticleStructuredData(data: {
  title: string;
  description: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}): void {
  addStructuredData({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.description,
    "author": {
      "@type": "Person",
      "name": data.author || "Helix"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Helix",
      "logo": {
        "@type": "ImageObject",
        "url": DEFAULT_OG_IMAGE
      }
    },
    "datePublished": data.datePublished || new Date().toISOString(),
    "dateModified": data.dateModified || new Date().toISOString(),
    "image": data.image || DEFAULT_OG_IMAGE,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}${data.path || ""}`
    }
  });
}

/**
 * Breadcrumb用の構造化データ
 */
export function addBreadcrumbStructuredData(items: Array<{ name: string; url: string }>): void {
  addStructuredData({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  });
}
