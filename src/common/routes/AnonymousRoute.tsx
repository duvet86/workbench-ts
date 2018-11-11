import React, { SFC } from "react";
import { RouteComponentProps } from "react-router";
import { Redirect, Route } from "react-router-dom";

import { isUserAuthenticated } from "lib/authApi";
import { IRouteProps } from "common/routes/types";

const AnonymousRoute: SFC<IRouteProps> = ({ component, ...props }) => {
  const boundRender = (routeProps: RouteComponentProps) =>
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
