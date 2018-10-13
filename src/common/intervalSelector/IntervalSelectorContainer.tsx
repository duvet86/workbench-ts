import React, { ChangeEvent, Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { batchActions } from "redux-batched-actions";
import { Observable, Subscriber } from "rxjs";
import { debounceTime, buffer, share } from "rxjs/operators";

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
  private nextIntevalClick$: Observable<number>;
  private handleNextIntevalClick?: (offset: number) => () => void;

  constructor(props: Props) {
    super(props);

    this.nextIntevalClick$ = Observable.create(
      (observer: Subscriber<number>) => {
        this.handleNextIntevalClick = (offset: number) => () => {
          observer.next(offset);
        };
      }
    ).pipe(share());

    this.state = {
      intervalTypes: [],
      intervalType: props.initValue && props.initValue.IntervalType,
      interval: props.initValue
    };
  }

  public async componentDidMount() {
    const { initValue, onChange, dispatchHandleException } = this.props;

    const debounced = this.nextIntevalClick$.pipe(debounceTime(250));

    this.nextIntevalClick$.pipe(buffer(debounced)).subscribe(async offset => {
      try {
        const { interval } = this.state;
        if (interval == null || interval.IntervalString == null) {
          return;
        }

        const { IntervalType, IntervalString } = interval;
        const nextInterval = await getNextIntervalAsync(
          IntervalType,
          IntervalString,
          offset.reduce((acc, current) => acc + current, 0)
        );

        this.setState({
          interval: {
            ...nextInterval
          }
        });
      } catch (e) {
        this.props.dispatchHandleException(e);
      }
    });

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

    const isLoading =
      interval == null ||
      intervalType == null ||
      this.handleNextIntevalClick == null;

    return (
      <LoadingContainer isLoading={isLoading}>
        {!isLoading && (
          <IntervalSelector
            intervalTypes={intervalTypes}
            initIntervalType={intervalType!}
            interval={interval!}
            handleIntervalTypeChange={this.handleIntervalTypeChange}
            handleNextIntevalClick={this.handleNextIntevalClick!}
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
