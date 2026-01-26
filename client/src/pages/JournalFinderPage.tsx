import { JournalFinder } from "@/components/JournalFinder";
import { Activity, Search, BarChart3, Clock, BookOpen } from "lucide-react";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { journals } from "@/lib/journals";

export default function JournalFinderPage() {
  useEffect(() => {
    updateSEO({
      title: "ジャーナル検索 | HELIX",
      description: "医学雑誌を検索・比較。インパクトファクター、レビュー速度、投稿要件などを確認して、最適なジャーナルを選べます。",
      path: "/journal-finder",
      keywords: "ジャーナル検索,医学雑誌,インパクトファクター,論文投稿,ジャーナル比較"
    });
  }, []);

  const journalCount = journals.length;
  const categories = Array.from(new Set(journals.flatMap(j => j.category))).length;

  return (
    <div className="container py-2 lg:py-2.5 space-y-3">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-2 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary flex items-center gap-2.5 flex-wrap">
              <Activity className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              <span className="flex items-center gap-2 flex-wrap">
                <span>Journal Finder</span>
                <Badge variant="secondary" className="text-xs font-semibold px-2.5 py-0.5">
                  {journalCount} ジャーナル
                </Badge>
              </span>
            </h1>
            <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
              医学雑誌を検索・比較
              <span className="text-muted-foreground font-normal">
                ｜インパクトファクター、レビュー速度、投稿要件などを確認して、最適なジャーナルを選べます
              </span>
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Search className="w-4 h-4" />
            <span>検索・フィルタリング</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4" />
            <span>インパクトファクター比較</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>レビュー速度情報</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>{categories}カテゴリ</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
          Find the perfect medical journal for your research. Compare impact factors, review speeds, submission requirements, and acceptance rates to make informed decisions. Select multiple journals to compare side-by-side and discover the best fit for your work.
        </p>
      </div>
      
      <JournalFinder />
    </div>
  );
}
