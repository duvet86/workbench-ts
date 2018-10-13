import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { batchActions } from "redux-batched-actions";

import {
  ICalendarPeriodDtc,
  IntervalTypes,
  ICalendarString
} from "common/intervalSelector/types";
import { getCalendarStringAsync } from "common/intervalSelector/api";
import {
  ErrorActions,
  IErrorResponse,
  handleException
} from "errorPage/actions";

import CalendarPeriod from "common/intervalSelector/intervalString/CalendarPeriod";

interface IOwnProps {
  className: string;
  intervalType: IntervalTypes.CALENDARPERIOD | IntervalTypes.CALENDARQUARTER;
  intervalStringDate: string;
  handleNextIntevalClick: (offset: number) => () => void;
}

interface IState {
  calendarValues: ICalendarString[];
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

class CalendarPeriodContainer extends Component<Props, IState> {
  public state: IState = {
    calendarValues: []
  };

  private isComponentUnmouted = false;

  public async componentDidMount() {
    const { dispatchHandleException, intervalType } = this.props;
    try {
      const calendarValues = await getCalendarStringAsync(intervalType);

      if (!this.isComponentUnmouted) {
        this.setState({
          calendarValues
        });
      }
    } catch (e) {
      dispatchHandleException(e);
    }
  }

  public componentWillUnmount() {
    this.isComponentUnmouted = true;
  }

  public render() {
    const { calendarValues } = this.state;
    const {
      className,
      intervalStringDate,
      handleNextIntevalClick
    } = this.props;

    return (
      <CalendarPeriod
        className={className}
        calendarValues={calendarValues}
        intervalStringDate={intervalStringDate}
        handleNextIntevalClick={handleNextIntevalClick}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ErrorActions>) => ({
  dispatchHandleException: (resp: IErrorResponse) => {
    dispatch(batchActions(handleException(resp)));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(CalendarPeriodContainer);
