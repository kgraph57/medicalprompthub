import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { GitBranch } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

interface ForkButtonProps {
  promptId: number;
  promptTitle: string;
}

export function ForkButton({ promptId, promptTitle }: ForkButtonProps) {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const forkMutation = trpc.prompts.fork.useMutation({
    onSuccess: (data) => {
      toast.success("プロンプトをフォークしました");
      setLocation(`/prompts/${data.id}/edit`);
    },
    onError: (error) => {
      toast.error(error.message || "フォークに失敗しました");
    },
  });

  const handleFork = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    if (confirm(`「${promptTitle}」をフォークして編集しますか？`)) {
      forkMutation.mutate({ promptId });
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleFork}
      disabled={!isAuthenticated || forkMutation.isPending}
      className="rounded-full border-2 font-semibold gap-2"
    >
      <GitBranch className="w-4 h-4" />
      {forkMutation.isPending ? "フォーク中..." : "フォーク"}
    </Button>
  );
}







