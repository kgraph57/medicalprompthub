import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFavorites } from "@/hooks/useFavorites";
import { fullPrompts } from "@/lib/prompts-full";
import { ArrowRight, Bookmark, BookmarkX } from "lucide-react";
import { Link } from "wouter";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const favoritePrompts = fullPrompts.filter((p) => favorites.includes(p.id));

  return (
    <Layout>
      <div className="space-y-4 pb-12">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-yellow-500 fill-current" />
            お気に入りプロンプト
          </h1>
          <p className="text-sm text-muted-foreground">
            保存したプロンプトの一覧です。よく使うプロンプトに素早くアクセスできます。
          </p>
        </div>

        {favoritePrompts.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <Bookmark className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-base font-medium">お気に入りはまだありません</h3>
            <p className="text-sm text-muted-foreground mt-1.5 mb-4">
              プロンプト詳細ページのブックマークボタンを押すと、ここに追加されます。
            </p>
            <Link href="/">
              <Button size="sm" className="h-8 text-xs">プロンプトを探す</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {favoritePrompts.map((prompt) => (
              <Card key={prompt.id} className="flex flex-col hover:shadow-md transition-shadow h-full min-h-[140px]">
                <CardHeader className="p-3 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base line-clamp-1 leading-tight">{prompt.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 -mr-1 -mt-1 text-muted-foreground hover:text-destructive shrink-0"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(prompt.id);
                      }}
                    >
                      <BookmarkX className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <CardDescription className="line-clamp-2 text-xs">{prompt.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0 p-3">
                  <Link href={`/prompts/${prompt.id}`}>
                    <Button className="w-full group h-8 text-xs">
                      詳細を見る
                      <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
