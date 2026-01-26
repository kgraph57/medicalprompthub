import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const handleShare = async () => {
    const shareData = {
      title: `HELIX - ${title}`,
      text: description || title,
      url: url
    };

    // Web Share API が使える場合
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("共有しました");
      } catch (err) {
        // ユーザーがキャンセルした場合は何もしない
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      // Web Share API が使えない場合はURLをコピー
      try {
        await navigator.clipboard.writeText(url);
        toast.success("URLをコピーしました");
      } catch (err) {
        toast.error("共有に失敗しました");
      }
    }
  };

  const handleTwitterShare = () => {
    const text = `${title} | HELIX`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=MedicalAI,プロンプトエンジニアリング,医療DX`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  return (
    <div className="flex items-center gap-0.5">
      <Tooltip>
        <TooltipTrigger asChild>
      <Button
            variant="ghost"
            size="icon"
        onClick={handleShare}
            className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200 rounded-md"
            aria-label="共有"
      >
        <Share2 className="w-3.5 h-3.5" />
      </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>共有</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
      <Button
            variant="ghost"
            size="icon"
        onClick={handleTwitterShare}
            className="h-7 w-7 text-muted-foreground hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-all duration-200 rounded-md"
            aria-label="Twitterで共有"
      >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Twitterで共有</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
