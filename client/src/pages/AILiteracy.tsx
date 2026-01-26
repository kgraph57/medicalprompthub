import { Layout } from "@/components/Layout";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface SectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

function Section({ number, title, children }: SectionProps) {
  return (
    <motion.section variants={itemVariants} className="relative">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-sm font-mono text-neutral-400 dark:text-neutral-500">
          {number}
        </span>
        <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-[-0.01em]">
          {title}
        </h2>
      </div>
      <div className="pl-0 md:pl-10 space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}

interface WarningBoxProps {
  children: React.ReactNode;
}

function WarningBox({ children }: WarningBoxProps) {
  return (
    <div className="border-l-2 border-red-500 pl-4 py-2 text-neutral-700 dark:text-neutral-300">
      {children}
    </div>
  );
}

interface TipBoxProps {
  children: React.ReactNode;
}

function TipBox({ children }: TipBoxProps) {
  return (
    <div className="border-l-2 border-blue-500 pl-4 py-2 text-neutral-700 dark:text-neutral-300">
      {children}
    </div>
  );
}

export default function AILiteracy() {
  useEffect(() => {
    updateSEO({
      title: "AIリテラシーガイド | HELIX",
      description: "医療現場でAIを安全に活用するために知っておくべきこと。AIの限界、ハルシネーション、ファクトチェックの重要性を解説します。",
      path: "/ai-literacy",
      keywords: "AIリテラシー,ハルシネーション,ファクトチェック,医療AI,安全なAI活用"
    });
  }, []);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Guide
              </span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] mb-4">
              AIリテラシー
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400">
              医療現場でAIを安全に活用するための基礎知識
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-12 md:space-y-16">
            <Section number="01" title="AIは「理解」していない">
              <p>
                LLM（大規模言語モデル）は膨大なテキストから統計的パターンを学習し、「次に来る単語」を予測して文章を生成しています。医学知識を「理解」しているのではなく、学習データに基づいて「それらしい」回答を生成しているに過ぎません。
              </p>
              <TipBox>
                AIの出力を「専門家の意見」として鵜呑みにせず、必ず信頼できる情報源で検証してください。
              </TipBox>
            </Section>

            <Section number="02" title="ハルシネーション">
              <p>
                ハルシネーションとは、AIが事実に基づかない情報を自信満々に生成する現象です。医療分野では特に危険です。
              </p>
              <div className="space-y-3 text-[15px]">
                <div className="flex gap-3">
                  <span className="text-neutral-400 font-mono text-sm mt-0.5">•</span>
                  <div>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">存在しない引用文献</span>
                    <span className="text-neutral-500"> — 論文タイトル、著者名、雑誌名まで詳細に生成するが、PubMedで見つからない</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-neutral-400 font-mono text-sm mt-0.5">•</span>
                  <div>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">古い治療プロトコル</span>
                    <span className="text-neutral-500"> — 学習データのカットオフ以降の最新ガイドラインが反映されていない</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-neutral-400 font-mono text-sm mt-0.5">•</span>
                  <div>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">薬剤投与量の誤り</span>
                    <span className="text-neutral-500"> — 腎機能や体重に応じた適切な調整ができない</span>
                  </div>
                </div>
              </div>
              <WarningBox>
                引用文献はPubMedで確認。治療計画は最新ガイドラインと照合。薬剤投与量は添付文書で検証。
              </WarningBox>
            </Section>

            <Section number="03" title="学習データのバイアス">
              <p>
                AIは学習データに含まれるバイアスをそのまま反映します。
              </p>
              <div className="space-y-3 text-[15px]">
                <div className="flex gap-3">
                  <span className="text-neutral-400 font-mono text-sm mt-0.5">•</span>
                  <div>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">人種・民族</span>
                    <span className="text-neutral-500"> — 欧米文献中心のため、アジア人等への診断精度が低下する可能性</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-neutral-400 font-mono text-sm mt-0.5">•</span>
                  <div>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">性別</span>
                    <span className="text-neutral-500"> — 臨床試験の男性偏重により、女性特有の症状データが不足</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-neutral-400 font-mono text-sm mt-0.5">•</span>
                  <div>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">地域</span>
                    <span className="text-neutral-500"> — 先進国の医療環境を前提とし、熱帯病等の情報が不足</span>
                  </div>
                </div>
              </div>
            </Section>

            <Section number="04" title="確率的な出力">
              <p>
                AIは同じプロンプトでも毎回異なる出力を生成することがあります。これは不確実性の表れであり、出力を鵜呑みにせず、複数の情報源と照合する必要があります。
              </p>
              <TipBox>
                重要な判断では同じプロンプトを複数回実行し、出力のバリエーションを確認することでAIの確信度を評価できます。
              </TipBox>
            </Section>

            <Section number="05" title="よくある失敗">
              <div className="space-y-6">
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">存在しない論文を引用</p>
                  <p className="text-sm text-neutral-500">
                    → PubMed、医中誌、Google Scholarで実在を必ず確認
                  </p>
                </div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">古いガイドラインの提示</p>
                  <p className="text-sm text-neutral-500">
                    → 各学会公式サイト、UpToDateで最新版を確認
                  </p>
                </div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">不適切な薬剤投与量</p>
                  <p className="text-sm text-neutral-500">
                    → 添付文書、インタビューフォームで検証。特に腎・肝機能低下例は要注意
                  </p>
                </div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">患者情報の入力</p>
                  <p className="text-sm text-neutral-500">
                    → 必ず匿名化。「60歳男性」「患者A」など個人特定不可の表現を使用
                  </p>
                </div>
              </div>
            </Section>

            {/* Summary */}
            <motion.section variants={itemVariants} className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-[-0.01em] mb-6">
                5つの原則
              </h2>
              <ol className="space-y-3 text-[15px]">
                <li className="flex gap-3">
                  <span className="text-neutral-400 font-mono text-sm">1.</span>
                  <span>AIは補助ツール。最終判断は医師が行う</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-neutral-400 font-mono text-sm">2.</span>
                  <span>ファクトチェックは必須</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-neutral-400 font-mono text-sm">3.</span>
                  <span>バイアスを認識し、患者背景を考慮</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-neutral-400 font-mono text-sm">4.</span>
                  <span>ハルシネーションに常に警戒</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-neutral-400 font-mono text-sm">5.</span>
                  <span>高リスクプロンプトにはチェックリストを使用</span>
                </li>
              </ol>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
