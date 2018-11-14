import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { IStoreToken, storeToken } from "app/actions";
import { getTokenAsync } from "lib/authApi";

import LoadingContainer from "common/loading/LoadingContainer";
import Login from "login/Login";

interface IState {
  isLoading: boolean;
  isInvalidCredentials: boolean;
  error: any;
}

type Props = ReturnType<typeof mapDispatchToProps> & RouteComponentProps;

class LoginContainer extends Component<Props, IState> {
  public state: IState = {
    isLoading: false,
    isInvalidCredentials: false,
    error: undefined
  };

  public componentDidMount() {
    document.body.style.backgroundColor = "#eee";
  }

  public componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  public render() {
    const { isLoading, isInvalidCredentials, error } = this.state;
    return (
      <LoadingContainer isLoading={isLoading} error={error}>
        <Login
          {...this.props}
          isInvalidCredentials={isInvalidCredentials}
          submitHandler={this.submitHandler}
        />
      </LoadingContainer>
    );
  }

  private submitHandler = async (username: string, password: string) => {
    this.setState({
      isLoading: true
    });
    try {
      const token = await getTokenAsync(username, password);
      this.props.dispatchStoreToken(token);
    } catch (error) {
      if (error.status === 401) {
        this.setState({
          isLoading: false,
          isInvalidCredentials: true
        });
      } else {
        this.setState({
          error
        });
      }
    }
  };
}

const mapDispatchToProps = (dispatch: Dispatch<IStoreToken>) => ({
  dispatchStoreToken: (token: string) => {
    dispatch(storeToken(token));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(LoginContainer);
