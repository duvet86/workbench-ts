import { push } from "connected-react-router";
import { ActionsObservable, ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { Action } from "redux";

import {
  LoginAction,
  LoginActionTypes,
  loginError,
  loginSuccess,
  ILoginRequest
} from "login/actions";

import { getTokenObs } from "lib/authApi";
import { storeToken } from "lib/sessionStorageApi";

function storeTokenAndTriggerLogingSucces(token: string) {
  storeToken(token);
  return loginSuccess();
}

export const loginEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType<LoginAction, ILoginRequest>(LoginActionTypes.LOGIN_REQUEST),
    mergeMap(({ username, password }) =>
      getTokenObs(username, password).pipe(
        mergeMap(token => [
          // Fire 2 actions, one after the other
          storeTokenAndTriggerLogingSucces(token),
          push("/")
        ]),
        catchError(error => of(loginError(error)))
      )
    )
  );
