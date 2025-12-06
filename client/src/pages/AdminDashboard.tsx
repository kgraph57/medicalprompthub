import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { BarChart3, Eye, Copy, Heart, Bookmark, Search, FileText, Users, TrendingUp, Flag } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, subDays } from "date-fns";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [dateRange, setDateRange] = useState<"7days" | "30days" | "90days" | "all">("30days");

  // 管理者でない場合はアクセス拒否
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">管理者権限が必要です</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            ホームに戻る
          </Button>
        </div>
      </div>
    );
  }

  const getDateRange = () => {
    const now = new Date();
    switch (dateRange) {
      case "7days":
        return { startDate: subDays(now, 7), endDate: now };
      case "30days":
        return { startDate: subDays(now, 30), endDate: now };
      case "90days":
        return { startDate: subDays(now, 90), endDate: now };
      default:
        return { startDate: undefined, endDate: undefined };
    }
  };

  const { startDate, endDate } = getDateRange();
  const { data: stats, isLoading } = trpc.analytics.getStats.useQuery({
    startDate,
    endDate,
  });

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

  const pageViews = stats?.pageViews || { total: 0, unique: 0, byPath: [] };
  const events = stats?.events || { total: 0, byType: [] };

  // イベントタイプの日本語名マッピング
  const eventTypeLabels: Record<string, string> = {
    prompt_copy: "プロンプトコピー",
    prompt_like: "いいね",
    prompt_bookmark: "ブックマーク",
    prompt_view: "プロンプト閲覧",
    prompt_create: "プロンプト作成",
    prompt_update: "プロンプト更新",
    comment: "コメント",
    search: "検索",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12 max-w-7xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            戻る
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold mb-2">管理者ダッシュボード</h1>
              <p className="text-sm sm:text-base text-muted-foreground">アナリティクスと統計情報</p>
            </div>
            <div className="flex gap-2">
              <Link href="/moderation">
                <Button variant="outline" className="gap-2">
                  <Flag className="h-4 w-4" />
                  モデレーション
                </Button>
              </Link>
              <ExportButton />
            </div>
            <Select value={dateRange} onValueChange={(value: any) => setDateRange(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">過去7日間</SelectItem>
                <SelectItem value="30days">過去30日間</SelectItem>
                <SelectItem value="90days">過去90日間</SelectItem>
                <SelectItem value="all">全期間</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* サマリーカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">総ユーザー数</p>
                <p className="text-3xl font-bold mt-2">{(stats?.totalUsers || 0).toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">総プロンプト数</p>
                <p className="text-3xl font-bold mt-2">{(stats?.totalPrompts || 0).toLocaleString()}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">総コメント数</p>
                <p className="text-3xl font-bold mt-2">{(stats?.totalComments || 0).toLocaleString()}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">未処理報告</p>
                <p className="text-3xl font-bold mt-2">{(stats?.pendingReports || 0).toLocaleString()}</p>
              </div>
              <Flag className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">総ページビュー</p>
                <p className="text-3xl font-bold mt-2">{pageViews.total.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ユニークビュー</p>
                <p className="text-3xl font-bold mt-2">{pageViews.unique.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">総イベント数</p>
                <p className="text-3xl font-bold mt-2">{events.total.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">期間</p>
                <p className="text-lg font-semibold mt-2">
                  {dateRange === "all"
                    ? "全期間"
                    : `${format(startDate!, "yyyy/MM/dd")} - ${format(endDate!, "yyyy/MM/dd")}`}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* イベントタイプ別統計 */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">イベントタイプ別統計</h2>
          <div className="space-y-4">
            {events.byType.length > 0 ? (
              events.byType.map((event) => (
                <div key={event.eventType} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {event.eventType === "prompt_copy" && <Copy className="h-5 w-5 text-muted-foreground" />}
                    {event.eventType === "prompt_like" && <Heart className="h-5 w-5 text-muted-foreground" />}
                    {event.eventType === "prompt_bookmark" && <Bookmark className="h-5 w-5 text-muted-foreground" />}
                    {event.eventType === "prompt_view" && <Eye className="h-5 w-5 text-muted-foreground" />}
                    {event.eventType === "prompt_create" && <FileText className="h-5 w-5 text-muted-foreground" />}
                    {event.eventType === "prompt_update" && <FileText className="h-5 w-5 text-muted-foreground" />}
                    {event.eventType === "comment" && <FileText className="h-5 w-5 text-muted-foreground" />}
                    {event.eventType === "search" && <Search className="h-5 w-5 text-muted-foreground" />}
                    <span className="font-medium">
                      {eventTypeLabels[event.eventType] || event.eventType}
                    </span>
                  </div>
                  <span className="text-lg font-bold">{event.count.toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">データがありません</p>
            )}
          </div>
        </Card>

        {/* ページ別ページビュー */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">ページ別ページビュー</h2>
          <div className="space-y-4">
            {pageViews.byPath.length > 0 ? (
              pageViews.byPath.slice(0, 10).map((path) => (
                <div key={path.path} className="flex items-center justify-between">
                  <span className="font-mono text-sm">{path.path}</span>
                  <span className="text-lg font-bold">{path.count.toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">データがありません</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

