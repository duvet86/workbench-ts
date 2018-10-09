import React, { ChangeEvent, Component } from "react";

import { IIntervalDtc, IIntervalTypesDtc } from "common/intervalSelector/types";
import { initIntervalAsync } from "common/intervalSelector/api";
import { getDefaultInterval } from "common/intervalSelector/utils";

import LoadingContainer from "common/loading/LoadingContainer";
import IntervalSelector from "common/intervalSelector/IntervalSelector";

interface IProps {
  initValue?: IIntervalDtc;
  onChange: (newInterval: IIntervalDtc) => void;
}

interface IState {
  intervalTypes: IIntervalTypesDtc[];
  interval?: IIntervalDtc;
}

class IntervalSelectorContainer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      intervalTypes: [],
      interval: props.initValue
    };
  }

  public async componentDidMount() {
    const { initValue, onChange } = this.props;
    const { intervalTypes, interval } = await initIntervalAsync(
      initValue || getDefaultInterval()
    );

    this.setState({
      intervalTypes,
      interval
    });

    if (
      initValue == null ||
      (initValue &&
        initValue.IntervalType === interval.IntervalType &&
        initValue.IntervalString === interval.IntervalString)
    ) {
      onChange(interval);
    }
  }

  public render() {
    const { interval, intervalTypes } = this.state;

    return (
      <LoadingContainer isLoading={interval == null}>
        {interval != null && (
          <IntervalSelector
            intervalTypes={intervalTypes}
            interval={interval}
            handleIntervalTypeChange={this.handleIntervalTypeChange}
            handleIntervalChange={this.handleIntervalChange}
          />
        )}
      </LoadingContainer>
    );
  }

  private handleIntervalTypeChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const { interval } = this.state;
    if (interval == null) {
      return;
    }

    this.setState({
      interval: {
        ...interval,
        IntervalType: event.target.value
      }
    });
  };

  private handleIntervalChange = (newInterval: IIntervalDtc) => {
    // tslint:disable-next-line:no-console
    console.log(newInterval);
  };
}

export default IntervalSelectorContainer;
