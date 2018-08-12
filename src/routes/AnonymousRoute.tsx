import PropTypes from "prop-types";
import React, { ComponentType, SFC } from "react";
import { RouteProps } from "react-router";
import { Redirect, Route } from "react-router-dom";

import { isUserAuthenticated } from "lib/authApi";

interface IProps {
  component: ComponentType<any>;
  path: string;
}

const AnonymousRoute: SFC<IProps> = ({ component, ...props }) => {
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

AnonymousRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
};

export default AnonymousRoute;
