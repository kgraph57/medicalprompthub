import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Plus, FolderOpen, Edit, Trash2, Eye, EyeOff, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { useLocation, Link } from "wouter";
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
import { Checkbox } from "@/components/ui/checkbox";

export default function Collections() {
  const { isAuthenticated, user } = useAuth();
  const [, setLocation] = useLocation();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<any>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const { data: collections = [], refetch } = trpc.collections.myCollections.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const createMutation = trpc.collections.create.useMutation({
    onSuccess: () => {
      toast.success("コレクションを作成しました");
      setIsCreateDialogOpen(false);
      setName("");
      setDescription("");
      setIsPublic(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "コレクションの作成に失敗しました");
    },
  });

  const updateMutation = trpc.collections.update.useMutation({
    onSuccess: () => {
      toast.success("コレクションを更新しました");
      setIsEditDialogOpen(false);
      setEditingCollection(null);
      setName("");
      setDescription("");
      setIsPublic(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "コレクションの更新に失敗しました");
    },
  });

  const deleteMutation = trpc.collections.delete.useMutation({
    onSuccess: () => {
      toast.success("コレクションを削除しました");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "コレクションの削除に失敗しました");
    },
  });

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  const handleCreate = () => {
    if (!name.trim()) {
      toast.error("コレクション名を入力してください");
      return;
    }
    createMutation.mutate({
      name: name.trim(),
      description: description.trim() || undefined,
      isPublic: isPublic,
    });
  };

  const handleEdit = (collection: any) => {
    setEditingCollection(collection);
    setName(collection.name);
    setDescription(collection.description || "");
    setIsPublic(collection.isPublic === 1);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!name.trim()) {
      toast.error("コレクション名を入力してください");
      return;
    }
    updateMutation.mutate({
      id: editingCollection.id,
      name: name.trim(),
      description: description.trim() || undefined,
      isPublic: isPublic,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("このコレクションを削除しますか？")) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black mb-2">マイコレクション</h1>
            <p className="text-sm sm:text-base text-muted-foreground">プロンプトをまとめて管理できます</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <Plus className="h-5 w-5" />
                新しいコレクション
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新しいコレクションを作成</DialogTitle>
                <DialogDescription>
                  プロンプトをまとめて管理するコレクションを作成します
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">コレクション名</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="例: 診断プロンプト集"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">説明（任意）</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="このコレクションの説明を入力してください"
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPublic"
                    checked={isPublic}
                    onCheckedChange={(checked) => setIsPublic(checked === true)}
                  />
                  <label
                    htmlFor="isPublic"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    公開する
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  キャンセル
                </Button>
                <Button onClick={handleCreate} disabled={createMutation.isPending}>
                  {createMutation.isPending ? "作成中..." : "作成"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {collections.length === 0 ? (
          <Card className="p-12 text-center">
            <FolderOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">コレクションがありません</h3>
            <p className="text-muted-foreground mb-6">
              プロンプトをまとめて管理するコレクションを作成しましょう
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              最初のコレクションを作成
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.map((collection: any) => (
              <Card key={collection.id} className="p-4 hover:shadow-lg transition-shadow h-full min-h-[180px] flex flex-col">
                <div className="flex items-start justify-between mb-3 flex-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold mb-1 leading-tight">{collection.name}</h3>
                    {collection.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {collection.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {collection.isPublic === 1 ? (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    {collection.promptCount || 0} 個のプロンプト
                  </span>
                  <Link href={`/collections/${collection.id}`}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <LinkIcon className="h-4 w-4" />
                      開く
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-2 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(collection)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    編集
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(collection.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>コレクションを編集</DialogTitle>
              <DialogDescription>
                コレクションの情報を変更します
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">コレクション名</Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">説明（任意）</Label>
                <Textarea
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-isPublic"
                  checked={isPublic}
                  onCheckedChange={(checked) => setIsPublic(checked === true)}
                />
                <label
                  htmlFor="edit-isPublic"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  公開する
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                キャンセル
              </Button>
              <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "更新中..." : "更新"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}


