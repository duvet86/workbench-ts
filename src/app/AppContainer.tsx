import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Location } from "history";

import { QesEnabledAction, qesEnabledRequest } from "app/actions";

import App from "app/App";
import { LoadingContainer } from "common/loading";

interface IDispatchProps {
  dispatchQesEnabledRequest: () => void;
}

interface IProps {
  isLoading: boolean;
  isQesEnabled: boolean;
  location: Location;
}

type Props = IDispatchProps & IProps;

interface IStoreState {
  appReducer: {
    isLoading: boolean;
    isQesEnabled: boolean;
    error: any;
  };
}

interface ILocalState {
  open: boolean;
}

class AppContainer extends Component<Props, ILocalState> {
  public static propTypes = {
    dispatchQesEnabledRequest: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isQesEnabled: PropTypes.bool.isRequired
  };

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
  appReducer: { isLoading, isQesEnabled, error }
}: IStoreState) => ({
  error,
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
