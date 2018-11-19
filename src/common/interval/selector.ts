import { createSelector } from "reselect";
import { parseDateOpString } from "common/interval/utils";
import { IIntervalTypesDtc } from "common/interval/types";

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
