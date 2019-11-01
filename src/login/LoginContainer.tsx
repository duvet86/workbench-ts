import React, {
  FC,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  MouseEvent
} from "react";
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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#eee";

    return function cleanup() {
      document.body.style.backgroundColor = null;
    };
  }, []);

  const handleChange = (prop: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (prop === "username") {
      setUsername(event.target.value);
    } else if (prop === "password") {
      setPassword(event.target.value);
    } else {
      throw new Error();
    }
  };

  const handleMouseDownPassword = (e: MouseEvent) => {
    e.preventDefault();
  };

  const handleClickShowPasssword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

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
        showPassword={showPassword}
        isInvalidCredentials={isInvalidCredentials}
        submitHandler={submitHandler}
        handleChange={handleChange}
        handleMouseDownPassword={handleMouseDownPassword}
        handleClickShowPasssword={handleClickShowPasssword}
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
