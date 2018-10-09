import "index.css";
import "typeface-roboto";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";

import store from "lib/configureStore";
import theme from "lib/configureTheme";
import history from "lib/history";
import loadAsync from "lib/loadAsync";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";

import AnonymousRoute from "routes/AnonymousRoute";
import AuthenticatedRoute from "routes/AuthenticatedRoute";

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <AnonymousRoute
            path="/login"
            component={loadAsync(() => import("login/LoginContainer"))}
          />
          <AuthenticatedRoute
            path="/"
            component={loadAsync(() => import("app/AppContainer"))}
          />
        </Switch>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
