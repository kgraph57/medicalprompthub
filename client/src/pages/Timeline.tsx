import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Users, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";

export default function Timeline() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const { data: prompts = [], isLoading } = trpc.follows.timeline.useQuery(
    { limit: 50, offset: 0 },
    { enabled: isAuthenticated }
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">ログインが必要です</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            ホームに戻る
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            戻る
          </Button>
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">タイムライン</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              フォロー中のユーザーの最新投稿
            </p>
          </div>
        </div>

        {prompts.length === 0 ? (
          <Card className="p-12 text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-xl font-semibold mb-2">まだフォローしているユーザーがいません</p>
            <p className="text-muted-foreground mb-6">
              他のユーザーをフォローすると、ここに最新の投稿が表示されます
            </p>
            <Button onClick={() => navigate("/")}>
              ユーザーを探す
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {prompts.map((prompt: any) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PromptCard({ prompt }: { prompt: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <Link href={`/prompts/${prompt.id}`}>
              <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors cursor-pointer">
                {prompt.title}
              </h3>
            </Link>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
              <Badge variant="outline">{prompt.categoryName}</Badge>
              <span>•</span>
              <span>{new Date(prompt.createdAt).toLocaleDateString("ja-JP")}</span>
            </div>
            <Link href={`/users/${prompt.authorId}`}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Users className="h-4 w-4" />
                <span>{prompt.authorName || "匿名ユーザー"}</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-muted/50 rounded-lg border">
            <p className="text-xs text-muted-foreground mb-1">プロンプト</p>
            <p className="text-sm line-clamp-3">{prompt.promptText}</p>
          </div>
          <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
            <p className="text-xs text-muted-foreground mb-1">回答例</p>
            <p className="text-sm line-clamp-3">{prompt.responseText}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}


