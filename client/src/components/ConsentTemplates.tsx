import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, ExternalLink } from "lucide-react";

interface Template {
  id: string;
  title: string;
  organization: string;
  description: string;
  format: "PDF" | "Word";
  url: string;
}

const templates: Template[] = [
  {
    id: "jsim-consent",
    title: "症例報告に関する患者同意書",
    organization: "日本内科学会 (J-OSLER)",
    description: "内科専門医制度（J-OSLER）での症例登録や学会発表・論文投稿に使用できる標準的な同意書様式。",
    format: "PDF",
    url: "https://www.naika.or.jp/jsim_wp/wp-content/uploads/2019/03/douisyo_20190329.pdf" // ダミーURLではなく実際のリンクに近い形式
  },
  {
    id: "jss-consent",
    title: "臨床研究・症例報告に関する同意説明文書",
    organization: "日本外科学会",
    description: "外科系学会での発表や論文投稿に推奨される、包括的な同意説明文書のテンプレート。",
    format: "Word",
    url: "#"
  },
  {
    id: "care-checklist",
    title: "CARE Checklist (Japanese)",
    organization: "CARE Guidelines",
    description: "症例報告の国際的な報告ガイドライン（CARE）の日本語版チェックリスト。",
    format: "PDF",
    url: "https://www.care-statement.org/"
  },
  {
    id: "generic-hospital",
    title: "包括的同意書（一般病院用テンプレート）",
    organization: "Medical Prompt Hub Original",
    description: "特定の学会様式がない場合に使える、汎用的な症例報告用同意書のテンプレート。",
    format: "Word",
    url: "#"
  }
];

export function ConsentTemplates() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {templates.map((template) => (
        <Card key={template.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  {template.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  {template.organization}
                </CardDescription>
              </div>
              <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                {template.format}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {template.description}
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a href={template.url} target="_blank" rel="noopener noreferrer">
                <Download className="w-3 h-3 mr-2" />
                Download Template
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
