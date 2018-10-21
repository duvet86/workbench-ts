import React, { SFC } from "react";
import { Location } from "history";
import classNames from "classnames";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import linksList from "common/linksList";
import { HomeIcon } from "common/icons";

import Drawer from "@material-ui/core/Drawer";

import NavigationTabsContainer from "sidebar/navigationTabs/NavigationTabsContainer";
import SideBarBodyContainer from "sidebar/SideBarBodyContainer";
import IconButton from "sidebar/IconButton";

export const drawerBodyWidth = 312;

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
      width: 362,
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
      [theme.breakpoints.up("sm")]: {
        width: 51
      }
    },
    buttonsContainer: {
      width: 50
    },
    bodyContainer: {
      width: drawerBodyWidth,
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
      <IconButton tooltip="Home" Icon={HomeIcon} link="/" />
      {linksList.map(({ id, label, IconComponent, to }) => (
        <IconButton key={id} tooltip={label} Icon={IconComponent} link={to} />
      ))}
    </div>
    <div className={classes.bodyContainer}>
      <NavigationTabsContainer {...props} />
      <SideBarBodyContainer {...props} />
    </div>
  </Drawer>
);

export default withStyles(styles, { withTheme: true })(SideBar);
