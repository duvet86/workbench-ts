import { Action } from "redux";
import { batchActions } from "redux-batched-actions";

import { deleteTokenAndLogout } from "lib/authApi";

export interface IErrorResponse {
  status: number;
  message: string;
  error: any;
}

export const enum ErrorActionTypes {
  ERROR_TRIGGER = "ERROR_TRIGGER",
  ERROR_CLEAN = "ERROR_CLEAN"
}

export interface ITriggerErrorAction extends Action {
  type: ErrorActionTypes.ERROR_TRIGGER;
  error: any;
}

export interface ICleanErrorAction extends Action {
  type: ErrorActionTypes.ERROR_CLEAN;
}

export const triggerError = (error: any): ITriggerErrorAction => ({
  type: ErrorActionTypes.ERROR_TRIGGER,
  error
});

export const cleanError = (): ICleanErrorAction => ({
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
): [ITriggerErrorAction, ...Action[]] => [
  // Fire 2 actions, one after the other.
  triggerError(error),
  ...actions
];

export const handleException = (
  response: IErrorResponse,
  ...actions: Action[]
) => {
  // tslint:disable-next-line:no-console
  console.error(response);
  switch (response.status) {
    case 401:
      return deleteTokenAndLogout();
    default:
      return errorActions(response.error || response.message, actions);
  }
};

export type ErrorActions = ReturnType<typeof batchActions>;
