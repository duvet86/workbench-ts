import React, { ComponentType, SFC } from "react";
import { RouteProps } from "react-router";
import { Redirect, Route } from "react-router-dom";

import { isUserAuthenticated } from "lib/authApi";
import { IRouteProps } from "routes/types";

const AnonymousRoute: SFC<IRouteProps> = ({ component, ...props }) => {
  const boundRender = (routeProps: RouteProps) =>
    !isUserAuthenticated() ? (
      React.createElement(component, routeProps)
    ) : (
      <Redirect
        to={{
          pathname: "/",
          state: { from: routeProps.location }
        }}
      />
    );

  return <Route exact {...props} render={boundRender} />;
};

export default AnonymousRoute;
