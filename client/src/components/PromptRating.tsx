import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

interface PromptRatingProps {
  promptId: number;
  averageRating?: string | number;
  ratingCount?: number;
  size?: "sm" | "md" | "lg";
}

export function PromptRating({ promptId, averageRating, ratingCount, size = "md" }: PromptRatingProps) {
  const { isAuthenticated } = useAuth();
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const utils = trpc.useUtils();

  const { data: userRating } = trpc.ratings.get.useQuery(
    { promptId },
    { enabled: isAuthenticated }
  );

  const setRatingMutation = trpc.ratings.set.useMutation({
    onSuccess: () => {
      toast.success("評価を送信しました");
      utils.prompts.byId.invalidate({ id: promptId });
      utils.ratings.get.invalidate({ promptId });
    },
    onError: (error) => {
      toast.error(error.message || "評価の送信に失敗しました");
    },
  });

  const deleteRatingMutation = trpc.ratings.delete.useMutation({
    onSuccess: () => {
      toast.success("評価を削除しました");
      utils.prompts.byId.invalidate({ id: promptId });
      utils.ratings.get.invalidate({ promptId });
    },
    onError: (error) => {
      toast.error(error.message || "評価の削除に失敗しました");
    },
  });

  useEffect(() => {
    if (userRating?.rating) {
      setSelectedRating(userRating.rating);
    }
  }, [userRating]);

  const handleRatingClick = (rating: number) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    if (selectedRating === rating) {
      // 同じ評価をクリックした場合は削除
      deleteRatingMutation.mutate({ promptId });
      setSelectedRating(null);
    } else {
      setRatingMutation.mutate({ promptId, rating });
      setSelectedRating(rating);
    }
  };

  const displayRating = hoveredRating || selectedRating || (averageRating ? Number(averageRating) : 0);
  const starSize = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => isAuthenticated && setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(null)}
            className={`${starSize} transition-colors ${
              star <= displayRating
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            } ${isAuthenticated ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
            disabled={!isAuthenticated}
          >
            <Star className="w-full h-full" />
          </button>
        ))}
      </div>
      {averageRating && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span className="font-semibold">{Number(averageRating).toFixed(1)}</span>
          {ratingCount !== undefined && ratingCount > 0 && (
            <span>({ratingCount})</span>
          )}
        </div>
      )}
    </div>
  );
}

