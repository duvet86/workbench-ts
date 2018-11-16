import React, { SFC } from "react";
import { RouteComponentProps } from "react-router";
import { Redirect, Route } from "react-router";
import { connect } from "react-redux";
import { RootState } from "rootReducer";

import { IStoreToken, storeToken } from "app/actions";

import { getTokenFromSession } from "lib/authApi";
import { IRouteProps } from "common/routes/types";

type Props = IRouteProps & ReturnType<typeof mapStateToProps>;

const AuthenticatedRoute: SFC<Props> = ({
  component,
  forceLogout,
  ...props
}) => {
  const boundRender = (routeProps: RouteComponentProps) =>
    getTokenFromSession() != null && !forceLogout ? (
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

const mapStateToProps = ({ app: { forceLogout } }: RootState) => ({
  forceLogout
});

export default connect(mapStateToProps)(AuthenticatedRoute);
