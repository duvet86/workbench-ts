import { ActionsObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Action } from "redux";

import { QesEnabledActionTypes, qesEnabledSuccess } from "app/actions";
import { getQesEnabledAsync } from "app/api";
import { handleException } from "errorPage/actions";

export const appEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(QesEnabledActionTypes.QES_ENABLED_REQUEST),
    mergeMap(() =>
      getQesEnabledAsync().pipe(
        map(isQesEnabled => qesEnabledSuccess(isQesEnabled)),
        catchError(error => handleException(error))
      )
    )
  );
