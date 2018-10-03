import React, { SFC } from "react";
import { Location } from "history";
import { Link } from "react-router-dom";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Button, { ButtonProps } from "@material-ui/core/Button";

import NavigationTabsContainer from "sidebar/navigationTabs/NavigationTabsContainer";
import SideBarBodyContainer from "sidebar/SideBarBodyContainer";

import { DashboardIcon, DataViewIcon } from "common/icons";

interface IProps extends WithStyles<typeof styles> {
  open: boolean;
  location: Location;
}

const drawerPaperStyles: {
  position: "relative";
} = {
  position: "relative"
};

const styles = createStyles({
  drawerOpen: {
    ...drawerPaperStyles,
    width: 300
  },
  drawerClosed: {
    ...drawerPaperStyles,
    width: 0
  },
  buttonContainer: {
    margin: 10,
    display: "flex",
    justifyContent: "space-evenly"
  },
  pageIcon: {
    height: "0.9em"
  }
});

const nePagebuilderLink = ({ className, children }: ButtonProps) => (
  <Link className={className} to="/pagebuilder/new">
    {children}
  </Link>
);

const newWorkbenchLink = ({ className, children }: ButtonProps) => (
  <Link className={className} to="/workbench/new">
    {children}
  </Link>
);

const SideBar: SFC<IProps> = ({ classes, open, ...props }) => (
  <Drawer
    classes={{
      paper: open ? classes.drawerOpen : classes.drawerClosed
    }}
    variant="persistent"
    open={open}
  >
    <div className={classes.buttonContainer}>
      <Button variant="outlined" size="small" component={newWorkbenchLink}>
        <DataViewIcon />
        New Workbench
      </Button>
      <Button variant="outlined" size="small" component={nePagebuilderLink}>
        <DashboardIcon className={classes.pageIcon} />
        New Page
      </Button>
    </div>
    <NavigationTabsContainer {...props} />
    <SideBarBodyContainer {...props} />
  </Drawer>
);

export default withStyles(styles)(SideBar);
