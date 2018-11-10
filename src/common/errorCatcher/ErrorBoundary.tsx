import React, { Component, ErrorInfo } from "react";

import Typography from "@material-ui/core/Typography";

interface IState {
  error: Error | undefined;
  errorInfo: ErrorInfo | undefined;
}

class ErrorBoundary extends Component<{}, IState> {
  public state: IState = {
    error: undefined,
    errorInfo: undefined
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Catch errors in any components below and re-render with error message.
    this.setState({
      error,
      errorInfo
    });
    // You can also log error messages to an error reporting service here.
  }

  public render() {
    if (this.state.errorInfo) {
      // Error path.
      const { error, errorInfo } = this.state;
      return (
        <div>
          <Typography variant="h5">Something went wrong.</Typography>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {error && error.toString()}
            <br />
            {errorInfo && errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // Normally, just render children.
    return this.props.children;
  }
}

export default ErrorBoundary;
