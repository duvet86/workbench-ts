import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Redirect, Route } from "react-router";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState } from "rootReducer";

import { IClearToken, clearToken } from "app/actions";

import { getTokenFromSession } from "lib/authApi";
import { IRouteProps } from "common/routes/types";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IRouteProps;

class AnonymousRoute extends Component<Props> {
  public componentDidMount() {
    const sessionToken = getTokenFromSession();
    // Keep in sync store with sessionStorage.
    if (this.props.hasToken && sessionToken == null) {
      this.props.dispatchClearToken();
    }
  }

  public render() {
    const { component, hasToken, dispatchClearToken, ...rest } = this.props;
    const boundRender = (routeProps: RouteComponentProps) =>
      !hasToken ? (
        React.createElement(component, routeProps)
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: routeProps.location }
          }}
        />
      );

    return <Route exact {...rest} render={boundRender} />;
  }
}

const mapStateToProps = ({ app: { hasToken } }: RootState) => ({
  hasToken
});

const mapDispatchToProps = (dispatch: Dispatch<IClearToken>) => ({
  dispatchClearToken: () => {
    dispatch(clearToken());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnonymousRoute);
