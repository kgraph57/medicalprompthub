import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { UserPlus, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

interface FollowButtonProps {
  userId: number;
  userName?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function FollowButton({ userId, userName, variant = "outline", size = "default" }: FollowButtonProps) {
  const { isAuthenticated, user } = useAuth();
  const utils = trpc.useUtils();

  const { data: isFollowing } = trpc.follows.check.useQuery(
    { followingId: userId },
    { enabled: isAuthenticated && userId !== user?.id }
  );

  const toggleFollowMutation = trpc.follows.toggle.useMutation({
    onSuccess: (data) => {
      utils.follows.check.invalidate({ followingId: userId });
      utils.follows.counts.invalidate({ userId });
      if (data.following) {
        toast.success(`${userName || "ユーザー"}をフォローしました`);
      } else {
        toast.success(`${userName || "ユーザー"}のフォローを解除しました`);
      }
    },
    onError: (error) => {
      toast.error(error.message || "エラーが発生しました");
    },
  });

  // 自分自身の場合は表示しない
  if (!isAuthenticated || userId === user?.id) {
    return null;
  }

  const handleFollow = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    toggleFollowMutation.mutate({ followingId: userId });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleFollow}
      disabled={toggleFollowMutation.isPending}
      className="gap-2"
    >
      {isFollowing?.following ? (
        <>
          <UserCheck className="h-4 w-4" />
          フォロー中
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" />
          フォロー
        </>
      )}
    </Button>
  );
}







