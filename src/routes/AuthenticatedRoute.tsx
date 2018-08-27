import React, { SFC } from "react";
import { RouteProps } from "react-router";
import { Redirect, Route } from "react-router";

import { isUserAuthenticated } from "lib/authApi";
import { IRouteProps } from "routes/types";

const AuthenticatedRoute: SFC<IRouteProps> = ({ component, ...props }) => {
  const boundRender = (routeProps: RouteProps) =>
    isUserAuthenticated() ? (
      React.createElement(component, routeProps)
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: routeProps.location }
        }}
      />
    );

  return <Route exact {...props} render={boundRender} />;
};

export default AuthenticatedRoute;
