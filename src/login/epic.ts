import { push, RouterAction } from "connected-react-router";
import { ActionsObservable, ofType } from "redux-observable";
import { of, Observable } from "rxjs";
import { catchError, flatMap, mergeMap } from "rxjs/operators";

import {
  LoginAction,
  LoginActionTypes,
  loginError,
  loginSuccess,
  ILoginSuccess,
  ILoginError,
  ILoginRequest
} from "login/actions";

import { getTokenAsync } from "lib/authApi";
import { storeToken } from "lib/sessionStorageApi";

function storeTokenAndTriggerLogingSucces(token: string) {
  storeToken(token);
  return loginSuccess();
}

export const loginEpic = (
  action$: ActionsObservable<LoginAction>
): Observable<(ILoginSuccess & RouterAction) | ILoginError> =>
  action$.pipe(
    ofType<ILoginRequest>(LoginActionTypes.LOGIN_REQUEST),
    mergeMap(({ username, password }) =>
      getTokenAsync(username, password).pipe(
        flatMap(token => [
          // Fire 2 actions, one after the other
          storeTokenAndTriggerLogingSucces(token),
          push("/")
        ]),
        catchError(error => of(loginError(error)))
      )
    )
  );
