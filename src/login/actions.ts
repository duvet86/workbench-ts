import { Action } from "redux";

export const enum LoginActionTypes {
  LOGOUT = "LOGOUT"
}

export interface ILogout extends Action {
  type: LoginActionTypes.LOGOUT;
}

export const logout = (): ILogout => ({ type: LoginActionTypes.LOGOUT });
