import React, { SFC } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

import ErrorPage from "errorPage/ErrorPage";

interface IProps {
  error: any;
}

interface IStoreState {
  errorReducer: {
    error: any;
  };
}

const ErrorPageContainer: SFC<IProps> = ({ error, ...props }) =>
  !error ? (
    <Redirect
      to={{
        pathname: "/"
      }}
    />
  ) : (
    <ErrorPage error={error} {...props} />
  );

const mapStateToProps = ({ errorReducer: { error } }: IStoreState) => ({
  error
});

export default connect(mapStateToProps)(ErrorPageContainer);
