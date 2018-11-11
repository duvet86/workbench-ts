import React, { Component, ErrorInfo } from "react";
import { connect } from "react-redux";
import { RootState } from "rootReducer";
import { withRouter, RouteComponentProps } from "react-router-dom";

import ErrorBoundary from "common/errorBoundary/ErrorBoundary";

interface IState {
  error: Error | undefined;
  errorInfo: ErrorInfo | undefined;
}

type Props = ReturnType<typeof mapStateToProps> & RouteComponentProps;

class ErrorBoundaryContainer extends Component<Props, IState> {
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

  public componentWillUnmount() {
    this.setState({
      error: undefined,
      errorInfo: undefined
    });
  }

  public render() {
    const { error: localError, errorInfo } = this.state;
    const error = localError || this.props.appError;
    if (error != null) {
      return <ErrorBoundary error={error} errorInfo={errorInfo} />;
    }

    return this.props.children;
  }
}

const mapStateToProps = ({ errorReducer: { error } }: RootState) => ({
  appError: error
});

// connect creates a high order component that implements shouldComponentUpdate blocking router updates.
// withRouter solves it.
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(connect(mapStateToProps)(ErrorBoundaryContainer));
