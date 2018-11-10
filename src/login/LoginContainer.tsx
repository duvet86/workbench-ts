import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { push, RouterAction } from "connected-react-router";

import { getTokenAsync } from "lib/authApi";
import { storeToken } from "lib/sessionStorageApi";

import LoadingContainer from "common/loading/LoadingContainer";
import Login from "login/Login";

interface IState {
  isLoading: boolean;
  isInvalidCredentials: boolean;
  error: any;
}

type Props = ReturnType<typeof mapDispatchToProps>;

class LoginContainer extends Component<Props, IState> {
  public state = {
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
      storeToken(token);
      this.props.dispatchRedirectHome();
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

const mapDispatchToProps = (dispatch: Dispatch<RouterAction>) => ({
  dispatchRedirectHome: () => {
    dispatch(push("/"));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(LoginContainer);
