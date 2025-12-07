import { useRoute, Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Check, Lightbulb, TrendingUp, Zap, Stethoscope, MessageSquare } from "lucide-react";
import { tips } from "@/lib/tips";
import { useState } from "react";

export default function TipDetail() {
  const [, params] = useRoute("/tips/:id");
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedExample, setCopiedExample] = useState(false);

  const tip = tips.find((t) => t.id === params?.id);

  if (!tip) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Tipが見つかりません</h1>
            <Link to="/tips">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Tips一覧に戻る
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // カテゴリアイコンのマッピング
  const categoryIcons: Record<string, any> = {
    basic: Lightbulb,
    quality: TrendingUp,
    advanced: Zap,
    medical: Stethoscope,
    interactive: MessageSquare,
  };

  // カテゴリの日本語名
  const categoryNames: Record<string, string> = {
    basic: "基本テクニック",
    quality: "品質向上",
    advanced: "高度なテクニック",
    medical: "医療特化",
    interactive: "対話型",
  };

  // レベルの日本語変換
  const levelMap: Record<string, string> = {
    beginner: "初級",
    intermediate: "中級",
    advanced: "上級",
  };

  // レベルの色
  const levelColors: Record<string, string> = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const IconComponent = categoryIcons[tip.category] || Lightbulb;

  const handleCopyTemplate = async () => {
    await navigator.clipboard.writeText(tip.template);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const handleCopyExample = async () => {
    await navigator.clipboard.writeText(tip.example);
    setCopiedExample(true);
    setTimeout(() => setCopiedExample(false), 2000);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 戻るボタン */}
        <Link to="/tips">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tips一覧に戻る
          </Button>
        </Link>

        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30">
              <IconComponent className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={levelColors[tip.level]}>
                  {levelMap[tip.level]}
                </Badge>
                <Badge variant="outline">
                  {categoryNames[tip.category]}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {tip.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {tip.description}
              </p>
            </div>
          </div>

          {/* タグ */}
          <div className="flex flex-wrap gap-2">
            {tip.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* なぜ使うのか */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">💡 なぜこのテクニックを使うのか？</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {tip.why}
            </p>
          </CardContent>
        </Card>

        {/* いつ使うのか */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">⏰ いつ使うのか？</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tip.when.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* テンプレート */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">📝 テンプレート（穴埋め形式）</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyTemplate}
                className="gap-2"
              >
                {copiedTemplate ? (
                  <>
                    <Check className="h-4 w-4" />
                    コピー済み
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    コピー
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
              {tip.template}
            </pre>
          </CardContent>
        </Card>

        {/* 具体例 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">✨ 具体例</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyExample}
                className="gap-2"
              >
                {copiedExample ? (
                  <>
                    <Check className="h-4 w-4" />
                    コピー済み
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    コピー
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
              {tip.example}
            </pre>
          </CardContent>
        </Card>

        {/* 応用例 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">🎯 医療・研究での応用例</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tip.applications.map((app, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{app}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 関連Tips */}
        {tip.relatedTips.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">🔗 関連するTips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tip.relatedTips.map((relatedId) => {
                  const relatedTip = tips.find((t) => t.id === relatedId);
                  if (!relatedTip) return null;
                  return (
                    <Link key={relatedId} to={`/tips/${relatedId}`}>
                      <Button variant="outline" size="sm">
                        {relatedTip.title}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 戻るボタン */}
        <div className="mt-8 text-center">
          <Link to="/tips">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tips一覧に戻る
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
