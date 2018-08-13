import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { LoadingAction, startDelay } from "common/loading/actions";
import BackgroundLoading from "common/loading/BackgroundLoading";

interface IDispatchProps {
  dispatchStartDelay: () => void;
}

interface IStateProps {
  isLoading: boolean;
  pastDelay: boolean;
  children: React.ReactNode;
}

type Props = IStateProps & IDispatchProps;

interface IStoreState {
  loadingReducer: {
    pastDelay: boolean;
  };
}

class BackgroundLoadingContainer extends Component<Props> {
  public componentWillReceiveProps(nextProps: Props) {
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
