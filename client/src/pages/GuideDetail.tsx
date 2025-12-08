import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, CheckCircle2, Copy, ExternalLink, FileText, Lightbulb, ListTodo, Mail, Search, Send, Map, CheckSquare, Square, BarChart3, Download, Clock, Calendar, User, Image, Menu, X, MessageSquare, Presentation } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useRoute } from "wouter";
import { fullPrompts } from "../lib/prompts-full";
import { JournalFinder } from "@/components/JournalFinder";
import { ConsentTemplates } from "@/components/ConsentTemplates";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// PromptCard Component
const PromptCard = ({ promptId }: { promptId: string }) => {
  const prompt = fullPrompts.find(p => p.id === promptId);
  const [copied, setCopied] = useState(false);

  if (!prompt) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.template);
      setCopied(true);
      toast.success("クリップボードにコピーしました");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("コピーに失敗しました");
    }
  };

  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            {prompt.title}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleCopy} className={copied ? "bg-green-50 text-green-600 border-green-200" : ""}>
            {copied ? <CheckCircle2 className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 p-3 rounded-md text-xs font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
          {prompt.template}
        </div>
        <div className="mt-2 text-right">
          <Link href={`/prompts/${prompt.id}`}>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
              詳細・カスタマイズ <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

// ガイドデータの定義
const guides = [
  {
    id: "case-report-workflow",
    title: "【完全版】症例報告執筆ガイド：構想から投稿まで",
    description: "「何から始めればいいかわからない」を解決。症例の選び方から、文献検索、執筆、投稿、査読対応まで、成功への最短ルートをガイドします。",
    category: "Research",
    readTime: "20 min read",
    scenario: {
      role: "研修医・若手医師",
      situation: "初めて症例報告を書くことになった",
      goal: "3週間で投稿まで完了する",
      context: "忙しい臨床の合間に効率的に進めたい"
    },
    timeline: [
      { phase: "1", title: "Case experience", description: "症例の経験と価値の判断", duration: "30分" },
      { phase: "2", title: "Perform a literature search", description: "文献検索と類似症例の確認", duration: "1時間" },
      { phase: "3", title: "Obtain patient consent", description: "患者同意の取得", duration: "20分" },
      { phase: "4", title: "Collect the necessary information", description: "必要な情報の収集と整理", duration: "30分" },
      { phase: "5", title: "Select the target journal", description: "ターゲットジャーナルの選定", duration: "15分" },
      { phase: "6", title: "Write the first draft", description: "初稿の執筆（Case, Discussion, Introduction, Abstract）", duration: "4-7日" },
      { phase: "7", title: "Edit the manuscript repeatedly", description: "推敲と英文校正", duration: "2日" },
      { phase: "8", title: "Review the manuscript with co-authors", description: "指導医・共著者による確認", duration: "3-4日" },
      { phase: "9", title: "English editing of manuscript", description: "最終的な英文校正", duration: "1日" },
      { phase: "10", title: "Submit the manuscript", description: "投稿と査読対応", duration: "1時間" }
    ],
    steps: [
      {
        title: "Day 1: 症例の価値判断と準備（所要時間: 30分）",
        subtitle: "カンファレンス後、すぐに始める",
        icon: Lightbulb,
        when: "09:00 - カンファレンスで症例を報告した後",
        content: (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="flex items-start gap-3 mb-3">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">このステップのタイミング</h4>
                  <p className="text-sm text-muted-foreground">
                    カンファレンスで症例を報告した直後がベストタイミングです。
                    指導医や同僚の反応を見て、「これは報告に値するか？」を判断しましょう。
                  </p>
                </div>
              </div>
            </div>
            <p>
              すべての症例が報告に値するわけではありません。しかし、「稀であること」だけが価値ではありません。
              「よくある疾患の非典型的な経過」や「治療の副作用」、「教育的な落とし穴」も立派な報告テーマになります。
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                報告に値する症例とは？
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong>Diagnosis</strong>: 新しい疾患、非典型的な症状、新しい診断法</li>
                <li><strong>Management</strong>: 新しい治療法、副作用、予期せぬ治療効果</li>
                <li><strong>Education</strong>: 診断の落とし穴、重要な解剖学的知見</li>
              </ul>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">1. この症例、報告に値するか？</p>
                <p className="text-sm text-muted-foreground mb-2">
                  カンファレンスで症例を報告した後、AIに相談して客観的な評価を受けましょう。
                  報告に値するかどうか、強みと弱みを明確にします。
                </p>
                <PromptCard promptId="res-case-value-assessment" />
              </div>
              <div>
                <p className="font-medium mb-2">2. 価値がある場合、どこが価値あるのか？</p>
                <p className="text-sm text-muted-foreground mb-2">
                  報告に値すると判断されたら、次は「何が新規で、なぜ重要か」を明確にしましょう。
                  これが論文の核心（Key Message）になります。
                </p>
                <PromptCard promptId="res-case-value-clarification" />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Day 1: 文献検索と類似症例の確認（所要時間: 1時間）",
        subtitle: "巨人の肩の上に立つ",
        icon: Search,
        when: "10:00 - 価値判断の後、すぐに",
        content: (
          <div className="space-y-4">
            <p>
              「世界初の症例だ！」と思っても、検索してみると似たような報告がすでにあることがほとんどです。
              しかし、落胆する必要はありません。先行研究との「違い」こそが、あなたの論文のオリジナリティになります。
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">1. 効率的な検索キーワードを見つける</p>
                <p className="text-sm text-muted-foreground mb-2">
                  PubMedやGoogle Scholarで検索するための最適なキーワード（MeSH termsなど）をAIに提案してもらいましょう。
                </p>
                <PromptCard promptId="res-search-strategy" />
              </div>
              <div>
                <p className="font-medium mb-2">2. 検索結果を整理する</p>
                <p className="text-sm text-muted-foreground mb-2">
                  見つかった論文の要約と、自分の症例との違いを整理します。
                </p>
                <PromptCard promptId="res-literature-review" />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Day 1: 患者同意の取得（所要時間: 20分）",
        subtitle: "倫理的な配慮を最優先に",
        icon: User,
        when: "13:00 - 午後の回診時",
        content: (
          <div className="space-y-4">
            <p>
              症例報告には患者さんの同意が不可欠です。特に、個人が特定される可能性がある画像（顔写真など）を使用する場合は、厳格な同意が必要です。
              各学会やジャーナルが指定する同意書フォーマットがある場合は、それを使用してください。
            </p>
            <ConsentTemplates />
          </div>
        )
      },
      {
        title: "Day 2: ターゲットジャーナルの選定（所要時間: 15分）",
        subtitle: "敵を知り、己を知る",
        icon: BookOpen,
        when: "翌日の隙間時間",
        content: (
          <div className="space-y-4">
            <p>
              執筆を始める前に、投稿先のジャーナルを決めることが重要です。
              ジャーナルによって、単語数制限、フォーマット、好まれるトピックが異なるからです。
            </p>
            <JournalFinder />
            <div className="mt-4">
              <p className="font-medium mb-2">ジャーナル選定の相談</p>
              <p className="text-sm text-muted-foreground mb-2">
                症例の概要を伝えて、適切な投稿先ジャーナルの候補をAIに挙げてもらいましょう。
              </p>
              <PromptCard promptId="res-journal-selection" />
            </div>
          </div>
        )
      },
      {
        title: "Day 3-5: 初稿の執筆 - Case Presentation（所要時間: 2時間）",
        subtitle: "事実を淡々と、しかしドラマチックに",
        icon: FileText,
        when: "週末や当直の落ち着いた時間",
        content: (
          <div className="space-y-4">
            <p>
              症例報告の心臓部です。時系列に沿って、読者が追体験できるように記述します。
              不要な情報は削ぎ落とし、Key Messageに関連する情報を強調します。
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">1. 臨床経過の要約</p>
                <p className="text-sm text-muted-foreground mb-2">
                  カルテの情報を入力して、Case Presentationの草案を作成します。
                </p>
                <PromptCard promptId="res-case-presentation-draft" />
              </div>
              <div>
                <p className="font-medium mb-2">2. 検査データの整理</p>
                <p className="text-sm text-muted-foreground mb-2">
                  異常値だけでなく、診断の除外に役立った正常値も記載します。
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Day 6-7: 初稿の執筆 - Discussion（所要時間: 3時間）",
        subtitle: "あなたの考察で価値を加える",
        icon: MessageSquare,
        when: "まとまった時間が取れる時",
        content: (
          <div className="space-y-4">
            <p>
              最も難しく、かつ重要なパートです。
              「なぜこの症例が重要なのか」「過去の報告と何が違うのか」「この症例から何が学べるのか」を論理的に展開します。
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">1. 考察の構成案を作成</p>
                <p className="text-sm text-muted-foreground mb-2">
                  論理的な流れ（パラグラフ構成）をAIと一緒に考えます。
                </p>
                <PromptCard promptId="res-discussion-structure" />
              </div>
              <div>
                <p className="font-medium mb-2">2. 文献との比較</p>
                <p className="text-sm text-muted-foreground mb-2">
                  先行研究の結果と自験例を比較し、考察を深めます。
                </p>
                <PromptCard promptId="res-discussion-drafting" />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Day 8: Introduction & Abstract（所要時間: 1時間）",
        subtitle: "最後にして最初",
        icon: FileText,
        when: "本文が完成した後",
        content: (
          <div className="space-y-4">
            <p>
              本文（CaseとDiscussion）が完成してから、IntroductionとAbstractを書くのが効率的です。
              全体像が見えているので、一貫性のある導入と要約が書けます。
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">1. 魅力的なIntroduction</p>
                <p className="text-sm text-muted-foreground mb-2">
                  読者の興味を引きつけ、なぜこの報告が必要なのかを説明します。
                </p>
                <PromptCard promptId="res-introduction-draft" />
              </div>
              <div>
                <p className="font-medium mb-2">2. 構造化Abstract</p>
                <p className="text-sm text-muted-foreground mb-2">
                  論文の内容を簡潔に要約します。多くの読者はここしか読みません。
                </p>
                <PromptCard promptId="res-abstract-generation" />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Day 9: 推敲と英文校正（所要時間: 2時間）",
        subtitle: "神は細部に宿る",
        icon: CheckSquare,
        when: "一晩寝かせてから",
        content: (
          <div className="space-y-4">
            <p>
              書き上げた原稿を客観的に見直します。
              論理の飛躍はないか、英語表現は自然か、フォーマットは守られているかを確認します。
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">1. 英文校正</p>
                <p className="text-sm text-muted-foreground mb-2">
                  文法ミスや不自然な表現を修正し、アカデミックな表現にブラッシュアップします。
                </p>
                <PromptCard promptId="res-english-proofreading" />
              </div>
              <div>
                <p className="font-medium mb-2">2. カバーレター作成</p>
                <p className="text-sm text-muted-foreground mb-2">
                  編集長に向けた、論文の売り込み手紙を作成します。
                </p>
                <PromptCard promptId="res-cover-letter" />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Day 10: 投稿と査読対応（所要時間: 不定）",
        subtitle: "ゴールはまだ先",
        icon: Send,
        when: "準備が整い次第",
        content: (
          <div className="space-y-4">
            <p>
              投稿しても、一発でアクセプトされることは稀です。
              査読者からのコメントは、論文をより良くするためのアドバイスと捉えましょう。
            </p>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">査読コメントへの回答</p>
                <p className="text-sm text-muted-foreground mb-2">
                  感情的にならず、論理的かつ礼儀正しく回答を作成します。
                </p>
                <PromptCard promptId="res-reviewer-response" />
              </div>
            </div>
          </div>
        )
      }
    ]
  }
  // english-proofreading-guideは専用ページ（EnglishProofreadingGuide.tsx）で実装されているため削除
];

export default function GuideDetail() {
  const [match, params] = useRoute("/guides/:id");
  const guideId = match ? params.id : null;
  const guide = guides.find((g) => g.id === guideId);
  const [activeStep, setActiveStep] = useState(0);
                <Lightbulb className="w-5 h-5" />
                重要なパラダイムシフト
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>従来の方法:</strong> 日本語で書く → DeepL/Google翻訳 → 校正
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>次世代の方法:</strong> 最初から英語で書く（LLM支援） → LLMで校正・改善
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  従来の翻訳ベースアプローチの特徴と限界
                </h4>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="font-medium mb-2">✅ 翻訳ツールの強み</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                      <li>基本的な文構造の変換が可能</li>
                      <li>一般的な語彙の翻訳は比較的精度が高い</li>
                      <li>短時間で大量のテキストを処理可能</li>
                      <li>無料または低コストで利用可能</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-800">
                    <p className="font-medium mb-2 text-red-800 dark:text-red-300">❌ 翻訳ツールの限界点</p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                      <li><strong>専門用語の誤訳:</strong> 医学用語の文脈に応じた適切な選択が困難（例：「急性」が"acute"なのか"severe"なのか"intense"なのか）</li>
                      <li><strong>文脈の理解不足:</strong> 同じ単語でも文脈によって意味が変わる場合の判断が不正確</li>
                      <li><strong>文化的ニュアンスの喪失:</strong> 日本語特有の表現や論理展開が英語に適切に変換されない</li>
                      <li><strong>タイポの複製:</strong> 元のテキストの誤字がそのまま翻訳される（例：「excusive」→「escusivo」）</li>
                      <li><strong>学術的な文体の欠如:</strong> 翻訳された文章が口語的で、学術論文に適さない表現になる</li>
                      <li><strong>論理展開の不自然さ:</strong> 日本語の論理構造がそのまま英語に変換され、不自然な文章になる</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  次世代のLLM直接執筆アプローチの特徴
                </h4>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                  <p className="font-medium mb-2 text-green-800 dark:text-green-300">✅ LLM直接執筆の強み</p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
                    <li><strong>文脈理解:</strong> 医学的概念を理解し、適切な専門用語を選択</li>
                    <li><strong>学術的文体:</strong> 最初から学術論文に適した表現で生成</li>
                    <li><strong>論理的な構成:</strong> 英語の論理展開に適した構造で文章を生成</li>
                    <li><strong>反復的改善:</strong> プロンプトで段階的に改善可能</li>
                    <li><strong>専門知識の活用:</strong> 医学文献のパターンを学習しているため、より自然な表現</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  翻訳時の注意点（翻訳ツールを使う場合）
                </h4>
                <div className="space-y-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800">
                    <p className="font-medium mb-2 text-yellow-800 dark:text-yellow-300">⚠️ 医学用語の注意点</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                      <li><strong>同音異義語:</strong> 「狭心症」と「心筋梗塞」など、似た概念の区別</li>
                      <li><strong>略語の展開:</strong> 「COPD」「DM」など、初出時は必ず正式名称を記載</li>
                      <li><strong>薬剤名:</strong> 一般名（generic name）と商品名（brand name）の使い分け</li>
                      <li><strong>検査値の単位:</strong> 日本の単位系と国際単位系の変換（例：mg/dL → mmol/L）</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800">
                    <p className="font-medium mb-2 text-yellow-800 dark:text-yellow-300">⚠️ 文脈依存の表現</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                      <li><strong>「～と考えられる」:</strong> "is considered" / "is thought to be" / "suggests" など、文脈で選択</li>
                      <li><strong>「～の可能性がある」:</strong> "may" / "might" / "could" / "is likely to" など、確信度で使い分け</li>
                      <li><strong>「～である」:</strong> 単純な断定ではなく、エビデンスレベルに応じた表現を選択</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800">
                    <p className="font-medium mb-2 text-yellow-800 dark:text-yellow-300">⚠️ 文化的・論理的な違い</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                      <li><strong>日本語の曖昧表現:</strong> 「～と思われる」「～と考えられる」は英語では明確な根拠を示す必要がある</li>
                      <li><strong>結論の提示:</strong> 日本語は結論を後ろに置くが、英語では冒頭に明確に示す</li>
                      <li><strong>主語の明確化:</strong> 日本語の主語省略を英語では必ず明示</li>
                      <li><strong>時制の一貫性:</strong> Methods（過去形）、Results（過去形）、Discussion（現在形）の使い分け</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">💡 実践的な推奨事項</h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">推奨ワークフロー（2025年現在）</p>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-4">
                        <li><strong>日本語で要点を整理</strong>（アウトライン、キーポイント）</li>
                        <li><strong>ChatGPT/Claudeに直接英語で執筆依頼</strong>（「以下の内容を医学論文のCase Presentationとして英語で書いてください」）</li>
                        <li><strong>LLMで段階的に改善</strong>（「より学術的に」「より簡潔に」など）</li>
                        <li><strong>Grammarly/DeepL Writeで最終校正</strong></li>
                        <li><strong>必要に応じてプロ校正</strong>（トップジャーナル投稿時）</li>
                      </ol>
                    </div>
                    <div className="mt-3 p-3 bg-background rounded border">
                      <p className="font-medium mb-1">❌ 避けるべき方法</p>
                      <p className="text-xs text-muted-foreground">
                        日本語で全文を書く → DeepL/Google翻訳 → そのまま使用
                        （翻訳ツールの限界により、多くの修正が必要になり、結果的に時間がかかる）
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📊 実証データ：AI vs 翻訳ツールの精度比較</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium mb-1 text-muted-foreground">医学用語翻訳の精度比較</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li><strong>ChatGPT vs DeepL:</strong> 医学用語翻訳において<strong>統計的に有意差なし</strong>（同等の性能）</li>
                      <li><strong>ChatGPT vs Google翻訳:</strong> ChatGPTが<strong>より高精度</strong>（英語→スペイン語/中国語で90%以上 vs Google翻訳80-90%）</li>
                      <li><strong>DeepL vs Google翻訳:</strong> DeepLの方が<strong>編集が必要な箇所が少ない</strong>（より正確な初稿）</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-background rounded border">
                    <p className="font-medium mb-1">⚠️ Google翻訳の限界</p>
                    <p className="text-xs text-muted-foreground">
                      医療文書で80%以上の精度を達成するものの、残り20%の誤りが患者の混乱や医療緊急事態につながる可能性があります。
                      翻訳ツールは「下訳」として使用し、必ず人間による校正が必要です。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                <h4 className="font-semibold mb-2 text-green-800 dark:text-green-300">🌍 非英語圏研究者の実際の使用パターン</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium mb-1 text-muted-foreground">使用率の急増（2021-2024年のデータ）</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li><strong>非英語圏: 400%増加</strong>（AI支援執筆の使用）</li>
                      <li>英語圏: 183%増加</li>
                      <li>特に<strong>早期キャリア研究者</strong>、<strong>低ランク機関</strong>、<strong>論文数が少ない研究者</strong>での使用が顕著</li>
                    </ul>
                  </div>
                  <div className="mt-3">
                    <p className="font-medium mb-1 text-muted-foreground">生産性と出版格差への影響</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>AI使用により、<strong>非英語圏研究者の生産性が向上</strong></li>
                      <li>英語圏と非英語圏の<strong>出版格差が縮小</strong>（AI使用率が高いほど効果が大きい）</li>
                      <li>論文の<strong>質（ジャーナルインパクトファクター）も向上</strong></li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-background rounded border">
                    <p className="font-medium mb-1">💡 実践的な示唆</p>
                    <p className="text-xs text-muted-foreground">
                      非英語圏の研究者ほど、AIツールの恩恵を受けています。これは、AIが言語の壁を下げ、
                      研究の質を向上させることを示しています。特に若手研究者や、研究環境が限られている研究者にとって、
                      AIツールは「ゲームチェンジャー」となっています。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-300">📈 大規模研究データ（565万論文を分析）</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>「Generative AI as a Linguistic Equalizer in Global Science」</strong>という研究では、
                    2021-2024年に発表された565万の科学論文を分析しました。
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>ChatGPTリリース後（2022年11月以降）、<strong>AI支援論文で言語的収束が確認</strong></li>
                    <li>効果は<strong>英語から言語的に遠い国の国内共著チーム</strong>で最も強い</li>
                    <li>GenAIが<strong>研究における言語の壁を下げ、グローバルな科学コミュニケーションを再形成</strong>している</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 1: 学術英語の基本原則を理解する",
        subtitle: "良い学術英語とは何か",
        icon: Lightbulb,
        when: "執筆前または校正開始時",
        content: (
          <div className="space-y-4">
            <p>
              学術英語は、日常会話やビジネス英語とは異なる特徴があります。まず、これらの原則を理解することで、より効果的な校正が可能になります。
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">学術英語の5つの基本原則</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li><strong>簡潔で明確な表現（Concise and Clear）</strong>: 冗長な語句を避け、1文1思考を心がける</li>
                <li><strong>能動態の使用（Active Voice）</strong>: 受動態よりも能動態を優先する（約70%を目安に）</li>
                <li><strong>肯定文を優先</strong>: 否定文よりも肯定文の方が理解しやすい</li>
                <li><strong>動作動詞の使用</strong>: "be"動詞を避け、具体的な動作を表す動詞を使う</li>
                <li><strong>過度な強調表現を避ける</strong>: "The first report"や"Unique case"などの表現は避ける</li>
              </ol>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">よくある間違いと修正例</p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-red-600 dark:text-red-400 mb-1">❌ 悪い例:</p>
                      <p className="text-muted-foreground mb-2">"This is the first report of a case in which..."</p>
                      <p className="font-semibold text-green-600 dark:text-green-400 mb-1">✅ 良い例:</p>
                      <p className="text-muted-foreground">"We report a case of..."</p>
                    </div>
                    <div>
                      <p className="font-semibold text-red-600 dark:text-red-400 mb-1">❌ 悪い例:</p>
                      <p className="text-muted-foreground mb-2">"The patient was given steroids."</p>
                      <p className="font-semibold text-green-600 dark:text-green-400 mb-1">✅ 良い例:</p>
                      <p className="text-muted-foreground">"We administered corticosteroids."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: AIツールを活用した一次校正",
        subtitle: "Grammarly、DeepL Write、ChatGPTの使い分け",
        icon: FileText,
        when: "初稿完成後、すぐに",
        content: (
          <div className="space-y-4">
            <p>
              AIツールは、基本的な文法ミスやスペルミス、不自然な表現を素早く修正するのに最適です。
              ただし、ツールごとに得意分野が異なるため、使い分けが重要です。
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Grammarly
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-muted-foreground"><strong>用途:</strong> 文法・スペル・句読点の自動検出</p>
                  <p className="text-muted-foreground"><strong>優先度:</strong> ⭐⭐⭐⭐</p>
                  <p className="text-xs text-muted-foreground">無料版でも基本的なミスは十分に検出できます。ブラウザ拡張機能として使用すると便利です。</p>
                </CardContent>
              </Card>
              <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    DeepL Write
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-muted-foreground"><strong>用途:</strong> 文章をより自然で洗練された表現にリライト</p>
                  <p className="text-muted-foreground"><strong>優先度:</strong> ⭐⭐⭐⭐⭐</p>
                  <p className="text-xs text-muted-foreground">DeepL翻訳の姉妹サービス。文脈を理解した自然な表現への書き換えが得意です。</p>
                </CardContent>
              </Card>
              <Card className="border-green-200 dark:border-green-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-600" />
                    ChatGPT / Claude
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-muted-foreground"><strong>用途:</strong> 特定の文章のパラフレーズ、アカデミックな表現の提案</p>
                  <p className="text-muted-foreground"><strong>優先度:</strong> ⭐⭐⭐⭐</p>
                  <p className="text-xs text-muted-foreground">プロンプトを使って、よりアカデミックな表現を提案させることができます。</p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">推奨ワークフロー</p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-4">
                  <li><strong>Grammarly</strong>で基本的な文法・スペルミスを修正</li>
                  <li><strong>DeepL Write</strong>で不自然な表現を自然な表現にリライト</li>
                  <li><strong>ChatGPT</strong>で特定のパラグラフをよりアカデミックな表現に改善</li>
                  <li>全体を通読して、文脈の一貫性を確認</li>
                </ol>
              </div>
              <div>
                <p className="font-medium mb-2">AI校正プロンプトの活用</p>
                <p className="text-sm text-muted-foreground mb-2">
                  以下のプロンプトを使って、ChatGPTやClaudeに校正を依頼できます。
                </p>
                <PromptCard promptId="res-english-proofread" />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: 文書タイプ別の校正ポイント",
        subtitle: "論文、症例報告、抄録、プレゼン資料",
        icon: ListTodo,
        when: "AI校正後、文書タイプに応じて",
        content: (
          <div className="space-y-4">
            <p>
              文書のタイプによって、重視すべき校正ポイントが異なります。
              それぞれの特徴を理解して、適切な校正を行いましょう。
            </p>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  医学論文（Original Article）
                </h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="font-medium">重視すべきポイント:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>IMRAD構造（Introduction, Methods, Results, Discussion）の一貫性</li>
                    <li>時制の統一（Methodsは過去形、Resultsは過去形、Discussionは現在形）</li>
                    <li>統計的表現の正確性（p値、信頼区間の表記）</li>
                    <li>専門用語の統一（略語の初出時の定義）</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  症例報告（Case Report）
                </h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="font-medium">重視すべきポイント:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>時系列の明確性（Case Presentation）</li>
                    <li>客観的な記述（主観的判断を避ける）</li>
                    <li>Discussionでの先行研究との比較</li>
                    <li>"First report"などの過度な強調表現を避ける</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  学会抄録（Conference Abstract）
                </h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="font-medium">重視すべきポイント:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>文字数制限の厳守（通常250-300語）</li>
                    <li>構造化された構成（Background, Methods, Results, Conclusion）</li>
                    <li>簡潔で力強い表現</li>
                    <li>略語の使用を最小限に（初出時に定義）</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Presentation className="w-5 h-5 text-purple-600" />
                  プレゼンテーション資料
                </h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="font-medium">重視すべきポイント:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>簡潔で視覚的な表現（箇条書きを活用）</li>
                    <li>専門用語の適切な使用（聴衆のレベルに合わせる）</li>
                    <li>図表の説明文の正確性</li>
                    <li>スライド間の論理的な流れ</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 4: プロの英文校正サービスを活用する",
        subtitle: "AI校正では不十分な場合",
        icon: CheckCircle2,
        when: "AI校正後、特にトップジャーナルへの投稿前",
        content: (
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                最新トレンド: AIツールだけで十分なケースが増えている
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                近年、LLM（ChatGPT、Claude、Gemini等）の性能向上により、多くの研究者がプロの英文校正サービスを使わずに、
                AIツール（Grammarly、DeepL Write、ChatGPT等）の組み合わせで十分な品質を達成できるようになっています。
                特に、論文を多く書いている経験豊富な研究者ほど、AIツールのみで対応する傾向があります。
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>AIツールのみで対応できるケース:</strong> 中程度のImpact Factorのジャーナル、症例報告、学会抄録、経験を積んだ研究者の論文
              </p>
            </div>
            <p>
              ただし、AIによる校正は万能ではありません。文脈に応じた微妙なニュアンスや、専門分野特有の表現については、
              人間の専門家によるチェックが不可欠な場合もあります。特に、トップジャーナルへの投稿を目指す場合は、プロの英文校正を検討しましょう。
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">プロ校正を検討すべきケース</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                <li>Impact Factor 5以上のトップジャーナルへの投稿</li>
                <li>初めての英語論文執筆で、AIツールの使い方に不安がある場合</li>
                <li>査読者から「英語の質」について指摘を受けた場合</li>
                <li>特に重要な研究結果を発表する場合（Nature、Science、NEJM等）</li>
                <li>ジャーナルが校正証明書（Certificate）の提出を必須としている場合</li>
              </ul>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">主要な英文校正サービス</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold">Edanz (エダンズ)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p className="text-muted-foreground"><strong>特徴:</strong> 日本の研究者に広く利用されている。医学・歯学・薬学分野に強い。</p>
                      <p className="text-muted-foreground"><strong>価格:</strong> 約3-5万円（3000語程度）</p>
                      <p className="text-muted-foreground"><strong>納期:</strong> 3-5営業日</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold">Editage (エディテージ)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p className="text-muted-foreground"><strong>特徴:</strong> 24時間365日対応。幅広い分野をカバー。</p>
                      <p className="text-muted-foreground"><strong>価格:</strong> 約2-4万円（3000語程度）</p>
                      <p className="text-muted-foreground"><strong>納期:</strong> 2-4営業日</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold">Enago (イーナゴ)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p className="text-muted-foreground"><strong>特徴:</strong> 質の高い校正者と、きめ細かいサービスが特徴。</p>
                      <p className="text-muted-foreground"><strong>価格:</strong> 約3-6万円（3000語程度）</p>
                      <p className="text-muted-foreground"><strong>納期:</strong> 3-7営業日</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">依頼時のポイント</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>論文の専門分野を明確に指定する</li>
                  <li>投稿予定のジャーナル名を伝える（スタイルガイドに合わせた校正が可能）</li>
                  <li>特に注意してほしい箇所があれば明記する</li>
                  <li>校正証明書（Certificate）の発行を依頼する（ジャーナルによっては提出を求められる）</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 5: 最終チェックと提出前の確認",
        subtitle: "見落としを防ぐ最終確認",
        icon: CheckSquare,
        when: "プロ校正後、提出直前",
        content: (
          <div className="space-y-4">
            <p>
              提出前の最終チェックは、見落としを防ぐために重要です。
              以下のチェックリストを確認して、完璧な状態で提出しましょう。
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">最終チェックリスト</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">文法・スペル・句読点</p>
                      <p className="text-sm text-muted-foreground">すべての誤りが修正されているか確認</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">専門用語の統一</p>
                      <p className="text-sm text-muted-foreground">同じ概念を表す用語が統一されているか確認</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">時制の一貫性</p>
                      <p className="text-sm text-muted-foreground">Methodsは過去形、Resultsは過去形、Discussionは現在形</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">略語の定義</p>
                      <p className="text-sm text-muted-foreground">すべての略語が初出時に定義されているか確認</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">引用の正確性</p>
                      <p className="text-sm text-muted-foreground">参考文献の引用が正確で、本文と一致しているか確認</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">ジャーナルのスタイルガイド準拠</p>
                      <p className="text-sm text-muted-foreground">文字数制限、フォーマット、引用スタイルが準拠しているか確認</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">音読による最終確認</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  目で読むだけでは気づかない不自然な表現や、リズムの悪い文章を発見できます。
                  声に出して読むことで、より自然な英語になっているか確認しましょう。
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">共著者・指導医による確認</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  最終的な確認は、英語ネイティブの共著者や指導医に依頼するのが理想的です。
                  特に、専門用語の使い方や、文脈に応じた表現の適切性を確認してもらいましょう。
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "世界のトレンドと活用事例",
        subtitle: "AI校正の世界的な動向と実証データ",
        icon: BarChart3,
        when: "参考情報として",
        content: (
          <div className="space-y-4">
            <p>
              世界中でAIツールを使った英語校正が急速に普及しています。最新の研究データと活用事例を紹介します。
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  AIツールの広範な採用
                </h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">📊 主要な統計データ</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li><strong>77%の著者</strong>がChatGPTを執筆支援に使用（8,000以上の論文を分析）</li>
                        <li>使用目的の<strong>51%</strong>が可読性の向上、<strong>22%</strong>が文法チェック</li>
                        <li>Grammarly使用により、<strong>1日あたり30-70個のエラーを削減</strong>（450名以上の専門家を対象とした調査）</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  非英語圏での急激な普及
                </h4>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-green-800 dark:text-green-300 mb-1">🌍 地域別の成長率（2021-2024年）</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li><strong>非英語圏: 400%増加</strong>（AI支援執筆の使用）</li>
                        <li>英語圏: 183%増加</li>
                        <li>特に<strong>若手研究者</strong>や<strong>低ランク機関</strong>での使用が顕著</li>
                        <li>非ネイティブスピーカーの論文品質が向上し、<strong>英語圏との出版格差が縮小</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  論文受諾率への影響
                </h4>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-purple-800 dark:text-purple-300 mb-1">📈 実証データ（7,904件の投稿論文を分析）</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li><strong>AI precheck実施論文:</strong> 初期リジェクト率 <strong>7.3%</strong></li>
                        <li><strong>AI precheck未実施論文:</strong> 初期リジェクト率 <strong>34.2%</strong></li>
                        <li>AI校正により、<strong>約5倍の受諾率向上</strong>が実証</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  医療研究分野での活用
                </h4>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-800">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-orange-800 dark:text-orange-300 mb-1">🏥 医療論文でのAI使用状況（425論文を分析）</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li>抄録（Abstract）の<strong>10.1%</strong>にAI生成テキストが検出</li>
                        <li>全文の<strong>5.6%</strong>にAI生成テキストが検出</li>
                        <li>ChatGPTリリース後（2022年11月以降）に<strong>使用が急増</strong></li>
                        <li>医学ジャーナル編集者の<strong>49%</strong>が既にAIツールを使用（剽窃検出、データ検証など）</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-teal-600" />
                  教育機関での統合
                </h4>
                <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg border border-teal-100 dark:border-teal-800">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-teal-800 dark:text-teal-300 mb-1">🎓 教育現場での活用</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li>EFL（英語を外国語として学ぶ）学生の<strong>文法精度が大幅に向上</strong></li>
                        <li>論文構造の整理と<strong>テーゼステートメントの開発</strong>が改善</li>
                        <li>多くの大学が<strong>AIツールをカリキュラムに統合</strong></li>
                        <li>非ネイティブ学生がAI支援により、<strong>ネイティブ学生と同等の品質</strong>を達成</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-teal-600" />
                  AI vs 翻訳ツール：精度比較の実証データ
                </h4>
                <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg border border-teal-100 dark:border-teal-800">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-teal-800 dark:text-teal-300 mb-1">🔬 医学用語翻訳の精度比較研究</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li><strong>ChatGPT vs DeepL:</strong> 医学用語翻訳において<strong>統計的に有意差なし</strong>（同等の性能を実証）</li>
                        <li><strong>ChatGPT vs Google翻訳:</strong> ChatGPTが<strong>より高精度</strong>
                          <ul className="list-disc list-inside ml-6 mt-1">
                            <li>英語→スペイン語/中国語: ChatGPT 90%以上 vs Google翻訳 80-90%</li>
                            <li>英語→ロシア語: ChatGPT 89% vs Google翻訳 80%</li>
                          </ul>
                        </li>
                        <li><strong>DeepL vs Google翻訳:</strong> DeepLの方が<strong>編集が必要な箇所が少ない</strong>（より正確な初稿を生成）</li>
                      </ul>
                    </div>
                    <div className="mt-3 p-3 bg-background rounded border">
                      <p className="font-medium mb-1">⚠️ 重要な注意点</p>
                      <p className="text-xs text-muted-foreground">
                        ChatGPTは「hallucination」（事実に基づかない情報の生成）のリスクがあるため、
                        医学的コンテキストでは56%の精度という報告もあります。必ず人間による検証が必要です。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  非英語圏研究者の実際の使用パターンと成果
                </h4>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-purple-800 dark:text-purple-300 mb-1">📊 大規模研究データ（200万以上の論文を分析）</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li><strong>非英語圏でのAI使用: 400%増加</strong>（2021-2024年）</li>
                        <li>英語圏でのAI使用: 183%増加</li>
                        <li>特に<strong>早期キャリア研究者</strong>、<strong>論文数が少ない研究者</strong>、<strong>低ランク機関</strong>での使用が顕著</li>
                        <li>AI使用により、<strong>非英語圏研究者の生産性が向上</strong>し、英語圏との<strong>出版格差が縮小</strong></li>
                      </ul>
                    </div>
                    <div className="mt-3">
                      <p className="font-semibold text-purple-800 dark:text-purple-300 mb-1">🌍 言語的平等化の実証（565万論文を分析）</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li>ChatGPTリリース後、<strong>AI支援論文で言語的収束が確認</strong></li>
                        <li>効果は<strong>英語から言語的に遠い国の国内共著チーム</strong>で最も強い</li>
                        <li>GenAIが<strong>研究における言語の壁を下げ、グローバルな科学コミュニケーションを再形成</strong></li>
                      </ul>
                    </div>
                    <div className="mt-3 p-3 bg-background rounded border">
                      <p className="font-medium mb-1">💡 実践的な示唆</p>
                      <p className="text-xs text-muted-foreground">
                        非英語圏の研究者ほど、AIツールの恩恵を受けています。これは、AIが言語の壁を下げ、
                        研究の質を向上させることを示しています。特に若手研究者や、研究環境が限られている研究者にとって、
                        AIツールは「ゲームチェンジャー」となっています。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">💡 実践的な示唆</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="font-medium">これらのデータから分かること:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li><strong>AIツールの組み合わせ</strong>（Grammarly + DeepL Write + ChatGPT）で、多くのケースでプロ校正と同等以上の品質を達成可能</li>
                    <li>特に<strong>非ネイティブスピーカー</strong>にとって、AIツールは「ゲームチェンジャー」</li>
                    <li>論文の<strong>受諾率が大幅に向上</strong>する実証データが存在（AI precheckで7.3% vs 34.2%のリジェクト率）</li>
                    <li>医療分野でも<strong>AI使用が標準化</strong>されつつある（抄録の10.1%、全文の5.6%にAI生成テキストが検出）</li>
                    <li><strong>ChatGPT/DeepLは翻訳ツールより正確</strong>であることが実証されている</li>
                    <li>ただし、<strong>人間の監視</strong>は依然として重要（文脈の正確性、専門用語の適切性、hallucinationの検出）</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">⚠️ 注意点</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  AI検出ツールのバイアスにより、非ネイティブ英語がAI生成と誤分類される可能性があります。
                  また、AIツールだけでは完全に言語の偏見を解消できないため、システム的な改善も必要です。
                </p>
              </div>
            </div>
          </div>
        )
      }
    ]
  }
];

export default function GuideDetail() {
  const [match, params] = useRoute("/guides/:id");
  const guideId = match ? params.id : null;
  const guide = guides.find((g) => g.id === guideId);
  const [activeStep, setActiveStep] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  if (!guide) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">ガイドが見つかりません</h2>
          <Link href="/guides">
            <Button>ガイド一覧に戻る</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/guides">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              ガイド一覧
            </Button>
          </Link>
          <Separator orientation="vertical" className="mx-4 h-6" />
          <h1 className="font-semibold truncate">{guide.title}</h1>
        </div>
      </header>

      <div className="container max-w-5xl py-6 md:py-10">
        {/* Overview Section */}
        <div className="mb-10 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                {guide.category}
              </span>
              <span>•</span>
              <span>{guide.readTime}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{guide.title}</h1>
            <p className="text-base text-muted-foreground max-w-3xl">
              {guide.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Target Role</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <span className="font-medium">{guide.scenario.role}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="font-medium">{guide.scenario.goal}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Total: ~3 weeks</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Timeline Overview */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Map className="w-6 h-6" />
            Roadmap
          </h2>
          <div className="relative border-l-2 border-muted ml-3 space-y-8 pb-4">
            {guide.timeline.map((phase, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-muted-foreground">Phase {phase.phase}</span>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{phase.duration}</span>
                  </div>
                  <h3 className="font-semibold">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Steps */}
        <div className="space-y-12">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <ListTodo className="w-6 h-6" />
            Step-by-Step Guide
          </h2>
          
          {guide.steps.map((step, index) => (
            <div key={index} className="scroll-mt-20" id={`step-${index}`}>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <span className="font-mono font-bold text-primary">STEP {index + 1}</span>
                        <span>•</span>
                        <span>{step.when}</span>
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription className="text-sm">{step.subtitle}</CardDescription>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  {step.content}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="bg-muted/50 rounded-xl p-8 text-center space-y-4 mt-12">
          <h3 className="text-2xl font-bold">Ready to start writing?</h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            このガイドをブックマークして、各ステップごとに戻ってきてください。
            AIプロンプトがあなたの執筆を強力にサポートします。
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Start from Step 1
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
