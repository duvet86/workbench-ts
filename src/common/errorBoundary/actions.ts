import { Action } from "redux";
import { batchActions } from "redux-batched-actions";

import { clearToken } from "app/actions";

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

// Same as:
// Observable.of(
//   someAction(xhr),
//   somOtherAction(xhr)
// )
// This relies on the fact that in RxJs v5, arrays can be returned
// whenever an observable is expected and will be consumed as one.
// This is effectively identical to the previous example.
const errorActions = (
  error: any,
  actions: Action[] = []
): [ITriggerError, ...Action[]] => [
  // Fire 2 actions, one after the other.
  triggerError(error),
  ...actions
];

export const handleException = (
  response: IErrorResponse,
  ...actions: Action[]
) => {
  switch (response.status) {
    case 401:
      return [clearToken()];
    default:
      return errorActions(response.error || response.message, actions);
  }
};

// batchActions because we can concat actions.
export type ErrorActions = ReturnType<typeof batchActions>;
