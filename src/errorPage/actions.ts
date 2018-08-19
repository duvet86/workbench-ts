import { Action } from "redux";

export const enum ErrorActionTypes {
  ERROR_TRIGGER = "ERROR_TRIGGER"
}

export interface IErrorAction extends Action {
  type: ErrorActionTypes.ERROR_TRIGGER;
  error: any;
}

export const triggerError = (error: any): IErrorAction => ({
  type: ErrorActionTypes.ERROR_TRIGGER,
  error
});
