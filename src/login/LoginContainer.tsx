import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ILoginRequest, loginRequest } from "login/actions";

import { LoadingContainer } from "common/loading";
import Login from "login/Login";

interface IDispatchProps {
  submitHandler: (username: string, password: string) => void;
}

interface IStateProps {
  isLoading: boolean;
  error: any;
}

type Props = IStateProps & IDispatchProps;

interface IStoreState {
  loginReducer: IStateProps;
}

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
      <LoadingContainer isLoading={isLoading} error={error}>
        <Login {...props} />
      </LoadingContainer>
    );
  }
}

const mapStateToProps = ({
  loginReducer: { isLoading, error }
}: IStoreState) => ({
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
