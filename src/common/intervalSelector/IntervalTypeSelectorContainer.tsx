import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IntervalAction } from "common/intervalSelector/actions";
import { IInterval, IIntervalTypesDtc } from "common/intervalSelector/types";

import {
  intervalTypesRequest,
  intervalUpdate
} from "common/intervalSelector/actions";

import IntervalTypeSelector from "common/intervalSelector/IntervalTypeSelector";

interface IOwnProps {
  className?: string;
}

interface IDispatchProps {
  dispatchIntervalTypesRequest: () => void;
  dispatchOnIntervalTypeChange: (newInterval: IInterval) => void;
}

interface IStateProps {
  error?: any;
  interval: IInterval;
  intervalTypes: IIntervalTypesDtc[];
  isLoading: boolean;
}

type Props = IStateProps & IDispatchProps & IOwnProps;

interface IStoreState {
  intervalReducer: {
    isLoading: boolean;
    intervalTypes: IIntervalTypesDtc;
    interval: IInterval;
  };
}

class IntervalTypeSelectorContainer extends Component<Props> {
  public componentDidMount() {
    this.props.dispatchIntervalTypesRequest();
  }

  public render() {
    const { className, interval, intervalTypes } = this.props;

    return (
      <IntervalTypeSelector
        className={className}
        interval={interval}
        intervalTypes={intervalTypes}
        onChange={this.onIntervalTypeChange}
      />
    );
  }

  private onIntervalTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.props.dispatchOnIntervalTypeChange({ type: event.target.value });
  };
}

const mapStateToProps = ({
  intervalReducer: { isLoading, intervalTypes, interval }
}: IStoreState) => ({
  interval,
  intervalTypes,
  isLoading
});

const mapDispatchToProps = (dispatch: Dispatch<IntervalAction>) => ({
  dispatchIntervalTypesRequest() {
    dispatch(intervalTypesRequest());
  },
  dispatchOnIntervalTypeChange(newInterval: IInterval) {
    dispatch(intervalUpdate(newInterval));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntervalTypeSelectorContainer);
