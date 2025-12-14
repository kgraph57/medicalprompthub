/**
 * Cookie同意バナーコンポーネント
 * GDPR対応のためのCookie同意取得UI
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X, Settings, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { needsConsent, saveConsentStatus, getConsentStatus, type ConsentPreferences } from "@/lib/cookieConsent";
import { initGA4 } from "@/lib/analytics";

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // 同意が必要な場合のみバナーを表示
    if (needsConsent()) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: false,
    };
    saveConsentStatus(allAccepted);
    setShowBanner(false);
    
    // Google Analyticsを初期化
    if (allAccepted.analytics) {
      initGA4();
    }
  };

  const handleRejectAll = () => {
    const onlyNecessary: ConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsentStatus(onlyNecessary);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    saveConsentStatus(preferences);
    setShowBanner(false);
    
    // Google Analyticsを初期化（同意されている場合）
    if (preferences.analytics) {
      initGA4();
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <Card className="max-w-4xl mx-auto shadow-2xl border-2">
            {!showSettings ? (
              <>
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">Cookieの使用について</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        本サイトでは、サービス向上のためCookieを使用しています。必須Cookieは常に有効ですが、アナリティクスCookieについては同意が必要です。詳細は
                        <a href="/legal" className="text-primary underline ml-1">プライバシーポリシー</a>
                        をご確認ください。
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0 h-7 w-7"
                      onClick={() => setShowBanner(false)}
                      aria-label="閉じる"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowSettings(true)}
                      className="flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      設定をカスタマイズ
                    </Button>
                    <div className="flex gap-3 flex-1 justify-end">
                      <Button
                        variant="outline"
                        onClick={handleRejectAll}
                      >
                        すべて拒否
                      </Button>
                      <Button
                        onClick={handleAcceptAll}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        すべて同意
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Cookie設定</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowSettings(false)}
                      aria-label="戻る"
                      className="h-7 w-7"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <CardDescription className="text-sm">
                    各Cookieの種類について、使用の同意を選択してください
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 必須Cookie */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <Label htmlFor="necessary" className="text-base font-semibold cursor-pointer">
                        必須Cookie
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        サイトの基本機能に必要なCookieです。これらは常に有効です。
                      </p>
                    </div>
                    <Switch
                      id="necessary"
                      checked={true}
                      disabled
                      className="ml-4"
                    />
                  </div>

                  {/* アナリティクスCookie */}
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex-1">
                      <Label htmlFor="analytics" className="text-base font-semibold cursor-pointer">
                        アナリティクスCookie
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Google Analytics等を使用して、サイトの利用状況を分析します。これにより、サービス改善に役立ちます。
                      </p>
                    </div>
                    <Switch
                      id="analytics"
                      checked={preferences.analytics}
                      onCheckedChange={(checked) =>
                        setPreferences((prev) => ({ ...prev, analytics: checked }))
                      }
                      className="ml-4"
                    />
                  </div>

                  {/* マーケティングCookie（現在未使用） */}
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border opacity-50">
                    <div className="flex-1">
                      <Label htmlFor="marketing" className="text-base font-semibold cursor-pointer">
                        マーケティングCookie
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        現在使用していません（将来の機能拡張用）
                      </p>
                    </div>
                    <Switch
                      id="marketing"
                      checked={false}
                      disabled
                      className="ml-4"
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setShowSettings(false)}
                      className="flex-1"
                    >
                      キャンセル
                    </Button>
                    <Button
                      onClick={handleSavePreferences}
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      設定を保存
                    </Button>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
