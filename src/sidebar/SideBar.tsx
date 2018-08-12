import PropTypes from "prop-types";
import React, { SFC } from "react";
import { Location } from "history";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";

import NavigationTabsContainer from "sideBar/navigationTabs/NavigationTabsContainer";
import SideBarBodyContainer from "sideBar/SideBarBodyContainer";

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
  }
});

const SideBar: SFC<IProps> = ({ classes, open, ...props }) => (
  <Drawer
    classes={{
      paper: open ? classes.drawerOpen : classes.drawerClosed
    }}
    variant="persistent"
    open={open}
  >
    <NavigationTabsContainer {...props} />
    <SideBarBodyContainer {...props} />
  </Drawer>
);

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
};

export default withStyles(styles)(SideBar);
