import React, { Component } from "react";
import { History } from "history";

import { clearToken } from "lib/sessionStorageApi";

import TopBar from "topbar/TopBar";

interface IProps {
  handleDrawerOpen: () => void;
  history: History;
}

interface IState {
  anchorEl?: HTMLElement;
}

class TopBarContainer extends Component<IProps, IState> {
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
    clearToken();
    this.props.history.push("/login");
  };
}

export default TopBarContainer;
