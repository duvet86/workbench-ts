import React, { Component, ErrorInfo } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState } from "rootReducer";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Log from "lib/Log";

import { ICleanError, cleanError } from "common/errorBoundary/actions";

import ErrorBoundary from "common/errorBoundary/ErrorBoundary";

interface IState {
  error: unknown;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps;

class ErrorBoundaryContainer extends Component<Props, IState> {
  public static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  public state: IState = {
    error: undefined
  };

  public componentDidCatch(error: Error, _: ErrorInfo) {
    Log.error("Caught by ErrorBoundary", error);
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.location !== prevProps.location) {
      if (this.state.error != null) {
        this.setState({
          error: undefined
        });
      }
      if (this.props.error != null) {
        this.props.dispatchCleanException();
      }
    }
  }

  public render() {
    const error = this.state.error || this.props.error;
    if (error != null) {
      const errorMessage =
        error instanceof Error
          ? error.stack || error.message
          : JSON.stringify(error);
      return <ErrorBoundary errorMessage={errorMessage} />;
    }

    return this.props.children;
  }
}

const mapStateToProps = ({ error: { error } }: RootState) => ({
  error
});

const mapDispatchToProps = (dispatch: Dispatch<ICleanError>) => ({
  dispatchCleanException: () => {
    dispatch(cleanError());
  }
});

// connect creates a high order component that implements shouldComponentUpdate blocking router updates.
// withRouter solves it.
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ErrorBoundaryContainer)
);
