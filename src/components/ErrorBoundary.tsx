import React from 'react';

interface State {
  hasError: boolean;
  error?: Error | null;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // TODO: send error to logging service
    // console.error('ErrorBoundary caught', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-ai-bg text-ai-text-primary p-6">
          <div className="max-w-xl text-center bg-white/5 backdrop-blur rounded-lg p-8">
            <h1 className="text-2xl font-bold text-ai-accent-cyan mb-4">Something went wrong</h1>
            <p className="text-ai-text-secondary mb-6">An unexpected error occurred. Please refresh the page or contact support if the problem persists.</p>
            <div className="flex justify-center gap-4">
              <button className="px-4 py-2 bg-ai-accent-cyan text-ai-bg rounded" onClick={() => window.location.reload()}>
                Refresh
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;
