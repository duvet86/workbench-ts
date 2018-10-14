import React, { SFC } from "react";

import { IIntervalDtc, IntervalTypes } from "common/intervalSelector/types";
import { getDateOpStringDate } from "common/intervalSelector/selector";

import DateOpContainer from "common/intervalSelector/intervalString/DateOpContainer";
import CalendarPeriodContainer from "common/intervalSelector/intervalString/CalendarPeriodContainer";

interface IProps {
  className: string;
  interval: IIntervalDtc;
  onIntervalStringChange: (intervalString: string) => void;
  onNextIntevalClick: (offset: number) => () => void;
}

const IntervalStringPickerContainer: SFC<IProps> = ({
  className,
  interval,
  onIntervalStringChange,
  onNextIntevalClick
}) => {
  if (interval.IntervalString == null) {
    return null;
  }

  let intervalStringDate = interval.IntervalString;
  switch (interval.IntervalType) {
    case IntervalTypes.DATEOP:
    case IntervalTypes.CALENDARPERIODTODATE:
      intervalStringDate = getDateOpStringDate(interval.IntervalString);
      return (
        <DateOpContainer
          className={className}
          intervalStringDate={intervalStringDate}
          onIntervalStringChange={onIntervalStringChange}
          onNextIntevalClick={onNextIntevalClick}
        />
      );
    case IntervalTypes.CALENDARPERIOD:
    case IntervalTypes.CALENDARQUARTER:
      return (
        <CalendarPeriodContainer
          className={className}
          intervalType={interval.IntervalType}
          intervalStringDate={intervalStringDate}
          handleNextIntevalClick={onNextIntevalClick}
        />
      );
    default:
      return null;
  }
};

export default IntervalStringPickerContainer;
