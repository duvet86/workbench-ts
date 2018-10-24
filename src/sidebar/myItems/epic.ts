import { ActionsObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Action } from "redux";

import { getDataObs } from "lib/apiCache";

import { handleException } from "errorPage/actions";
import { MyItemsActionTypes, myItemsSuccess } from "sidebar/myItems/actions";
import { getMyItemsObs } from "sidebar/myItems/api";

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
