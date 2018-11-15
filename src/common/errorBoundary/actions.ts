import { Action } from "redux";
import { of } from "rxjs";

import { clearToken, IClearToken } from "app/actions";

export interface IErrorResponse {
  status: number;
  message: string;
  error: any;
}

export const enum ErrorActionTypes {
  ERROR_TRIGGER = "ERROR_TRIGGER",
  ERROR_CLEAN = "ERROR_CLEAN"
}

export interface ITriggerError extends Action {
  type: ErrorActionTypes.ERROR_TRIGGER;
  error: any;
}

export interface ICleanError extends Action {
  type: ErrorActionTypes.ERROR_CLEAN;
}

export const triggerError = (error: any): ITriggerError => ({
  type: ErrorActionTypes.ERROR_TRIGGER,
  error
});

export const cleanError = (): ICleanError => ({
  type: ErrorActionTypes.ERROR_CLEAN
});

export const handleException = (response: IErrorResponse) => {
  switch (response.status) {
    case 401:
      return clearToken();
    default:
      return triggerError(response.error || response.message);
  }
};

export const handleExceptionObs = (response: IErrorResponse) =>
  of(handleException(response));

// batchActions because we can concat actions.
export type ErrorActions = ITriggerError | IClearToken;
