import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";

import { getTokenAsync } from "lib/authApi";
import { storeToken, clearToken } from "lib/sessionStorageApi";

import LoadingContainer from "common/loading/LoadingContainer";
import Login from "login/Login";

interface IState {
  isLoading: boolean;
  isAuthenticated: boolean;
  isInvalidCredentials: boolean;
  error: any;
}

class LoginContainer extends Component<RouteComponentProps, IState> {
  public state = {
    isLoading: false,
    isAuthenticated: false,
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
    const {
      isAuthenticated,
      isLoading,
      isInvalidCredentials,
      error
    } = this.state;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

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
      storeToken(token);
      this.setState({
        isAuthenticated: true
      });
    } catch (error) {
      clearToken();
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

export default LoginContainer;
