import { Location } from "history";
import React, { SFC } from "react";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import MyItemsIcon from "@material-ui/icons/Folder";
import SharedWithMeIcon from "@material-ui/icons/FolderShared";

interface IProps extends WithStyles<typeof styles> {}

const styles = ({
  palette: {
    secondary: { main }
  }
}: Theme) =>
  createStyles({
    actionRoot: {
      "&$selected": {
        color: main
      }
    },
    selected: {}
  });

const ItemsSelector: SFC<IProps> = ({ classes }) => (
  <BottomNavigation
    value={0}
    // onChange={this.handleChange}
    showLabels
  >
    <BottomNavigationAction
      classes={{
        root: classes.actionRoot,
        selected: classes.selected
      }}
      label="My Items"
      icon={<MyItemsIcon />}
    />
    <BottomNavigationAction
      classes={{
        root: classes.actionRoot,
        selected: classes.selected
      }}
      label="Shared With Me"
      icon={<SharedWithMeIcon />}
    />
  </BottomNavigation>
);

export default withStyles(styles)(ItemsSelector);
