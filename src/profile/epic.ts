import { ActionsObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";

import { handleException } from "errorPage/epic";
import {
  IProfileRequest,
  ProfileActionTypes,
  profileSuccess
} from "profile/actions";
import { getUserInfoAsync } from "profile/api";

export const fetchProfileEpic = (action$: ActionsObservable<IProfileRequest>) =>
  action$.pipe(
    ofType(ProfileActionTypes.PROFILE_REQUEST),
    mergeMap(() =>
      getUserInfoAsync().pipe(
        map(response => profileSuccess(response)),
        catchError(error => handleException(error))
      )
    )
  );
