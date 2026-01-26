import { Layout } from "@/components/Layout";
import { useEffect } from "react";
import { updateSEO, addHomeStructuredData } from "@/lib/seo";
import { HeroSection } from "@/components/home/HeroSection";
import { ContentShowcaseSection } from "@/components/home/ContentShowcaseSection";

export default function Home() {
  useEffect(() => {
    updateSEO({
      title: "医療従事者のためのAI学習プラットフォーム",
      description: "医師や研究者がAI（ChatGPT, Claudeなど）を臨床、研究、教育に効果的に活用するための学習プラットフォーム。インタラクティブなコースと実践的なプロンプトで医療AIをマスター。",
      path: "/",
      keywords: "医療,AI,学習,コース,医学研究,医療従事者,医師,看護師,薬剤師"
    });
    addHomeStructuredData();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen">
        {/* ヒーローセクション */}
        <HeroSection />

        {/* ワークフローとコースセクション */}
        <ContentShowcaseSection />
      </div>
    </Layout>
  );
}
