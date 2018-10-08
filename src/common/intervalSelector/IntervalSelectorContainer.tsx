import React, { ChangeEvent, Component } from "react";

import { IIntervalDtc, IIntervalTypesDtc } from "common/intervalSelector/types";
import { getIntervalDate } from "common/intervalSelector/selector";
import { initIntervalAsync } from "common/intervalSelector/api";

import LoadingContainer from "common/loading/LoadingContainer";
import IntervalSelector from "common/intervalSelector/IntervalSelector";
import { async } from "rxjs/internal/scheduler/async";

interface IProps {
  value?: IIntervalDtc;
  onChange: (newInterval: IIntervalDtc) => void;
}

interface IState {
  isComponentLoading: boolean;
  isIntervalStringLoading: boolean;
  intervalTypes: IIntervalTypesDtc[];
  intervalStringDate?: string;
  interval?: IIntervalDtc;
}

class IntervalSelectorContainer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isComponentLoading: true,
      isIntervalStringLoading: false,
      intervalTypes: [],
      interval: props.value
    };
  }

  public async componentDidMount() {
    const { intervalTypes, interval } = await initIntervalAsync(
      this.props.value
    );
    this.setState({
      isComponentLoading: false,
      intervalTypes,
      interval
    });
    if (interval != null) {
      this.props.onChange(interval);
    }
  }

  public render() {
    const { interval, intervalTypes, isComponentLoading } = this.state;
    const intervalDate = getIntervalDate(interval);

    return (
      <LoadingContainer isLoading={isComponentLoading}>
        {intervalDate && (
          <IntervalSelector
            interval={intervalDate}
            intervalTypes={intervalTypes}
            onChange={this.handleIntervalChange}
          />
        )}
      </LoadingContainer>
    );
  }

  private handleIntervalChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({
      isIntervalStringLoading: true
    });
    const { interval } = this.state;
    if (interval == null) {
      return;
    }

    let intervalStringDate;
    switch (interval.IntervalType) {
      default:
        intervalStringDate = "";
    }

    const newInterval = {
      IntervalType: event.target.value,
      IntervalString: interval.IntervalString,
      offset: interval.offset
    };
    this.setState({
      isIntervalStringLoading: false,
      intervalStringDate,
      interval: newInterval
    });
    this.props.onChange(newInterval);
  };
}

export default IntervalSelectorContainer;
