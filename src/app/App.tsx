import React, { SFC } from "react";
import { RouteComponentProps } from "react-router";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import AppBody from "appBody/AppBody";
import SideBar from "sidebar/SideBar";
import TopBarContainer from "topbar/TopBarContainer";

interface IOwnProps extends WithStyles<typeof styles> {
  handleDrawerOpen: () => void;
  open: boolean;
  isQesEnabled: boolean;
}

type Props = RouteComponentProps & IOwnProps;

const styles = createStyles({
  bodyContainer: {
    display: "flex",
    height: "100%",
    width: "100%"
  }
});

const App: SFC<Props> = ({
  classes,
  handleDrawerOpen,
  open,
  isQesEnabled,
  history,
  ...props
}) =>
  isQesEnabled ? (
    <>
      <TopBarContainer history={history} handleDrawerOpen={handleDrawerOpen} />
      <div className={classes.bodyContainer}>
        <SideBar open={open} {...props} />
        <AppBody />
      </div>
    </>
  ) : (
    <div>Workbench features are not enabled.</div>
  );

export default withStyles(styles)(App);
