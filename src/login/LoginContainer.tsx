import React, { FC, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { IStoreToken, storeToken } from "app/actions";
import { getTokenAsync } from "lib/authApi";

import LoadingContainer from "common/loading/LoadingContainer";
import Login from "login/Login";

type Props = ReturnType<typeof mapDispatchToProps>;

const LoginContainer: FC<Props> = props => {
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    document.body.style.backgroundColor = "#eee";

    return function cleanup() {
      document.body.style.backgroundColor = null;
    };
  }, []);

  const submitHandler = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const token = await getTokenAsync(username, password);
      props.dispatchStoreToken(token);

      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (error) {
      if (error.status === 401) {
        setIsLoading(false);
        setIsInvalidCredentials(true);
      } else {
        setError(error);
      }
    }
  };

  return (
    <LoadingContainer isLoading={isLoading} error={error}>
      <Login
        {...props}
        isInvalidCredentials={isInvalidCredentials}
        submitHandler={submitHandler}
      />
    </LoadingContainer>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<IStoreToken>) => ({
  dispatchStoreToken: (token: string) => {
    dispatch(storeToken(token));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(LoginContainer);
