import { Request, Response, NextFunction } from "express";

/**
 * セキュリティヘッダーを設定するミドルウェア
 * Helmet.js相当の機能を提供
 */
export function securityHeaders(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const isProduction = process.env.NODE_ENV === "production";

  // X-Content-Type-Options: MIMEタイプスニッフィングを防止
  res.setHeader("X-Content-Type-Options", "nosniff");

  // X-Frame-Options: クリックジャッキング攻撃を防止
  res.setHeader("X-Frame-Options", "DENY");

  // X-XSS-Protection: XSS攻撃に対するブラウザの保護を有効化（レガシーブラウザ用）
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Referrer-Policy: リファラー情報の送信を制御
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions-Policy: ブラウザ機能の使用を制限
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), payment=()"
  );

  // Strict-Transport-Security (HSTS): HTTPSを強制（本番環境のみ）
  if (isProduction) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }

  // Content-Security-Policy: XSS攻撃を防止
  // 注意: アプリケーションの要件に応じて調整が必要
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // 開発環境では必要
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  // 本番環境ではより厳格なCSPを設定
  if (isProduction) {
    // 本番環境では 'unsafe-inline' と 'unsafe-eval' を削除することを推奨
    // ただし、既存のコードとの互換性を考慮して段階的に移行
    res.setHeader("Content-Security-Policy", cspDirectives.join("; "));
  } else {
    // 開発環境では緩いCSPを設定
    res.setHeader("Content-Security-Policy", cspDirectives.join("; "));
  }

  next();
}
