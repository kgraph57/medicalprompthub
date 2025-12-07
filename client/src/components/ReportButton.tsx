import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { Flag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

interface ReportButtonProps {
  promptId?: number;
  commentId?: number;
  userId?: number;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function ReportButton({ promptId, commentId, userId, variant = "ghost", size = "sm" }: ReportButtonProps) {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string>("");
  const [description, setDescription] = useState("");

  const createReportMutation = trpc.reports.create.useMutation({
    onSuccess: () => {
      toast.success("報告を送信しました。ご協力ありがとうございます。");
      setOpen(false);
      setReason("");
      setDescription("");
    },
    onError: (error) => {
      toast.error(error.message || "報告の送信に失敗しました");
    },
  });

  const handleSubmit = () => {
    if (!reason) {
      toast.error("報告理由を選択してください");
      return;
    }

    createReportMutation.mutate({
      promptId,
      commentId,
      userId,
      reason: reason as any,
      description: description || undefined,
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className="gap-2">
          <Flag className="h-4 w-4" />
          報告
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>不適切なコンテンツを報告</DialogTitle>
          <DialogDescription>
            不適切なコンテンツを発見した場合は、こちらから報告してください。
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="reason">報告理由</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="理由を選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spam">スパム</SelectItem>
                <SelectItem value="inappropriate">不適切な内容</SelectItem>
                <SelectItem value="harassment">ハラスメント</SelectItem>
                <SelectItem value="copyright">著作権侵害</SelectItem>
                <SelectItem value="misinformation">誤情報</SelectItem>
                <SelectItem value="other">その他</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">詳細（任意）</Label>
            <Textarea
              id="description"
              placeholder="詳細を記入してください..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {description.length}/1000文字
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit} disabled={createReportMutation.isPending || !reason}>
            {createReportMutation.isPending ? "送信中..." : "報告を送信"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}




