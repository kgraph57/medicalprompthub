import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Flag, AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "wouter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function Moderation() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [statusFilter, setStatusFilter] = useState<"pending" | "reviewed" | "resolved" | "dismissed" | undefined>(undefined);

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

  const { data: reports = [], isLoading } = trpc.reports.list.useQuery({
    status: statusFilter,
    limit: 100,
    offset: 0,
  });

  const { data: pendingCount } = trpc.reports.pendingCount.useQuery();

  const updateStatusMutation = trpc.reports.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("ステータスを更新しました");
      utils.reports.list.invalidate();
      utils.reports.pendingCount.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "更新に失敗しました");
    },
  });

  const utils = trpc.useUtils();
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleStatusUpdate = (reportId: number, status: "pending" | "reviewed" | "resolved" | "dismissed") => {
    setSelectedReport(reportId);
    setSelectedStatus(status);
  };

  const confirmStatusUpdate = () => {
    if (selectedReport && selectedStatus) {
      updateStatusMutation.mutate({
        reportId: selectedReport,
        status: selectedStatus as any,
      });
      setSelectedReport(null);
      setSelectedStatus(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="destructive" className="gap-1"><Clock className="h-3 w-3" />未処理</Badge>;
      case "reviewed":
        return <Badge variant="default" className="gap-1"><AlertCircle className="h-3 w-3" />確認済み</Badge>;
      case "resolved":
        return <Badge variant="default" className="gap-1 bg-green-600"><CheckCircle className="h-3 w-3" />解決済み</Badge>;
      case "dismissed":
        return <Badge variant="secondary" className="gap-1"><XCircle className="h-3 w-3" />却下</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getReasonLabel = (reason: string) => {
    const labels: Record<string, string> = {
      spam: "スパム",
      inappropriate: "不適切な内容",
      harassment: "ハラスメント",
      copyright: "著作権侵害",
      misinformation: "誤情報",
      other: "その他",
    };
    return labels[reason] || reason;
  };

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
              <h1 className="text-2xl sm:text-4xl font-bold mb-2">モデレーション</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                {pendingCount !== undefined && pendingCount > 0 && (
                  <span className="text-destructive font-semibold">{pendingCount}件の未処理報告</span>
                )}
                {pendingCount === 0 && "すべての報告を処理済みです"}
              </p>
            </div>
            <Select value={statusFilter || "all"} onValueChange={(value) => setStatusFilter(value === "all" ? undefined : value as any)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="pending">未処理</SelectItem>
                <SelectItem value="reviewed">確認済み</SelectItem>
                <SelectItem value="resolved">解決済み</SelectItem>
                <SelectItem value="dismissed">却下</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {reports.length === 0 ? (
          <Card className="p-12 text-center">
            <Flag className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-xl font-semibold mb-2">報告はありません</p>
            <p className="text-muted-foreground">
              {statusFilter ? "このステータスの報告はありません" : "現在、報告はありません"}
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {reports.map((report: any) => (
              <Card key={report.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusBadge(report.status)}
                      <Badge variant="outline">{getReasonLabel(report.reason)}</Badge>
                      <span className="text-sm text-muted-foreground">
                        報告者: {report.reporterName || "匿名"}
                      </span>
                    </div>
                    {report.description && (
                      <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {report.promptId && (
                        <Link href={`/prompts/${report.promptId}`} className="hover:text-primary transition-colors">
                          プロンプト: {report.promptTitle || `ID ${report.promptId}`}
                        </Link>
                      )}
                      {report.commentId && (
                        <span>コメントID: {report.commentId}</span>
                      )}
                      {report.userId && (
                        <Link href={`/users/${report.userId}`} className="hover:text-primary transition-colors">
                          ユーザーID: {report.userId}
                        </Link>
                      )}
                      <span>報告日時: {new Date(report.createdAt).toLocaleString("ja-JP")}</span>
                    </div>
                  </div>
                  {report.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(report.id, "reviewed")}
                      >
                        確認済み
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(report.id, "resolved")}
                      >
                        解決済み
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(report.id, "dismissed")}
                      >
                        却下
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        <AlertDialog open={selectedReport !== null} onOpenChange={() => setSelectedReport(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>ステータスを更新しますか？</AlertDialogTitle>
              <AlertDialogDescription>
                この操作により、報告のステータスが「{selectedStatus === "reviewed" ? "確認済み" : selectedStatus === "resolved" ? "解決済み" : "却下"}」に変更されます。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction onClick={confirmStatusUpdate}>更新</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}


