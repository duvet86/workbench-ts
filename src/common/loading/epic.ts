import { Epic, ofType } from "redux-observable";
import { delay, mapTo } from "rxjs/operators";

import {
  DelayActionTypes,
  endDelay,
  LoadingAction
} from "common/loading/actions";

export const loadingEpic: Epic<LoadingAction, any> = action$ =>
  action$.pipe(
    ofType(DelayActionTypes.DELAY_START),
    delay(200),
    mapTo(endDelay())
  );
