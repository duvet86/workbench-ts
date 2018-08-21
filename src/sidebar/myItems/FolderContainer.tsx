import { Location } from "history";
import React, { Component } from "react";

import { IFolderChild } from "sidebar/myItems/types";

import Folder from "sideBar/myItems/Folder";

interface IProps {
  Label: string;
  location: Location;
  Children: IFolderChild[];
}

interface IState {
  expanded: boolean;
}

class FolderContainer extends Component<IProps, IState> {
  public readonly state = {
    expanded: false
  };

  public componentDidMount() {
    const { Children, location } = this.props;
    if (!Children || Children.length === 0) {
      return;
    }

    const match = Children.some(
      c =>
        c.ChildType === "I" &&
        `/workbench/${c.ChildItemId}` === location.pathname
    );

    if (match) {
      this.setState({ expanded: true });
    }
  }

  public render() {
    const { Label, Children } = this.props;
    const { expanded } = this.state;

    return (
      <Folder
        label={Label}
        children={Children}
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
