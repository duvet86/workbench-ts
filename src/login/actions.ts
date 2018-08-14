import { Action } from "redux";

export const enum LoginActionTypes {
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
  LOGOUT = "LOGOUT"
}

export interface ILoginRequest extends Action {
  type: LoginActionTypes.LOGIN_REQUEST;
  username: string;
  password: string;
}

export interface ILoginError extends Action {
  type: LoginActionTypes.LOGIN_ERROR;
  error: any;
}

export interface ILoginSuccess extends Action {
  type: LoginActionTypes.LOGIN_SUCCESS;
}

export interface ILogout extends Action {
  type: LoginActionTypes.LOGOUT;
}

export type LoginAction = ILoginRequest | ILoginError | ILoginSuccess | ILogout;

export const loginRequest = (
  username: string,
  password: string
): ILoginRequest => ({
  type: LoginActionTypes.LOGIN_REQUEST,
  username,
  password
});

export const loginSuccess = (): ILoginSuccess => ({
  type: LoginActionTypes.LOGIN_SUCCESS
});

export const loginError = (error: any): ILoginError => ({
  type: LoginActionTypes.LOGIN_ERROR,
  error
});

export const logout = (): ILogout => ({ type: LoginActionTypes.LOGOUT });
