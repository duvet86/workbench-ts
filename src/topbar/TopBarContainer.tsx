import React, { Component } from "react";
import { connect } from "react-redux";
import { push, RouterAction } from "connected-react-router";
import { Dispatch } from "redux";

import { removeToken } from "lib/sessionStorageApi";

import TopBar from "topBar/TopBar";

interface IOwnProps {
  handleDrawerOpen: () => void;
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

interface IState {
  anchorEl?: HTMLElement;
}

class TopBarContainer extends Component<Props, IState> {
  public readonly state = {
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
    removeToken();
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
