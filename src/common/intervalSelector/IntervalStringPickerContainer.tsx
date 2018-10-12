import React, { SFC } from "react";

import { IIntervalDtc, IntervalTypes } from "common/intervalSelector/types";
import { getDateOpStringDate } from "common/intervalSelector/selector";

import DateOpString from "common/intervalSelector/intervalString/DateOpString";
import CalendarPeriodContainer from "common/intervalSelector/intervalString/CalendarPeriodContainer";

interface IProps {
  interval: IIntervalDtc;
  handleIntervalChange: (newInterval: IIntervalDtc) => void;
}

const IntervalStringPickerContainer: SFC<IProps> = ({ interval }) => {
  if (interval.IntervalString == null) {
    return null;
  }

  let intervalStringDate = interval.IntervalString;
  switch (interval.IntervalType) {
    case IntervalTypes.DATEOP:
    case IntervalTypes.CALENDARPERIODTODATE:
      intervalStringDate = getDateOpStringDate(interval.IntervalString);
      return <DateOpString intervalStringDate={intervalStringDate} />;
    case IntervalTypes.CALENDARPERIOD:
    case IntervalTypes.CALENDARQUARTER:
      return (
        <CalendarPeriodContainer
          intervalType={interval.IntervalType}
          intervalStringDate={intervalStringDate}
        />
      );
    default:
      return null;
  }
};

export default IntervalStringPickerContainer;
