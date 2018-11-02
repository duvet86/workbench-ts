import React, { Component } from "react";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";

import AddIcon from "@material-ui/icons/Add";

import { componentList } from "pagebuilder/components/utils";

interface IState {
  anchorEl: any;
}

const styles = (theme: Theme) =>
  createStyles({
    addButton: {
      position: "fixed",
      bottom: theme.spacing.unit * 3,
      right: theme.spacing.unit * 4
    },
    drawer: {
      marginTop: 48
    }
  });

class AddComponentList extends Component<WithStyles<typeof styles>, IState> {
  public state: IState = {
    anchorEl: undefined
  };

  public render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <>
        <Button
          className={classes.addButton}
          variant="fab"
          color="primary"
          onClick={this.handleClick}
        >
          <AddIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          anchorOrigin={{
            horizontal: "left",
            vertical: "top"
          }}
          transformOrigin={{
            horizontal: "right",
            vertical: "bottom"
          }}
        >
          {componentList.map(({ label, Icon }, index) => (
            <MenuItem key={index}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  private handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.target });
  };

  private handleClose = () => {
    this.setState({ anchorEl: undefined });
  };
}

export default withStyles(styles)(AddComponentList);
