import "index.css";
import "typeface-roboto";

import React, { ComponentType } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Switch, RouteComponentProps } from "react-router";
import { ConnectedRouter } from "connected-react-router";

import configureStore from "lib/configureStore";
import configureTheme from "lib/configureTheme";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";

import LoadAsync from "common/loading/LoadAsync";
import AnonymousRoute from "routes/AnonymousRoute";
import AuthenticatedRoute from "routes/AuthenticatedRoute";

const history = createBrowserHistory();
const store = configureStore(history);
const theme = configureTheme();

const LoginContainerAsync = React.lazy(() => import("login/LoginContainer"));
const AppContainerAsync = React.lazy<ComponentType<RouteComponentProps>>(() =>
  import("app/AppContainer")
);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <LoadAsync>
          <Switch>
            <AnonymousRoute path="/login" component={LoginContainerAsync} />
            <AuthenticatedRoute path="/" component={AppContainerAsync} />
          </Switch>
        </LoadAsync>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
