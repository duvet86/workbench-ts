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
    if (nextProps.isLoading && !nextState.pastDelay) {
      return false;
    }
    return true;
  }

  public componentWillReceiveProps(nextProps: IProps) {
    // Reset the pastDelay flag every time the component has finished loading.
    if (!nextProps.isLoading) {
      this.setState({
        pastDelay: false
      });
    }
    if (nextProps.isLoading && !this.state.pastDelay) {
      this.delay = this.setTimeout(this.props.delay || 200);
    }
  }

  public componentWillUnmount() {
    if (this.delay) {
      window.clearTimeout(this.delay);
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
