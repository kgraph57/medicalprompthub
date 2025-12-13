import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw, Home, Mail } from "lucide-react";
import { Component, ReactNode } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useLocation, Link } from "wouter";
import { errorTracker } from "@/lib/errorTracking";
import { captureError as sentryCaptureError } from "@/lib/sentry";
import { trackEvent } from "@/lib/analytics";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Store error info for display
    this.setState({
      errorInfo: errorInfo.componentStack || null,
    });

    // エラーを追跡サービスに送信
    errorTracker.captureError(error, {
      componentStack: errorInfo.componentStack,
      type: "react_error_boundary",
    });

    // Sentryにも送信
    sentryCaptureError(error, {
      componentStack: errorInfo.componentStack,
      type: "react_error_boundary",
    });

    // アナリティクスにエラーイベントを送信
    trackEvent("error_boundary_triggered", {
      error_name: error.name,
      error_message: error.message,
      component_stack: errorInfo.componentStack?.substring(0, 200),
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

function ErrorFallback({ 
  error, 
  errorInfo, 
  onReset 
}: { 
  error: Error | null; 
  errorInfo: string | null;
  onReset: () => void;
}) {
  const [, setLocation] = useLocation();
  const isDevelopment = import.meta.env.DEV;

  const handleGoHome = () => {
    // エラー状態をリセットしてからホームに戻る
    onReset();
    // 少し遅延を入れてからホームに移動（エラー状態のクリアを確実にする）
    setTimeout(() => {
      setLocation("/");
    }, 0);
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen p-8 bg-background"
      role="alert"
      aria-live="assertive"
    >
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle
              size={32}
              className="text-destructive flex-shrink-0"
              aria-hidden="true"
            />
            <CardTitle className="text-2xl">予期しないエラーが発生しました</CardTitle>
          </div>
          <CardDescription>
            申し訳ございません。アプリケーションでエラーが発生しました。ページを再読み込みするか、ホームに戻ってください。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isDevelopment && error && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">エラー詳細（開発モード）</h3>
              <div className="p-4 rounded bg-muted overflow-auto max-h-64">
                <p className="text-sm font-mono text-destructive mb-2">
                  {error.name}: {error.message}
                </p>
                {error.stack && (
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words">
                    {error.stack}
                  </pre>
                )}
                {errorInfo && (
                  <details className="mt-4">
                    <summary className="text-xs font-semibold cursor-pointer mb-2">
                      コンポーネントスタック
                    </summary>
                    <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words">
                      {errorInfo}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => {
                onReset();
                window.location.reload();
              }}
              className="flex items-center gap-2"
              aria-label="ページを再読み込みして再試行"
            >
              <RotateCcw size={16} aria-hidden="true" />
              ページを再読み込み
            </Button>
            <Button
              variant="outline"
              onClick={handleGoHome}
              className="flex items-center gap-2"
              aria-label="ホームページに戻る"
            >
              <Home size={16} aria-hidden="true" />
              ホームに戻る
            </Button>
          </div>

          {!isDevelopment && (
            <div className="pt-4 border-t text-sm text-muted-foreground">
              <p className="mb-2">
                問題が続く場合は、お問い合わせください。
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Mail size={14} aria-hidden="true" />
                  お問い合わせ
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ErrorBoundary;
