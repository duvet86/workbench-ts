import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { LoadingAction, startDelay } from "common/loading/actions";

import BackgroundLoading from "common/loading/BackgroundLoading";

interface IOwnProps {
  isLoading: boolean;
}

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IOwnProps;

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

const mapStateToProps = ({ loadingReducer: { pastDelay } }: RootState) => ({
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
