import React, { Fragment, SFC } from "react";
import { Location } from "history";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import AppBody from "appBody/AppBody";
import SideBar from "sidebar/SideBar";
import TopBarContainer from "topBar/TopBarContainer";

interface IProps extends WithStyles<typeof styles> {
  handleDrawerOpen: () => void;
  open: boolean;
  isQesEnabled: boolean;
  location: Location;
}

const styles = createStyles({
  bodyContainer: {
    display: "flex",
    height: "100%",
    width: "100%"
  }
});

const App: SFC<IProps> = ({
  classes,
  handleDrawerOpen,
  open,
  isQesEnabled,
  ...props
}) =>
  isQesEnabled ? (
    <Fragment>
      <TopBarContainer handleDrawerOpen={handleDrawerOpen} />
      <div className={classes.bodyContainer}>
        <SideBar open={open} {...props} />
        <AppBody />
      </div>
    </Fragment>
  ) : (
    <div>Workbench features are not enabled.</div>
  );

export default withStyles(styles)(App);
