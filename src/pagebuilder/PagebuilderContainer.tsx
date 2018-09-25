import React, { Component, ChangeEvent } from "react";

import Pagebuilder from "pagebuilder/Pagebuilder";

interface IState {
  value: number;
}

export default class PagebuilderContainer extends Component<{}, IState> {
  public state = {
    value: 0
  };

  public render() {
    const { value } = this.state;

    return <Pagebuilder value={value} handleChange={this.handleChange} />;
  }

  private handleChange = (_: ChangeEvent<{}>, value: number) => {
    this.setState({ value });
  };
}
