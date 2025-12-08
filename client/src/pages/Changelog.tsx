/**
 * Changelog / 更新情報ページ
 * サービスの更新履歴を表示
 */

import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Sparkles, Bug, Plus, Settings, FileText } from "lucide-react";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
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
      title: "更新履歴 - Medical Prompt Hub",
      description: "Medical Prompt Hubの更新履歴とリリースノート。新機能、バグ修正、改善内容を確認できます。",
      path: "/changelog",
      keywords: "更新履歴,Changelog,リリースノート,新機能,バグ修正"
    });
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-4 pb-12">
        {/* Hero Section */}
        <div className="text-center space-y-2 py-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>Changelog</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            更新履歴
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            サービスの更新内容とリリースノート
          </p>
        </div>

        {/* Changelog Entries */}
        <div className="space-y-3">
          {changelogEntries.map((entry, index) => {
            const Icon = typeIcons[entry.type];
            const label = typeLabels[entry.type];
            const color = typeColors[entry.type];

            return (
              <Card key={entry.version} className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-lg" />
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">v{entry.version}</CardTitle>
                        <CardDescription className="flex items-center gap-1.5 mt-0.5 text-xs">
                          <Calendar className="w-3 h-3" />
                          {entry.date}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={color} className="text-[10px]">
                      {label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-1">
                    {entry.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start gap-1.5 text-xs">
                        <Plus className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{change}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                {index < changelogEntries.length - 1 && (
                  <Separator className="my-4" />
                )}
              </Card>
            );
          })}
        </div>

        {/* Future Updates */}
        <Card className="border-dashed">
          <CardHeader className="p-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="w-4 h-4 text-primary" />
              今後の予定
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-1.5 text-xs text-muted-foreground">
            <p>以下の機能を順次実装予定です：</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>プロンプトの評価・フィードバック機能</li>
              <li>ユーザー投稿機能（コミュニティプロンプト）</li>
              <li>プロンプトのバージョン管理</li>
              <li>多言語対応（英語版）</li>
              <li>API提供</li>
            </ul>
            <p className="mt-4">
              ご要望やフィードバックは<Link href="/contact" className="text-primary hover:underline">お問い合わせフォーム</Link>からお願いいたします。
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
