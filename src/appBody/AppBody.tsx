import React, { SFC } from "react";
import { Route, Switch } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import loadAsync from "lib/loadAsync";
import NotFoundRoute from "routes/NotFoundRoute";

const AppBody: SFC = () => (
  <Grid container>
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
          component={loadAsync(() => import("workbench/WorkbenchContainer"))}
        />
        <Route
          exact
          path="/pagebuilder/:id"
          component={loadAsync(() =>
            import("pagebuilder/PagebuilderContainer")
          )}
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

export default AppBody;
