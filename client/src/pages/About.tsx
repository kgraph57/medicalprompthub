/**
 * Aboutページ
 * Manus風のデザインでHELIXについて紹介
 */

import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";

export default function About() {
  useEffect(() => {
    updateSEO({
      title: "About Us - HELIX",
      description: "HELIXのミッション、製品、ストーリーについて。医療従事者のためのAIプロンプトライブラリ。",
      path: "/about",
      keywords: "About,HELIX,ミッション,医療AI,プロンプト"
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16"
        >
          {/* Title - Centered */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-neutral-900 dark:text-neutral-50 mb-8 md:mb-12 text-center tracking-tight"
            style={{
              fontFamily: '"Crimson Pro", "Lora", serif',
              fontWeight: 600,
            }}
          >
            About Us
          </motion.h1>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-sm mx-auto rounded-2xl md:rounded-3xl overflow-hidden aspect-square mb-8 md:mb-12"
          >
            <img
              src="/images/about-hero.png"
              alt="AIと医療従事者の協働を象徴するイメージ"
              className="w-full h-full object-contain"
              onError={(e) => {
                // 画像が読み込めない場合のフォールバック
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.className = parent.className + ' bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center';
                  parent.innerHTML = `
                    <div class="text-center px-8">
                      <p class="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 italic">
                        AIと医療従事者の協働を象徴するイメージ
                      </p>
                      <p class="text-sm text-neutral-500 dark:text-neutral-500 mt-2">
                        (画像を配置してください: /images/about-hero.png)
                      </p>
                    </div>
                  `;
                }
              }}
            />
          </motion.div>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-16 md:pb-20 lg:pb-24"
        >
          {/* Our Mission */}
          <motion.section variants={itemVariants} className="mb-8 md:mb-12 lg:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr] gap-4 md:gap-6 lg:gap-8">
              <h2 
                className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight"
                style={{ fontFamily: '"Crimson Pro", "Lora", serif' }}
              >
                Our Mission
              </h2>
              <div 
                className="text-base md:text-lg lg:text-xl text-neutral-900 dark:text-neutral-50 leading-relaxed space-y-3"
                style={{ fontFamily: '"Crimson Pro", "Lora", serif', lineHeight: '1.75' }}
              >
                <p>
                  To empower physicians to reclaim their time and expertise by intelligently handling routine and administrative burdens, allowing them to dedicate more attention to patient dialogue, diagnosis, and treatment.
                </p>
                <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                  医療従事者が日常業務や管理業務を効率的に処理し、患者との対話、診断、治療により多くの時間を割けるよう支援すること。これが私たちのミッションです。
                </p>
              </div>
            </div>
          </motion.section>

          {/* Our Product */}
          <motion.section variants={itemVariants} className="mb-8 md:mb-12 lg:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr] gap-4 md:gap-6 lg:gap-8">
              <h2 
                className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight"
                style={{ fontFamily: '"Crimson Pro", "Lora", serif' }}
              >
                Our Product
              </h2>
              <div 
                className="text-base md:text-lg lg:text-xl text-neutral-900 dark:text-neutral-50 leading-relaxed space-y-3"
                style={{ fontFamily: '"Crimson Pro", "Lora", serif', lineHeight: '1.75' }}
              >
                <p>
                  We build AI prompt libraries and intelligent workflows as the Action Engine for healthcare professionals.
                </p>
                <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                  医療従事者のためのAIプロンプトライブラリとインテリジェントなワークフローを構築しています。100以上の実践的なプロンプト、ステップバイステップのガイド、そして医療安全機能を備えたプラットフォームを提供します。
                </p>
              </div>
            </div>
          </motion.section>

          {/* Our Story */}
          <motion.section variants={itemVariants} className="mb-8 md:mb-12 lg:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-[150px_1fr] gap-4 md:gap-6 lg:gap-8">
              <h2 
                className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight"
                style={{ fontFamily: '"Crimson Pro", "Lora", serif' }}
              >
                Our Story
              </h2>
              <div 
                className="space-y-4 md:space-y-5 text-base md:text-lg lg:text-xl text-neutral-900 dark:text-neutral-50 leading-relaxed"
                style={{ fontFamily: '"Crimson Pro", "Lora", serif', lineHeight: '1.75' }}
              >
                {/* English paragraphs */}
                <p>
                  Life began with two strands, twisted into the double helix. Medicine began with two hands, reaching toward each other.
                </p>
                <p>
                  We don't want technology that replaces. We want technology that amplifies.
                </p>
                <p>
                  Others have built the brain for AI to think. HELIX is building the hands for AI to do—specifically for medicine.
                </p>
                <p>
                  By adding a third strand to the helix, we create something new. Human expertise and AI intelligence, woven together. Not replacing the human in healthcare, but extending human reach.
                </p>
                <p>
                  The connection between one human and another remains at the heart of everything we do.
                </p>

                {/* Japanese paragraphs */}
                <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-neutral-200 dark:border-neutral-700 space-y-4 md:space-y-5">
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    生命は二本の鎖から始まった。絡み合い、二重らせんとなった。医学は二つの手から始まった。互いに手を差し伸べ合うことから。
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    私たちは置き換えるテクノロジーを求めているのではない。拡張するテクノロジーを求めている。
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    他の人々はAIが考えるための「脳」を構築してきた。HELIXはAIが「手」を動かすためのものを構築している。特に医学のために。
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    らせんに第三の鎖を加えることで、新しいものが生まれる。人間の専門性とAIの知性が織り合わされる。医療における人間を置き換えるのではなく、人間の可能性を広げる。
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    一人の人間ともう一人の人間のつながりが、すべての中心にあり続ける。
                  </p>
                </div>
                
                {/* Punchline - Inside Our Story section */}
                <div className="mt-8 md:mt-10 pt-6 md:pt-8">
                  <h3 
                    className="text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight mb-1"
                    style={{ fontFamily: '"Crimson Pro", "Lora", serif', fontWeight: 600 }}
                  >
                    HELIX
                  </h3>
                  <p 
                    className="text-xl md:text-2xl lg:text-3xl font-medium text-neutral-900 dark:text-neutral-50 tracking-tight"
                    style={{ fontFamily: '"Crimson Pro", "Lora", serif' }}
                  >
                    Augmenting Medicine.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>

      </div>
    </Layout>
  );
}
