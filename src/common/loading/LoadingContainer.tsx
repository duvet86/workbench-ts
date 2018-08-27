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
    this.delay = window.setTimeout(() => {
      this.setState({ pastDelay: true });
    }, this.props.delay || 200);
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
        error={error}
        isLoading={isLoading}
        pastDelay={pastDelay}
        children={children}
      />
    );
  }
}

export default LoadingContainer;
