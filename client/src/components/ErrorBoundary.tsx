import { cn } from "@/lib/utils";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // 詳細なエラー情報をログに出力
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error name:', error?.name);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // エラー情報を保存
    console.error('Component stack:', errorInfo?.componentStack);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/medicalprompthub/';
  };

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || 'Unknown error';
      const errorStack = this.state.error?.stack || 'No stack trace available';
      
      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-background">
          <div className="flex flex-col items-center w-full max-w-2xl p-8 border border-border rounded-lg shadow-lg bg-card">
            <AlertTriangle
              size={48}
              className="text-destructive mb-6 flex-shrink-0"
            />

            <h2 className="text-2xl font-bold mb-2 text-foreground">予期しないエラーが発生しました</h2>
            
            <p className="text-muted-foreground mb-6 text-center">
              申し訳ございません。アプリケーションでエラーが発生しました。ページを再読み込みするか、ホームに戻ってください。
            </p>

            <div className="w-full mb-6 p-4 rounded-lg bg-muted overflow-auto max-h-64">
              <div className="text-sm font-semibold text-foreground mb-2">エラー詳細:</div>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words">
                {errorMessage}
              </pre>
              <div className="text-sm font-semibold text-foreground mt-4 mb-2">スタックトレース:</div>
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words">
                {errorStack}
              </pre>
            </div>

            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={this.handleReset}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "bg-primary text-primary-foreground",
                  "hover:opacity-90 cursor-pointer transition-opacity"
                )}
                title="エラーをリセットして再試行"
              >
                <RefreshCw size={16} />
                再試行
              </button>
              
              <button
                onClick={this.handleReload}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "bg-secondary text-secondary-foreground",
                  "hover:opacity-90 cursor-pointer transition-opacity"
                )}
                title="ページを再読み込み"
              >
                <RefreshCw size={16} />
                ページを再読み込み
              </button>
              
              <button
                onClick={this.handleGoHome}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  "bg-accent text-accent-foreground",
                  "hover:opacity-90 cursor-pointer transition-opacity"
                )}
                title="ホームページに戻る"
              >
                <Home size={16} />
                ホームに戻る
              </button>
            </div>

            <p className="text-xs text-muted-foreground mt-6 text-center">
              問題が続く場合は、お問い合わせください。
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
