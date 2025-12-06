import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ArrowLeft, Users, UserPlus } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useLocation, useRoute } from "wouter";
import { FollowButton } from "@/components/FollowButton";
import { Link } from "wouter";

export default function UserProfile() {
  const { user: currentUser, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/users/:id");
  const userId = params?.id ? parseInt(params.id) : undefined;

  const { data: user, isLoading: userLoading } = trpc.auth.me.useQuery();
  
  // 表示するユーザーIDを決定（パラメータがあればそれ、なければ現在のユーザー）
  const displayUserId = userId || user?.id;
  
  const { data: counts } = trpc.follows.counts.useQuery(
    { userId: displayUserId! },
    { enabled: !!displayUserId }
  );

  const { data: userPrompts = [] } = trpc.prompts.list.useQuery(
    { limit: 50, offset: 0 },
    { enabled: !!displayUserId }
  );

  // フィルターしてこのユーザーのプロンプトのみ表示
  const filteredPrompts = userPrompts.filter((p: any) => p.authorId === displayUserId);

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (!displayUserId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">ユーザーが見つかりません</p>
          <Button onClick={() => setLocation("/")} className="mt-4">
            ホームに戻る
          </Button>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === displayUserId;
  const totalLikes = filteredPrompts.reduce((sum: number, p: any) => sum + (p.likesCount || 0), 0);
  const totalViews = filteredPrompts.reduce((sum: number, p: any) => sum + (p.viewsCount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12 max-w-6xl">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Button>

        {/* Profile Header */}
        <Card className="p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold">{user?.name || "匿名ユーザー"}</h1>
                {!isOwnProfile && (
                  <FollowButton userId={displayUserId} userName={user?.name || undefined} />
                )}
              </div>
              <p className="text-muted-foreground mb-6">{user?.email}</p>
              
              <div className="flex flex-wrap gap-4 sm:gap-6 mt-6">
                <div className="text-center flex-1 min-w-[80px]">
                  <div className="text-xl sm:text-2xl font-bold text-primary">{filteredPrompts.length}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">投稿</div>
                </div>
                <div className="text-center flex-1 min-w-[80px]">
                  <div className="text-xl sm:text-2xl font-bold text-accent">{totalLikes}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">いいね</div>
                </div>
                <div className="text-center flex-1 min-w-[80px]">
                  <div className="text-xl sm:text-2xl font-bold text-muted-foreground">{totalViews}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">閲覧数</div>
                </div>
                <Link href={`/users/${displayUserId}/followers`}>
                  <div className="text-center cursor-pointer hover:text-primary transition-colors flex-1 min-w-[80px]">
                    <div className="text-xl sm:text-2xl font-bold">{counts?.followers || 0}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">フォロワー</div>
                  </div>
                </Link>
                <Link href={`/users/${displayUserId}/following`}>
                  <div className="text-center cursor-pointer hover:text-primary transition-colors flex-1 min-w-[80px]">
                    <div className="text-xl sm:text-2xl font-bold">{counts?.following || 0}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">フォロー中</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="prompts" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="prompts" className="gap-2">
              <FileText className="h-4 w-4" />
              投稿したプロンプト
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prompts">
            {filteredPrompts.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">まだプロンプトを投稿していません</p>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filteredPrompts.map((prompt: any) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
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
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="outline">{prompt.categoryName}</Badge>
              <span>•</span>
              <span>{new Date(prompt.createdAt).toLocaleDateString("ja-JP")}</span>
            </div>
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


