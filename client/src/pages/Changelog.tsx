/**
 * Changelog / 更新情報ページ
 * サービスの更新履歴を表示
 */

import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Bug, Settings, FileText } from "lucide-react";
import { useEffect } from "react";
import { updateSEO, addStructuredData, BASE_URL } from "@/lib/seo";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface ChangelogEntry {
  version: string;
  date: string;
  type: "feature" | "fix" | "improvement" | "security";
  changes: string[];
}

const changelogEntries: ChangelogEntry[] = [
  {
    version: "1.0.1",
    date: "2025-01-XX",
    type: "feature",
    changes: [
      "FAQ/ヘルプドキュメントページの追加",
      "お問い合わせフォームの実装",
      "SEO最適化（メタタグ、OGP、構造化データ）",
      "Google Analytics 4の統合",
      "Cookie同意管理の実装（GDPR対応）",
      "Sentry統合（エラートラッキング）",
      "オンボーディングモーダルの実装",
      "ホームページUX改善（おすすめプロンプト表示、ガイドセクション改善）",
      "テストカバレッジの向上",
      "論文読解ガイドの追加",
      "サイドバーにFAQ・お問い合わせボタンを追加",
    ],
  },
  {
    version: "1.0.0",
    date: "2024-XX-XX",
    type: "feature",
    changes: [
      "初回リリース",
      "100以上の専門プロンプトの提供",
      "10カテゴリのプロンプト分類",
      "ワークフローガイド機能",
      "症例報告完全版ガイド",
      "AI活用Tips（41個）",
      "お気に入り機能",
      "検索機能",
      "カテゴリ別フィルタリング",
      "レスポンシブデザイン対応",
    ],
  },
];

const typeIcons = {
  feature: Sparkles,
  fix: Bug,
  improvement: Settings,
  security: FileText,
};

const typeLabels = {
  feature: "新機能",
  fix: "バグ修正",
  improvement: "改善",
  security: "セキュリティ",
};

const typeColors = {
  feature: "default",
  fix: "destructive",
  improvement: "secondary",
  security: "outline",
} as const;

export default function Changelog() {
  useEffect(() => {
    updateSEO({
      title: "更新履歴 | Medical Prompt Hub",
      description: "Medical Prompt Hubの更新履歴とリリースノート。新機能、バグ修正、改善内容を確認できます。",
      path: "/changelog",
      keywords: "更新履歴,Changelog,リリースノート,新機能,バグ修正"
    });

    // 構造化データ（CollectionPage）を追加
    addStructuredData({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Medical Prompt Hub 更新履歴",
      "description": "Medical Prompt Hubの更新履歴",
      "url": `${BASE_URL}/changelog`,
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": changelogEntries.length,
        "itemListElement": changelogEntries.map((entry, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": `バージョン ${entry.version}`,
          "description": entry.changes.join(", ")
        }))
      }
    });
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Linear.app風：ページヘッダー */}
        <PageHeader
          category="Changelog"
          title="Changelog"
          description="サービスの更新内容とリリースノート"
        />

        {/* Changelog Entries */}
        <div className="space-y-4 mt-8">
          {changelogEntries.map((entry, index) => {
            const Icon = typeIcons[entry.type];
            const label = typeLabels[entry.type];

            return (
              <motion.div
                key={entry.version}
                className="border-b border-neutral-200 dark:border-neutral-800 pb-4 last:border-b-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                      v{entry.version}
                    </h3>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {entry.date}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs h-5 px-1.5">
                    {label}
                  </Badge>
                </div>
                <ul className="space-y-1 ml-5">
                  {entry.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {change}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Future Updates */}
        <motion.section
          className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" strokeWidth={2} />
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
              Upcoming features
            </h2>
          </div>
          <ul className="space-y-1 ml-5">
            <li className="text-xs text-neutral-600 dark:text-neutral-400">プロンプトの評価・フィードバック機能</li>
            <li className="text-xs text-neutral-600 dark:text-neutral-400">ユーザー投稿機能（コミュニティプロンプト）</li>
            <li className="text-xs text-neutral-600 dark:text-neutral-400">プロンプトのバージョン管理</li>
            <li className="text-xs text-neutral-600 dark:text-neutral-400">多言語対応（英語版）</li>
            <li className="text-xs text-neutral-600 dark:text-neutral-400">API提供</li>
          </ul>
          <p className="mt-4 text-xs text-neutral-600 dark:text-neutral-400">
            ご要望やフィードバックは<Link href="/contact" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">お問い合わせフォーム</Link>からお願いいたします。
          </p>
        </motion.section>
      </div>
    </Layout>
  );
}
