import { Action } from "redux";

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
  error: any;
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

export const qesEnabledError = (error: any): IQesEnabledError => ({
  error,
  type: QesEnabledActionTypes.QES_ENABLED_ERROR
});
