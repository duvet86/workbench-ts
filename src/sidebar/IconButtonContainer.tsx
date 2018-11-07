import React, { Component } from "react";

import IconButton from "sidebar/IconButton";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

interface IProps {
  Icon: React.ComponentType<SvgIconProps>;
  link: string;
  label: string;
}

interface IState {
  visible: boolean;
}

class IconButtonContainer extends Component<IProps, IState> {
  public state = {
    visible: false
  };

  public render() {
    const { Icon, link, label } = this.props;
    const { visible } = this.state;

    return (
      <IconButton
        visible={visible}
        Icon={Icon}
        to={link}
        label={label}
        handlePopoverOpen={this.handlePopoverOpen}
        handlePopoverClose={this.handlePopoverClose}
      />
    );
  }

  private handlePopoverOpen = () => {
    this.setState({
      visible: true
    });
  };

  private handlePopoverClose = () => {
    this.setState({ visible: false });
  };
}

export default IconButtonContainer;
