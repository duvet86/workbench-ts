import { push } from "connected-react-router";
import { ActionsObservable } from "redux-observable";
import { of } from "rxjs";
import { catchError, mergeMap, filter } from "rxjs/operators";

import {
  LoginAction,
  LoginActionTypes,
  loginError,
  loginSuccess,
  ILoginRequest
} from "login/actions";

import { getTokenAsync } from "lib/authApi";
import { storeToken } from "lib/sessionStorageApi";

function storeTokenAndTriggerLogingSucces(token: string) {
  storeToken(token);
  return loginSuccess();
}

export const loginEpic = (action$: ActionsObservable<LoginAction>) =>
  action$.pipe(
    // ofType<ILoginRequest>(LoginActionTypes.LOGIN_REQUEST),
    filter(
      (action): action is ILoginRequest =>
        action.type === LoginActionTypes.LOGIN_REQUEST
    ),
    mergeMap(({ username, password }) =>
      getTokenAsync(username, password).pipe(
        mergeMap(token => [
          // Fire 2 actions, one after the other
          storeTokenAndTriggerLogingSucces(token),
          push("/")
        ]),
        catchError(error => of(loginError(error)))
      )
    )
  );
