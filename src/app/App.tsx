import PropTypes from "prop-types";
import React, { Fragment, SFC } from "react";
import { Location } from "history";

import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import AppBody from "appBody/AppBody";
import SideBar from "sideBar/SideBar";
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
    <DragDropContextProvider backend={HTML5Backend}>
      <Fragment>
        <TopBarContainer handleDrawerOpen={handleDrawerOpen} />
        <div className={classes.bodyContainer}>
          <SideBar open={open} {...props} />
          <AppBody />
        </div>
      </Fragment>
    </DragDropContextProvider>
  ) : (
    <div>Workbench features are not enabled.</div>
  );

App.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  isQesEnabled: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired
};

export default withStyles(styles)(App);
