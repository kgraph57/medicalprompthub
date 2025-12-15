/**
 * Aboutページ
 * Manus風のデザインでHelixについて紹介
 */

import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";

export default function About() {
  useEffect(() => {
    updateSEO({
      title: "About Us - Helix",
      description: "Helixのミッション、製品、ストーリーについて。医療従事者のためのAIプロンプトライブラリ。",
      path: "/about",
      keywords: "About,Helix,ミッション,医療AI,プロンプト"
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
        ease: [0.16, 1, 0.3, 1],
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

          {/* Hero Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-900 aspect-[16/9] md:aspect-[16/8] mb-16 md:mb-20 flex items-center justify-center"
          >
            <div className="text-center px-8">
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 italic">
                AIと医療従事者の協働を象徴するイメージ
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-2">
                (画像プレースホルダー)
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-24"
        >
          {/* Our Mission */}
          <motion.section variants={itemVariants} className="mb-12 md:mb-16 lg:mb-20">
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
          <motion.section variants={itemVariants} className="mb-12 md:mb-16 lg:mb-20">
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
          <motion.section variants={itemVariants} className="mb-12 md:mb-16 lg:mb-20">
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
                <div className="space-y-2">
                  <p>
                    We don't want overachieving AI, we want overachieving healthcare professionals.
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    私たちは、優秀すぎるAIではなく、優秀な医療従事者を求めています。
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    We need to put the full power of AI to work by unlocking the code, not just for engineers but for everyone in healthcare.
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    AIの力を最大限に活用するため、エンジニアだけでなく、医療に携わるすべての人にコードを解き放つ必要があります。
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    Others have built the brain for AI to think, Helix is building the hands for AI to do—specifically for medical practice.
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    他の人々がAIの「脳」を構築してきましたが、HelixはAIの「手」を構築しています—特に医療実践のために。
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    By using AI to give every healthcare professional the tools to leverage their expertise, Helix is extending human reach in medicine.
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    AIを使ってすべての医療従事者に専門知識を活用するツールを提供することで、Helixは医学における人間の可能性を拡張しています。
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    Named after the double helix structure of DNA, Helix represents the fundamental building block of life and medicine. By adding AI as a third strand to the double helix, Helix evolves into a new DNA structure. The expertise of healthcare professionals and the intelligence of AI intertwine, creating a new blueprint for life that enables more powerful and refined medical care.
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    DNAの二重らせん構造から名付けられたHelixは、生命と医学の基本構造を表しています。二重らせんにAIという第三の線を加えることで、Helixは新たなDNA構造へと進化します。医療従事者の専門性とAIの知性が絡み合い、より強力で洗練された医療ケアを実現するための新しい生命の設計図を描いています。
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    We believe that AI technology should not replace healthcare professionals, but complement them. Clinical judgment, empathy, and decision-making abilities are essential to healthcare professionals, and Helix supports and enhances these strengths by handling routine, time-consuming tasks.
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-neutral-700 dark:text-neutral-300">
                    私たちは、AI技術が医療従事者を置き換えるのではなく、補完するべきだと信じています。臨床判断、共感、意思決定能力は医療従事者に不可欠であり、Helixは日常的な時間のかかるタスクを処理することで、これらの強みをサポートし強化します。
                  </p>
                </div>
                
                {/* Punchline - Inside Our Story section */}
                <div className="mt-8 md:mt-10 pt-6 md:pt-8">
                  <h3 
                    className="text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight mb-1"
                    style={{ fontFamily: '"Crimson Pro", "Lora", serif', fontWeight: 600 }}
                  >
                    Helix
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
