import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, ExternalLink, BookOpen, BarChart3, Clock, Globe, ArrowRightLeft, ChevronDown, ChevronUp } from "lucide-react";
import { journals, Journal } from "@/lib/journals";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";

export function JournalFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"impactFactor" | "title">("impactFactor");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [expandedJournals, setExpandedJournals] = useState<Set<string>>(new Set());

  const categories = Array.from(new Set(journals.flatMap(j => j.category)));

  const toggleCompare = (id: string) => {
    setSelectedForCompare(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleExpanded = (id: string) => {
    setExpandedJournals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

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
    <div className="space-y-3">
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <Card className="shadow-xl border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="text-xs font-medium">
                {selectedForCompare.length} journal{selectedForCompare.length !== 1 && "s"} selected
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedForCompare([])} className="h-8 text-xs">
                  Clear
                </Button>
                <Link href={`/journal-compare?ids=${selectedForCompare.join(",")}`}>
                  <Button size="sm" className="gap-1.5 h-8 text-xs">
                    Compare <ArrowRightLeft className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
        <div className="flex gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[160px]">
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
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="impactFactor">Impact Factor</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-3">
        {filteredJournals.map((journal) => {
          const isExpanded = expandedJournals.has(journal.id);
          
          return (
            <Card key={journal.id} className="hover:shadow-md transition-shadow overflow-hidden">
              <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(journal.id)}>
                <CardHeader className="pb-2 bg-muted/20 p-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id={`compare-${journal.id}`}
                            checked={selectedForCompare.includes(journal.id)}
                            onCheckedChange={() => toggleCompare(journal.id)}
                            className="h-4 w-4"
                          />
                          <Link href={`/journal/${journal.id}`}>
                            <CardTitle className="text-base hover:underline cursor-pointer text-primary font-semibold">{journal.title}</CardTitle>
                          </Link>
                        </div>
                        {journal.openAccess && (
                          <Badge variant="secondary" className="text-[10px] font-normal bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-0 px-2 py-0.5">
                            <Globe className="w-3 h-3 mr-1" /> Open Access
                          </Badge>
                        )}
                        <Badge variant="outline" className="flex items-center gap-1 bg-background text-[10px] px-2 py-0.5">
                          <BarChart3 className="w-3 h-3" /> IF: {journal.impactFactor}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">{journal.publisher}</CardDescription>
                      
                      {/* Compact metrics - always visible */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{journal.reviewSpeed || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          <span>Acceptance: {journal.acceptanceRate || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                    
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="shrink-0 h-8 text-xs">
                        {isExpanded ? (
                          <>
                            詳細を隠す <ChevronUp className="w-3.5 h-3.5 ml-1" />
                          </>
                        ) : (
                          <>
                            詳細を表示 <ChevronDown className="w-3.5 h-3.5 ml-1" />
                          </>
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </CardHeader>
                
                <CollapsibleContent>
                  <CardContent className="pt-3 p-4">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Metrics</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center gap-1.5 text-xs">
                            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="font-medium">{journal.reviewSpeed || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs">
                            <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="font-medium">Acceptance: {journal.acceptanceRate || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Requirements</h4>
                        <div className="bg-muted/30 p-3 rounded-lg text-xs space-y-1.5 border border-border/50">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Word Count:</span>
                            <span className="font-medium">{journal.requirements.wordCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Abstract:</span>
                            <span className="font-medium">{journal.requirements.abstract}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Figures/Refs:</span>
                            <span className="font-medium">{journal.requirements.figures} / {journal.requirements.references}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border/50">
                      <Button variant="outline" size="sm" className="flex-1 h-8 text-xs" asChild>
                        <a href={journal.url} target="_blank" rel="noopener noreferrer">
                          Visit Journal <ExternalLink className="w-3 h-3 ml-1.5" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 h-8 text-xs" asChild>
                        <a href={journal.guidelinesUrl} target="_blank" rel="noopener noreferrer">
                          Author Guidelines <ExternalLink className="w-3 h-3 ml-1.5" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
        {filteredJournals.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <Search className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No journals found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
