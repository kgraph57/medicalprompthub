import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { updateSEO } from "@/lib/seo";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

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
      title: "お問い合わせ | HELIX",
      description: "HELIXへのお問い合わせ、機能提案、バグ報告などを受け付けています。",
      path: "/contact",
    });
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("必須項目を入力してください");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("有効なメールアドレスを入力してください");
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("お問い合わせを受け付けました。ありがとうございます。");
      setFormData({
        name: "",
        email: "",
        category: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("送信に失敗しました。しばらくしてから再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Contact
              </span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] mb-4">
              お問い合わせ
            </h1>
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              ご質問、機能提案、バグ報告など、お気軽にどうぞ
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  お名前 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="山田 太郎"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  メールアドレス <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                お問い合わせ種別
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger id="category" className="h-11">
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
              <Label htmlFor="subject" className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                件名
              </Label>
              <Input
                id="subject"
                placeholder="お問い合わせの件名"
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                お問い合わせ内容 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                placeholder="お問い合わせ内容を詳しくご記入ください"
                className="min-h-[160px]"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  送信中...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  送信する
                </>
              )}
            </Button>
          </motion.form>

          {/* Other Methods */}
          <motion.div variants={itemVariants} className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
              その他の連絡方法
            </h2>
            <div className="space-y-4 text-[15px] text-neutral-600 dark:text-neutral-400">
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100">GitHub Issues</p>
                <p>バグ報告や機能提案は GitHub Issues からも受け付けています</p>
              </div>
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100">Pull Request</p>
                <p>プロンプトの追加・改善は PR で提案してください</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
