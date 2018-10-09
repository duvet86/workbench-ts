import { createSelector } from "reselect";
import { parseDateOpString } from "common/intervalSelector/utils";

const intervalStringSelector = (intervalString: string) => intervalString;

export const getDateOpStringDate = createSelector(
  intervalStringSelector,
  intervalString => parseDateOpString(intervalString)
);
