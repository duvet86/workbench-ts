import { ActionsObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Action } from "redux";

import { QesEnabledActionTypes, qesEnabledSuccess } from "app/actions";
import { getQesEnabledObs } from "app/api";
import { handleException } from "common/errorBoundary/actions";

export const qesEnabledEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(QesEnabledActionTypes.QES_ENABLED_REQUEST),
    mergeMap(() =>
      getQesEnabledObs().pipe(
        map(isQesEnabled => qesEnabledSuccess(isQesEnabled)),
        catchError(error => handleException(error))
      )
    )
  );
