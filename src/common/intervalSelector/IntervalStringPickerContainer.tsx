import React, { ChangeEvent, Component } from "react";

import { IIntervalDtc, IntervalTypes } from "common/intervalSelector/types";
import { getIntervalDate } from "common/intervalSelector/selector";
import { resolveIntervalAsync } from "common/intervalSelector/api";

import DateOpString from "common/intervalSelector/intervalStringSelectors/DateOpString";

interface IProps {
  interval: IIntervalDtc;
  handleIntervalChange: (newInterval: IIntervalDtc) => void;
}

class IntervalStringPickerContainer extends Component<IProps> {
  public async componentDidUpdate(prevProps: IProps) {
    const { interval, handleIntervalChange } = this.props;
    if (prevProps.interval.IntervalType !== interval.IntervalType) {
      const resolvedInterval = await resolveIntervalAsync(
        interval.IntervalType,
        interval.offset
      );

      handleIntervalChange(resolvedInterval);
    }
  }

  public render() {
    const { interval } = this.props;
    const intervalStringDate = getIntervalDate(interval);
    if (intervalStringDate == null) {
      return null;
    }

    switch (interval.IntervalType) {
      case IntervalTypes.DATEOP:
        return <DateOpString intervalStringDate={intervalStringDate} />;
      default:
        return null;
    }
  }

  //   private onIntervalStringChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //     this.props.dispatchOnIntervalStringChange({
  //       IntervalType: event.target.value,
  //       offset: 0
  //     });
  //   };
}

export default IntervalStringPickerContainer;
