import { Layout } from "@/components/Layout";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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
  title: string;
  children: React.ReactNode;
  warning?: boolean;
}

function Section({ title, children, warning }: SectionProps) {
  return (
    <motion.section variants={itemVariants} className="relative">
      <h2 className={`text-xl md:text-2xl font-semibold mb-4 tracking-[-0.01em] ${warning ? 'text-red-600 dark:text-red-400' : 'text-neutral-900 dark:text-neutral-50'}`}>
        {title}
      </h2>
      <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}

export default function Legal() {
  useEffect(() => {
    updateSEO({
      title: "利用規約・プライバシーポリシー | HELIX",
      description: "HELIXの利用規約、プライバシーポリシー、免責事項。医療情報の取り扱い、個人情報保護、GDPR準拠について。",
      path: "/legal",
      keywords: "利用規約,プライバシーポリシー,免責事項,GDPR,個人情報保護"
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
                Legal
              </span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] mb-4">
              Terms & Privacy
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400">
              利用規約、プライバシーポリシー、免責事項
            </p>
          </motion.div>

          <div className="space-y-12 md:space-y-16">
            {/* 免責事項 */}
            <Section title="免責事項" warning>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                HELIXは医療アドバイスを提供するものではありません。
              </p>
              <ul className="space-y-2 text-[15px]">
                <li className="flex gap-3">
                  <span className="text-neutral-400">•</span>
                  <span>生成された情報は参考情報としてのみ利用</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-neutral-400">•</span>
                  <span>診療・治療方針は医師の判断を優先</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-neutral-400">•</span>
                  <span>本サービス利用による損害について運営者は責任を負いません</span>
                </li>
              </ul>
              <div className="border-l-2 border-red-500 pl-4 py-2 mt-4">
                <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">AIのハルシネーションに注意</p>
                <p className="text-sm">
                  AIは誤った情報や存在しない引用文献を自信満々に提示することがあります。薬剤投与量、治療プロトコル、引用文献は必ず一次情報源で確認してください。
                </p>
              </div>
            </Section>

            {/* 利用規約 */}
            <Section title="利用規約">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">サービスの利用</h3>
                  <p className="text-[15px]">
                    医療従事者を主な対象としていますが、利用資格は限定しません。自己責任で利用してください。
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">禁止事項</h3>
                  <ul className="space-y-1 text-[15px]">
                    <li className="flex gap-3">
                      <span className="text-neutral-400">•</span>
                      <span>法令・公序良俗に違反する行為</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-neutral-400">•</span>
                      <span>サービス運営の妨害</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-neutral-400">•</span>
                      <span>患者情報を匿名化せずにAIに入力する行為</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">知的財産権</h3>
                  <p className="text-[15px]">
                    プロンプトはMITライセンスで公開。自由に使用・改変・配布可能ですが、医療情報の正確性には注意してください。
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">利用者の責任</h3>
                  <ul className="space-y-1 text-[15px]">
                    <li className="flex gap-3">
                      <span className="text-neutral-400">•</span>
                      <span>AI出力のファクトチェック</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-neutral-400">•</span>
                      <span>患者情報の匿名化</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-neutral-400">•</span>
                      <span>法令遵守</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* プライバシーポリシー */}
            <Section title="プライバシーポリシー">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">データ収集</h3>
                    <CookieSettingsButton />
                  </div>
                  <p className="text-[15px]">
                    Google Analytics等でトラフィックデータを収集。匿名で個人特定不可。Cookieはいつでも設定変更可能。
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">データ利用目的</h3>
                  <ul className="space-y-1 text-[15px]">
                    <li className="flex gap-3">
                      <span className="text-neutral-400">•</span>
                      <span>サービス改善・新機能開発</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-neutral-400">•</span>
                      <span>利用状況分析</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-neutral-400">•</span>
                      <span>不正利用防止</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">セキュリティ</h3>
                  <ul className="space-y-1 text-[15px]">
                    <li className="flex gap-3">
                      <span className="text-neutral-400">•</span>
                      <span>HTTPS暗号化通信</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-neutral-400">•</span>
                      <span>個人情報収集の最小化</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-neutral-400">•</span>
                      <span>サーバーへの個人情報送信なし（ローカルストレージのみ）</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">GDPR準拠</h3>
                  <p className="text-[15px]">
                    アクセス権、訂正権、削除権、処理制限権、データポータビリティ権、異議申立権を保障。<a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">お問い合わせ</a>から30日以内に対応。
                  </p>
                </div>
              </div>
            </Section>

            {/* 患者情報 */}
            <Section title="患者情報の取り扱い" warning>
              <div className="border-l-2 border-red-500 pl-4 py-2">
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  患者の個人情報をAIサービスに入力しないでください。
                </p>
              </div>
              <p className="text-[15px]">
                氏名、ID、生年月日、住所等は匿名化または削除してから使用。個人情報保護法、HIPAA、GDPRに準拠が必要です。
              </p>
            </Section>

            {/* Footer */}
            <motion.div variants={itemVariants} className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-500">
                最終更新: 2025年1月 / 準拠法: 日本法
              </p>
              <p className="text-sm text-neutral-500 mt-2">
                お問い合わせ: <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact</a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
