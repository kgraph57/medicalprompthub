import { useLocation, Link } from "wouter";
import { journals } from "@/lib/journals";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X, Check, Minus, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { updateSEO } from "@/lib/seo";

export default function JournalCompare() {
  const [location] = useLocation();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    updateSEO({
      title: "ジャーナル比較 | HELIX",
      description: "複数の医学雑誌を比較。インパクトファクター、レビュー速度、投稿要件などを並べて比較できます。",
      path: "/journal-compare",
      keywords: "ジャーナル比較,医学雑誌,インパクトファクター,論文投稿"
    });
  }, []);

  useEffect(() => {
    // Parse query params manually since wouter doesn't have a built-in hook for it
    const searchParams = new URLSearchParams(window.location.search);
    const ids = searchParams.get("ids");
    if (ids) {
      setSelectedIds(ids.split(","));
    }
  }, [location]);

  const selectedJournals = journals.filter(j => selectedIds.includes(j.id));

  if (selectedJournals.length === 0) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">No Journals Selected</h2>
        <p className="text-muted-foreground mb-6">Please select journals to compare from the Journal Finder.</p>
        <Link href="/journal-finder">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Journal Finder
          </Button>
        </Link>
      </div>
    );
  }

  const removeJournal = (id: string) => {
    const newIds = selectedIds.filter(i => i !== id);
    if (newIds.length > 0) {
      window.location.href = `/journal-compare?ids=${newIds.join(",")}`;
    } else {
      window.location.href = "/journal-finder";
    }
  };

  return (
    <div className="container py-2 lg:py-2.5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Link href="/journal-finder">
            <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent hover:text-primary h-8 text-xs">
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Finder
            </Button>
          </Link>
        </div>
        <h1 className="text-xl font-bold text-primary">Journal Comparison</h1>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px] bg-muted/50">Feature</TableHead>
              {selectedJournals.map(journal => (
                <TableHead key={journal.id} className="min-w-[200px] bg-muted/20 relative">
                  <div className="pr-7">
                    <Link href={`/journal/${journal.id}`}>
                      <span className="hover:underline cursor-pointer text-primary font-semibold text-xs">{journal.title}</span>
                    </Link>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-1 right-1 h-5 w-5 text-muted-foreground hover:text-destructive"
                    onClick={() => removeJournal(journal.id)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold bg-muted/50">Publisher</TableCell>
              {selectedJournals.map(journal => (
                <TableCell key={journal.id}>{journal.publisher}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold bg-muted/50">Impact Factor</TableCell>
              {selectedJournals.map(journal => (
                <TableCell key={journal.id}>
                  <Badge variant="outline" className="font-semibold text-[10px] px-2 py-0.5">{journal.impactFactor}</Badge>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold bg-muted/50">Open Access</TableCell>
              {selectedJournals.map(journal => (
                <TableCell key={journal.id}>
                  {journal.openAccess ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-0 text-[10px] px-2 py-0.5">
                      <Check className="w-3 h-3 mr-1" /> Yes
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground text-[10px] px-2 py-0.5">
                      <Minus className="w-3 h-3 mr-1" /> No
                    </Badge>
                  )}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold bg-muted/50">Review Speed</TableCell>
              {selectedJournals.map(journal => (
                <TableCell key={journal.id}>{journal.reviewSpeed || "N/A"}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold bg-muted/50">Acceptance Rate</TableCell>
              {selectedJournals.map(journal => (
                <TableCell key={journal.id}>{journal.acceptanceRate || "N/A"}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold bg-muted/50">APC</TableCell>
              {selectedJournals.map(journal => (
                <TableCell key={journal.id}>{journal.apc || "N/A"}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold bg-muted/50">Word Count</TableCell>
              {selectedJournals.map(journal => (
                <TableCell key={journal.id}>{journal.requirements.wordCount}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold bg-muted/50">Abstract</TableCell>
              {selectedJournals.map(journal => (
                <TableCell key={journal.id}>{journal.requirements.abstract}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold bg-muted/50">Figures / Refs</TableCell>
              {selectedJournals.map(journal => (
                <TableCell key={journal.id}>
                  {journal.requirements.figures} / {journal.requirements.references}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold bg-muted/50">Links</TableCell>
              {selectedJournals.map(journal => (
                <TableCell key={journal.id}>
                  <div className="flex flex-col gap-1.5">
                    <a href={journal.url} target="_blank" rel="noopener noreferrer" className="text-[10px] flex items-center hover:underline text-primary">
                      Website <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                    <a href={journal.guidelinesUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] flex items-center hover:underline text-primary">
                      Guidelines <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
