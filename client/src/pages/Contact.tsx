import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    updateSEO({
      title: "お問い合わせ",
      description: "Medical Prompt Hubへのお問い合わせ、機能提案、バグ報告などを受け付けています。",
      path: "/contact",
    });
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // バリデーション
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("必須項目を入力してください");
      setIsSubmitting(false);
      return;
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("有効なメールアドレスを入力してください");
      setIsSubmitting(false);
      return;
    }

    try {
      // 実際の実装では、ここでサーバーに送信
      // 現在はクライアント側での処理のみ（将来的にバックエンドAPIに接続）
      
      // メール送信のシミュレーション（実際にはバックエンドAPIを呼び出す）
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 成功メッセージ
      toast.success("お問い合わせを受け付けました。ありがとうございます。");
      
      // フォームをリセット
      setFormData({
        name: "",
        email: "",
        category: "",
        subject: "",
        message: "",
      });

      // 注意: 実際の実装では、ここでバックエンドAPIに送信する必要があります
      // 例: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    } catch (error) {
      toast.error("送信に失敗しました。しばらくしてから再度お試しください。");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-4 pb-12 max-w-3xl mx-auto">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">お問い合わせ</h1>
          <p className="text-sm text-muted-foreground">
            ご質問、機能提案、バグ報告など、お気軽にお問い合わせください
          </p>
        </div>

        <Card>
          <CardHeader className="p-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <Mail className="w-4 h-4" />
              お問い合わせフォーム
            </CardTitle>
            <CardDescription className="text-xs">
              お問い合わせ内容に応じて、できるだけ早くご返信いたします
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">
                    お名前 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="山田 太郎"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">
                    メールアドレス <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-xs">お問い合わせ種別</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="question">質問・お問い合わせ</SelectItem>
                    <SelectItem value="bug">バグ報告</SelectItem>
                    <SelectItem value="feature">機能提案</SelectItem>
                    <SelectItem value="prompt">プロンプトの追加・改善</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-xs">件名</Label>
                <Input
                  id="subject"
                  placeholder="お問い合わせの件名"
                  value={formData.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className="h-9 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs">
                  お問い合わせ内容 <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="お問い合わせ内容を詳しくご記入ください"
                  className="min-h-[160px] text-sm"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  required
                />
              </div>

              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-xs text-muted-foreground space-y-0.5">
                  <p className="font-semibold text-foreground text-sm">ご注意</p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>お問い合わせへの返信には数日かかる場合があります</li>
                    <li>緊急の場合は、GitHubのIssuesからもご連絡いただけます</li>
                    <li>プライバシーやセキュリティに関する重要な問題の場合は、できるだけ早く対応いたします</li>
                  </ul>
                </div>
              </div>

              <Button
                type="submit"
                size="default"
                className="w-full h-9 text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white mr-2"></div>
                    送信中...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-3.5 w-3.5" />
                    送信する
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-muted">
          <CardHeader className="p-4">
            <CardTitle className="text-base">その他のお問い合わせ方法</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-3 text-xs">
            <div>
              <h3 className="font-semibold mb-1 text-sm">GitHub Issues</h3>
              <p className="text-muted-foreground">
                バグ報告や機能提案は、GitHubのIssuesからも受け付けています。技術的な問題や改善提案に最適です。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-sm">プルリクエスト</h3>
              <p className="text-muted-foreground">
                プロンプトの追加や改善は、GitHubのプルリクエストから提案してください。医療従事者の皆様の実践的な知見を共有していただけると、サービス全体の品質向上につながります。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
