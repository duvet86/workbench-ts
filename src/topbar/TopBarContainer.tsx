import React, { Component } from "react";
import { History } from "history";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { IClearToken, clearToken } from "app/actions";

import TopBar from "topbar/TopBar";

interface IOwnProps {
  handleDrawerOpen: () => void;
  history: History;
}

type Props = IOwnProps & ReturnType<typeof mapDispatchToProps>;

interface IState {
  anchorEl?: HTMLElement;
}

class TopBarContainer extends Component<Props, IState> {
  public readonly state = {
    anchorEl: undefined
  };

  public render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <TopBar
        {...this.props}
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
    this.props.history.push("/");
  };

  private onProfileClickHandler = () => {
    this.onMenuCloseHandler();
    this.props.history.push("/profile");
  };

  private onLogoutClickHandler = () => {
    this.onMenuCloseHandler();
    this.props.dispatchClearToken();
  };
}

const mapDispatchToProps = (dispatch: Dispatch<IClearToken>) => ({
  dispatchClearToken: () => {
    dispatch(clearToken());
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(TopBarContainer);
