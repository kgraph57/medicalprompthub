import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Plus, Trash2, Eye, EyeOff, Heart, Bookmark, Copy } from "lucide-react";
import { useRoute, Link } from "wouter";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CollectionDetail() {
  const { isAuthenticated, user } = useAuth();
  const [, params] = useRoute("/collections/:id");
  const collectionId = params?.id ? parseInt(params.id) : undefined;
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [promptId, setPromptId] = useState("");
  const [note, setNote] = useState("");

  const { data: collection } = trpc.collections.byId.useQuery(
    { id: collectionId! },
    { enabled: !!collectionId }
  );

  const { data: prompts = [], refetch } = trpc.collections.prompts.useQuery(
    { collectionId: collectionId! },
    { enabled: !!collectionId }
  );

  const addPromptMutation = trpc.collections.addPrompt.useMutation({
    onSuccess: () => {
      toast.success("プロンプトを追加しました");
      setIsAddDialogOpen(false);
      setPromptId("");
      setNote("");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "プロンプトの追加に失敗しました");
    },
  });

  const removePromptMutation = trpc.collections.removePrompt.useMutation({
    onSuccess: () => {
      toast.success("プロンプトを削除しました");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "プロンプトの削除に失敗しました");
    },
  });

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">コレクションが見つかりません</p>
          <Link href="/collections">
            <Button className="mt-4">コレクション一覧に戻る</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddPrompt = () => {
    const id = parseInt(promptId);
    if (isNaN(id)) {
      toast.error("有効なプロンプトIDを入力してください");
      return;
    }
    addPromptMutation.mutate({
      collectionId: collectionId!,
      promptId: id,
      note: note.trim() || undefined,
    });
  };

  const handleRemovePrompt = (promptId: number) => {
    if (confirm("このプロンプトをコレクションから削除しますか？")) {
      removePromptMutation.mutate({
        collectionId: collectionId!,
        promptId,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-6 max-w-6xl">
        <Link href="/collections">
          <Button variant="ghost" className="mb-4 gap-1.5 h-7 text-xs">
            <ArrowLeft className="h-3.5 w-3.5" />
            コレクション一覧に戻る
          </Button>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h1 className="text-xl sm:text-2xl font-black">{collection.name}</h1>
              {collection.isPublic === 1 ? (
                <Badge variant="secondary" className="gap-1 text-[10px]">
                  <Eye className="h-3 w-3" />
                  公開
                </Badge>
              ) : (
                <Badge variant="outline" className="gap-1 text-[10px]">
                  <EyeOff className="h-3 w-3" />
                  非公開
                </Badge>
              )}
            </div>
            {collection.description && (
              <p className="text-xs sm:text-sm text-muted-foreground">{collection.description}</p>
            )}
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5">
              {collection.userName} 作成 • {prompts.length} 個のプロンプト
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="default" className="gap-1.5 w-full sm:w-auto h-8 text-xs">
                <Plus className="h-3.5 w-3.5" />
                プロンプトを追加
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>プロンプトを追加</DialogTitle>
                <DialogDescription>
                  コレクションにプロンプトを追加します
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="promptId">プロンプトID</Label>
                  <Input
                    id="promptId"
                    type="number"
                    value={promptId}
                    onChange={(e) => setPromptId(e.target.value)}
                    placeholder="例: 123"
                  />
                  <p className="text-xs text-muted-foreground">
                    プロンプト詳細ページのURLからIDを確認できます
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note">メモ（任意）</Label>
                  <Textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="このプロンプトを追加した理由など"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  キャンセル
                </Button>
                <Button onClick={handleAddPrompt} disabled={addPromptMutation.isPending}>
                  {addPromptMutation.isPending ? "追加中..." : "追加"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {prompts.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">このコレクションにはまだプロンプトがありません</p>
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-1.5 h-8 text-xs">
              <Plus className="h-3.5 w-3.5" />
              最初のプロンプトを追加
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {prompts.map((prompt: any) => (
              <Card key={prompt.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <Link href={`/prompts/${prompt.id}`}>
                      <h3 className="text-base font-bold mb-1.5 hover:text-primary transition-colors cursor-pointer">
                        {prompt.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                      <Badge variant="secondary" className="text-[10px]">{prompt.categoryName}</Badge>
                      <span>{prompt.authorName}</span>
                      <span>{new Date(prompt.createdAt).toLocaleDateString("ja-JP")}</span>
                    </div>
                    {prompt.note && (
                      <p className="text-xs text-muted-foreground italic mt-1.5">
                        📝 {prompt.note}
                      </p>
                    )}
                  </div>
                  {user && collection.userId === user.id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePrompt(prompt.id)}
                      className="text-destructive hover:text-destructive h-7 w-7 p-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5" />
                    {prompt.likesCount || 0}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bookmark className="h-3.5 w-3.5" />
                    {prompt.bookmarksCount || 0}
                  </div>
                  <Link href={`/prompts/${prompt.id}`}>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      詳細を見る
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

