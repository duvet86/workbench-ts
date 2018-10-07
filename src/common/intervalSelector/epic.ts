import { AnyAction } from "redux";
import { ActionsObservable, ofType, Epic } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";

import {
  IntervalAction,
  initIntervalSuccess,
  resolveIntervalSuccess,
  IntervalActionTypes,
  IResolveIntervalRequest,
  IInitIntervalRequest
} from "common/intervalSelector/actions";
import {
  initIntervalObs,
  resolveIntervalObs
} from "common/intervalSelector/api";
import { handleException } from "errorPage/epic";

export const initIntervalEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType<AnyAction, IInitIntervalRequest>(
      IntervalActionTypes.INIT_INTERVAL_REQUEST
    ),
    mergeMap(({ initInterval }) =>
      initIntervalObs(initInterval).pipe(
        map(typesAndInterval => initIntervalSuccess(typesAndInterval)),
        catchError(error => handleException(error))
      )
    )
  );

export const resolveIntervalEpic = (action$: ActionsObservable<AnyAction>) =>
  action$.pipe(
    ofType<AnyAction, IResolveIntervalRequest>(
      IntervalActionTypes.RESOLVE_INTERVAL_REQUEST
    ),
    mergeMap(({ intervalType, offset }) =>
      resolveIntervalObs(intervalType, offset).pipe(
        map(interval => resolveIntervalSuccess(interval)),
        catchError(error => handleException(error))
      )
    )
  );
