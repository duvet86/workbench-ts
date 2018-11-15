import { ActionsObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Action } from "redux";

import { getDataObs } from "lib/apiCache";

import { handleExceptionObs } from "common/errorBoundary/actions";
import {
  OperatorsActionTypes,
  operatorsSuccess
} from "sidebar/operators/actions";
import { getOperatorsObs } from "sidebar/operators/api";

export const operatorsEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(OperatorsActionTypes.OPERATORS_REQUEST),
    mergeMap(() =>
      getDataObs(OperatorsActionTypes.OPERATORS_REQUEST, getOperatorsObs).pipe(
        map(operatorServices => operatorsSuccess(operatorServices)),
        catchError(error => handleExceptionObs(error))
      )
    )
  );
