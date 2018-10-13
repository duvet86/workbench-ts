import React, { SFC } from "react";

import { IIntervalDtc, IntervalTypes } from "common/intervalSelector/types";
import { getDateOpStringDate } from "common/intervalSelector/selector";

import DateOp from "common/intervalSelector/intervalString/DateOp";
import CalendarPeriodContainer from "common/intervalSelector/intervalString/CalendarPeriodContainer";

interface IProps {
  className: string;
  interval: IIntervalDtc;
  handleNextIntevalClick: (offset: number) => () => void;
}

const IntervalStringPickerContainer: SFC<IProps> = ({
  className,
  interval,
  handleNextIntevalClick
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
        <DateOp
          className={className}
          intervalStringDate={intervalStringDate}
          handleNextIntevalClick={handleNextIntevalClick}
        />
      );
    case IntervalTypes.CALENDARPERIOD:
    case IntervalTypes.CALENDARQUARTER:
      return (
        <CalendarPeriodContainer
          className={className}
          intervalType={interval.IntervalType}
          intervalStringDate={intervalStringDate}
          handleNextIntevalClick={handleNextIntevalClick}
        />
      );
    default:
      return null;
  }
};

export default IntervalStringPickerContainer;
