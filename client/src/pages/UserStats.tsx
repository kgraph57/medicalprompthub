import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { BarChart3, Heart, Bookmark, Eye, Copy, Star, MessageSquare, FolderOpen, Award, TrendingUp, FileText } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function UserStats() {
  const { isAuthenticated, user } = useAuth();
  const { data: stats, isLoading } = trpc.userStats.myStats.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">ログインが必要です</p>
          <Link href="/">
            <Button className="mt-4">ホームに戻る</Button>
          </Link>
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
      <div className="container py-12 max-w-6xl">
        <Link href="/mypage">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            マイページに戻る
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-black mb-2">統計情報</h1>
          <p className="text-sm sm:text-base text-muted-foreground">あなたのプロンプトのパフォーマンスを確認できます</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">総プロンプト数</p>
                <p className="text-3xl font-bold mt-2">{stats?.totalPrompts || 0}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">総いいね数</p>
                <p className="text-3xl font-bold mt-2">{(stats?.totalLikes || 0).toLocaleString()}</p>
              </div>
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">総ブックマーク数</p>
                <p className="text-3xl font-bold mt-2">{(stats?.totalBookmarks || 0).toLocaleString()}</p>
              </div>
              <Bookmark className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">総閲覧数</p>
                <p className="text-3xl font-bold mt-2">{(stats?.totalViews || 0).toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">総コピー数</p>
                <p className="text-3xl font-bold mt-2">{(stats?.totalCopies || 0).toLocaleString()}</p>
              </div>
              <Copy className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">平均評価</p>
                <p className="text-3xl font-bold mt-2">{stats?.averageRating || "0.00"}</p>
              </div>
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">総コメント数</p>
                <p className="text-3xl font-bold mt-2">{stats?.totalComments || 0}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">コレクション数</p>
                <p className="text-3xl font-bold mt-2">{stats?.totalCollections || 0}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* Ranking and Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">ランキング</h2>
              <TrendingUp className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">現在のランク</p>
                <p className="text-4xl font-bold">{stats?.rank || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ポイント</p>
                <p className="text-2xl font-semibold">{(stats?.points || 0).toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">バッジ</h2>
              <Award className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">獲得バッジ数</p>
              <p className="text-4xl font-bold">{stats?.badges || 0}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


