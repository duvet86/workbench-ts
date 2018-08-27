import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { IntervalAction } from "common/intervalSelector/actions";
import { IInterval } from "common/intervalSelector/types";
import {
  intervalTypesRequest,
  intervalUpdate
} from "common/intervalSelector/actions";

import IntervalTypeSelector from "common/intervalSelector/IntervalTypeSelector";

interface IOwnProps {
  className?: string;
}

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  IOwnProps;

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
}: RootState) => ({
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
