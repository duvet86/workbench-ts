import React, { ChangeEvent, Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { batchActions } from "redux-batched-actions";

import { IIntervalDtc, IIntervalTypesDtc } from "common/intervalSelector/types";
import { initIntervalAsync } from "common/intervalSelector/api";
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
  interval?: IIntervalDtc;
}

class IntervalSelectorContainer extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      intervalTypes: [],
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

const mapDispatchToProps = (dispatch: Dispatch<ErrorActions>) => ({
  dispatchHandleException: (resp: IErrorResponse) => {
    dispatch(batchActions(handleException(resp)));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(IntervalSelectorContainer);
