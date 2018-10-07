import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { IntervalAction } from "common/intervalSelector/actions";
import { IIntervalDtc } from "common/intervalSelector/types";
import {
  initIntervalRequest,
  intervalUpdate
} from "common/intervalSelector/actions";
import { getInterval } from "common/intervalSelector/selector";

import LoadingContainer from "common/loading/LoadingContainer";
import IntervalSelector from "common/intervalSelector/IntervalSelector";

interface IOwnProps {
  value: IIntervalDtc;
  onChange: (newInterval: IIntervalDtc) => void;
}

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IOwnProps;

class IntervalSelectorContainer extends Component<Props> {
  public componentDidMount() {
    this.props.dispatchInitIntervalRequest(this.props.value);
  }

  public render() {
    const { interval, intervalTypes, isLoading } = this.props;

    return (
      <LoadingContainer isLoading={isLoading}>
        {interval && (
          <IntervalSelector
            interval={interval}
            intervalTypes={intervalTypes}
            onChange={this.handleIntervalChange}
          />
        )}
      </LoadingContainer>
    );
  }

  private handleIntervalChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { interval, dispatchIntervalUpdateChange, onChange } = this.props;
    if (interval == null) {
      return;
    }
    const newInterval = {
      IntervalType: event.target.value,
      IntervalString: interval.IntervalString,
      offset: interval.offset
    };
    dispatchIntervalUpdateChange(newInterval);
    onChange(newInterval);
  };
}

const mapStateToProps = (state: RootState) => ({
  isLoading: state.intervalReducer.isLoading,
  intervalTypes: state.intervalReducer.intervalTypes,
  interval: getInterval(state)
});

const mapDispatchToProps = (dispatch: Dispatch<IntervalAction>) => ({
  dispatchInitIntervalRequest(initInterval: IIntervalDtc) {
    dispatch(initIntervalRequest(initInterval));
  },
  dispatchIntervalUpdateChange(newInterval: IIntervalDtc) {
    dispatch(intervalUpdate(newInterval));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntervalSelectorContainer);
