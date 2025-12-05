import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, BookOpen, BarChart3, Clock, Globe } from "lucide-react";
import { journals, Journal } from "@/lib/journals";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function JournalFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"impactFactor" | "title">("impactFactor");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const categories = Array.from(new Set(journals.flatMap(j => j.category)));

  const filteredJournals = useMemo(() => {
    return journals
      .filter(journal => {
        const matchesSearch = 
          journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          journal.publisher.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === "all" || journal.category.includes(filterCategory);
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "impactFactor") {
          return b.impactFactor - a.impactFactor;
        }
        return a.title.localeCompare(b.title);
      });
  }, [searchQuery, sortBy, filterCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search journals by title or publisher..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="impactFactor">Impact Factor</SelectItem>
            <SelectItem value="title">Title (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredJournals.map((journal) => (
          <Card key={journal.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {journal.title}
                    {journal.openAccess && (
                      <Badge variant="secondary" className="text-xs font-normal bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        <Globe className="w-3 h-3 mr-1" /> Open Access
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{journal.publisher}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" /> IF: {journal.impactFactor}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Review Speed: {journal.reviewSpeed || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>Acceptance Rate: {journal.acceptanceRate || "N/A"}</span>
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded text-xs space-y-1">
                  <p><strong>Word Count:</strong> {journal.requirements.wordCount}</p>
                  <p><strong>Abstract:</strong> {journal.requirements.abstract}</p>
                  <p><strong>Figures/Refs:</strong> {journal.requirements.figures} / {journal.requirements.references}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={journal.url} target="_blank" rel="noopener noreferrer">
                    Visit Journal <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={journal.guidelinesUrl} target="_blank" rel="noopener noreferrer">
                    Author Guidelines <ExternalLink className="w-3 h-3 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredJournals.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No journals found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
