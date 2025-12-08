/**
 * Aboutページ
 * サービスについて、開発者情報、クレジット
 */

import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, Code, Users, BookOpen, Sparkles, Github, Mail } from "lucide-react";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import { Link } from "wouter";

export default function About() {
  useEffect(() => {
    updateSEO({
      title: "About - Medical Prompt Hubについて",
      description: "Medical Prompt Hubの開発背景、開発者情報、クレジット、ライセンス情報を掲載しています。",
      path: "/about",
      keywords: "About,開発者,クレジット,ライセンス,Medical Prompt Hub"
    });
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-4 pb-12">
        {/* Hero Section */}
        <div className="text-center space-y-2 py-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Medical Prompt Hub</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Medical Prompt Hubについて
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            医療従事者のためのAIプロンプトライブラリ
          </p>
        </div>

        {/* Mission Section */}
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <Heart className="w-4 h-4 text-primary" />
              ミッション
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2 text-xs leading-relaxed">
            <p>
              Medical Prompt Hubは、医療従事者がAI（ChatGPT, Claude, Geminiなど）を臨床業務、研究、教育に効果的に活用できるよう、実践的で高品質なプロンプトを提供することを目的としています。
            </p>
            <p>
              私たちは、AI技術が医療現場の効率化と質の向上に貢献できると信じており、医療従事者の皆様が安全かつ効果的にAIを活用できるよう、専門的なプロンプト集とガイドを提供しています。
            </p>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="w-4 h-4 text-primary" />
              主な特徴
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <h3 className="font-semibold text-sm flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                  100以上の専門プロンプト
                </h3>
                <p className="text-xs text-muted-foreground">
                  診断支援、治療計画、論文執筆、学会発表など、医療現場で実際に使えるプロンプトを網羅
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-sm flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-primary" />
                  実践的なワークフローガイド
                </h3>
                <p className="text-xs text-muted-foreground">
                  症例報告の書き方、統計解析の方法など、ステップバイステップのガイドを提供
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-sm flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  医療従事者向けに最適化
                </h3>
                <p className="text-xs text-muted-foreground">
                  医療現場の実際のニーズに基づいて設計された、実用的なプロンプト集
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-sm flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-primary" />
                  無料で利用可能
                </h3>
                <p className="text-xs text-muted-foreground">
                  すべてのプロンプトとガイドは無料で利用でき、オープンソースとして公開されています
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Developer Section */}
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base">開発者情報</CardTitle>
            <CardDescription className="text-xs">
              Medical Prompt Hubの開発・運営について
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3 text-xs leading-relaxed">
            <div>
              <h3 className="font-semibold mb-1 text-sm">開発・運営</h3>
              <p className="text-muted-foreground">
                Medical Prompt Hubは、医療従事者とAI技術の専門家によって開発・運営されています。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-sm">技術スタック</h3>
              <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
                <li>Frontend: React 19, TypeScript, Vite, Tailwind CSS</li>
                <li>UI Components: shadcn/ui, Radix UI, Framer Motion</li>
                <li>Hosting: GitHub Pages</li>
                <li>Analytics: Google Analytics 4, Umami</li>
                <li>Error Tracking: Sentry</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-sm">お問い合わせ</h3>
              <p className="text-muted-foreground mb-1.5">
                ご質問、ご意見、バグ報告などは、お問い合わせフォームからお願いいたします。
              </p>
              <Link href="/contact">
                <span className="text-primary hover:underline flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  お問い合わせフォームへ
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Credits Section */}
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base">クレジット・謝辞</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3 text-xs leading-relaxed">
            <div>
              <h3 className="font-semibold mb-1 text-sm">謝辞</h3>
              <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
                <li>すべての医療従事者の皆様</li>
                <li>AIコミュニティの貢献者</li>
                <li>オープンソースプロジェクトの開発者</li>
                <li>プロンプトの改善にご協力いただいた皆様</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-sm">オープンソースライセンス</h3>
              <p className="text-muted-foreground">
                本プロジェクトはMIT Licenseの下で公開されています。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-sm">GitHub</h3>
              <p className="text-muted-foreground mb-1.5">
                ソースコードはGitHubで公開されています。貢献を歓迎します。
              </p>
              <a
                href="https://github.com/kgraph57/medicalprompthub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                <Github className="w-4 h-4" />
                GitHubリポジトリ
              </a>
            </div>
          </CardContent>
        </Card>

        {/* License Section */}
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base">ライセンス</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3 text-xs leading-relaxed">
            <div>
              <h3 className="font-semibold mb-1 text-sm">MIT License</h3>
              <p className="text-muted-foreground mb-1.5">
                本プロジェクトのソースコードはMIT Licenseの下で公開されています。
              </p>
              <p className="text-muted-foreground">
                プロンプトの内容については、医療従事者の皆様が自由に使用・改変・共有していただけます。
                ただし、医療行為に関する最終的な判断は、必ず医師や専門家の判断を優先してください。
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-1 text-sm">免責事項</h3>
              <p className="text-muted-foreground">
                本サービスで提供されるプロンプトやガイドは、医療アドバイスを提供するものではありません。
                実際の医療行為に関する判断は、必ず医師や専門家の判断を優先し、所属する医療機関のガイドラインに従ってください。
                詳細は<Link href="/legal" className="text-primary hover:underline">利用規約・免責事項</Link>をご確認ください。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
