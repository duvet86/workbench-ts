import React, { SFC } from "react";
import { Location } from "history";
import { Link } from "react-router-dom";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Button, { ButtonProps } from "@material-ui/core/Button";

import NavigationTabsContainer from "sidebar/navigationTabs/NavigationTabsContainer";
import SideBarBodyContainer from "sidebar/SideBarBodyContainer";

import { HomeIcon } from "common/icons";

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
    margin: "10px 10px 0 10px"
  },
  icon: {
    marginRight: 5
  }
});

const nePagebuilderLink = ({ className, children }: ButtonProps) => (
  <Link className={className} to="/pagebuilder/new">
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
    <Button
      className={classes.buttonContainer}
      variant="outlined"
      size="small"
      component={nePagebuilderLink}
    >
      <HomeIcon className={classes.icon} />
      Home
    </Button>
    <NavigationTabsContainer {...props} />
    <SideBarBodyContainer {...props} />
  </Drawer>
);

export default withStyles(styles)(SideBar);
