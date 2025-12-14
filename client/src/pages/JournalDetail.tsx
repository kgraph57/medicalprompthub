import { useRoute, Link } from "wouter";
import { journals } from "@/lib/journals";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Globe, BarChart3, Clock, BookOpen, FileText, CheckCircle, DollarSign } from "lucide-react";
import { useEffect } from "react";
import { updateSEO, addStructuredData, BASE_URL } from "@/lib/seo";

export default function JournalDetail() {
  const [match, params] = useRoute("/journal/:id");
  const journalId = match ? params.id : null;
  const journal = journals.find((j) => j.id === journalId);

  // SEO設定
  useEffect(() => {
    if (journal) {
      updateSEO({
        title: `${journal.title} | ジャーナル情報 | Helix`,
        description: `${journal.title}の詳細情報。インパクトファクター、レビュー速度、投稿要件などを確認できます。`,
        path: `/journal/${journalId}`,
        keywords: `${journal.title},ジャーナル,インパクトファクター,医学雑誌,${journal.publisher}`
      });

      // 構造化データ（Periodical）を追加
      addStructuredData({
        "@context": "https://schema.org",
        "@type": "Periodical",
        "name": journal.title,
        "publisher": {
          "@type": "Organization",
          "name": journal.publisher
        },
        "url": journal.url,
        "description": `${journal.title}の詳細情報`
      });
    }
  }, [journal, journalId]);

  if (!journal) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Journal Not Found</h2>
        <p className="text-muted-foreground mb-6">The journal you are looking for does not exist.</p>
        <Link href="/journal-finder">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Journal Finder
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-2 lg:py-2.5 space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Link href="/journal-finder">
          <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent hover:text-primary h-8 text-xs">
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Finder
          </Button>
        </Link>
      </div>

      <div className="space-y-2">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-primary">{journal.title}</h1>
            <p className="text-lg text-muted-foreground mt-1">{journal.publisher}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs py-0.5 px-2 flex items-center gap-1">
              <BarChart3 className="w-3.5 h-3.5" /> IF: {journal.impactFactor}
            </Badge>
            {journal.openAccess && (
              <Badge variant="secondary" className="text-xs py-0.5 px-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-0 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Open Access
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {journal.category.map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
        </div>

        {journal.description && (
          <p className="text-base leading-relaxed text-muted-foreground border-l-4 border-primary/20 pl-3 py-1">
            {journal.description}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Card className="md:col-span-2">
          <CardHeader className="p-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="w-4 h-4 text-primary" /> Submission Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 space-y-2">
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="bg-muted/30 p-2.5 rounded-lg space-y-0.5">
                <span className="text-xs text-muted-foreground block">Word Count</span>
                <span className="font-medium text-base">{journal.requirements.wordCount}</span>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg space-y-1">
                <span className="text-xs text-muted-foreground block">Abstract</span>
                <span className="font-medium text-base">{journal.requirements.abstract}</span>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg space-y-1">
                <span className="text-xs text-muted-foreground block">Figures</span>
                <span className="font-medium text-base">{journal.requirements.figures}</span>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg space-y-1">
                <span className="text-xs text-muted-foreground block">References</span>
                <span className="font-medium text-base">{journal.requirements.references}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary" /> Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-2">
              <div>
                <span className="text-xs text-muted-foreground block">Review Speed</span>
                <span className="font-medium text-sm">{journal.reviewSpeed || "N/A"}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Acceptance Rate</span>
                <span className="font-medium text-sm">{journal.acceptanceRate || "N/A"}</span>
              </div>
              {journal.apc && (
                <div>
                  <span className="text-xs text-muted-foreground block flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> APC (Publication Fee)
                  </span>
                  <span className="font-medium text-sm">{journal.apc}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-1.5">
            <Button className="w-full h-8 text-xs" asChild>
              <a href={journal.url} target="_blank" rel="noopener noreferrer">
                Visit Journal Website <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
              </a>
            </Button>
            <Button variant="outline" className="w-full h-9 text-sm" asChild>
              <a href={journal.guidelinesUrl} target="_blank" rel="noopener noreferrer">
                View Author Guidelines <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {journal.features && (
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-3.5 h-3.5 text-primary" /> Key Features
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <ul className="grid sm:grid-cols-2 gap-1.5">
              {journal.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
