import { push, RouterAction } from "connected-react-router";
import { Action } from "redux";
import { batchActions } from "redux-batched-actions";

export interface IErrorResponse {
  status: number;
  message: string;
  error: any;
}

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

// Same as:
// Observable.of(
//   someAction(xhr),
//   somOtherAction(xhr)
// )
// This relies on the fact that in RxJs v5, arrays can be returned
// whenever an observable is expected and will be consumed as one.
// This is effectively identical to the previous example.
const errorPage = (
  error: any,
  actions: Action[] = []
): [IErrorAction, RouterAction, ...Action[]] => [
  // Fire 2 actions, one after the other.
  triggerError(error),
  push("/error"),
  ...actions
];

export const handleException = (
  response: IErrorResponse,
  ...actions: Action[]
) => {
  // tslint:disable-next-line:no-console
  console.error(response);
  return errorPage(response.error || response.message, actions);
};

export type ErrorActions = ReturnType<typeof batchActions>;
