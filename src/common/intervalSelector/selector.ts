import { createSelector } from "reselect";
import { RootState } from "rootReducer";

const intervalStringSelector = (state: RootState) =>
  state.intervalReducer.interval.IntervalString;

export const getIntervalDate = createSelector(
  intervalStringSelector,
  intervalString => intervalString
);
