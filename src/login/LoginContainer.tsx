import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { ILoginRequest, loginRequest } from "login/actions";

import { LoadingContainer } from "common/loading";
import Login from "login/Login";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class LoginContainer extends Component<Props> {
  public componentDidMount() {
    document.body.style.backgroundColor = "#eee";
  }

  public componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  public render() {
    const { isLoading, error, ...props } = this.props;

    return (
      <LoadingContainer
        isLoading={isLoading}
        error={error && error.status !== 401}
      >
        <Login {...props} error={error} />
      </LoadingContainer>
    );
  }
}

const mapStateToProps = ({
  loginReducer: { isLoading, error }
}: RootState) => ({
  isLoading,
  error
});

const mapDispatchToProps = (dispatch: Dispatch<ILoginRequest>) => ({
  submitHandler: (username: string, password: string) => {
    dispatch(loginRequest(username, password));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
