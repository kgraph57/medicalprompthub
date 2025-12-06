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
      <div className="space-y-8 pb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bookmark className="w-8 h-8 text-yellow-500 fill-current" />
            お気に入りプロンプト
          </h1>
          <p className="text-muted-foreground">
            保存したプロンプトの一覧です。よく使うプロンプトに素早くアクセスできます。
          </p>
        </div>

        {favoritePrompts.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <Bookmark className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">お気に入りはまだありません</h3>
            <p className="text-muted-foreground mt-2 mb-6">
              プロンプト詳細ページのブックマークボタンを押すと、ここに追加されます。
            </p>
            <Link href="/">
              <Button>プロンプトを探す</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritePrompts.map((prompt) => (
              <Card key={prompt.id} className="flex flex-col hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg line-clamp-1">{prompt.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 -mr-2 -mt-2 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(prompt.id);
                      }}
                    >
                      <BookmarkX className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardDescription className="line-clamp-2">{prompt.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <Link href={`/prompts/${prompt.id}`}>
                    <Button className="w-full group">
                      詳細を見る
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
