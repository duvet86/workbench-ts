import { Epic, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";

import { AppAction, QES_ENABLED_REQUEST, qesEnabledSuccess } from "app/actions";
import { getQesEnabledAsync } from "app/api";
import { handleException } from "errorPage/epic";

export const appEpic: Epic<AppAction, any> = action$ =>
  action$.pipe(
    ofType(QES_ENABLED_REQUEST),
    mergeMap(() =>
      getQesEnabledAsync().pipe(
        map((isQesEnabled: boolean) => qesEnabledSuccess(isQesEnabled)),
        catchError(error => handleException(error))
      )
    )
  );
