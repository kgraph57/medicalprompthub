import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { FileText, Shield, AlertCircle, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export default function Legal() {
  useEffect(() => {
    updateSEO({
      title: "利用規約・プライバシーポリシー | Medical Prompt Hub",
      description: "Medical Prompt Hubの利用規約、プライバシーポリシー、免責事項。医療情報の取り扱い、個人情報保護、GDPR準拠について詳しく説明しています。",
      path: "/legal",
      keywords: "利用規約,プライバシーポリシー,免責事項,GDPR,個人情報保護,医療情報"
    });
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Linear.app風：ページヘッダー */}
        <PageHeader
          category="Legal"
          title="Terms and Privacy"
          description="利用規約、プライバシーポリシー、および免責事項"
        />

        <div className="space-y-12">
          {/* 免責事項 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-4 h-4 text-red-600" strokeWidth={2} />
              <span className="text-sm font-medium text-red-600 tracking-[-0.01em]">
                Disclaimer
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
              免責事項
            </h2>
            <div className="space-y-4 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <p className="font-semibold">
                本サービス「Medical Prompt Hub」は、医療従事者の業務効率化を支援するためのAIプロンプト集を提供するものであり、医療アドバイスを提供するものではありません。
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  本サービスで生成されたコンテンツや情報は、参考情報としてのみ利用してください。
                </li>
                <li>
                  実際の診療、診断、治療方針の決定においては、必ず医師や専門家の判断を優先し、各医療機関のガイドラインに従ってください。
                </li>
                <li>
                  本サービスの利用により生じたいかなる損害（医療過誤、情報の誤りによる不利益など）についても、運営者は一切の責任を負いません。
                </li>
                <li>
                  <strong>AIのハルシネーション（誤情報生成）について：</strong>AI（ChatGPT、Claude、Gemini等）は、学習データに基づいて「それらしい」回答を生成しますが、実際には誤った情報や存在しない引用文献を「自信満々に」提示することがあります。特に以下のケースでは注意が必要です：
                  <ul className="list-circle pl-5 mt-1 space-y-1">
                    <li>薬剤投与量や治療プロトコルが古いまたは誤っている</li>
                    <li>引用文献が実在しない、または内容が歪められている</li>
                    <li>最新のガイドラインや研究結果が反映されていない</li>
                    <li>稀な疾患や非典型的な症例に関する情報が不正確</li>
                  </ul>
                </li>
                <li>
                  <strong>ファクトチェックの義務：</strong>ユーザーは、AIの出力内容を以下の信頼できる情報源で必ず確認する責任があります：
                  <ul className="list-circle pl-5 mt-1 space-y-1">
                    <li>最新の臨床ガイドライン（各学会公式、UpToDate等）</li>
                    <li>薬剤添付文書および医薬品インタビューフォーム</li>
                    <li>原著論文（PubMed、医中誌等で検索）</li>
                    <li>信頼できる医療データベース</li>
                  </ul>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* 想定されるエラーシナリオ */}
          <motion.section
            className="bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200/50 dark:border-red-900/50 p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-4 h-4 text-red-600" strokeWidth={2} />
              <span className="text-sm font-medium text-red-600 tracking-[-0.01em]">
                Error Scenarios
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-red-900 dark:text-red-400 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
              想定されるエラーシナリオと防止策
            </h2>
            <div className="space-y-4 text-base text-red-800 dark:text-red-300 leading-relaxed">
              <p className="font-semibold text-red-900">
                以下は、AIプロンプトを医療現場で使用する際に起こりうる具体的なエラーシナリオです。必ず読んで、同様のエラーを防いでください。
              </p>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-3">
                  <h4 className="font-semibold text-red-900">シナリオ1：鑑別診断プロンプトで重篤疾患を見逃す</h4>
                  <p className="mt-1">
                    <strong>例：</strong>「胸痛」を主訴として鑑別診断を生成したが、AIが「筋骨格系痛み」を第一に挙げ、急性心筋棗塞や大動脈解離などのCritical疾患の優先度が低かった。
                  </p>
                  <p className="mt-1 text-red-800">
                    <strong>防止策：</strong>鑑別診断プロンプトを使用する前に、必ずバイタルサイン、身体所見、リスク因子を再確認し、AIが提示した「Critical疾患」が臨床像と矛盾しないかを必ず検証する。
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-3">
                  <h4 className="font-semibold text-red-900">シナリオ2：薬剤投与量の誤り</h4>
                  <p className="mt-1">
                    <strong>例：</strong>腔機能低下患者に対する薬剤投与量調節プロンプトを使用したが、AIが提案した投与量が添付文書の推奨量と異なり、そのまま処方してしまった。
                  </p>
                  <p className="mt-1 text-red-800">
                    <strong>防止策：</strong>薬剤投与量はAIの出力をそのまま使用せず、必ず最新の添付文書、医薬品インタビューフォーム、または信頼できるデータベース（Sanford Guide、UpToDate等）で確認する。
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-3">
                  <h4 className="font-semibold text-red-900">シナリオ3：存在しない引用文献を信じる</h4>
                  <p className="mt-1">
                    <strong>例：</strong>治療計画プロンプトで「最新のガイドラインに基づく」と指示したが、AIが引用した論文やガイドラインが実在せず、誤った治療を行ってしまった。
                  </p>
                  <p className="mt-1 text-red-800">
                    <strong>防止策：</strong>AIが引用した文献やガイドラインは、必ずPubMed、医中誌、各学会公式サイトで実在を確認する。特に「2023年版」など具体的な年号が記載されている場合、その文書が本当に存在するかを確認する。
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-3">
                  <h4 className="font-semibold text-red-900">シナリオ4：患者情報の入力不足</h4>
                  <p className="mt-1">
                    <strong>例：</strong>鑑別診断プロンプトに、主訴と現病歴のみを入力し、既往歴やバイタルサインを省略したため、AIが不十分な情報に基づいて誤った鑑別診断を提示した。
                  </p>
                  <p className="mt-1 text-red-800">
                    <strong>防止策：</strong>プロンプトの入力項目はすべて埋める。特に診断支援プロンプトでは、バイタルサイン、既往歴、アレルギー歴、家族歴などを漏れなく入力する。
                  </p>
                </div>
              </div>
            </motion.section>

          {/* 利用規約 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-4 h-4 text-blue-600" strokeWidth={2} />
              <span className="text-sm font-medium text-blue-600 tracking-[-0.01em]">
                Terms of Service
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
              利用規約
            </h2>
            <div className="space-y-4 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <div>
                <h3 className="font-semibold mb-3 text-lg text-neutral-900 dark:text-neutral-50">1. サービスの利用について</h3>
                <p>
                  本サービスは、医療従事者および医療関係者を主な対象としていますが、利用資格を限定するものではありません。ユーザーは、自己の責任において本サービスを利用するものとします。
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="font-semibold mb-3 text-lg text-neutral-900 dark:text-neutral-50">2. 禁止事項</h3>
                <p className="mb-3">以下の行為を禁止します：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>本サービスの運営を妨害する行為</li>
                  <li>他のユーザーや第三者に不利益を与える行為</li>
                  <li>個人情報（患者情報など）を匿名化せずにAIに入力する行為</li>
                </ul>
              </div>
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="font-semibold mb-3 text-lg text-neutral-900 dark:text-neutral-50">3. 知的財産権</h3>
                <p className="mb-3">
                  本サービスに含まれるすべてのコンテンツ（プロンプト、テキスト、画像、デザイン等）の著作権およびその他の知的財産権は、運営者または正当な権利者に帰属します。ユーザーは、本サービスの利用目的の範囲内でのみ、これらのコンテンツを使用することができます。
                </p>
                <p>
                  プロンプトはMITライセンスの下で公開されており、自由に使用・改変・配布できますが、医療情報の正確性には十分注意してください。
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="font-semibold mb-3 text-lg text-neutral-900 dark:text-neutral-50">4. 利用者の責任</h3>
                <p className="mb-3">ユーザーは、以下の責任を負います：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>本サービスの利用に伴うすべての行為についての責任</li>
                  <li>AIの出力内容の事実確認（ファクトチェック）の責任</li>
                  <li>医療情報の正確性の確認の責任</li>
                  <li>患者情報の匿名化の責任</li>
                  <li>法令遵守の責任</li>
                </ul>
              </div>
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="font-semibold mb-3 text-lg text-neutral-900 dark:text-neutral-50">5. サービスの変更・停止</h3>
                <p>
                  運営者は、ユーザーへの事前の通知なく、本サービスの内容を変更、または提供を停止することができるものとします。ただし、重要な変更や停止については、可能な限り事前に通知いたします。
                </p>
              </div>
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <h3 className="font-semibold mb-3 text-lg text-neutral-900 dark:text-neutral-50">6. 準拠法・管轄裁判所</h3>
                <p>
                  本利用規約は、日本法に準拠して解釈されるものとします。本サービスに関する紛争については、運営者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
                </p>
              </div>
            </div>
          </motion.section>

          {/* プライバシーポリシー */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-4 h-4 text-blue-600" strokeWidth={2} />
              <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-[-0.01em]">
                Privacy Policy
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
              プライバシーポリシー
            </h2>
            <div className="space-y-6 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <section>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">1. 個人情報の収集</h3>
                  <CookieSettingsButton />
                </div>
                <p>
                  本サービスでは、Google Analytics等のアクセス解析ツールを使用し、トラフィックデータを収集するためにCookieを使用する場合があります。このデータは匿名で収集されており、個人を特定するものではありません。
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cookieの設定は、ページ上部の「Cookie設定」ボタンからいつでも変更できます。
                </p>
              </section>
              <Separator />
              <section>
                <h3 className="font-semibold mb-2">2. データの利用目的</h3>
                <p>収集した情報は、以下の目的で利用します：</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>サービスの改善および新機能の開発</li>
                  <li>利用状況の分析</li>
                  <li>不正利用の防止</li>
                </ul>
              </section>
              <Separator />
              <section>
                <h3 className="font-semibold mb-2">3. データの保存期間</h3>
                <p>
                  本サービスで収集するデータの保存期間は以下の通りです：
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>アクセス解析データ（Google Analytics等）: 26ヶ月（Google Analyticsのデフォルト設定に準拠）</li>
                  <li>お気に入りデータ（ローカルストレージ）: ユーザーが削除するまで、またはブラウザのデータをクリアするまで</li>
                  <li>Cookieデータ: 各Cookieの有効期限に従う（通常1年以内）</li>
                </ul>
                <p className="mt-2 text-sm text-muted-foreground">
                  データの保存期間は、法的要件やサービスの運営に必要な期間を考慮して設定されています。
                </p>
              </section>
              <Separator />
              <section>
                <h3 className="font-semibold mb-2">4. 第三者への提供</h3>
                <p>
                  本サービスでは、以下の場合を除き、個人情報を第三者に提供することはありません：
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>ユーザーの同意がある場合</li>
                  <li>法令に基づく場合</li>
                  <li>人の生命、身体または財産の保護のために必要がある場合</li>
                  <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
                </ul>
                <p className="mt-2">
                  <strong>アクセス解析ツールについて：</strong>Google Analytics等のアクセス解析ツールを使用していますが、これらは匿名のトラフィックデータのみを収集し、個人を特定するものではありません。
                </p>
              </section>
              <Separator />
              <section>
                <h3 className="font-semibold mb-2">5. データのセキュリティ対策</h3>
                <p>
                  本サービスでは、個人情報の保護のため、以下のセキュリティ対策を実施しています：
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>HTTPSによる暗号化通信</li>
                  <li>個人情報の収集を最小限に抑制</li>
                  <li>サーバーへの個人情報送信を回避（ローカルストレージのみ使用）</li>
                  <li>定期的なセキュリティ監査</li>
                  <li>最新のセキュリティパッチの適用</li>
                </ul>
              </section>
              <Separator />
              <section>
                <h3 className="font-semibold mb-2">6. データ主体の権利（GDPR準拠）</h3>
                <p>
                  本サービスは、GDPR（EU一般データ保護規則）および日本の個人情報保護法に準拠しています。データ主体（ユーザー）は、以下の権利を有します：
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>アクセス権：</strong>自分の個人情報がどのように処理されているかを確認する権利</li>
                  <li><strong>訂正権：</strong>不正確な個人情報を訂正する権利</li>
                  <li><strong>削除権（忘れられる権利）：</strong>個人情報の削除を要求する権利</li>
                  <li><strong>処理制限権：</strong>個人情報の処理を制限する権利</li>
                  <li><strong>データポータビリティ権：</strong>自分の個人情報を機械可読形式で受け取る権利</li>
                  <li><strong>異議申立権：</strong>個人情報の処理に異議を申し立てる権利</li>
                </ul>
                <p className="mt-2">
                  これらの権利を行使したい場合は、<a href="/contact" className="text-primary underline">お問い合わせフォーム</a>からご連絡ください。30日以内に対応いたします。
                </p>
              </section>
              <Separator />
              <section>
                <h3 className="font-semibold mb-2">7. 患者情報の取り扱いについて</h3>
                <p className="text-destructive font-medium">
                  重要：本サービス内で提供されるプロンプトを使用する際、ChatGPT等の外部AIサービスに患者の個人情報（氏名、ID、生年月日、住所など）を絶対に入力しないでください。
                </p>
                <p className="mt-2">
                  患者情報の取り扱いについては、以下の規制に準拠する必要があります：
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>個人情報保護法（日本）</li>
                  <li>医療法、医師法（日本）</li>
                  <li>HIPAA（米国、該当する場合）</li>
                  <li>GDPR（EU、該当する場合）</li>
                </ul>
                <p className="mt-2">
                  プロンプトを使用する際は、必ず個人情報を削除または仮名に置き換えるなどの匿名化処理を行ってください。
                </p>
              </section>
              <Separator />
              <section>
                <h3 className="font-semibold mb-2">8. お問い合わせ先</h3>
                <p>
                  プライバシーに関するお問い合わせ、データ主体の権利の行使、苦情等については、<a href="/contact" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">お問い合わせフォーム</a>からご連絡ください。
                </p>
                <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                  お問い合わせへの返信は、通常24時間以内に行います。重要な問題については、できるだけ早く対応いたします。
                </p>
              </section>
              <Separator />
              <section>
                <h3 className="font-semibold mb-2">9. プライバシーポリシーの変更</h3>
                <p className="mb-3">
                  本プライバシーポリシーは、法令の変更やサービスの改善に伴い、予告なく変更される場合があります。重要な変更については、本ページで通知いたします。
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  最終更新日: 2025年1月
                </p>
              </section>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
}
