import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, BookOpen, Loader2 } from "lucide-react";
import { updateSEO } from "@/lib/seo";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ガイドのメタデータ定義
const guideMetadata: Record<string, {
  title: string;
  description: string;
  readTime: string;
  category: string;
  basePath: string;
}> = {
  "conference-presentation": {
    title: "カンファレンス発表資料作成支援",
    description: "AIを活用した効果的なカンファレンス発表資料の作成",
    readTime: "40 min",
    category: "Presentation",
    basePath: "/assets/guides/conference-presentation"
  },
  "differential-diagnosis": {
    title: "鑑別診断リスト生成",
    description: "AIによる包括的な鑑別診断リストの作成",
    readTime: "30 min",
    category: "Clinical",
    basePath: "/assets/guides/differential-diagnosis"
  },
  "patient-explanation": {
    title: "患者説明シナリオ作成",
    description: "わかりやすく、配慮の行き届いた患者説明の作成",
    readTime: "40 min",
    category: "Clinical",
    basePath: "/assets/guides/patient-explanation"
  },
  "literature-search": {
    title: "論文検索・読解サポート",
    description: "AIを活用した効率的な文献検索と読解",
    readTime: "40 min",
    category: "Research",
    basePath: "/assets/guides/literature-search"
  },
  "medical-documents": {
    title: "診断書・紹介状作成支援",
    description: "AIで医療文書作成を効率化・標準化",
    readTime: "40 min",
    category: "Clinical",
    basePath: "/assets/guides/medical-documents"
  },
  "research-protocol": {
    title: "研究計画書作成支援",
    description: "AIを活用した質の高い研究計画書の作成",
    readTime: "50 min",
    category: "Research",
    basePath: "/assets/guides/research-protocol"
  },
  "conference-presentation-slides": {
    title: "学会発表スライド作成支援",
    description: "インパクトのある学会発表スライドの作成",
    readTime: "45 min",
    category: "Presentation",
    basePath: "/assets/guides/conference-presentation-slides"
  },
  "ethics-review-application": {
    title: "倫理審査申請書類作成支援",
    description: "倫理審査申請書類の効率的な作成",
    readTime: "45 min",
    category: "Research",
    basePath: "/assets/guides/ethics-review-application"
  },
  "new-drug-information": {
    title: "新薬情報収集・要約",
    description: "最新の新薬情報を効率的に収集・要約",
    readTime: "35 min",
    category: "Clinical",
    basePath: "/assets/guides/new-drug-information"
  },
  "rare-disease-information": {
    title: "希少疾患情報収集",
    description: "希少疾患に関する最新情報の収集",
    readTime: "35 min",
    category: "Clinical",
    basePath: "/assets/guides/rare-disease-information"
  },
  "guideline-comparison": {
    title: "治療ガイドライン比較",
    description: "複数のガイドラインを比較・統合",
    readTime: "30 min",
    category: "Clinical",
    basePath: "/assets/guides/guideline-comparison"
  },
  "multilingual-medical-consultation": {
    title: "多言語医療相談支援",
    description: "多言語での医療相談を円滑に",
    readTime: "25 min",
    category: "Clinical",
    basePath: "/assets/guides/multilingual-medical-consultation"
  },
  "medical-news-commentary": {
    title: "医療ニュース・トピック解説",
    description: "最新の医療ニュースをわかりやすく解説",
    readTime: "25 min",
    category: "Research",
    basePath: "/assets/guides/medical-news-commentary"
  },
  "patient-education-materials": {
    title: "患者教育資料作成",
    description: "わかりやすい患者教育資料の作成",
    readTime: "35 min",
    category: "Clinical",
    basePath: "/assets/guides/patient-education-materials"
  },
  "incident-report-creation": {
    title: "インシデントレポート作成支援",
    description: "正確で建設的なインシデントレポートの作成",
    readTime: "30 min",
    category: "Clinical",
    basePath: "/assets/guides/incident-report-creation"
  },
  "consultation-email": {
    title: "専門医へのコンサルトメール作成",
    description: "効果的なコンサルトメールの作成",
    readTime: "30 min",
    category: "Clinical",
    basePath: "/assets/guides/consultation-email"
  },
  "clinical-trial-search": {
    title: "臨床試験情報検索",
    description: "関連する臨床試験情報の効率的な検索",
    readTime: "35 min",
    category: "Research",
    basePath: "/assets/guides/clinical-trial-search"
  },
  "medical-statistics-consultation": {
    title: "医療統計・データ分析相談",
    description: "AIを活用した医療統計の理解と分析",
    readTime: "45 min",
    category: "Research",
    basePath: "/assets/guides/medical-statistics-consultation"
  },
  "image-diagnosis-report-reading": {
    title: "画像診断レポート読解支援",
    description: "画像診断レポートの理解を深める",
    readTime: "30 min",
    category: "Clinical",
    basePath: "/assets/guides/image-diagnosis-report-reading"
  },
  "post-discharge-follow-up": {
    title: "退院後フォローアップ計画作成",
    description: "包括的な退院後フォローアップ計画の作成",
    readTime: "35 min",
    category: "Clinical",
    basePath: "/assets/guides/post-discharge-follow-up"
  },
  "medical-safety-manual": {
    title: "医療安全マニュアル作成",
    description: "実践的な医療安全マニュアルの作成",
    readTime: "45 min",
    category: "Clinical",
    basePath: "/assets/guides/medical-safety-manual"
  },
  "infection-control-manual": {
    title: "感染対策マニュアル作成",
    description: "効果的な感染対策マニュアルの作成",
    readTime: "45 min",
    category: "Clinical",
    basePath: "/assets/guides/infection-control-manual"
  },
  "polypharmacy-support": {
    title: "ポリファーマシー対策支援",
    description: "多剤併用の適正化を支援",
    readTime: "40 min",
    category: "Clinical",
    basePath: "/assets/guides/polypharmacy-support"
  },
  "palliative-care-planning": {
    title: "緩和ケア計画立案支援",
    description: "患者中心の緩和ケア計画の立案",
    readTime: "45 min",
    category: "Clinical",
    basePath: "/assets/guides/palliative-care-planning"
  }
};

// ガイドの構造定義
const guideStructure = [
  { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
  { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
  { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
  { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
  { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
  { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
  { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
  { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
];

export default function MarkdownGuide() {
  const [, params] = useRoute("/guides/:guideId");
  const guideId = params?.guideId || "";
  
  const [currentStep, setCurrentStep] = useState(0);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const metadata = guideMetadata[guideId];

  useEffect(() => {
    if (metadata) {
      updateSEO({
        title: `${metadata.title} | Medical Prompt Hub`,
        description: metadata.description,
        path: `/guides/${guideId}`,
        keywords: `${metadata.title},医療AI,プロンプト,ワークフロー`
      });
    }
  }, [guideId, metadata]);

  useEffect(() => {
    const loadContent = async () => {
      if (!metadata) {
        setError("ガイドが見つかりません");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const step = guideStructure[currentStep];
        // GitHub Pagesのベースパスを考慮
        const filePath = `/medicalprompthub${metadata.basePath}/${step.file}`;
        
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load: ${response.status}`);
        }
        
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error("Error loading markdown:", err);
        setError("コンテンツの読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [guideId, currentStep, metadata]);

  if (!metadata) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-8 px-4">
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">ガイドが見つかりません</p>
              <Link href="/guides">
                <Button className="mt-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  ガイド一覧に戻る
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* ヘッダー */}
        <div className="mb-6">
          <Link href="/guides">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ガイド一覧に戻る
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {metadata.category}
            </span>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              {metadata.readTime}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{metadata.title}</h1>
          <p className="text-lg text-muted-foreground">{metadata.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* サイドバー（ステップナビゲーション） */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  目次
                </h3>
                <nav className="space-y-1">
                  {guideStructure.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(index)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        currentStep === index
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {step.title}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* メインコンテンツ */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-destructive mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()}>
                      再読み込み
                    </Button>
                  </div>
) : (
                  <div className="prose prose-slate dark:prose-invert max-w-none prose-table:border-collapse prose-table:w-full prose-th:border prose-th:border-slate-300 prose-th:bg-slate-50 prose-th:p-3 prose-th:text-left prose-td:border prose-td:border-slate-300 prose-td:p-3 dark:prose-th:border-slate-700 dark:prose-th:bg-slate-800 dark:prose-td:border-slate-700">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        table: ({node, ...props}) => (
                          <div className="overflow-x-auto my-6">
                            <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700 border border-slate-300 dark:border-slate-700" {...props} />
                          </div>
                        ),
                        thead: ({node, ...props}) => (
                          <thead className="bg-slate-50 dark:bg-slate-800" {...props} />
                        ),
                        th: ({node, ...props}) => (
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-300 dark:border-slate-700" {...props} />
                        ),
                        td: ({node, ...props}) => (
                          <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700" {...props} />
                        ),
                        tr: ({node, ...props}) => (
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50" {...props} />
                        )
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  </div>
                )}

                {/* ナビゲーションボタン */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    前のステップ
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(Math.min(guideStructure.length - 1, currentStep + 1))}
                    disabled={currentStep === guideStructure.length - 1}
                  >
                    次のステップ
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
