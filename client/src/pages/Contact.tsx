import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import { motion } from "framer-motion";

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
      description: "Helixへのお問い合わせ、機能提案、バグ報告などを受け付けています。",
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
      <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Linear.app風：ページヘッダー */}
        <PageHeader
          category="Contact"
          title="Contact us"
          description="ご質問、機能提案、バグ報告など、お気軽にお問い合わせください"
        />

        <motion.div
          className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Mail className="w-4 h-4 text-blue-600" strokeWidth={2} />
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-[-0.01em]">
              Contact Form
            </span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
              お問い合わせ内容に応じて、できるだけ早くご返信いたします
            お問い合わせ内容に応じて、できるだけ早くご返信いたします
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  お名前 <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="山田 太郎"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  className="h-10 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  メールアドレス <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="h-10 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-neutral-900 dark:text-neutral-50">お問い合わせ種別</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger id="category" className="h-10">
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

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium text-neutral-900 dark:text-neutral-50">件名</Label>
              <Input
                id="subject"
                placeholder="お問い合わせの件名"
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className="h-10 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                お問い合わせ内容 <span className="text-red-600">*</span>
              </Label>
              <Textarea
                id="message"
                placeholder="お問い合わせ内容を詳しくご記入ください"
                className="min-h-[160px] text-base"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              size="default"
              className="w-full h-11 text-base bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  送信中...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  送信する
                </>
              )}
            </Button>
          </form>
        </motion.div>

        <motion.section
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Mail className="w-4 h-4 text-blue-600" strokeWidth={2} />
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-[-0.01em]">
              Other Methods
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
            Other contact methods
          </h2>
          <div className="space-y-6 text-base text-neutral-600 dark:text-neutral-400">
            <div>
              <h3 className="font-semibold mb-2 text-lg text-neutral-900 dark:text-neutral-50">GitHub Issues</h3>
              <p>
                バグ報告や機能提案は、GitHubのIssuesからも受け付けています。技術的な問題や改善提案に最適です。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg text-neutral-900 dark:text-neutral-50">プルリクエスト</h3>
              <p>
                プロンプトの追加や改善は、GitHubのプルリクエストから提案してください。医療従事者の皆様の実践的な知見を共有していただけると、サービス全体の品質向上につながります。
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
