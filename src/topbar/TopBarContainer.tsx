import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push, RouterAction } from "react-router-redux";
import { Dispatch } from "redux";

import { clearToken } from "lib/sessionStorageApi";

import TopBar from "topBar/TopBar";

interface IDispatchProps {
  dispatchWelcomePage: () => void;
  dispatchLogout: () => void;
  dispatchProfileClick: () => void;
}

interface IProps {
  handleDrawerOpen: () => void;
}

type Props = IDispatchProps & IProps;

interface IState {
  anchorEl?: HTMLElement;
}

class TopBarContainer extends Component<Props, IState> {
  public static propTypes = {
    dispatchWelcomePage: PropTypes.func.isRequired,
    dispatchLogout: PropTypes.func.isRequired,
    dispatchProfileClick: PropTypes.func.isRequired
  };

  public state = {
    anchorEl: undefined
  };

  public render() {
    const { anchorEl } = this.state;
    const {
      dispatchLogout,
      dispatchProfileClick,
      dispatchWelcomePage,
      ...props
    } = this.props;
    const open = Boolean(anchorEl);

    return (
      <TopBar
        {...props}
        anchorEl={anchorEl}
        open={open}
        onMenuClickHandler={this.onMenuClickHandler}
        onMenuCloseHandler={this.onMenuCloseHandler}
        onWelcomePageClickHandler={this.onWelcomePageClickHandler}
        onProfileClickHandler={this.onProfileClickHandler}
        onLogoutClickHandler={this.onLogoutClickHandler}
      />
    );
  }

  private onMenuClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private onMenuCloseHandler = () => this.setState({ anchorEl: undefined });

  private onWelcomePageClickHandler = () => {
    this.onMenuCloseHandler();
    const { dispatchWelcomePage } = this.props;
    dispatchWelcomePage();
  };

  private onProfileClickHandler = () => {
    this.onMenuCloseHandler();
    const { dispatchProfileClick } = this.props;
    dispatchProfileClick();
  };

  private onLogoutClickHandler = () => {
    this.onMenuCloseHandler();
    const { dispatchLogout } = this.props;
    dispatchLogout();
  };
}

const mapDispatchToProps = (dispatch: Dispatch<RouterAction>) => ({
  dispatchWelcomePage: () => {
    dispatch(push("/"));
  },
  dispatchLogout: () => {
    clearToken();
    dispatch(push("/login"));
  },
  dispatchProfileClick: () => {
    dispatch(push("/profile"));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(TopBarContainer);
