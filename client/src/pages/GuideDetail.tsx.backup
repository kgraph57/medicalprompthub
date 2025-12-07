import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useRoute } from "wouter";

// ガイドデータの型定義
type Guide = {
  id: string;
  title: string;
  description: string;
  category: string;
};

// ガイドデータ（簡易版）
const guides: Guide[] = [
  {
    id: "case-report-workflow",
    title: "症例報告作成ワークフロー",
    description: "AIを活用して「400m走」のように最短距離で完走する",
    category: "Research"
  }
];

export default function GuideDetail() {
  const [match, params] = useRoute("/guides/:id");
  const guideId = match ? params.id : null;
  const guide = guides.find((g) => g.id === guideId);

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
              <ArrowLeft className="h-4 w-4" />
              ガイド一覧
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl py-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">{guide.category}</div>
            <h1 className="text-4xl font-bold tracking-tight">{guide.title}</h1>
            <p className="text-xl text-muted-foreground">{guide.description}</p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p>このガイドは現在準備中です。</p>
            <p>詳細なコンテンツは近日公開予定です。</p>
          </div>
        </div>
      </main>
    </div>
  );
}
