import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, FileText, Microscope } from "lucide-react";
import { Link } from "wouter";

export default function Guides() {
  const guides = [
    {
      id: "case-report-workflow",
      title: "症例報告作成ワークフロー：AIを活用した効率化ガイド",
      description: "症例報告は「マラソン」ではなく「400m走」です。CAREガイドラインチェックから投稿用カバーレター作成まで、AIプロンプトを活用して最短距離で完走するためのステップバイステップガイド。",
      category: "Research",
      readTime: "5 min read",
      tags: ["Case Report", "Writing", "Beginner"]
    },
    // 将来的に追加されるガイドのプレースホルダー
    /*
    {
      id: "systematic-review-guide",
      title: "システマティックレビューのAI支援プロセス",
      description: "膨大な文献のスクリーニングからPRISMA準拠の報告まで。AIを「第二のスクリーナー」として活用する方法。",
      category: "Research",
      icon: <Microscope className="h-6 w-6 text-purple-500" />,
      readTime: "8 min read",
      tags: ["Systematic Review", "Advanced"]
    }
    */
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Guides & Workflows
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            実際の臨床・研究プロセスでAIプロンプトをどう組み合わせるか、実践的なワークフローを解説します。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link key={guide.id} href={`/guides/${guide.id}`}>
              <Card className="h-full transition-all hover:shadow-md cursor-pointer border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {guide.category}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {guide.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {guide.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 mt-auto">
                    Read Guide <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {guide.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
