import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, X, Search } from "lucide-react";
import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function ComparePrompts() {
  const [, setLocation] = useLocation();
  const [promptIds, setPromptIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { data: searchResults = [] } = trpc.prompts.list.useQuery(
    { searchTerm: searchTerm || undefined, limit: 10 },
    { enabled: isSearching && searchTerm.length >= 2 }
  );

  const { data: prompts = [] } = trpc.prompts.list.useQuery(
    { limit: 100 },
    { enabled: promptIds.length > 0 }
  );

  const comparePrompts = prompts.filter((p: any) => promptIds.includes(p.id));

  const handleAddPrompt = (promptId: number) => {
    if (promptIds.length >= 5) {
      alert("最大5つまで比較できます");
      return;
    }
    if (!promptIds.includes(promptId)) {
      setPromptIds([...promptIds, promptId]);
    }
    setSearchTerm("");
    setIsSearching(false);
  };

  const handleRemovePrompt = (promptId: number) => {
    setPromptIds(promptIds.filter((id) => id !== promptId));
  };

  const handleSearch = () => {
    if (searchTerm.length >= 2) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12 max-w-7xl">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          ホームに戻る
        </Button>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-black mb-2">プロンプト比較</h1>
          <p className="text-sm sm:text-base text-muted-foreground">複数のプロンプトを並べて比較できます（最大5つ）</p>
        </div>

        {/* Search and Add Prompt */}
        <Card className="p-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="プロンプトを検索して追加..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value.length >= 2) {
                    setIsSearching(true);
                  } else {
                    setIsSearching(false);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="pl-12"
              />
              {isSearching && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {searchResults.map((prompt: any) => (
                    <button
                      key={prompt.id}
                      onClick={() => handleAddPrompt(prompt.id)}
                      disabled={promptIds.includes(prompt.id) || promptIds.length >= 5}
                      className="w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b last:border-b-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="font-semibold">{prompt.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {prompt.categoryName} • {prompt.authorName}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Selected Prompts */}
        {promptIds.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">比較中のプロンプト ({promptIds.length}/5)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {comparePrompts.map((prompt: any) => (
                <Card key={prompt.id} className="p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemovePrompt(prompt.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <h3 className="font-bold mb-2 pr-8">{prompt.title}</h3>
                  <Badge variant="secondary" className="text-xs mb-2">
                    {prompt.categoryName}
                  </Badge>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>いいね: {prompt.likesCount || 0}</div>
                    <div>ブックマーク: {prompt.bookmarksCount || 0}</div>
                    <div>閲覧: {prompt.viewsCount || 0}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {comparePrompts.length >= 2 && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">詳細比較</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 sm:p-4 font-semibold text-sm sm:text-base">項目</th>
                    {comparePrompts.map((prompt: any) => (
                      <th key={prompt.id} className="text-left p-2 sm:p-4 font-semibold border-l text-sm sm:text-base">
                        {prompt.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 sm:p-4 font-medium text-sm sm:text-base">カテゴリ</td>
                    {comparePrompts.map((prompt: any) => (
                      <td key={prompt.id} className="p-2 sm:p-4 border-l">
                        <Badge variant="secondary" className="text-xs">{prompt.categoryName}</Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 sm:p-4 font-medium text-sm sm:text-base">作成者</td>
                    {comparePrompts.map((prompt: any) => (
                      <td key={prompt.id} className="p-2 sm:p-4 border-l">
                        <Link href={`/users/${prompt.authorId}`}>
                          <span className="text-primary hover:underline cursor-pointer text-sm sm:text-base">
                            {prompt.authorName}
                          </span>
                        </Link>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 sm:p-4 font-medium text-sm sm:text-base">プロンプト</td>
                    {comparePrompts.map((prompt: any) => (
                      <td key={prompt.id} className="p-2 sm:p-4 border-l">
                        <pre className="whitespace-pre-wrap text-xs sm:text-sm bg-muted p-2 sm:p-3 rounded">
                          {prompt.promptText}
                        </pre>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 sm:p-4 font-medium text-sm sm:text-base">回答例</td>
                    {comparePrompts.map((prompt: any) => (
                      <td key={prompt.id} className="p-2 sm:p-4 border-l">
                        <pre className="whitespace-pre-wrap text-xs sm:text-sm bg-muted p-2 sm:p-3 rounded">
                          {prompt.responseText}
                        </pre>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 sm:p-4 font-medium text-sm sm:text-base">いいね数</td>
                    {comparePrompts.map((prompt: any) => (
                      <td key={prompt.id} className="p-2 sm:p-4 border-l text-sm sm:text-base">
                        {prompt.likesCount || 0}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 sm:p-4 font-medium text-sm sm:text-base">ブックマーク数</td>
                    {comparePrompts.map((prompt: any) => (
                      <td key={prompt.id} className="p-2 sm:p-4 border-l text-sm sm:text-base">
                        {prompt.bookmarksCount || 0}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 sm:p-4 font-medium text-sm sm:text-base">閲覧数</td>
                    {comparePrompts.map((prompt: any) => (
                      <td key={prompt.id} className="p-2 sm:p-4 border-l text-sm sm:text-base">
                        {prompt.viewsCount || 0}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-2 sm:p-4 font-medium text-sm sm:text-base">操作</td>
                    {comparePrompts.map((prompt: any) => (
                      <td key={prompt.id} className="p-2 sm:p-4 border-l">
                        <Link href={`/prompts/${prompt.id}`}>
                          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                            詳細を見る
                          </Button>
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {promptIds.length < 2 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              比較するには2つ以上のプロンプトを追加してください
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}


