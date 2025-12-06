import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

interface HelpfulnessVoteProps {
  promptId: number;
  helpfulCount?: number;
  notHelpfulCount?: number;
}

export function HelpfulnessVote({ promptId, helpfulCount = 0, notHelpfulCount = 0 }: HelpfulnessVoteProps) {
  const { isAuthenticated } = useAuth();
  const [userVote, setUserVote] = useState<boolean | null>(null);

  const utils = trpc.useUtils();

  const { data: userHelpfulness } = trpc.helpfulness.get.useQuery(
    { promptId },
    { enabled: isAuthenticated }
  );

  const voteMutation = trpc.helpfulness.vote.useMutation({
    onSuccess: () => {
      toast.success("投票を送信しました");
      utils.prompts.byId.invalidate({ id: promptId });
      utils.helpfulness.get.invalidate({ promptId });
    },
    onError: (error) => {
      toast.error(error.message || "投票の送信に失敗しました");
    },
  });

  const removeVoteMutation = trpc.helpfulness.remove.useMutation({
    onSuccess: () => {
      toast.success("投票を削除しました");
      utils.prompts.byId.invalidate({ id: promptId });
      utils.helpfulness.get.invalidate({ promptId });
    },
    onError: (error) => {
      toast.error(error.message || "投票の削除に失敗しました");
    },
  });

  useEffect(() => {
    if (userHelpfulness?.helpful !== null && userHelpfulness?.helpful !== undefined) {
      setUserVote(userHelpfulness.helpful);
    }
  }, [userHelpfulness]);

  const handleVote = (helpful: boolean) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    if (userVote === helpful) {
      // 同じ投票をクリックした場合は削除
      removeVoteMutation.mutate({ promptId });
      setUserVote(null);
    } else {
      voteMutation.mutate({ promptId, helpful });
      setUserVote(helpful);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant={userVote === true ? "default" : "outline"}
        size="sm"
        onClick={() => handleVote(true)}
        disabled={!isAuthenticated}
        className="gap-2"
      >
        <ThumbsUp className="h-4 w-4" />
        役に立った
        {helpfulCount > 0 && <span className="ml-1">({helpfulCount})</span>}
      </Button>
      <Button
        variant={userVote === false ? "default" : "outline"}
        size="sm"
        onClick={() => handleVote(false)}
        disabled={!isAuthenticated}
        className="gap-2"
      >
        <ThumbsDown className="h-4 w-4" />
        役に立たなかった
        {notHelpfulCount > 0 && <span className="ml-1">({notHelpfulCount})</span>}
      </Button>
    </div>
  );
}

