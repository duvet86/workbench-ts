import React, { SFC } from "react";
import { Location } from "history";
import classNames from "classnames";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";

import NavigationTabsContainer from "sidebar/navigationTabs/NavigationTabsContainer";
import SideBarBodyContainer from "sidebar/SideBarBodyContainer";
import IconButton from "sidebar/IconButton";

import { buttons } from "sidebar/utils";

interface IProps extends WithStyles<typeof styles, true> {
  open: boolean;
  location: Location;
}

const styles = (theme: Theme) =>
  createStyles({
    drawerPaper: {
      overflow: "hidden",
      position: "relative",
      whiteSpace: "nowrap",
      width: 370,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      display: "flex",
      flexDirection: "row"
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing.unit * 9
      }
    },
    buttonsContainer: {
      width: 70
    },
    bodyContainer: {
      width: 300,
      borderLeft: "1px solid rgba(0, 0, 0, 0.12)"
    }
  });

const SideBar: SFC<IProps> = ({ theme, classes, open, ...props }) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
    }}
    open={open}
  >
    <div className={classes.buttonsContainer}>
      {buttons.map(b => (
        <IconButton {...b} />
      ))}
    </div>
    <div className={classes.bodyContainer}>
      <NavigationTabsContainer {...props} />
      <SideBarBodyContainer {...props} />
    </div>
  </Drawer>
);

export default withStyles(styles, { withTheme: true })(SideBar);
