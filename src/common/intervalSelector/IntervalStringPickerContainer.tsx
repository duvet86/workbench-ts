import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { batchActions } from "redux-batched-actions";

import { IIntervalDtc, IntervalTypes } from "common/intervalSelector/types";
import { getDateOpStringDate } from "common/intervalSelector/selector";
import { resolveIntervalAsync } from "common/intervalSelector/api";
import {
  ErrorActions,
  IErrorResponse,
  handleException
} from "errorPage/actions";

import LoadingContainer from "common/loading/LoadingContainer";
import DateOpString from "common/intervalSelector/intervalString/DateOpString";
import CalendarPeriodContainer from "common/intervalSelector/intervalString/CalendarPeriodContainer";

interface IOwnProps {
  interval: IIntervalDtc;
  handleIntervalChange: (newInterval: IIntervalDtc) => void;
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

interface IState {
  isLoading: boolean;
}

class IntervalStringPickerContainer extends Component<Props, IState> {
  public state: IState = {
    isLoading: false
  };

  public async componentDidUpdate(prevProps: Props) {
    const {
      interval,
      handleIntervalChange,
      dispatchHandleException
    } = this.props;

    if (prevProps.interval.IntervalType === interval.IntervalType) {
      return;
    }

    this.setState({
      isLoading: true
    });

    try {
      const resolvedInterval = await resolveIntervalAsync(
        interval.IntervalType,
        interval.offset
      );

      handleIntervalChange(resolvedInterval);
      this.setState({
        isLoading: false
      });
    } catch (e) {
      dispatchHandleException(e);
    }
  }

  public render() {
    const { interval } = this.props;
    if (interval.IntervalString == null) {
      return null;
    }

    return (
      <LoadingContainer isLoading={this.state.isLoading}>
        {this.getIntervalStringComponent(
          interval.IntervalType,
          interval.IntervalString
        )}
      </LoadingContainer>
    );
  }

  private getIntervalStringComponent(
    intervalType: string,
    intervalString: string
  ) {
    let intervalStringDate = intervalString;
    switch (intervalType) {
      case IntervalTypes.DATEOP:
        intervalStringDate = getDateOpStringDate(intervalString);
        return <DateOpString intervalStringDate={intervalStringDate} />;
      case IntervalTypes.CALENDARPERIOD:
        return (
          <CalendarPeriodContainer intervalStringDate={intervalStringDate} />
        );
      default:
        return null;
    }
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
)(IntervalStringPickerContainer);
