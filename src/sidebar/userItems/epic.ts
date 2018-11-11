import { ActionsObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Action } from "redux";

import { getDataObs } from "lib/apiCache";

import { handleException } from "common/errorBoundary/actions";
import { MyItemsActionTypes, myItemsSuccess } from "sidebar/userItems/actions";
import { getMyItemsObs } from "sidebar/userItems/api";

export const myItemsEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(MyItemsActionTypes.MY_ITEMS_REQUEST),
    mergeMap(() =>
      getDataObs(MyItemsActionTypes.MY_ITEMS_REQUEST, getMyItemsObs).pipe(
        map(response => myItemsSuccess(response)),
        catchError(error => handleException(error))
      )
    )
  );
