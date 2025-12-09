/**
 * 証明書コンポーネント
 * コース完了時に証明書を表示・ダウンロード
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Award, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface CertificateProps {
  courseTitle: string;
  courseId: string;
  completedDate: string;
  userName?: string;
}

export function Certificate({ courseTitle, courseId, completedDate, userName = "学習者" }: CertificateProps) {
  const handleDownload = () => {
    // 証明書をPDFとしてダウンロード（将来的に実装）
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 800;

    // 背景
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ボーダー
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 10;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // タイトル
    ctx.fillStyle = "#1e40af";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Completion", canvas.width / 2, 200);

    // コース名
    ctx.fillStyle = "#000000";
    ctx.font = "36px Arial";
    ctx.fillText(courseTitle, canvas.width / 2, 300);

    // 受講者名
    ctx.font = "28px Arial";
    ctx.fillText(`This is to certify that ${userName}`, canvas.width / 2, 400);
    ctx.fillText("has successfully completed the course", canvas.width / 2, 450);

    // 日付
    ctx.font = "24px Arial";
    ctx.fillText(`Completed on ${completedDate}`, canvas.width / 2, 550);

    // ダウンロード
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `certificate-${courseId}-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="w-12 h-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Certificate of Completion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-2">
            <p className="text-lg text-muted-foreground">This is to certify that</p>
            <p className="text-2xl font-semibold">{userName}</p>
            <p className="text-lg text-muted-foreground">has successfully completed the course</p>
            <p className="text-xl font-bold text-primary mt-4">{courseTitle}</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4 border-t">
            <Calendar className="w-4 h-4" />
            <span>Completed on {completedDate}</span>
          </div>

          <Button onClick={handleDownload} className="w-full" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Download Certificate
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
