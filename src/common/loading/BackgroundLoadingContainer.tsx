import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { LoadingAction, startDelay } from "common/loading/actions";
import BackgroundLoading from "common/loading/BackgroundLoading";

interface IProps {
  dispatchStartDelay: () => void;
  isLoading: boolean;
  pastDelay: boolean;
  children: React.ReactNode;
}

interface IStoreState {
  loadingReducer: {
    pastDelay: boolean;
  };
}

class BackgroundLoadingContainer extends Component<IProps> {
  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.isLoading && !this.props.isLoading) {
      this.props.dispatchStartDelay();
    }
  }

  public render() {
    return <BackgroundLoading {...this.props} />;
  }
}

const mapStateToProps = ({ loadingReducer: { pastDelay } }: IStoreState) => ({
  pastDelay
});

const mapDispatchToProps = (dispatch: Dispatch<LoadingAction>) => ({
  dispatchStartDelay: () => {
    dispatch(startDelay());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundLoadingContainer);
