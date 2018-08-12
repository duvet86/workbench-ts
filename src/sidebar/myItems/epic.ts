import { Epic, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";

import { handleException } from "errorPage/epic";
import {
  IMyItemsRequest,
  MY_ITEMS_REQUEST,
  myItemsSuccess
} from "sideBar/myItems/actions";
import { getMyItemsAsync } from "sideBar/myItems/api";

export const myItemsEpic: Epic<IMyItemsRequest, any> = action$ =>
  action$.pipe(
    ofType(MY_ITEMS_REQUEST),
    mergeMap(() =>
      getMyItemsAsync().pipe(
        map(response => myItemsSuccess(response)),
        catchError(error => handleException(error))
      )
    )
  );
