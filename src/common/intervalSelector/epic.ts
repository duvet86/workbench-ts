import { ActionsObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";

import {
  IntervalAction,
  intervalTypesSuccess,
  IntervalActionTypes
} from "common/intervalSelector/actions";
import { getIntervalTypesObs } from "common/intervalSelector/api";
import { handleException } from "errorPage/epic";

export const intervalTypeEpic = (action$: ActionsObservable<IntervalAction>) =>
  action$.pipe(
    ofType(IntervalActionTypes.INTERVALTYPE_REQUEST),
    mergeMap(() =>
      getIntervalTypesObs().pipe(
        map(intervalTypes => intervalTypesSuccess(intervalTypes)),
        catchError(error => handleException(error))
      )
    )
  );

// export const resolveIntervalEpic = action$ =>
//   action$.pipe(
//     ofType(RESOLVE_INTERVAL_REQUEST),
//     mergeMap((intervalType, offset) =>
//       resolveIntervalObs(intervalType, offset).pipe(
//         map(interval => intervalTypesSuccess(interval)),
//         catchError(error => handleException(error))
//       )
//     )
//   );
