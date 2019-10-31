import { Action } from "redux";
import {
  storeToken as sessionStoreToken,
  clearToken as sessionClearToken
} from "lib/sessionStorageApi";

export const enum TokenActionTypes {
  TOKEN_STORE = "TOKEN_STORE",
  TOKEN_REMOVE = "TOKEN_REMOVE"
}

export interface IStoreToken extends Action {
  type: TokenActionTypes.TOKEN_STORE;
}

export interface IClearToken extends Action {
  type: TokenActionTypes.TOKEN_REMOVE;
}

export type TokenActions = IStoreToken | IClearToken;

export const storeToken = (token: string): IStoreToken => {
  sessionStoreToken(token);
  return { type: TokenActionTypes.TOKEN_STORE };
};

export const clearToken = (): IClearToken => {
  sessionClearToken();
  return { type: TokenActionTypes.TOKEN_REMOVE };
};

export const enum QesEnabledActionTypes {
  QES_ENABLED_REQUEST = "QES_ENABLED_REQUEST",
  QES_ENABLED_SUCCESS = "QES_ENABLED_SUCCESS",
  QES_ENABLED_ERROR = "QES_ENABLED_ERROR"
}

export interface IQesEnabledRequest extends Action {
  type: QesEnabledActionTypes.QES_ENABLED_REQUEST;
}

export interface IQesEnabledSuccess extends Action {
  isQesEnabled: boolean;
  type: QesEnabledActionTypes.QES_ENABLED_SUCCESS;
}

export interface IQesEnabledError extends Action {
  type: QesEnabledActionTypes.QES_ENABLED_ERROR;
  error: unknown;
}

export type QesEnabledAction =
  | IQesEnabledRequest
  | IQesEnabledSuccess
  | IQesEnabledError;

export const qesEnabledRequest = (): IQesEnabledRequest => ({
  type: QesEnabledActionTypes.QES_ENABLED_REQUEST
});

export const qesEnabledSuccess = (
  isQesEnabled: boolean
): IQesEnabledSuccess => ({
  isQesEnabled,
  type: QesEnabledActionTypes.QES_ENABLED_SUCCESS
});

export const qesEnabledError = (error: unknown): IQesEnabledError => ({
  error,
  type: QesEnabledActionTypes.QES_ENABLED_ERROR
});
