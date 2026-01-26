import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { updateSEO, addFAQStructuredData } from "@/lib/seo";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
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

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  items: FAQItem[];
}

function FAQSection({ title, items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.section variants={itemVariants}>
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
        {title}
      </h2>
      <div className="space-y-0 border-t border-neutral-200 dark:border-neutral-800">
        {items.map((item, index) => (
          <div key={index} className="border-b border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full py-4 flex items-center justify-between text-left"
            >
              <span className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100 pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 transition-transform flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="pb-4 text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}

const faqData = {
  basic: {
    title: "基本情報",
    items: [
      {
        question: "HELIXとは何ですか？",
        answer: "医療従事者がAI（ChatGPT、Claude、Gemini等）を効果的に活用するためのプロンプト集・学習プラットフォームです。100以上のプロンプト、ワークフローガイド、AI活用Tipsを提供しています。"
      },
      {
        question: "誰が利用できますか？",
        answer: "医療従事者（医師、看護師、薬剤師、研究者等）を主な対象としていますが、どなたでも無料で利用できます。"
      },
      {
        question: "どのAIサービスで使用できますか？",
        answer: "ChatGPT、Claude、Gemini等の主要なAIチャットサービスで使用できます。プロンプトをコピーして貼り付けるだけです。"
      },
      {
        question: "アカウント登録は必要ですか？",
        answer: "不要です。お気に入り等はブラウザのローカルストレージに保存されます。"
      }
    ]
  },
  usage: {
    title: "使い方",
    items: [
      {
        question: "プロンプトの使い方を教えてください",
        answer: "1. カテゴリまたは検索でプロンプトを探す → 2. 入力フィールドに情報を入力（任意） → 3. コピーボタンでコピー → 4. AIサービスに貼り付け → 5. 結果を確認・検証"
      },
      {
        question: "プロンプトをカスタマイズできますか？",
        answer: "はい。専門分野や施設のガイドラインに合わせて自由に編集できます。医療情報の正確性には注意してください。"
      },
      {
        question: "お気に入り機能の使い方は？",
        answer: "プロンプト詳細ページで「お気に入りに追加」をクリック。ブラウザのローカルストレージに保存されるため、同じブラウザでアクセスすると保持されます。"
      }
    ]
  },
  troubleshooting: {
    title: "トラブルシューティング",
    items: [
      {
        question: "プロンプトがうまく動作しません",
        answer: "全体が正しくコピーされているか確認。[ ]や{{ }}の部分を適切に置き換え。AIサービスの制限に達していないか確認。別のAIサービスで試してみてください。"
      },
      {
        question: "お気に入りが消えました",
        answer: "ブラウザのキャッシュやデータをクリアした場合、プライベートモードの場合、別のブラウザ・デバイスでアクセスした場合に消えます。"
      },
      {
        question: "ページが読み込まれません",
        answer: "ページを再読み込み、ブラウザのキャッシュをクリア、インターネット接続を確認してください。"
      }
    ]
  },
  privacy: {
    title: "プライバシー・セキュリティ",
    items: [
      {
        question: "患者情報を入力しても大丈夫ですか？",
        answer: "絶対に患者の個人情報をAIサービスに入力しないでください。氏名、ID、生年月日、住所等は匿名化または削除してから使用してください。"
      },
      {
        question: "個人情報は収集されますか？",
        answer: "Google Analytics等で匿名のトラフィックデータを収集しますが、個人を特定する情報は収集しません。詳細はプライバシーポリシーをご確認ください。"
      },
      {
        question: "入力したデータは保存されますか？",
        answer: "プロンプトの入力内容はサーバーに送信されません。お気に入り等はブラウザのローカルストレージにのみ保存されます。"
      }
    ]
  },
  other: {
    title: "その他",
    items: [
      {
        question: "機能の提案やバグ報告はできますか？",
        answer: "お問い合わせフォームまたはGitHub Issuesから受け付けています。皆様のフィードバックを元にサービスを改善していきます。"
      },
      {
        question: "プロンプトを追加・改善したい",
        answer: "GitHubのプルリクエストから提案してください。医療従事者の実践的な知見を共有いただけると、サービス全体の品質向上につながります。"
      },
      {
        question: "ライセンスについて",
        answer: "MITライセンスで公開。自由に使用・改変・配布可能ですが、医療情報の正確性には十分注意してください。"
      }
    ]
  }
};

export default function FAQ() {
  useEffect(() => {
    updateSEO({
      title: "よくある質問（FAQ） | HELIX",
      description: "HELIXのよくある質問。プロンプトの使い方、トラブル解決、プライバシー・セキュリティについて。",
      path: "/faq",
      keywords: "FAQ,よくある質問,ヘルプ,サポート"
    });

    addFAQStructuredData([
      { question: "HELIXとは何ですか？", answer: faqData.basic.items[0].answer },
      { question: "誰が利用できますか？", answer: faqData.basic.items[1].answer },
      { question: "患者情報を入力しても大丈夫ですか？", answer: faqData.privacy.items[0].answer },
      { question: "プロンプトの使い方を教えてください", answer: faqData.usage.items[0].answer },
    ]);
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
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Support
              </span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] mb-4">
              よくある質問
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              ご不明な点がありましたらお問い合わせください
            </p>
          </motion.div>

          {/* FAQ Sections */}
          <div className="space-y-12">
            <FAQSection {...faqData.basic} />
            <FAQSection {...faqData.usage} />
            <FAQSection {...faqData.troubleshooting} />
            <FAQSection {...faqData.privacy} />
            <FAQSection {...faqData.other} />
          </div>

          {/* Warning */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800"
          >
            <div className="border-l-2 border-red-500 pl-4 py-2">
              <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                重要な注意事項
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                本サービスは医療アドバイスを提供するものではありません。AI出力は必ずファクトチェックし、患者の個人情報は絶対に入力しないでください。
              </p>
            </div>
            <p className="text-sm text-neutral-500 mt-4">
              詳細は<a href="/legal" className="text-blue-600 dark:text-blue-400 hover:underline">利用規約・免責事項</a>をご確認ください。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
