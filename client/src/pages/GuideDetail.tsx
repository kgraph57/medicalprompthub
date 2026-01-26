import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, CheckCircle2, Copy, ExternalLink, FileText, Lightbulb, ListTodo, Mail, Search, Send, Map, CheckSquare, Square, BarChart3, Download, Clock, Calendar, User, Image, Menu, X, MessageSquare, Presentation } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useRoute, useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { fullPrompts } from "../lib/prompts-full";
import { ConsentTemplates } from "@/components/ConsentTemplates";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { updateSEO, addStructuredData, BASE_URL } from "@/lib/seo";

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

// メインコンポーネント
export default function GuideDetail() {
  const [match, params] = useRoute("/guides/:id");
  const [, setLocation] = useLocation();
  const guideId = match ? params.id : null;
  const guide = guides.find((g) => g.id === guideId);

  // SEO設定
  useEffect(() => {
    if (guide) {
      updateSEO({
        title: `${guide.title} | HELIX`,
        description: guide.description || `${guide.title}のワークフローガイド。医療従事者がAIを活用して効率的に作業を進める方法を学べます。`,
        path: `/guides/${guideId}`,
        keywords: `${guide.title},ワークフローガイド,${guide.category},医療研究,AI活用`
      });

      // 構造化データ（HowTo）を追加
      addStructuredData({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": guide.title,
        "description": guide.description || `${guide.title}のワークフローガイド`,
        "step": guide.steps?.map((step, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "name": step.title,
          "text": typeof step.content === 'string' ? step.content : step.subtitle || ""
        })) || [],
        "url": `${BASE_URL}/guides/${guideId}`
      });
    }
  }, [guide, guideId]);

  if (!guide) {
    return (
      <Layout>
        <div className="container py-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Guide Not Found</h2>
          <p className="text-muted-foreground mb-6">The guide you are looking for does not exist.</p>
          <Button onClick={() => setLocation("/guides")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guides
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10">
        <Button
          variant="ghost"
          onClick={() => setLocation("/guides")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guides
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{guide.title}</h1>
          <p className="text-muted-foreground mb-8">{guide.description}</p>
          
          <div className="space-y-8">
            {guide.steps?.map((step, index) => (
              <Card key={index} className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {step.icon && <step.icon className="w-6 h-6" />}
                    {step.title}
                  </CardTitle>
                  {step.subtitle && (
                    <CardDescription>{step.subtitle}</CardDescription>
                  )}
                  {step.when && (
                    <p className="text-sm text-muted-foreground mt-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {step.when}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  {step.content}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

