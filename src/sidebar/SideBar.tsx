import React, { SFC } from "react";
import { Location } from "history";
import { Link } from "react-router-dom";
import classNames from "classnames";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Button, { ButtonProps } from "@material-ui/core/Button";

import NavigationTabsContainer from "sidebar/navigationTabs/NavigationTabsContainer";
import SideBarBodyContainer from "sidebar/SideBarBodyContainer";

import { HomeIcon } from "common/icons";

// HERE
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { mailFolderListItems, otherMailFolderListItems } from "./tileData";

interface IProps extends WithStyles<typeof styles, true> {
  open: boolean;
  location: Location;
}

const drawerPaperStyles: {
  position: "relative";
} = {
  position: "relative"
};

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    drawerOpen: {
      ...drawerPaperStyles,
      width: 300
    },
    drawerClosed: {
      ...drawerPaperStyles,
      width: 0
    },
    buttonContainer: {
      margin: "10px 10px 0 10px"
    },
    icon: {
      marginRight: 5
    },
    // HERE
    root: {
      flexGrow: 1,
      height: 440,
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    hide: {
      display: "none"
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
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
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3
    }
  });

const nePagebuilderLink = ({ className, children }: ButtonProps) => (
  <Link className={className} to="/pagebuilder/new">
    {children}
  </Link>
);

const SideBar: SFC<IProps> = ({ theme, classes, open, ...props }) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
    }}
    open={open}
  >
    <Divider />
    <List>{mailFolderListItems}</List>
    <Divider />
    <List>{otherMailFolderListItems}</List>
    {/* <NavigationTabsContainer {...props} />
    <SideBarBodyContainer {...props} /> */}
  </Drawer>
);

export default withStyles(styles, { withTheme: true })(SideBar);
