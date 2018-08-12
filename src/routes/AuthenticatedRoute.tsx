import PropTypes from "prop-types";
import React, { ComponentType, SFC } from "react";
import { RouteProps } from "react-router";
import { Redirect, Route } from "react-router";

import { isUserAuthenticated } from "lib/authApi";

interface IProps {
  component: ComponentType<any>;
  path: string;
}

const AuthenticatedRoute: SFC<IProps> = ({ component, ...props }) => {
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

AuthenticatedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
};

export default AuthenticatedRoute;
