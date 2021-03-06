import { ActionsObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Action } from "redux";

import { handleExceptionObs } from "common/errorBoundary/actions";
import { ProfileActionTypes, profileSuccess } from "profile/actions";
import { getUserInfoObs } from "profile/api";

export const fetchProfileEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(ProfileActionTypes.PROFILE_REQUEST),
    mergeMap(() =>
      getUserInfoObs().pipe(
        map(response => profileSuccess(response)),
        catchError(error => handleExceptionObs(error))
      )
    )
  );
