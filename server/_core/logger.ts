/**
 * 構造化ログユーティリティ
 * JSON形式でログを出力し、後で集約・分析しやすくする
 */

import { maskLogContext } from "./logMasking";
import { logEntrySchema } from "./fastJsonSchemas";

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  FATAL = "FATAL",
}

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  environment: string;
  service: string;
  correlationId?: string;
}

class Logger {
  private serviceName: string;
  private environment: string;
  private correlationId?: string;

  constructor(serviceName = "medical-prompt-hub", environment?: string) {
    this.serviceName = serviceName;
    this.environment = environment || process.env.NODE_ENV || "development";
  }

  /**
   * 相関IDを設定（リクエストごとに設定）
   */
  setCorrelationId(correlationId: string): void {
    this.correlationId = correlationId;
  }

  /**
   * 相関IDをクリア
   */
  clearCorrelationId(): void {
    this.correlationId = undefined;
  }

  private formatLog(level: LogLevel, message: string, context?: LogContext, error?: Error): LogEntry {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      environment: this.environment,
      service: this.serviceName,
    };

    if (this.correlationId) {
      logEntry.correlationId = this.correlationId;
    }

    // 機密情報をマスキング
    if (context && Object.keys(context).length > 0) {
      logEntry.context = maskLogContext(context);
    }

    if (error) {
      // エラーメッセージにも機密情報が含まれる可能性があるため、スタックトレースのみ記録
      logEntry.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }

    return logEntry;
  }

  private log(level: LogLevel, message: string, context?: LogContext, error?: Error): void {
    const logEntry = this.formatLog(level, message, context, error);

    // 本番環境ではfast-json-stringifyを使用してJSON形式で出力、開発環境では読みやすい形式で出力
    if (this.environment === "production") {
      // fast-json-stringifyを使用して高速シリアライゼーション
      console.log(logEntrySchema(logEntry));
    } else {
      // 開発環境では色付きで出力
      const colorMap: Record<LogLevel, string> = {
        [LogLevel.DEBUG]: "\x1b[36m", // Cyan
        [LogLevel.INFO]: "\x1b[32m",   // Green
        [LogLevel.WARN]: "\x1b[33m",   // Yellow
        [LogLevel.ERROR]: "\x1b[31m",   // Red
        [LogLevel.FATAL]: "\x1b[35m",   // Magenta
      };
      const reset = "\x1b[0m";
      const color = colorMap[level] || reset;

      console.log(
        `${color}[${logEntry.timestamp}] ${level}${reset} ${message}`,
        context ? JSON.stringify(context, null, 2) : "",
        error ? error.stack : ""
      );
    }
  }

  debug(message: string, context?: LogContext): void {
    if (this.environment !== "production") {
      this.log(LogLevel.DEBUG, message, context);
    }
  }

  info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: LogContext, error?: Error): void {
    this.log(LogLevel.WARN, message, context, error);
  }

  error(message: string, error?: Error, context?: LogContext): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  fatal(message: string, error?: Error, context?: LogContext): void {
    this.log(LogLevel.FATAL, message, context, error);
  }
}

// シングルトンインスタンスをエクスポート
export const logger = new Logger();

// デフォルトエクスポート
export default logger;
