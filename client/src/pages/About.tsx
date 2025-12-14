/**
 * Aboutページ
 * サービスについて、開発者情報、クレジット
 */

import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Heart, Code, Users, BookOpen, Github, Mail, ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import { Link } from "wouter";
import { motion } from "framer-motion";

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
      <div className="max-w-4xl mx-auto space-y-16 pb-20">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 text-muted-foreground text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Medical Prompt Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Medical Prompt Hubについて
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            医療従事者のためのAIプロンプトライブラリ
          </p>
        </div>

        {/* Mission Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-4 h-4 text-primary" strokeWidth={2} />
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Mission
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground tracking-tight leading-[1.1]">
            このツールで生まれた時間を、患者さんとの対話のために。
          </h2>
          <div className="space-y-5 text-base text-muted-foreground leading-relaxed">
            <p className="text-lg font-medium text-foreground">
              AIは医療を効率化するだけではなく、医師が患者と向き合う時間を増やすためのツールです。
            </p>
            <p>
              AMPLは、医療従事者がAI（ChatGPT, Claude, Geminiなど）を臨床業務、研究、教育に効果的に活用できるよう、実践的で高品質なプロンプトを提供することを目的としています。
            </p>
            <p>
              私たちは、AI技術が医療現場の効率化と質の向上に貢献できると信じており、医療従事者の皆様が安全かつ効果的にAIを活用できるよう、専門的なプロンプト集とガイドを提供しています。
            </p>
            <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border/60">
              <h4 className="text-base font-semibold text-foreground mb-2">
                🛡️ 医療安全へのコミットメント
              </h4>
              <p className="text-sm text-muted-foreground">
                本サービスは、デジタルヘルス、医療安全、EBM、AI技術の専門家の視点からレビューされ、医療安全機能（リスクレベル表示、チェックリスト、AIリテラシーガイド）を実装しています。
              </p>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-blue-600" strokeWidth={2} />
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-[-0.01em]">
              Features
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
            Main features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-base flex items-center gap-2 text-neutral-900 dark:text-neutral-50">
                <BookOpen className="w-4 h-4 text-blue-600" />
                100+ expert prompts
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                診断支援、治療計画、論文執筆、学会発表など、医療現場で実際に使えるプロンプトを網羅
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-base flex items-center gap-2 text-neutral-900 dark:text-neutral-50">
                <Code className="w-4 h-4 text-blue-600" />
                Practical workflow guides
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                症例報告の書き方、統計解析の方法など、ステップバイステップのガイドを提供
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-base flex items-center gap-2 text-neutral-900 dark:text-neutral-50">
                <Users className="w-4 h-4 text-blue-600" />
                Optimized for healthcare
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                医療現場の実際のニーズに基づいて設計された、実用的なプロンプト集
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-base flex items-center gap-2 text-neutral-900 dark:text-neutral-50">
                <Heart className="w-4 h-4 text-blue-600" />
                Free and open source
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                すべてのプロンプトとガイドは無料で利用でき、オープンソースとして公開されています
              </p>
            </div>
          </div>
        </motion.section>

        {/* Developer Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Code className="w-4 h-4 text-primary" strokeWidth={2} />
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Developer
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground tracking-tight leading-[1.1]">
            Development and operations
          </h2>
          <div className="space-y-8 text-base text-muted-foreground">
            <div>
              <h3 className="font-semibold mb-3 text-lg text-foreground">開発・運営</h3>
              <p className="leading-relaxed">
                AMPLは、医療従事者とAI技術の専門家によって開発・運営されています。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-lg text-foreground">技術スタック</h3>
              <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                <li>Frontend: React 19, TypeScript, Vite, Tailwind CSS</li>
                <li>UI Components: shadcn/ui, Radix UI, Framer Motion</li>
                <li>Hosting: GitHub Pages</li>
                <li>Analytics: Google Analytics 4, Umami</li>
                <li>Error Tracking: Sentry</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-lg text-foreground">お問い合わせ</h3>
              <p className="mb-4 leading-relaxed">
                ご質問、ご意見、バグ報告などは、お問い合わせフォームからお願いいたします。
              </p>
              <Link href="/contact">
                <span className="text-primary hover:text-primary/80 inline-flex items-center gap-2 transition-colors font-medium">
                  <Mail className="w-4 h-4" />
                  お問い合わせフォームへ
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Credits Section */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-blue-600" strokeWidth={2} />
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-[-0.01em]">
              Credits
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
            Credits and acknowledgments
          </h2>
          <div className="space-y-6 text-base text-neutral-600 dark:text-neutral-400">
            <div>
              <h3 className="font-semibold mb-2 text-lg text-neutral-900 dark:text-neutral-50">謝辞</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>すべての医療従事者の皆様</li>
                <li>AIコミュニティの貢献者</li>
                <li>オープンソースプロジェクトの開発者</li>
                <li>プロンプトの改善にご協力いただいた皆様</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg text-neutral-900 dark:text-neutral-50">GitHub</h3>
              <p className="mb-3">
                ソースコードはGitHubで公開されています。貢献を歓迎します。
              </p>
              <a
                href="https://github.com/kgraph57/medicalprompthub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHubリポジトリ
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.section>

        {/* License Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-4 h-4 text-primary" strokeWidth={2} />
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              License
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground tracking-tight leading-[1.1]">
            License and disclaimer
          </h2>
          <div className="space-y-8 text-base text-muted-foreground">
            <div>
              <h3 className="font-semibold mb-3 text-lg text-foreground">MIT License</h3>
              <p className="mb-4 leading-relaxed">
                本プロジェクトのソースコードはMIT Licenseの下で公開されています。
              </p>
              <p className="leading-relaxed">
                プロンプトの内容については、医療従事者の皆様が自由に使用・改変・共有していただけます。
                ただし、医療行為に関する最終的な判断は、必ず医師や専門家の判断を優先してください。
              </p>
            </div>
            <div className="pt-8 border-t border-border/60">
              <h3 className="font-semibold mb-3 text-lg text-foreground">免責事項</h3>
              <p className="leading-relaxed">
                本サービスで提供されるプロンプトやガイドは、医療アドバイスを提供するものではありません。
                実際の医療行為に関する判断は、必ず医師や専門家の判断を優先し、所属する医療機関のガイドラインに従ってください。
                詳細は<Link href="/legal" className="text-primary hover:text-primary/80 underline">利用規約・免責事項</Link>をご確認ください。
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
