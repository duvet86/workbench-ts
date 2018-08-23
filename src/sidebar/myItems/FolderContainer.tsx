import React, { Component } from "react";
import { Location } from "history";

import { IFolderChild } from "sidebar/myItems/types";

import Folder from "sideBar/myItems/Folder";

interface IProps {
  label: string;
  location: Location;
  children: IFolderChild[];
}

interface IState {
  expanded: boolean;
}

class FolderContainer extends Component<IProps, IState> {
  public readonly state = {
    expanded: false
  };

  public componentDidMount() {
    const { children, location } = this.props;
    if (!children || children.length === 0) {
      return;
    }

    const match = children.some(
      c =>
        c.ChildType === "I" &&
        `/workbench/${c.ChildItemId}` === location.pathname
    );

    if (match) {
      this.setState({ expanded: true });
    }
  }

  public render() {
    const { label, children } = this.props;
    const { expanded } = this.state;

    return (
      <Folder
        label={label}
        children={children}
        handleClick={this.handleClick}
        expanded={expanded}
      />
    );
  }

  private handleClick = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  };
}

export default FolderContainer;
