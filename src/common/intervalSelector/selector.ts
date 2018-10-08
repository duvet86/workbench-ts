import { createSelector } from "reselect";
import { IntervalTypes, IIntervalDtc } from "common/intervalSelector/types";
import { parseDateOpString } from "common/intervalSelector/utils";

const intervalSelector = (interval?: IIntervalDtc) => interval;

export const getIntervalDate = createSelector(intervalSelector, interval => {
  if (interval == null || interval.IntervalString == null) {
    return null;
  }

  switch (interval.IntervalType) {
    case IntervalTypes.DATEOP:
      return parseDateOpString(interval);
    default:
      return null;
  }
});
