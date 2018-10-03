import { ActionsObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";

import {
  IntervalTypeAction,
  ResolveIntervalAction,
  intervalTypesSuccess,
  intervalStringSuccess,
  IntervalTypeActionTypes,
  ResolveIntervalActionTypes,
  IResolveIntervalRequest
} from "common/intervalSelector/actions";
import {
  getIntervalTypesObs,
  resolveIntervalObs
} from "common/intervalSelector/api";
import { handleException } from "errorPage/epic";

export const intervalTypeEpic = (
  action$: ActionsObservable<IntervalTypeAction>
) =>
  action$.pipe(
    ofType(IntervalTypeActionTypes.INTERVALTYPE_REQUEST),
    mergeMap(() =>
      getIntervalTypesObs().pipe(
        map(intervalTypes => intervalTypesSuccess(intervalTypes)),
        catchError(error => handleException(error))
      )
    )
  );

export const resolveIntervalEpic = (
  action$: ActionsObservable<ResolveIntervalAction>
) =>
  action$.pipe(
    ofType<ResolveIntervalAction, IResolveIntervalRequest>(
      ResolveIntervalActionTypes.RESOLVE_INTERVAL_REQUEST
    ),
    mergeMap(({ intervalType, offset }) =>
      resolveIntervalObs(intervalType, offset).pipe(
        map(interval => intervalStringSuccess(interval)),
        catchError(error => handleException(error))
      )
    )
  );
