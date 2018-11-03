import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

interface IProps {
  label: string;
}

interface IState {
  anchorEl?: HTMLElement;
}

class MenuEntry extends React.Component<IProps, IState> {
  public state: IState = {
    anchorEl: undefined
  };

  public render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          size="small"
          style={{
            textTransform: "none",
            fontWeight: "inherit",
            minHeight: 26,
            padding: 0
          }}
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {this.props.label}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }

  private handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleClose = () => {
    this.setState({ anchorEl: undefined });
  };
}

export default MenuEntry;
