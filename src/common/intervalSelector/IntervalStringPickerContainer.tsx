import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { IntervalAction } from "common/intervalSelector/actions";
import { IIntervalDtc } from "common/intervalSelector/types";
import {
  intervalTypesRequest,
  intervalUpdate
} from "common/intervalSelector/actions";
import { getIntervalDate } from "common/intervalSelector/selector";

import IntervalStringPicker from "common/intervalSelector/IntervalStringPicker";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

class IntervalStringPickerContainer extends Component<Props> {
  public componentDidMount() {
    this.props.dispatchIntervalTypesRequest();
  }

  public render() {
    const { isLoading, interval } = this.props;

    return (
      <IntervalStringPicker isLoading={isLoading} intervalDate={interval} />
    );
  }

  private onIntervalStringChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.props.dispatchOnIntervalStringChange({
      IntervalType: event.target.value,
      offset: 0
    });
  };
}

const mapStateToProps = (state: RootState) => ({
  intervalDate: getIntervalDate(state),
  isLoading:
    state.intervalReducer.isLoading ||
    state.intervalReducer.interval.IntervalString == null
});

const mapDispatchToProps = (dispatch: Dispatch<IntervalAction>) => ({
  dispatchIntervalTypesRequest() {
    dispatch(intervalTypesRequest());
  },
  dispatchOnIntervalStringChange(newInterval: IIntervalDtc) {
    dispatch(intervalUpdate(newInterval));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntervalStringPickerContainer);