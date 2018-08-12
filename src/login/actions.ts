export const LOGIN_REQUEST = "LOGIN_REQUEST";
type LOGIN_REQUEST = typeof LOGIN_REQUEST;
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;
export const LOGIN_ERROR = "LOGIN_ERROR";
type LOGIN_ERROR = typeof LOGIN_ERROR;

export interface ILoginRequest {
  type: LOGIN_REQUEST;
  username: string;
  password: string;
}

export interface ILoginError {
  type: LOGIN_ERROR;
  error: any;
}

export interface ILoginSuccess {
  type: LOGIN_SUCCESS;
}

export type LoginAction = ILoginRequest | ILoginError | ILoginSuccess;

export const loginRequest = (
  username: string,
  password: string
): ILoginRequest => ({
  type: LOGIN_REQUEST,
  username,
  password
});

export const loginSuccess = (): ILoginSuccess => ({ type: LOGIN_SUCCESS });

export const loginError = (error: any): ILoginError => ({
  type: LOGIN_ERROR,
  error
});

export const LOGOUT = "LOGOUT";
type LOGOUT = typeof LOGOUT;

export const logout = () => ({ type: LOGOUT });
