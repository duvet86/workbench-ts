import React, { Component } from "react";
import { Location } from "history";

import { IFolderChild } from "sidebar/userItems/types";

import Folder from "sidebar/userItems/Folder";

interface IProps {
  label: string;
  location: Location;
  childFolders: IFolderChild[];
  nested: number;
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
    const { nested, location, label, childFolders } = this.props;
    const { expanded } = this.state;
    if (childFolders.length === 0) {
      return null;
    }

    return (
      <Folder
        nested={nested}
        label={label}
        childFolders={childFolders}
        handleClick={this.handleClick}
        expanded={expanded}
        location={location}
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
