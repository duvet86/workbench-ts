import { push, RouterAction } from "connected-react-router";
import { Action } from "redux";

import { IErrorAction, triggerError } from "errorPage/actions";
import { deleteTokenAndRedirectLogin } from "lib/authApi";

interface IErrorResponse {
  status: number;
  message: string;
  error: any;
}

// TODO remove any, fix types.

// Same as:
// Observable.of(
//   someAction(xhr),
//   somOtherAction(xhr)
// )
// This relies on the fact that in RxJs v5, arrays can be returned
// whenever an observable is expected and will be consumed as one.
// This is effectively identical to the previous example.
export const errorPage = (
  error: any,
  actions: Action[] = []
): [IErrorAction, RouterAction, ...Action[]] => [
  // Fire 2 actions, one after the other
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
  switch (response.status) {
    case 401:
      return deleteTokenAndRedirectLogin();
    default:
      return errorPage(response.error || response.message, actions);
  }
};
