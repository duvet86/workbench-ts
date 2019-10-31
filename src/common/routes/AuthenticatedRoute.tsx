import React, { FC } from "react";
import { RouteComponentProps } from "react-router";
import { Redirect, Route } from "react-router";
import { connect } from "react-redux";
import { RootState } from "rootReducer";

import { getTokenFromSession } from "lib/authApi";
import { IRouteProps } from "common/routes/types";

type Props = IRouteProps & ReturnType<typeof mapStateToProps>;

const AuthenticatedRoute: FC<Props> = ({
  component,
  forceLogout,
  ...props
}) => {
  const boundRender = ({ location }: RouteComponentProps) =>
    getTokenFromSession() != null && !forceLogout ? (
      React.createElement(component)
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location }
        }}
      />
    );

  return <Route exact {...props} render={boundRender} />;
};

const mapStateToProps = ({ app: { forceLogout } }: RootState) => ({
  forceLogout
});

export default connect(mapStateToProps)(AuthenticatedRoute);
