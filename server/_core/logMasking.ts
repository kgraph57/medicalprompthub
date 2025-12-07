/**
 * ログの機密情報マスキング
 * 個人情報や認証情報がログに出力されないようにする
 */

/**
 * マスキング対象のキー（大文字小文字を区別しない）
 */
const SENSITIVE_KEYS = [
  "password",
  "passwd",
  "pwd",
  "secret",
  "token",
  "api_key",
  "apikey",
  "access_token",
  "refresh_token",
  "authorization",
  "auth",
  "credential",
  "credentials",
  "ssn",
  "social_security_number",
  "credit_card",
  "card_number",
  "cvv",
  "cvc",
  "email", // 必要に応じてコメントアウト
  "phone",
  "phone_number",
  "mobile",
  "address",
  "zip",
  "postal_code",
];

/**
 * マスキング対象のパターン（正規表現）
 */
const SENSITIVE_PATTERNS = [
  /password/i,
  /secret/i,
  /token/i,
  /key/i,
  /credential/i,
  /auth/i,
];

/**
 * マスキング文字列
 */
const MASK_STRING = "***REDACTED***";

/**
 * オブジェクト内の機密情報をマスキング
 */
export function maskSensitiveData(data: unknown): unknown {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === "string") {
    // 文字列がURLやJSONの場合、パースしてマスキング
    try {
      if (data.startsWith("http://") || data.startsWith("https://")) {
        const url = new URL(data);
        if (url.searchParams.has("token") || url.searchParams.has("key")) {
          url.searchParams.forEach((value, key) => {
            if (isSensitiveKey(key)) {
              url.searchParams.set(key, MASK_STRING);
            }
          });
          return url.toString();
        }
      }
    } catch {
      // URLパースに失敗した場合はそのまま
    }
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => maskSensitiveData(item));
  }

  if (typeof data === "object") {
    const masked: Record<string, unknown> = {};
    
    for (const [key, value] of Object.entries(data)) {
      if (isSensitiveKey(key)) {
        masked[key] = MASK_STRING;
      } else if (typeof value === "object" && value !== null) {
        masked[key] = maskSensitiveData(value);
      } else {
        masked[key] = value;
      }
    }
    
    return masked;
  }

  return data;
}

/**
 * キーが機密情報かどうかを判定
 */
function isSensitiveKey(key: string): boolean {
  const lowerKey = key.toLowerCase();
  
  // 完全一致チェック
  if (SENSITIVE_KEYS.some((sk) => lowerKey === sk.toLowerCase())) {
    return true;
  }

  // パターンマッチチェック
  if (SENSITIVE_PATTERNS.some((pattern) => pattern.test(key))) {
    return true;
  }

  return false;
}

/**
 * ログコンテキストをマスキング
 */
export function maskLogContext(context?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!context) {
    return context;
  }

  return maskSensitiveData(context) as Record<string, unknown>;
}
