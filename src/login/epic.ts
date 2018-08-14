import { push } from "react-router-redux";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, flatMap, mergeMap } from "rxjs/operators";

import {
  LoginAction,
  LoginActionTypes,
  loginError,
  loginSuccess
} from "login/actions";

import { getTokenAsync } from "lib/authApi";
import { storeToken } from "lib/sessionStorageApi";

function storeTokenAndTriggerLogingSucces(token: string) {
  storeToken(token);
  return loginSuccess();
}

export const loginEpic: Epic<LoginAction, any> = action$ =>
  action$.pipe(
    ofType(LoginActionTypes.LOGIN_REQUEST),
    mergeMap(({ username, password }: { username: string; password: string }) =>
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
