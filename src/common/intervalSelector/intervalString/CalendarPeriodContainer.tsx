import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { batchActions } from "redux-batched-actions";

import { ICalendarPeriodDtc } from "common/intervalSelector/types";
import { getCalendarPeriodsAsync } from "common/intervalSelector/api";
import {
  ErrorActions,
  IErrorResponse,
  handleException
} from "errorPage/actions";

import CalendarPeriod from "common/intervalSelector/intervalString/CalendarPeriod";

interface IOwnProps {
  intervalStringDate: string;
}

interface IState {
  isLoading: boolean;
  calendarPeriods: ICalendarPeriodDtc[];
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

class CalendarPeriodContainer extends Component<Props, IState> {
  public state: IState = {
    isLoading: false,
    calendarPeriods: []
  };

  private isComponentUnmouted = false;

  public async componentDidMount() {
    const { dispatchHandleException } = this.props;
    this.setState({
      isLoading: true
    });

    try {
      const calendarPeriods = await getCalendarPeriodsAsync();

      if (!this.isComponentUnmouted) {
        this.setState({
          calendarPeriods,
          isLoading: false
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
    const { isLoading, calendarPeriods } = this.state;
    const { intervalStringDate } = this.props;

    return (
      <CalendarPeriod
        calendarPeriods={calendarPeriods}
        intervalStringDate={intervalStringDate}
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
