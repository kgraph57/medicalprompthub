import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, AlertCircle, BookOpen, Settings, Shield, MessageSquare } from "lucide-react";
import { useEffect } from "react";
import { updateSEO, addFAQStructuredData } from "@/lib/seo";

export default function FAQ() {
  useEffect(() => {
    updateSEO({
      title: "よくある質問（FAQ）",
      description: "Helixのよくある質問とトラブルシューティングガイド。プロンプトの使い方、トラブル解決、プライバシー・セキュリティに関する情報を提供します。",
      path: "/faq",
      keywords: "FAQ,よくある質問,トラブルシューティング,ヘルプ,サポート"
    });

    // FAQ構造化データを追加（主要なFAQを追加）
    addFAQStructuredData([
      {
        question: "Helixとは何ですか？",
        answer: "Helixは、医療従事者がAI（ChatGPT、Claude、Geminiなど）を臨床、研究、教育に効果的に活用するための実践的なプロンプト集です。100以上の専門プロンプト、ワークフローガイド、AI活用Tipsを提供しています。"
      },
      {
        question: "誰が利用できますか？",
        answer: "主に医療従事者（医師、看護師、薬剤師、研究者など）を対象としていますが、医療に関心のある方であればどなたでも利用できます。利用資格を限定するものではありません。"
      },
      {
        question: "無料で利用できますか？",
        answer: "はい、Helixは無料で利用できます。ただし、プロンプトを使用する際に必要なAIサービス（ChatGPT、Claude等）の利用には、それぞれのサービスの利用規約と料金が適用されます。"
      },
      {
        question: "患者情報を入力しても大丈夫ですか？",
        answer: "絶対に患者の個人情報をAIサービスに入力しないでください。患者の氏名、ID、生年月日、住所などの個人情報は、匿名化または削除してから使用してください。個人情報保護法、HIPAA（米国）、GDPR（EU）などの規制に違反する可能性があります。"
      },
      {
        question: "プロンプトの使い方を教えてください",
        answer: "目的に応じてプロンプトを検索またはカテゴリから選択し、プロンプト詳細ページで必要に応じて入力フィールドに情報を入力します。生成されたプロンプトをコピーして、お使いのAIサービス（ChatGPT、Claude等）に貼り付けます。AIの回答を確認し、必要に応じて修正・調整してください。"
      }
    ]);
  }, []);
  return (
    <Layout>
      <div className="space-y-4 pb-12">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">よくある質問（FAQ）</h1>
          <p className="text-sm text-muted-foreground">
            よくある質問とトラブルシューティングガイド
          </p>
        </div>

        <div className="grid gap-4">
          {/* 基本情報 */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <HelpCircle className="w-4 h-4" />
                基本情報
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is-this">
                  <AccordionTrigger className="text-sm">Helixとは何ですか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      Helixは、医療従事者がAI（ChatGPT、Claude、Geminiなど）を臨床、研究、教育に効果的に活用するための実践的なプロンプト集です。100以上の専門プロンプト、ワークフローガイド、AI活用Tipsを提供しています。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="who-can-use">
                  <AccordionTrigger className="text-sm">誰が利用できますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      主に医療従事者（医師、看護師、薬剤師、研究者など）を対象としていますが、医療に関心のある方であればどなたでも利用できます。利用資格を限定するものではありません。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="is-free">
                  <AccordionTrigger>無料で利用できますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed">
                      はい、Helixは無料で利用できます。ただし、プロンプトを使用する際に必要なAIサービス（ChatGPT、Claude等）の利用には、それぞれのサービスの利用規約と料金が適用されます。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="what-ai-services">
                  <AccordionTrigger className="text-sm">どのAIサービスで使用できますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      プロンプトは、ChatGPT、Claude、Gemini、その他の主要なAIチャットサービスで使用できます。プロンプトをコピーして、お使いのAIサービスに貼り付けるだけで使用できます。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="mobile-support">
                  <AccordionTrigger className="text-sm">モバイルデバイスで使用できますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      はい、Helixはモバイルデバイス（スマートフォン、タブレット）でも使用できます。レスポンシブデザインに対応しており、どのデバイスからでも快適にご利用いただけます。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="offline-use">
                  <AccordionTrigger className="text-sm">オフラインで使用できますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      いいえ、Helixはインターネット接続が必要です。ただし、プロンプトをコピーして保存しておけば、オフラインでもAIサービス（ChatGPT等）で使用できます。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="update-frequency">
                  <AccordionTrigger className="text-sm">プロンプトはどのくらいの頻度で更新されますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      プロンプトは定期的に更新・追加されています。新規プロンプトの追加や既存プロンプトの改善は、医療従事者の皆様のフィードバックを元に継続的に行われています。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="language-support">
                  <AccordionTrigger className="text-sm">多言語対応はありますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      現在は日本語のみの対応ですが、将来的に英語やその他の言語への対応を検討しています。プロンプト自体は英語で記述されているものもあり、多様なAIサービスで使用できます。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="account-required">
                  <AccordionTrigger className="text-sm">アカウント登録は必要ですか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      いいえ、アカウント登録は不要です。Helixは誰でも無料で利用できます。お気に入り機能はブラウザのローカルストレージを使用するため、アカウント登録は必要ありません。
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* 使い方 */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="w-4 h-4" />
                使い方
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="how-to-use">
                  <AccordionTrigger className="text-sm">プロンプトの使い方を教えてください</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>基本的な使い方は以下の通りです：</p>
                      <ol className="list-decimal pl-4 space-y-1">
                        <li>目的に応じてプロンプトを検索またはカテゴリから選択</li>
                        <li>プロンプト詳細ページで、必要に応じて入力フィールドに情報を入力</li>
                        <li>生成されたプロンプトをコピー</li>
                        <li>お使いのAIサービス（ChatGPT、Claude等）に貼り付け</li>
                        <li>AIの回答を確認し、必要に応じて修正・調整</li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="input-fields">
                  <AccordionTrigger className="text-sm">入力フィールドは必須ですか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      入力フィールドは、プロンプトをより具体的で有用なものにするためのものです。必須ではありませんが、入力することで、より精度の高い結果が得られます。プロンプト内の<code className="px-1 py-0.5 bg-muted rounded text-[10px]">[ ]</code>や<code className="px-1 py-0.5 bg-muted rounded text-[10px]">{`{{ }}`}</code>の部分を自分の情報に置き換えることもできます。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="customize-prompt">
                  <AccordionTrigger className="text-sm">プロンプトをカスタマイズできますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      はい、プロンプトは自由に編集・カスタマイズできます。ご自身の専門分野や施設のガイドラインに合わせて調整してください。ただし、医療情報の正確性には十分注意してください。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="favorites">
                  <AccordionTrigger className="text-sm">お気に入り機能の使い方は？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      よく使うプロンプトをお気に入りに保存できます。プロンプト詳細ページの「お気に入りに追加」ボタンをクリックすると、お気に入りページから簡単にアクセスできるようになります。ブラウザのローカルストレージに保存されるため、同じブラウザでアクセスすると保存されます。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="search-tips">
                  <AccordionTrigger className="text-sm">効果的な検索方法を教えてください</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>効果的な検索のコツ：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>具体的なキーワードを使用（例：「診断」→「鑑別診断」）</li>
                        <li>カテゴリから絞り込んでから検索</li>
                        <li>複数のキーワードを組み合わせる</li>
                        <li>英語のキーワードも試す（一部のプロンプトは英語で記述）</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="category-navigation">
                  <AccordionTrigger className="text-sm">カテゴリからプロンプトを探す方法は？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      ホームページまたはプロンプト一覧ページから、目的のカテゴリを選択してください。カテゴリごとに整理されているため、必要なプロンプトを素早く見つけることができます。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="prompt-copy">
                  <AccordionTrigger className="text-sm">プロンプトのコピー方法を教えてください</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>プロンプトのコピー方法：</p>
                      <ol className="list-decimal pl-4 space-y-1">
                        <li>プロンプト詳細ページで「コピー」ボタンをクリック</li>
                        <li>または、プロンプトテキストを選択してCtrl+C（Mac: Cmd+C）でコピー</li>
                        <li>AIサービス（ChatGPT等）に貼り付け（Ctrl+V / Cmd+V）</li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="course-usage">
                  <AccordionTrigger className="text-sm">コース機能の使い方を教えてください</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      コース機能では、AI活用に関する体系的な学習ができます。コース一覧から興味のあるコースを選択し、レッスンを順番に学習していきます。各レッスンには実践的な内容が含まれており、段階的にAI活用スキルを向上させることができます。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="guide-usage">
                  <AccordionTrigger className="text-sm">ガイド機能の使い方を教えてください</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      ガイド機能では、症例報告や論文執筆などの複雑なタスクを段階的にサポートします。各ステップに従って進めることで、効率的に作業を進めることができます。進捗は自動的に保存されるため、途中で中断しても続きから再開できます。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tips-usage">
                  <AccordionTrigger className="text-sm">AI活用Tipsの使い方は？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      AI活用Tipsでは、プロンプトエンジニアリングの基礎から応用まで、医療従事者向けに解説しています。初心者の方から上級者の方まで、レベルに応じたTipsを参照できます。定期的に新しいTipsが追加されています。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="input-field-format">
                  <AccordionTrigger className="text-sm">入力フィールドの形式について教えてください</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>入力フィールドには以下の形式があります：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li><code className="px-1 py-0.5 bg-muted rounded text-[10px]">[ ]</code>: 角括弧内に情報を入力</li>
                        <li><code className="px-1 py-0.5 bg-muted rounded text-[10px]">{`{{ }}`}</code>: 二重波括弧内に情報を入力</li>
                        <li>プロンプト内のプレースホルダーを自分の情報に置き換える</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="prompt-modification">
                  <AccordionTrigger className="text-sm">プロンプトを編集・修正する方法は？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      プロンプトは自由に編集・修正できます。コピーしたプロンプトをAIサービスの入力欄に貼り付けた後、必要に応じて編集してください。ご自身の専門分野や施設のガイドラインに合わせて調整することで、より効果的な結果が得られます。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="best-practices">
                  <AccordionTrigger className="text-sm">プロンプトを使用する際のベストプラクティスは？</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>プロンプト使用時のベストプラクティス：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>入力フィールドを可能な限り埋める</li>
                        <li>プロンプトを自分の状況に合わせてカスタマイズ</li>
                        <li>AIの出力結果を必ず確認・検証する</li>
                        <li>医療情報の正確性を確認する（ファクトチェック）</li>
                        <li>患者情報は絶対に入力しない</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* トラブルシューティング */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Settings className="w-4 h-4" />
                トラブルシューティング
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="prompt-not-working">
                  <AccordionTrigger className="text-sm">プロンプトがうまく動作しません</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>以下の点を確認してください：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>プロンプト全体が正しくコピーされているか確認</li>
                        <li>入力フィールドの<code className="px-1 py-0.5 bg-muted rounded text-[10px]">{`{{ }}`}</code>や<code className="px-1 py-0.5 bg-muted rounded text-[10px]">[ ]</code>が適切に置き換えられているか確認</li>
                        <li>AIサービスの利用制限に達していないか確認</li>
                        <li>プロンプトを少し簡略化して再試行</li>
                        <li>別のAIサービスで試してみる</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="page-not-loading">
                  <AccordionTrigger className="text-sm">ページが読み込まれません</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>以下の対処法を試してください：</p>
                      <ol className="list-decimal pl-4 space-y-1">
                        <li>ページを再読み込み（F5またはCtrl+R / Cmd+R）</li>
                        <li>ブラウザのキャッシュをクリア</li>
                        <li>別のブラウザで試す</li>
                        <li>インターネット接続を確認</li>
                        <li>問題が続く場合は、お問い合わせください</li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="favorites-lost">
                  <AccordionTrigger className="text-sm">お気に入りが消えました</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>お気に入りはブラウザのローカルストレージに保存されます。以下の場合に消える可能性があります：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>ブラウザのキャッシュやデータをクリアした場合</li>
                        <li>プライベートブラウジングモードを使用している場合</li>
                        <li>別のブラウザやデバイスでアクセスしている場合</li>
                      </ul>
                      <p className="mt-2">
                        お気に入りはデバイス・ブラウザごとに保存されるため、同じブラウザでアクセスする必要があります。
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="search-not-working">
                  <AccordionTrigger className="text-sm">検索機能がうまく動作しません</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>検索がうまく動作しない場合：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>検索キーワードを変更してみる（例：「診断」→「鑑別診断」）</li>
                        <li>カテゴリから絞り込んで検索</li>
                        <li>ページを再読み込みして再試行</li>
                        <li>ブラウザのJavaScriptが有効になっているか確認</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="slow-loading">
                  <AccordionTrigger className="text-sm">ページの読み込みが遅いです</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>ページの読み込みが遅い場合：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>インターネット接続を確認</li>
                        <li>ブラウザのキャッシュをクリア</li>
                        <li>別のブラウザで試す</li>
                        <li>モバイルデータの場合はWi-Fiに切り替える</li>
                        <li>問題が続く場合は、お問い合わせください</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="display-issue">
                  <AccordionTrigger className="text-sm">表示が崩れています</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>表示が崩れている場合：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>ページを再読み込み（F5またはCtrl+R / Cmd+R）</li>
                        <li>ブラウザのキャッシュをクリア</li>
                        <li>ブラウザを最新版に更新</li>
                        <li>別のブラウザで試す</li>
                        <li>画面のズームレベルを100%に戻す</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="copy-not-working">
                  <AccordionTrigger className="text-sm">コピーボタンが動作しません</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>コピーボタンが動作しない場合：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>プロンプトテキストを手動で選択してコピー（Ctrl+C / Cmd+C）</li>
                        <li>ブラウザのJavaScriptが有効になっているか確認</li>
                        <li>ページを再読み込みして再試行</li>
                        <li>別のブラウザで試す</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="favorites-not-saving">
                  <AccordionTrigger className="text-sm">お気に入りが保存されません</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>お気に入りが保存されない場合：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>プライベートブラウジングモードを使用していないか確認</li>
                        <li>ブラウザのローカルストレージが有効になっているか確認</li>
                        <li>ブラウザの設定でCookieとサイトデータが許可されているか確認</li>
                        <li>ページを再読み込みして再試行</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="course-progress-lost">
                  <AccordionTrigger className="text-sm">コースの進捗が消えました</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      コースの進捗はブラウザのローカルストレージに保存されます。ブラウザのキャッシュやデータをクリアした場合、または別のブラウザやデバイスでアクセスした場合、進捗が消える可能性があります。同じブラウザでアクセスする必要があります。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="guide-navigation">
                  <AccordionTrigger className="text-sm">ガイドのナビゲーションがうまく動作しません</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>ガイドのナビゲーションがうまく動作しない場合：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>ページを再読み込み</li>
                        <li>ブラウザのJavaScriptが有効になっているか確認</li>
                        <li>目次から直接ステップに移動</li>
                        <li>別のブラウザで試す</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="mobile-issues">
                  <AccordionTrigger className="text-sm">モバイルで使いにくいです</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>モバイルでの使いにくさを改善する方法：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>画面を横向きにしてみる</li>
                        <li>ブラウザを最新版に更新</li>
                        <li>別のブラウザアプリで試す</li>
                        <li>問題が続く場合は、お問い合わせください</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="browser-compatibility">
                  <AccordionTrigger className="text-sm">推奨ブラウザはありますか？</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>推奨ブラウザ：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Chrome（最新版）</li>
                        <li>Firefox（最新版）</li>
                        <li>Safari（最新版）</li>
                        <li>Edge（最新版）</li>
                      </ul>
                      <p className="mt-2">古いブラウザでは一部機能が正常に動作しない可能性があります。</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="performance-issues">
                  <AccordionTrigger className="text-sm">動作が重いです</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>動作が重い場合：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>ブラウザのタブを閉じて、他のアプリを終了</li>
                        <li>ブラウザのキャッシュをクリア</li>
                        <li>インターネット接続を確認</li>
                        <li>ブラウザを最新版に更新</li>
                        <li>別のブラウザで試す</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* プライバシー・セキュリティ */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="w-4 h-4" />
                プライバシー・セキュリティ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="patient-info">
                  <AccordionTrigger className="text-sm">患者情報を入力しても大丈夫ですか？</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p className="text-destructive font-semibold">
                        <strong>絶対に患者の個人情報をAIサービスに入力しないでください。</strong>
                      </p>
                      <p>
                        患者の氏名、ID、生年月日、住所などの個人情報は、匿名化または削除してから使用してください。個人情報保護法、HIPAA（米国）、GDPR（EU）などの規制に違反する可能性があります。
                      </p>
                      <p>
                        プロンプトを使用する際は、必ず個人情報を削除または仮名に置き換えるなどの匿名化処理を行ってください。
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-collection">
                  <AccordionTrigger className="text-sm">個人情報は収集されますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      本サービスでは、Google Analytics等のアクセス解析ツールを使用してトラフィックデータを収集する場合がありますが、これは匿名で収集され、個人を特定するものではありません。詳細は<a href="/legal" className="text-primary underline">プライバシーポリシー</a>をご確認ください。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-storage">
                  <AccordionTrigger className="text-sm">入力したデータは保存されますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      本サービスでは、プロンプトの入力内容をサーバーに送信することはありません。お気に入り機能で使用するデータは、ブラウザのローカルストレージにのみ保存されます。ただし、プロンプトをAIサービス（ChatGPT等）に送信した場合、そのデータは各AIサービスの利用規約に従って処理されます。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cookie-usage">
                  <AccordionTrigger className="text-sm">Cookieは使用されますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      本サービスでは、Google Analytics等のアクセス解析ツールを使用するためにCookieを使用する場合があります。Cookieの設定は、ページ上部の「Cookie設定」ボタンからいつでも変更できます。詳細は<a href="/legal" className="text-primary underline">プライバシーポリシー</a>をご確認ください。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-deletion">
                  <AccordionTrigger className="text-sm">保存されたデータを削除できますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      お気に入りなどのローカルストレージに保存されたデータは、ブラウザの設定から削除できます。また、お気に入りページから個別に削除することもできます。サーバーに送信されるデータはありません。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="third-party-services">
                  <AccordionTrigger className="text-sm">第三者サービスにデータが送信されますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      本サービスでは、Google Analytics等のアクセス解析ツールを使用していますが、これは匿名のトラフィックデータのみを収集し、個人を特定するものではありません。プロンプトの入力内容が第三者に送信されることはありません。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="gdpr-compliance">
                  <AccordionTrigger className="text-sm">GDPRに準拠していますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      本サービスは、GDPR（EU一般データ保護規則）および日本の個人情報保護法に準拠するよう設計されています。データ主体の権利（アクセス、訂正、削除、ポータビリティ）を尊重しています。詳細は<a href="/legal" className="text-primary underline">プライバシーポリシー</a>をご確認ください。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="security-measures">
                  <AccordionTrigger className="text-sm">セキュリティ対策はどのように行われていますか？</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>セキュリティ対策：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>HTTPSによる暗号化通信</li>
                        <li>個人情報の収集を最小限に</li>
                        <li>サーバーへのデータ送信なし（ローカルストレージのみ）</li>
                        <li>定期的なセキュリティ監査</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-breach">
                  <AccordionTrigger className="text-sm">データ漏洩が発生した場合の対応は？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      本サービスでは、プロンプトの入力内容をサーバーに送信しないため、データ漏洩のリスクは最小限に抑えられています。万が一、セキュリティインシデントが発生した場合は、速やかにユーザーに通知し、適切な対応を行います。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="children-privacy">
                  <AccordionTrigger className="text-sm">子どもの個人情報は保護されていますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      本サービスは主に医療従事者を対象としており、13歳未満の子どもの個人情報を意図的に収集することはありません。また、個人情報の収集自体を最小限に抑えています。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="international-users">
                  <AccordionTrigger className="text-sm">海外から利用する場合のプライバシー保護は？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      本サービスは、GDPR（EU）、個人情報保護法（日本）などの国際的なプライバシー規制に準拠するよう設計されています。どの国からアクセスされても、適切なプライバシー保護が提供されます。
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* その他 */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageSquare className="w-4 h-4" />
                その他
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="suggest-feature">
                  <AccordionTrigger className="text-sm">機能の提案や改善要望はできますか？</AccordionTrigger>
                  <AccordionContent>
                      <p className="text-xs leading-relaxed">
                      はい、機能の提案や改善要望を歓迎します。<a href="/contact" className="text-primary underline">お問い合わせフォーム</a>からご連絡いただくか、GitHubのIssuesから提案してください。皆様のフィードバックを元に、サービスを継続的に改善していきます。
                      </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="report-bug">
                  <AccordionTrigger className="text-sm">バグを報告したい</AccordionTrigger>
                  <AccordionContent>
                      <p className="text-xs leading-relaxed">
                      バグを発見した場合は、<a href="/contact" className="text-primary underline">お問い合わせフォーム</a>またはGitHubのIssuesから報告してください。再現手順やスクリーンショットがあると、より迅速に対応できます。
                      </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="contribute">
                  <AccordionTrigger className="text-sm">プロンプトを追加・改善したい</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      プロンプトの追加や改善の提案を歓迎します。GitHubのプルリクエストから提案してください。医療従事者の皆様の実践的な知見を共有していただけると、サービス全体の品質向上につながります。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="contact">
                  <AccordionTrigger className="text-sm">お問い合わせ方法</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs leading-relaxed space-y-2">
                      <p>お問い合わせは以下の方法で受け付けています：</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li><a href="/contact" className="text-primary underline">お問い合わせフォーム</a></li>
                        <li>GitHubのIssues</li>
                        <li>プライバシーやセキュリティに関する重要な問題の場合は、できるだけ早く対応いたします</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="response-time">
                  <AccordionTrigger className="text-sm">お問い合わせへの返信はどのくらいかかりますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      通常のお問い合わせには、24時間以内に返信いたします。プライバシーやセキュリティに関する重要な問題の場合は、できるだけ早く対応いたします。お問い合わせの内容によっては、返信までにお時間をいただく場合があります。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="feature-request-process">
                  <AccordionTrigger className="text-sm">機能要望はどのように処理されますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      機能要望は、ユーザーの皆様のフィードバックとして記録し、優先度をつけて検討いたします。実装が決定した機能は、今後のアップデートで追加されます。すべての要望が実装されるわけではありませんが、皆様の声を大切にしています。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="prompt-submission">
                  <AccordionTrigger className="text-sm">プロンプトの提出方法を教えてください</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      プロンプトの提出は、GitHubのプルリクエストからお願いいたします。医療従事者の皆様の実践的な知見を共有していただけると、サービス全体の品質向上につながります。提出前に、プロンプトの品質と医療情報の正確性を確認してください。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="partnership">
                  <AccordionTrigger className="text-sm">パートナーシップや協業の可能性はありますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      医療機関、学会、教育機関などとのパートナーシップや協業の可能性について検討しています。ご興味のある方は、<a href="/contact" className="text-primary underline">お問い合わせフォーム</a>からご連絡ください。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="license">
                  <AccordionTrigger className="text-sm">ライセンスについて教えてください</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      HelixはMITライセンスの下で公開されています。プロンプトは自由に使用・改変・配布できますが、医療情報の正確性には十分注意してください。詳細はGitHubリポジトリのLICENSEファイルをご確認ください。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="attribution">
                  <AccordionTrigger className="text-sm">プロンプトを使用する際のクレジット表記は必要ですか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      クレジット表記は必須ではありませんが、可能であれば「Helix」への言及をいただけると幸いです。ただし、医療情報の正確性には十分注意し、必ずファクトチェックを行ってください。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="future-updates">
                  <AccordionTrigger className="text-sm">今後のアップデート予定はありますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-xs leading-relaxed">
                      はい、継続的にアップデートを予定しています。新規プロンプトの追加、既存プロンプトの改善、新機能の追加、UI/UXの改善など、ユーザーの皆様のフィードバックを元に、サービスを継続的に改善していきます。
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* 重要な注意事項 */}
          <Card className="border-destructive/50">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center gap-2 text-destructive text-base">
                <AlertCircle className="w-4 h-4" />
                重要な注意事項
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3 text-xs leading-relaxed">
              <div className="space-y-2">
                <p className="font-semibold text-sm">
                  本サービスは医療アドバイスを提供するものではありません。
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>
                    本サービスで生成されたコンテンツや情報は、参考情報としてのみ利用してください。
                  </li>
                  <li>
                    実際の診療、診断、治療方針の決定においては、必ず医師や専門家の判断を優先し、各医療機関のガイドラインに従ってください。
                  </li>
                  <li>
                    AI（ChatGPT等）の出力結果は、必ずしも正確であるとは限りません。ユーザーは出力内容の事実確認（ファクトチェック）を行う責任があります。
                  </li>
                  <li>
                    <strong className="text-destructive">患者の個人情報をAIサービスに入力することは絶対に避けてください。</strong>
                  </li>
                </ul>
              </div>
              <Separator />
              <p className="text-muted-foreground">
                詳細は<a href="/legal" className="text-primary underline">利用規約・免責事項</a>をご確認ください。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
