import { ActionsObservable, ofType } from "redux-observable";
import { delay, mapTo } from "rxjs/operators";
import { Action } from "redux";

import { DelayActionTypes, endDelay } from "common/loading/actions";

export const loadingEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(DelayActionTypes.DELAY_START),
    delay(200),
    mapTo(endDelay())
  );
