import { ActionsObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";

import { getData } from "lib/apiCache";

import { handleException } from "errorPage/actions";
import {
  IOperatorsRequest,
  OperatorsActionTypes,
  operatorsSuccess
} from "sidebar/operators/actions";
import { getOperatorsObs } from "sidebar/operators/api";

export const operatorsEpic = (action$: ActionsObservable<IOperatorsRequest>) =>
  action$.pipe(
    ofType(OperatorsActionTypes.OPERATORS_REQUEST),
    mergeMap(() =>
      getData(OperatorsActionTypes.OPERATORS_REQUEST, getOperatorsObs).pipe(
        map(operatorServices => operatorsSuccess(operatorServices)),
        catchError(error => handleException(error))
      )
    )
  );
