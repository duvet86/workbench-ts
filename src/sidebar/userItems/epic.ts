import { ActionsObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Action } from "redux";

import { getDataObs } from "lib/apiCache";

import { handleException } from "common/errorBoundary/actions";
import {
  UserItemsActionTypes,
  userItemsSuccess
} from "sidebar/userItems/actions";
import { getUserItemsObs } from "sidebar/userItems/api";

export const userItemsEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(UserItemsActionTypes.USER_ITEMS_REQUEST),
    mergeMap(() =>
      getDataObs(UserItemsActionTypes.USER_ITEMS_REQUEST, getUserItemsObs).pipe(
        map(response => userItemsSuccess(response)),
        catchError(error => handleException(error))
      )
    )
  );
