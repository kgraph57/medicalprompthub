import { JournalFinder } from "@/components/JournalFinder";
import { Activity } from "lucide-react";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";

export default function JournalFinderPage() {
  useEffect(() => {
    updateSEO({
      title: "ジャーナル検索 | Medical Prompt Hub",
      description: "医学雑誌を検索・比較。インパクトファクター、レビュー速度、投稿要件などを確認して、最適なジャーナルを選べます。",
      path: "/journal-finder",
      keywords: "ジャーナル検索,医学雑誌,インパクトファクター,論文投稿,ジャーナル比較"
    });
  }, []);

  return (
    <div className="container py-2 lg:py-2.5 space-y-3">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Journal Finder
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          Find the perfect medical journal for your research. Compare impact factors, review speeds, and submission requirements to make informed decisions.
        </p>
      </div>
      
      <JournalFinder />
    </div>
  );
}
