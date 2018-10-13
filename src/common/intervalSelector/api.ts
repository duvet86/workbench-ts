import { getWithJwtAsync } from "lib/http";
import {
  IIntervalDtc,
  ITypesAndInterval,
  IIntervalTypesDtc,
  ICalendarPeriodDtc,
  IntervalTypes,
  ICalendarString,
  ICalendarQuarterDtc
} from "common/intervalSelector/types";

export const initIntervalAsync = (
  initInterval: IIntervalDtc
): Promise<ITypesAndInterval> =>
  Promise.all([
    getWithJwtAsync<IIntervalTypesDtc[]>("api/platform/intervaltypes"),
    resolveIntervalAsync(initInterval.IntervalType)
  ]).then(arrayOfResponses => ({
    intervalTypes: arrayOfResponses[0].reduce(
      (res, val) => {
        res[val.IntervalType] = val;
        return res;
      },
      {} as { [key: string]: IIntervalTypesDtc }
    ),
    interval: arrayOfResponses[1]
  }));

export const resolveIntervalAsync = (
  intervalType: string,
  offset: number = 0,
  smartIntervalKey?: string
) =>
  getWithJwtAsync<IIntervalDtc[]>(
    `api/platform/interval/${intervalType}/resolve?offset=${offset}${
      smartIntervalKey != null ? `&smartIntervalKey=${smartIntervalKey}` : ""
    }`
  ).then(intervalArray => intervalArray[0]);

export const getNextIntervalAsync = (
  intervalType: string,
  intervalString: string,
  offset: number
) =>
  getWithJwtAsync<IIntervalDtc>(
    `api/platform/interval/${intervalType}/next?intervalString=${intervalString}&offset=${offset}`
  ).then(nextInterval => nextInterval);

export const getCalendarStringAsync = async (
  intervalType: IntervalTypes.CALENDARPERIOD | IntervalTypes.CALENDARQUARTER
): Promise<ICalendarString[]> => {
  switch (intervalType) {
    case IntervalTypes.CALENDARPERIOD:
      const periods = await getWithJwtAsync<ICalendarPeriodDtc[]>(
        "api/platform/calendarperiods"
      );
      return periods.map(({ Operation, Label, PeriodName }) => ({
        operation: Operation,
        label: Label,
        value: PeriodName
      }));
    case IntervalTypes.CALENDARQUARTER:
      const quarters = await getWithJwtAsync<ICalendarQuarterDtc[]>(
        "api/platform/calendarquarters"
      );
      return quarters.map(({ Operation, Label, QuarterName }) => ({
        operation: Operation,
        label: Label,
        value: QuarterName
      }));
    default:
      return [];
  }
};
