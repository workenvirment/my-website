import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, RotateCcw, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught an unhandled error]:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleResetSession = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      const isDev = import.meta.env.DEV;

      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans selection:bg-brand-orange selection:text-white">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-center">
            
            {/* Warning Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto shadow-glow-orange">
              <AlertTriangle className="w-8 h-8" />
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full font-bold">
                APPLICATION RECOVERY GUARD
              </span>
              <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
                Something Went Wrong
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                The application encountered an unexpected runtime error. We prevented a system crash and saved your session state.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={this.handleReload}
                className="px-5 py-3 rounded-2xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-glow-orange flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Application</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Go to Homepage</span>
              </button>

              <button
                onClick={this.handleResetSession}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-red-900/30 text-slate-400 hover:text-red-300 text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-2"
                title="Clear local caches and reset"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Cache</span>
              </button>
            </div>

            {/* Technical Details (Shown in development or expandable) */}
            {isDev && this.state.error && (
              <details className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs font-mono text-slate-400 overflow-hidden">
                <summary className="cursor-pointer text-amber-400 hover:text-amber-300 font-bold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Developer Diagnostics Details</span>
                </summary>
                <div className="mt-3 space-y-2 overflow-x-auto text-[11px]">
                  <p className="text-red-400 font-bold">{this.state.error.toString()}</p>
                  {this.state.errorInfo?.componentStack && (
                    <pre className="text-slate-500 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <p className="text-[11px] text-slate-500 font-mono">
              DGW SOLUTIONS LLC • Global Dispatch Command Operations
            </p>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
