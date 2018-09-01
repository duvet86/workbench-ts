import React, { SFC } from "react";
import { Route, Switch } from "react-router-dom";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import loadAsync from "lib/loadAsync";
import NotFoundRoute from "routes/NotFoundRoute";

const styles = createStyles({
  gridContainer: {
    marginBottom: 48
  }
});

const AppBody: SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <Grid container className={classes.gridContainer}>
    <Grid item xs={12}>
      <Switch>
        <Route
          exact
          path="/"
          component={loadAsync(() => import("welcomePage/WelcomePage"))}
        />
        <Route
          exact
          path="/workbench/:id"
          component={loadAsync(() => import("workbench/Workbench"))}
        />
        <Route
          exact
          path="/pagebuilder/:id"
          component={loadAsync(() => import("pagebuilder/Pagebuilder"))}
        />
        <Route
          exact
          path="/profile"
          component={loadAsync(() => import("profile/ProfileContainer"))}
        />
        <Route
          exact
          path="/error"
          component={loadAsync(() => import("errorPage/ErrorPageContainer"))}
        />
        <NotFoundRoute />
      </Switch>
    </Grid>
  </Grid>
);

export default withStyles(styles)(AppBody);
