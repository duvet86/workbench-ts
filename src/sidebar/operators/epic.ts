import { Epic, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";

import { handleException } from "errorPage/epic";
import {
  IOperatorsRequest,
  OperatorsActionTypes,
  operatorsSuccess
} from "sideBar/operators/actions";
import { getOperatorsAsync } from "sideBar/operators/api";

export const operatorsEpic: Epic<IOperatorsRequest, any> = action$ =>
  action$.pipe(
    ofType(OperatorsActionTypes.OPERATORS_REQUEST),
    mergeMap(() =>
      getOperatorsAsync().pipe(
        map(response => operatorsSuccess(response)),
        catchError(error => handleException(error))
      )
    )
  );
