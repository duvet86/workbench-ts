import { createSelector } from "reselect";
import { RootState } from "rootReducer";

interface ISmartInterval {
  smartIntervalKey: string | null;
  intervalString: string | null;
}

const splitSmartInterval = (intervalString: string): ISmartInterval => {
  if (intervalString.substring(0, 2) !== "$$") {
    return {
      smartIntervalKey: null,
      intervalString
    };
  }

  const pipeIndex = intervalString.indexOf("|");

  return {
    smartIntervalKey:
      pipeIndex === -1
        ? intervalString.substring(2, intervalString.length)
        : intervalString.substring(2, pipeIndex),
    intervalString:
      pipeIndex === -1
        ? null
        : intervalString.substring(pipeIndex + 1, intervalString.length)
  };
};

const parseHourlyString = (intervalString: string) => {
  const year = intervalString.substring(0, 4);
  const month = intervalString.substring(4, 6);
  const day = intervalString.substring(6, 8);
  const hour = intervalString.substring(9, 11);
  const minute = intervalString.substring(12, 14);

  return {
    dateValue: new Date(
      parseInt(year, 10),
      parseInt(month, 10),
      parseInt(day, 10)
    ),
    hourValue: hour,
    minuteValue: minute,
    label: day + "/" + month + "/" + year + " " + hour + ":" + minute
  };
};

function parseDateOpString(intervalString: string) {
  const parts = splitSmartInterval(intervalString);

  const year = parts.intervalString.substring(0, 4);
  const month = parts.intervalString.substring(4, 6);
  const day = parts.intervalString.substring(6, 8);

  return {
    value: new Date(year, month, day),
    label: day + "/" + month + "/" + year
  };
}

const intervalStringSelector = (state: RootState) =>
  state.intervalReducer.interval.IntervalString;

export const getIntervalDate = createSelector(
  intervalStringSelector,
  intervalString => intervalString
);
