import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Redirect, Route } from "react-router";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState } from "rootReducer";

import { IClearToken, clearToken } from "app/actions";

import { getValidTokenFromSession } from "lib/authApi";
import { IRouteProps } from "common/routes/types";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IRouteProps;

class AnonymousRoute extends Component<Props> {
  public componentDidMount() {
    const sessionToken = getValidTokenFromSession();
    if (this.props.hasToken && sessionToken == null) {
      this.props.dispatchClearToken();
    }
  }

  public render() {
    const { component, hasToken, ...props } = this.props;
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

    return <Route exact {...props} render={boundRender} />;
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
