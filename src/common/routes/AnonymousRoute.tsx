import React, { FC } from "react";
import { RouteComponentProps } from "react-router";
import { Redirect, Route } from "react-router-dom";

import { getTokenFromSession } from "lib/authApi";
import { IRouteProps } from "common/routes/types";

const AnonymousRoute: FC<IRouteProps> = ({ component, ...props }) => {
  const boundRender = ({ location }: RouteComponentProps) =>
    getTokenFromSession() == null ? (
      React.createElement(component)
    ) : (
      <Redirect
        to={{
          pathname: "/",
          state: { from: location }
        }}
      />
    );

  return <Route exact {...props} render={boundRender} />;
};

export default AnonymousRoute;
