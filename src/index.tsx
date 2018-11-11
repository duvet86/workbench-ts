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

import ErrorBoundaryContainer from "common/errorBoundary/ErrorBoundaryContainer";
import LoadAsync from "common/loading/LoadAsync";
import AnonymousRoute from "common/routes/AnonymousRoute";
import AuthenticatedRoute from "common/routes/AuthenticatedRoute";

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
        <ErrorBoundaryContainer>
          <LoadAsync>
            <Switch>
              <AnonymousRoute path="/login" component={LoginContainerAsync} />
              <AuthenticatedRoute path="/" component={AppContainerAsync} />
            </Switch>
          </LoadAsync>
        </ErrorBoundaryContainer>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
