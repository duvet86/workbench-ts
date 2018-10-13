import { createSelector } from "reselect";
import { parseDateOpString } from "common/intervalSelector/utils";
import { IIntervalTypesDtc } from "common/intervalSelector/types";

const intervalStringSelector = (intervalString: string) => intervalString;

export const getDateOpStringDate = createSelector(
  intervalStringSelector,
  intervalString => parseDateOpString(intervalString)
);

const intevalTypesObjSelector = (intervalTypesObj: {
  [key: string]: IIntervalTypesDtc;
}) => intervalTypesObj;

export const getIntervalTypes = createSelector(
  intevalTypesObjSelector,
  intervalTypesObj =>
    Object.keys(intervalTypesObj).map(type => intervalTypesObj[type])
);
