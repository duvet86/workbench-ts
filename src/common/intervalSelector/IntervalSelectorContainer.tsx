import React, { ChangeEvent, Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { batchActions } from "redux-batched-actions";

import { IIntervalDtc, IIntervalTypesDtc } from "common/intervalSelector/types";
import {
  initIntervalAsync,
  resolveIntervalAsync,
  getNextIntervalAsync
} from "common/intervalSelector/api";
import { getDefaultInterval } from "common/intervalSelector/utils";
import {
  ErrorActions,
  IErrorResponse,
  handleException
} from "errorPage/actions";

import LoadingContainer from "common/loading/LoadingContainer";
import IntervalSelector from "common/intervalSelector/IntervalSelector";

interface IOwnProps {
  initValue?: IIntervalDtc;
  onChange: (newInterval: IIntervalDtc) => void;
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

interface IState {
  intervalTypes: IIntervalTypesDtc[];
  intervalType?: string;
  interval?: IIntervalDtc;
}

class IntervalSelectorContainer extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      intervalTypes: [],
      intervalType: props.initValue && props.initValue.IntervalType,
      interval: props.initValue
    };
  }

  public async componentDidMount() {
    const { initValue, onChange, dispatchHandleException } = this.props;

    try {
      const { intervalTypes, interval } = await initIntervalAsync(
        initValue || getDefaultInterval()
      );

      this.setState({
        intervalTypes,
        intervalType: interval.IntervalType,
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
    } catch (e) {
      dispatchHandleException(e);
    }
  }

  public render() {
    const { intervalType, interval, intervalTypes } = this.state;

    return (
      <LoadingContainer isLoading={interval == null || intervalType == null}>
        {interval != null &&
          intervalType != null && (
            <IntervalSelector
              intervalTypes={intervalTypes}
              initIntervalType={intervalType}
              interval={interval}
              handleIntervalTypeChange={this.handleIntervalTypeChange}
              handleNextIntevalClick={this.handleNextIntevalClick}
            />
          )}
      </LoadingContainer>
    );
  }

  private handleIntervalTypeChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const resolvedInterval = await resolveIntervalAsync(event.target.value);

      this.setState({
        intervalType: event.target.value,
        interval: {
          ...resolvedInterval
        }
      });
    } catch (e) {
      this.props.dispatchHandleException(e);
    }
  };

  private handleNextIntevalClick = (offset: number) => async () => {
    try {
      const { interval } = this.state;
      if (interval == null || interval.IntervalString == null) {
        return;
      }

      const { IntervalType, IntervalString } = interval;
      const nextInterval = await getNextIntervalAsync(
        IntervalType,
        IntervalString,
        offset
      );

      this.setState({
        interval: {
          ...nextInterval
        }
      });
    } catch (e) {
      this.props.dispatchHandleException(e);
    }
  };
}

const mapDispatchToProps = (dispatch: Dispatch<ErrorActions>) => ({
  dispatchHandleException: (resp: IErrorResponse) => {
    dispatch(batchActions(handleException(resp)));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(IntervalSelectorContainer);
