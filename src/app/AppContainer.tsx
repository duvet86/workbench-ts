import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router";

import { RootState } from "rootReducer";
import { QesEnabledAction, qesEnabledRequest } from "app/actions";

import App from "app/App";
import LoadingContainer from "common/loading/LoadingContainer";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps;

interface ILocalState {
  open: boolean;
}

class AppContainer extends Component<Props, ILocalState> {
  public readonly state = {
    open: true
  };

  public componentDidMount() {
    this.props.dispatchQesEnabledRequest();
  }

  public render() {
    return (
      <LoadingContainer isLoading={this.props.isLoading}>
        <App
          {...this.props}
          open={this.state.open}
          handleDrawerOpen={this.handleDrawerOpen}
        />
      </LoadingContainer>
    );
  }

  private handleDrawerOpen = () => {
    this.setState((prevState: { open: boolean }) => ({
      open: !prevState.open
    }));
  };
}

const mapStateToProps = ({
  appReducer: { isLoading, isQesEnabled }
}: RootState) => ({
  isLoading,
  isQesEnabled
});

const mapDispatchToProps = (dispatch: Dispatch<QesEnabledAction>) => ({
  dispatchQesEnabledRequest: () => {
    dispatch(qesEnabledRequest());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
