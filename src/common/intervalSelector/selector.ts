import { createSelector } from "reselect";
import { RootState } from "rootReducer";
import { IntervalTypes } from "common/intervalSelector/types";
import { parseDateOpString } from "common/intervalSelector/utils";

const intervalSelector = (state: RootState) => state.intervalReducer.interval;

export const getInterval = createSelector(intervalSelector, interval => {
  if (interval == null) {
    return;
  }

  switch (interval.IntervalType) {
    case IntervalTypes.DATEOP:
      return parseDateOpString(interval);
    default:
      return;
  }
});
