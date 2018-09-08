import React, { Component } from "react";
import { Location } from "history";

import { IFolderChild } from "sidebar/myItems/types";

import Folder from "sidebar/myItems/Folder";

interface IProps {
  label: string;
  location: Location;
  childFolders: IFolderChild[];
}

interface IState {
  expanded: boolean;
}

class FolderContainer extends Component<IProps, IState> {
  public readonly state = {
    expanded: false
  };

  public componentDidMount() {
    const { childFolders, location } = this.props;
    if (!childFolders || childFolders.length === 0) {
      return;
    }

    const match = childFolders.some(
      c =>
        c.ChildType === "I" &&
        `/workbench/${c.ChildItemId}` === location.pathname
    );

    if (match) {
      this.setState({ expanded: true });
    }
  }

  public render() {
    const { label, childFolders } = this.props;
    const { expanded } = this.state;

    if (childFolders.length === 0) {
      return null;
    }

    return (
      <Folder
        label={label}
        childFolders={childFolders}
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
