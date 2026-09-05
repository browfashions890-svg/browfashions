import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-page flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
          <h2 className="font-display text-2xl text-ink">Something went wrong</h2>
          <p className="max-w-sm text-sm text-ink-soft/70">
            We hit an unexpected error loading this page. Please refresh, or contact us on WhatsApp if the problem
            continues.
          </p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Refresh page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
