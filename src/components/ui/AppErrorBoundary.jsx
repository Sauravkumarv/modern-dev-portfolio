import { Component } from "react";

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (typeof console !== "undefined") {
      console.error("Application crashed:", error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="app-error-shell">
          <div className="app-error-card">
            <p className="app-error-eyebrow">Something went wrong</p>
            <h1 className="app-error-title">The portfolio could not load correctly.</h1>
            <p className="app-error-copy">
              Try refreshing the page. If the issue continues, open the site in an incognito tab or
              clear cached site data.
            </p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
