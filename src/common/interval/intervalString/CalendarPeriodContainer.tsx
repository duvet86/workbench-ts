import React, { FC, useState, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { IntervalTypes, ICalendarString } from "common/interval/types";
import { getCalendarStringAsync } from "common/interval/api";
import {
  ErrorActions,
  IErrorResponse,
  handleException
} from "common/errorBoundary/actions";

import CalendarPeriod from "common/interval/intervalString/CalendarPeriod";

interface IOwnProps {
  className: string;
  intervalType: IntervalTypes.CALENDARPERIOD | IntervalTypes.CALENDARQUARTER;
  intervalStringDate: string;
  handleNextIntevalClick: (offset: number) => () => void;
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

const CalendarPeriodContainer: FC<Props> = ({
  intervalType,
  dispatchHandleException,
  ...rest
}) => {
  const [calendarValues, setCalendarValues] = useState<ICalendarString[]>([]);

  useEffect(() => {
    getCalendarStringAsync(intervalType)
      .then(resp => setCalendarValues(resp))
      .catch(e => dispatchHandleException(e));
  }, [intervalType, dispatchHandleException]);

  return <CalendarPeriod calendarValues={calendarValues} {...rest} />;
};

const mapDispatchToProps = (dispatch: Dispatch<ErrorActions>) => ({
  dispatchHandleException: (resp: IErrorResponse) => {
    dispatch(handleException(resp));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(CalendarPeriodContainer);
