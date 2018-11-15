import React, { Component } from "react";

import Loading from "common/loading/Loading";
import BackgroundLoading from "common/loading/BackgroundLoading";

interface IProps {
  isLoading: boolean;
  delay?: number;
  error?: any;
  background?: boolean;
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
    this.delay = this.setDelay(this.props.delay || 200);
  }

  public componentDidUpdate(prevProps: IProps) {
    if (!this.props.isLoading && this.state.pastDelay) {
      this.setState({
        pastDelay: false
      });
    }
    if (!prevProps.isLoading && this.props.isLoading && !this.state.pastDelay) {
      this.delay = this.setDelay(this.props.delay || 200);
    }
  }

  public componentWillUnmount() {
    if (this.delay) {
      window.clearTimeout(this.delay);
      this.delay = undefined;
    }
  }

  public render() {
    const { error, isLoading, background, children } = this.props;
    const { pastDelay } = this.state;

    return background ? (
      <BackgroundLoading
        isLoading={isLoading}
        pastDelay={pastDelay}
        children={children}
      />
    ) : (
      <Loading
        isLoading={isLoading}
        pastDelay={pastDelay}
        children={children}
        error={error}
      />
    );
  }

  private setDelay(delay: number) {
    return window.setTimeout(() => {
      this.setState({ pastDelay: true });
    }, delay);
  }
}

export default LoadingContainer;
