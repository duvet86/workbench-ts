import "index.css";
import "typeface-roboto";

import React, { ComponentType } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Switch, RouteComponentProps } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import configureStore from "lib/configureStore";
import configureTheme from "lib/configureTheme";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";

import ErrorBoundaryContainer from "common/errorBoundary/ErrorBoundaryContainer";
import LoadAsync from "common/loading/LoadAsync";
import AnonymousRoute from "common/routes/AnonymousRoute";
import AuthenticatedRoute from "common/routes/AuthenticatedRoute";

const store = configureStore();
const theme = configureTheme();

const LoginContainerAsync = React.lazy<ComponentType<RouteComponentProps>>(() =>
  import("login/LoginContainer")
);
const AppContainerAsync = React.lazy<ComponentType<RouteComponentProps>>(() =>
  import("app/AppContainer")
);

render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          <ErrorBoundaryContainer>
            <LoadAsync>
              <Switch>
                <AnonymousRoute path="/login" component={LoginContainerAsync} />
                <AuthenticatedRoute path="/" component={AppContainerAsync} />
              </Switch>
            </LoadAsync>
          </ErrorBoundaryContainer>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
