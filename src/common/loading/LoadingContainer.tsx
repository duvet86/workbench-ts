import React, { Component } from "react";

import Loading from "common/loading/Loading";

interface IProps {
  isLoading: boolean;
  delay?: number;
  error?: any;
}

interface IState {
  pastDelay: boolean;
}

class LoadingContainer extends Component<IProps, Readonly<IState>> {
  public readonly state = {
    pastDelay: false
  };

  private delay?: number;

  public componentDidMount() {
    this.delay = this.setTimeout(this.props.delay || 200);
  }

  public shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    if (!this.props.isLoading && nextProps.isLoading && !nextState.pastDelay) {
      return false;
    }
    return true;
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (!this.props.isLoading && this.state.pastDelay) {
      this.setState({
        pastDelay: false
      });
    }
    if (!prevProps.isLoading && this.props.isLoading && !this.state.pastDelay) {
      this.delay = this.setTimeout(this.props.delay || 200);
    }
  }

  public componentWillUnmount() {
    if (this.delay) {
      window.clearTimeout(this.delay);
      this.delay = undefined;
    }
  }

  public render() {
    const { error, isLoading, children } = this.props;
    const { pastDelay } = this.state;

    return (
      <Loading
        isLoading={isLoading}
        pastDelay={pastDelay}
        children={children}
        error={error}
      />
    );
  }

  private setTimeout(delay: number) {
    return window.setTimeout(() => {
      this.setState({ pastDelay: true });
    }, delay);
  }
}

export default LoadingContainer;
