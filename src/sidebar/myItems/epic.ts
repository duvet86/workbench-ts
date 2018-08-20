import { ActionsObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";

import { handleException } from "errorPage/epic";
import {
  MyItemsActionTypes,
  myItemsSuccess,
  MyItemsAction
} from "sideBar/myItems/actions";
import { getMyItemsAsync } from "sideBar/myItems/api";

export const myItemsEpic = (action$: ActionsObservable<MyItemsAction>) =>
  action$.pipe(
    ofType(MyItemsActionTypes.MY_ITEMS_REQUEST),
    mergeMap(() =>
      getMyItemsAsync().pipe(
        map(response => myItemsSuccess(response)),
        catchError(error => handleException(error))
      )
    )
  );
