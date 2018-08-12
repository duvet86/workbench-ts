import PropTypes from "prop-types";
import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IntervalAction } from "common/intervalSelector/actions";
import { IInterval, IIntervalTypes } from "common/intervalSelector/types";

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
  error?: object;
  interval: IInterval;
  intervalTypes: IIntervalTypes[];
  isLoading: boolean;
}

type Props = IStateProps & IDispatchProps & IOwnProps;

interface IStoreState {
  intervalReducer: {
    isLoading: boolean;
    intervalTypes: IIntervalTypes;
    interval: IInterval;
  };
}

class IntervalTypeSelectorContainer extends Component<Props> {
  public static propTypes = {
    className: PropTypes.string,
    dispatchIntervalTypesRequest: PropTypes.func.isRequired,
    dispatchOnIntervalTypeChange: PropTypes.func.isRequired,
    error: PropTypes.object,
    interval: PropTypes.object.isRequired,
    intervalTypes: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

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
