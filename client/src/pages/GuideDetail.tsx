import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, CheckCircle2, Copy, ExternalLink, FileText, Lightbulb, ListTodo, Mail, Search, Send, Map, CheckSquare, Square } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useRoute } from "wouter";
import { fullPrompts } from "../lib/prompts-full";

// ガイドデータの定義
const guides = [
  {
    id: "case-report-workflow",
    title: "【完全版】症例報告執筆ガイド：構想から投稿まで",
    description: "「何から始めればいいかわからない」を解決。症例の選び方から、文献検索、執筆、投稿、査読対応まで、成功への最短ルートをガイドします。",
    category: "Research",
    readTime: "20 min read",
    steps: [
      {
        title: "Step 1: 症例の経験と価値の判断 (Case Experience & Evaluation)",
        icon: Lightbulb,
        content: (
          <div className="space-y-4">
            <p>
              すべての症例が報告に値するわけではありません。しかし、「稀であること」だけが価値ではありません。
              「よくある疾患の非典型的な経過」や「治療の副作用」、「教育的な落とし穴」も立派な報告テーマになります。
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">報告に値する症例とは？</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong>Diagnosis</strong>: 新しい疾患、非典型的な症状、新しい診断法</li>
                <li><strong>Management</strong>: 新しい治療法、副作用、予期せぬ治療効果</li>
                <li><strong>Education</strong>: 診断の落とし穴、重要な解剖学的知見</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        title: "Step 2: 文献検索と類似症例の確認 (Literature Search)",
        icon: Search,
        content: (
          <div className="space-y-4">
            <p>
              「世界初」だと思い込む前に、必ずPubMedで検索しましょう。
              類似症例が見つかっても諦める必要はありません。「何が違うのか」を明確にできれば、それが論文の価値になります。
            </p>
            <PromptCard promptId="res-pubmed-query" />
          </div>
        )
      },
      {
        title: "Step 3: 患者同意の取得と情報収集 (Consent & Data Collection)",
        icon: CheckCircle2,
        content: (
          <div className="space-y-4">
            <p>
              報告の価値があると判断したら、患者さんから同意書（Informed Consent）を取得します。
              同時に、カルテから必要な情報を漏れなく収集し、時系列に整理します。
            </p>
            <PromptCard promptId="res-timeline-builder" />
          </div>
        )
      },
      {
        title: "Step 4: ターゲットジャーナルの選定 (Journal Selection)",
        icon: Map,
        content: (
          <div className="space-y-4">
            <p>
              執筆を始める「前」に投稿先を決めます。
              ジャーナルによって文字数制限（例：800語以内）、図表の数、フォーマットが全く異なるためです。
              後から書き直すのは時間の無駄です。
            </p>
            <PromptCard promptId="res-journal-finder" />
          </div>
        )
      },
      {
        title: "Step 5: 症例記述の執筆 (Writing Case Description)",
        icon: FileText,
        content: (
          <div className="space-y-4">
            <p>
              ここから執筆開始です。まずは「症例記述（Case Presentation）」から書き始めましょう。
              事実を淡々と記載しますが、結論（診断）を導くための伏線となる情報は詳細に、関係ない情報は思い切って削ります。
            </p>
            <PromptCard promptId="case-presentation" />
          </div>
        )
      },
      {
        title: "Step 6: 考察と結論の執筆 (Discussion & Conclusion)",
        icon: FileText,
        content: (
          <div className="space-y-4">
            <p>
              次に「考察（Discussion）」を書きます。
              「症例の特徴」→「過去の報告との比較」→「この症例から学べること（Message）」の順で展開します。
              過度な一般化や、根拠のない推論は避けましょう。
            </p>
            <PromptCard promptId="res-case-discussion" />
          </div>
        )
      },
      {
        title: "Step 7: 序論と要旨の執筆 (Introduction & Abstract)",
        icon: FileText,
        content: (
          <div className="space-y-4">
            <p>
              最後に「序論（Introduction）」と「要旨（Abstract）」を書きます。
              本文が完成してから書くことで、内容の不一致を防げます。
              序論は「なぜこの症例を報告するのか」を簡潔に（1-2パラグラフで）述べます。
            </p>
            <PromptCard promptId="res-case-intro" />
            <PromptCard promptId="res-abstract-generator" />
          </div>
        )
      },
      {
        title: "Step 8: 推敲と英文校正 (Editing & Proofreading)",
        icon: CheckSquare,
        content: (
          <div className="space-y-4">
            <p>
              書き上げた原稿は、必ず推敲します。
              「簡潔か？（Concise）」「明確か？（Clear）」を常に意識してください。
              能動態を使い、否定文を避けるのがコツです。
            </p>
            <PromptCard promptId="res-english-proofread" />
          </div>
        )
      },
      {
        title: "Step 9: 指導医・共著者による確認 (Review by Co-authors)",
        icon: Mail,
        content: (
          <div className="space-y-4">
            <p>
              自分一人で完結させず、必ず指導医や共著者に原稿を見てもらいましょう。
              客観的な視点からのフィードバックは、論文の質を劇的に向上させます。
            </p>
            <PromptCard promptId="com-mentor-email" />
          </div>
        )
      },
      {
        title: "Step 10: 投稿と査読対応 (Submission & Response)",
        icon: Send,
        content: (
          <div className="space-y-4">
            <p>
              いよいよ投稿です。カバーレターを添えて投稿します。
              査読コメントが返ってきたら、感情的にならず、礼儀正しく論理的に回答（Rebuttal）を作成します。
            </p>
            <PromptCard promptId="res-cover-letter" />
            <PromptCard promptId="res-reviewer-response" />
          </div>
        )
      }
    ]
  },
  {
    id: "statistical-analysis-guide",
    title: "【初心者向け】医療統計解析：データの準備から結果の解釈まで",
    description: "「p値って何？」からスタート。データの整理、適切な検定の選び方、Python/Rコードの生成までをサポートします。",
    category: "Research",
    readTime: "20 min read",
    steps: [
      {
        title: "Step 1: データの準備とクリーニング (Data Preparation)",
        icon: ListTodo,
        content: (
          <div className="space-y-4">
            <p>
              解析の8割はデータ整理で決まります。Excelデータの欠損値処理、外れ値の確認、カテゴリ変数の数値化など、
              解析ソフトに入れる前の下準備を行います。
            </p>
            <PromptCard promptId="res-data-cleaning" />
          </div>
        )
      },
      {
        title: "Step 2: 解析手法の選定 (Choosing the Right Test)",
        icon: Lightbulb,
        content: (
          <div className="space-y-4">
            <p>
              「t検定とカイ二乗検定、どっちを使えばいいの？」
              データの種類（連続変数 vs カテゴリ変数）と分布（正規分布するかどうか）によって、適切な検定方法は決まります。
              AIに相談して、最適な手法を選びましょう。
            </p>
            <PromptCard promptId="res-stat-method-selector" />
          </div>
        )
      },
      {
        title: "Step 3: 解析コードの生成 (Code Generation)",
        icon: FileText,
        content: (
          <div className="space-y-4">
            <p>
              PythonやRのコードを自分でゼロから書く必要はありません。
              やりたい解析内容を伝えれば、AIが実行可能なコードを生成してくれます。
              Google Colabなどに貼り付けて実行するだけで結果が出ます。
            </p>
            <PromptCard promptId="res-python-stat-code" />
          </div>
        )
      },
      {
        title: "Step 4: 結果の解釈と論文への記載 (Interpretation & Reporting)",
        icon: CheckCircle2,
        content: (
          <div className="space-y-4">
            <p>
              出力されたp値や信頼区間をどう解釈し、論文の「Methods」や「Results」セクションにどう書くか。
              統計学的に正しい表現で記述するためのサポートを受けましょう。
            </p>
            <PromptCard promptId="res-stat-interpretation" />
          </div>
        )
      }
    ]
  },
  {
    id: "conference-presentation-guide",
    title: "【完全版】学会発表ガイド：抄録からスライド、質疑応答まで",
    description: "初めての学会発表でも安心。魅力的な抄録の書き方、見やすいスライド構成、想定問答集の作成までをトータルサポート。",
    category: "Presentation",
    readTime: "15 min read",
    steps: [
      {
        title: "Step 1: 魅力的な抄録の作成 (Abstract Writing)",
        icon: FileText,
        content: (
          <div className="space-y-4">
            <p>
              学会発表の第一歩は抄録登録です。限られた文字数の中で、研究の新規性と重要性をアピールする必要があります。
              「目的・方法・結果・結論」の構成をしっかり守りましょう。
            </p>
            <PromptCard promptId="res-abstract-generator" />
          </div>
        )
      },
      {
        title: "Step 2: スライド構成の作成 (Slide Structure)",
        icon: Lightbulb,
        content: (
          <div className="space-y-4">
            <p>
              いきなりPowerPointを開くのはNGです。まずは紙とペン、あるいはテキストエディタで構成を練りましょう。
              1枚のスライドで伝えるメッセージは1つ（One Slide, One Message）が鉄則です。
            </p>
            <PromptCard promptId="edu-slide-outline" />
          </div>
        )
      },
      {
        title: "Step 3: 発表原稿の作成 (Script Writing)",
        icon: FileText,
        content: (
          <div className="space-y-4">
            <p>
              スライドに書いてあることをそのまま読むのは最悪のプレゼンです。
              スライドは視覚補助、言葉は補足説明。聴衆の顔を見て話せるよう、自然な話し言葉の原稿を作りましょう。
            </p>
            <PromptCard promptId="edu-presentation-script" />
          </div>
        )
      },
      {
        title: "Step 4: 質疑応答対策 (Q&A Preparation)",
        icon: CheckCircle2,
        content: (
          <div className="space-y-4">
            <p>
              発表で一番怖いのが質疑応答です。しかし、来る質問の8割は予想可能です。
              AIに「意地悪な質問」を考えてもらい、事前に回答を用意しておけば、自信を持って演台に立てます。
            </p>
            <PromptCard promptId="edu-qa-simulator" />
          </div>
        )
      }
    ]
  }
];

function PromptCard({ promptId }: { promptId: string }) {
  const prompt = fullPrompts.find(p => p.id === promptId);
  
  if (!prompt) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-800 rounded-lg text-sm">
        Prompt not found: {promptId}
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          <h4 className="font-medium">{prompt.title}</h4>
        </div>
        <Link href={`/prompt/${prompt.id}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Copy className="w-4 h-4" />
          </Button>
        </Link>
      </div>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {prompt.description}
      </p>
      <Link href={`/prompt/${prompt.id}`}>
        <Button variant="outline" size="sm" className="w-full">
          Try this prompt
        </Button>
      </Link>
    </div>
  );
}

export default function GuideDetail() {
  const [, params] = useRoute("/guide/:id");
  const guideId = params?.id;
  const guide = guides.find(g => g.id === guideId);
  
  // LocalStorageから進捗状況を読み込む
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (guideId) {
      const savedProgress = localStorage.getItem(`guide-progress-${guideId}`);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    }
  }, [guideId]);

  const toggleStep = (stepIndex: number) => {
    if (!guideId) return;
    
    const newProgress = { ...progress, [stepIndex]: !progress[stepIndex] };
    setProgress(newProgress);
    localStorage.setItem(`guide-progress-${guideId}`, JSON.stringify(newProgress));
  };

  const completedCount = Object.values(progress).filter(Boolean).length;
  const totalSteps = guide?.steps.length || 0;
  const progressPercentage = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  if (!guide) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Guide not found</h2>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <Link href="/">
        <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
              {guide.category}
            </span>
            <span>•</span>
            <span>{guide.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {guide.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {guide.description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="sticky top-16 z-10 bg-background/95 backdrop-blur py-4 border-b mb-8">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="font-medium text-primary">Your Progress</span>
            <span className="text-muted-foreground">{progressPercentage}% Completed</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid gap-8">
          {guide.steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = progress[index];

            return (
              <Card key={index} className={`relative transition-all duration-300 ${isCompleted ? 'border-primary/50 bg-primary/5' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-xl">
                        {step.title}
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`shrink-0 ${isCompleted ? 'text-primary hover:text-primary/80' : 'text-muted-foreground'}`}
                      onClick={() => toggleStep(index)}
                    >
                      {isCompleted ? (
                        <>
                          <CheckSquare className="w-5 h-5 mr-2" />
                          Done
                        </>
                      ) : (
                        <>
                          <Square className="w-5 h-5 mr-2" />
                          Mark as Done
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {step.content}
                </CardContent>
              </Card>
            );
          })}
        </div>

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
