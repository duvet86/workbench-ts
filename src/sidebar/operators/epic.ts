import { ActionsObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";

import { handleException } from "errorPage/epic";
import {
  IOperatorsRequest,
  OperatorsActionTypes,
  operatorsSuccess
} from "sidebar/operators/actions";
import { getOperatorsAsync } from "sidebar/operators/api";

export const operatorsEpic = (action$: ActionsObservable<IOperatorsRequest>) =>
  action$.pipe(
    ofType(OperatorsActionTypes.OPERATORS_REQUEST),
    mergeMap(() =>
      getOperatorsAsync().pipe(
        map(operatorServices => operatorsSuccess(operatorServices)),
        catchError(error => handleException(error))
      )
    )
  );
