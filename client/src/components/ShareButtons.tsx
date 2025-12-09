import { Button } from "@/components/ui/button";
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
      title: `Medical Prompt Hub - ${title}`,
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
    const text = `${title} | Medical Prompt Hub`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=MedicalAI,プロンプトエンジニアリング,医療DX`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="flex items-center gap-2"
      >
        <Share2 className="w-4 h-4" />
        共有
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleTwitterShare}
        className="flex items-center gap-2 bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] border-[#1DA1F2]"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        X
      </Button>
    </div>
  );
}
