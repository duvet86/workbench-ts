import React, { SFC } from "react";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import { drawerBodyWidth } from "sidebar/SideBar";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import MyItemsIcon from "@material-ui/icons/Folder";
import SharedWithMeIcon from "@material-ui/icons/FolderShared";

interface IProps extends WithStyles<typeof styles> {
  currentTree: 0 | 1;
  handleTreeChange: (event: React.ChangeEvent<{}>, value: 0 | 1) => void;
}

const styles = ({
  palette: {
    secondary: { main }
  }
}: Theme) =>
  createStyles({
    navigation: {
      width: drawerBodyWidth
    },
    actionRoot: {
      "&$selected": {
        color: main
      }
    },
    selected: {}
  });

const ItemsSelector: SFC<IProps> = ({
  classes,
  currentTree,
  handleTreeChange
}) => (
  <BottomNavigation
    className={classes.navigation}
    value={currentTree}
    onChange={handleTreeChange}
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
