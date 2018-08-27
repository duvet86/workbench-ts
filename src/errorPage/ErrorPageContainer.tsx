import React, { SFC } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { RootState } from "rootReducer";

import ErrorPage from "errorPage/ErrorPage";

const ErrorPageContainer: SFC<ReturnType<typeof mapStateToProps>> = ({
  error,
  ...props
}) =>
  !error ? (
    <Redirect
      to={{
        pathname: "/"
      }}
    />
  ) : (
    <ErrorPage error={error} {...props} />
  );

const mapStateToProps = ({ errorReducer: { error } }: RootState) => ({
  error
});

export default connect(mapStateToProps)(ErrorPageContainer);
