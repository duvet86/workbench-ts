import React, { FC, useState, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
// import { Observable, Subscriber, Subscription } from "rxjs";
// import { debounceTime, buffer, share } from "rxjs/operators";

import { IIntervalDtc, IIntervalTypesDtc } from "common/interval/types";
import {
  initIntervalAsync,
  resolveIntervalAsync,
  getNextIntervalAsync
} from "common/interval/api";
import { getDefaultInterval } from "common/interval/utils";
import {
  ErrorActions,
  IErrorResponse,
  handleException
} from "common/errorBoundary/actions";

import LoadingContainer from "common/loading/LoadingContainer";
import IntervalSelector from "common/interval/IntervalSelector";

interface IOwnProps {
  initValue?: IIntervalDtc;
  onChange: (newInterval: IIntervalDtc) => void;
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

// interface IState {
//   intervalTypes: { [key: string]: IIntervalTypesDtc };
//   intervalType?: string;
//   interval?: IIntervalDtc;
// }

const IntervalSelectorContainer: FC<Props> = ({
  initValue,
  onChange,
  dispatchHandleException
}) => {
  const [interval, setInterval] = useState<IIntervalDtc | undefined>(initValue);
  // const [intervalType, setIntervalType] = useState<string | undefined>(
  //   initValue && initValue.IntervalType
  // );
  const [intervalTypes, setIntervalTypes] = useState<{
    [key: string]: IIntervalTypesDtc;
  }>({});

  useEffect(() => {
    initIntervalAsync(initValue || getDefaultInterval())
      .then(({ interval: newInterval, intervalTypes: newIntervalTypes }) => {
        setInterval(newInterval);
        setIntervalTypes(newIntervalTypes);

        if (
          initValue == null ||
          (initValue &&
            initValue.IntervalType === newInterval.IntervalType &&
            initValue.IntervalString === newInterval.IntervalString)
        ) {
          onChange(newInterval);
        }
      })
      .catch(e => dispatchHandleException(e));
  }, [dispatchHandleException, initValue, onChange]);

  const handleIntervalTypeChange = async (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    try {
      const resolvedInterval = await resolveIntervalAsync(
        event.target.value as string
      );

      setInterval(resolvedInterval);
    } catch (e) {
      dispatchHandleException(e);
    }
  };

  const handleIntervalStringChange = (intervalString: string) => {
    setInterval(prevInterval => {
      if (prevInterval == null) {
        return prevInterval;
      }

      return {
        ...prevInterval,
        IntervalString: intervalString
      };
    });
  };

  const handleSmartKeyChange = async (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    try {
      if (interval == null) {
        return;
      }

      const resolvedInterval = await resolveIntervalAsync(
        interval.IntervalType,
        0,
        event.target.value as string
      );

      setInterval(resolvedInterval);
    } catch (e) {
      dispatchHandleException(e);
    }
  };

  const handleNextIntevalClick = (offset: number) => async () => {
    try {
      if (interval == null || interval.IntervalString == null) {
        return;
      }

      const { IntervalType, IntervalString } = interval;
      const nextInterval = await getNextIntervalAsync(
        IntervalType,
        IntervalString,
        offset
      );

      setInterval(nextInterval);
    } catch (e) {
      dispatchHandleException(e);
    }
  };

  const isLoading = interval == null;

  return (
    <LoadingContainer isLoading={isLoading}>
      {interval != null && (
        <IntervalSelector
          intervalTypes={intervalTypes}
          interval={interval}
          onIntervalTypeChange={handleIntervalTypeChange}
          onIntervalStringChange={handleIntervalStringChange}
          onSmartKeyChange={handleSmartKeyChange}
          onNextIntevalClick={handleNextIntevalClick}
        />
      )}
    </LoadingContainer>
  );
};

// class IntervalSelectorContainer extends Component<Props, IState> {
//   private nextIntevalClick$: Observable<number>;
//   private handleNextIntevalClick?: (offset: number) => () => void;
//   private clickSubscription?: Subscription;

//   constructor(props: Props) {
//     super(props);

//     this.nextIntevalClick$ = Observable.create(
//       (observer: Subscriber<number>) => {
//         this.handleNextIntevalClick = (offset: number) => () => {
//           observer.next(offset);
//         };
//       }
//     ).pipe(share());

//     this.state = {
//       intervalTypes: {},
//       intervalType: props.initValue && props.initValue.IntervalType,
//       interval: props.initValue
//     };
//   }

//   public async componentDidMount() {
//     const { initValue, onChange, dispatchHandleException } = this.props;

//     // Debouncing the next and previous button clicks.
//     const debounced = this.nextIntevalClick$.pipe(debounceTime(250));
//     this.clickSubscription = this.nextIntevalClick$
//       .pipe(buffer(debounced))
//       .subscribe(offset => {
//         this.debounceNextIntervalAsync(offset);
//       });

//     try {
//       const { intervalTypes, interval } = await initIntervalAsync(
//         initValue || getDefaultInterval()
//       );

//       this.setState({
//         intervalTypes,
//         intervalType: interval.IntervalType,
//         interval
//       });

//       if (
//         initValue == null ||
//         (initValue &&
//           initValue.IntervalType === interval.IntervalType &&
//           initValue.IntervalString === interval.IntervalString)
//       ) {
//         onChange(interval);
//       }
//     } catch (e) {
//       dispatchHandleException(e);
//     }
//   }

//   public componentWillUnmount() {
//     if (this.clickSubscription != null) {
//       this.clickSubscription.unsubscribe();
//     }
//   }

//   public render() {
//     if (this.handleNextIntevalClick == null) {
//       return null;
//     }

//     const { intervalType, interval, intervalTypes } = this.state;
//     const isLoading = interval == null || intervalType == null;

//     return (
//       <LoadingContainer isLoading={isLoading}>
//         {interval != null && intervalType != null && (
//           <IntervalSelector
//             intervalTypes={intervalTypes}
//             initIntervalType={intervalType}
//             interval={interval}
//             onIntervalTypeChange={this.handleIntervalTypeChange}
//             onIntervalStringChange={this.handleIntervalStringChange}
//             onSmartKeyChange={this.handleSmartKeyChange}
//             onNextIntevalClick={this.handleNextIntevalClick}
//           />
//         )}
//       </LoadingContainer>
//     );
//   }

//   private handleIntervalTypeChange = async (
//     event: ChangeEvent<{ name?: string; value: unknown }>
//   ) => {
//     try {
//       const resolvedInterval = await resolveIntervalAsync(event.target
//         .value as string);

//       this.setState({
//         intervalType: event.target.value as string,
//         interval: {
//           ...resolvedInterval
//         }
//       });
//     } catch (e) {
//       this.props.dispatchHandleException(e);
//     }
//   };

//   private handleIntervalStringChange = (intervalString: string) => {
//     this.setState((prevState: IState) => {
//       if (prevState.interval != null) {
//         return {
//           ...prevState,
//           interval: {
//             ...prevState.interval,
//             IntervalString: intervalString
//           }
//         };
//       }
//       return prevState;
//     });
//   };

//   private handleSmartKeyChange = async (
//     event: ChangeEvent<{ name?: string; value: unknown }>
//   ) => {
//     try {
//       const { interval } = this.state;
//       if (interval == null) {
//         return;
//       }
//       const resolvedInterval = await resolveIntervalAsync(
//         interval.IntervalType,
//         0,
//         event.target.value as string
//       );

//       this.setState({
//         interval: {
//           ...resolvedInterval,
//           smartIntervalKey: event.target.value as string
//         }
//       });
//     } catch (e) {
//       this.props.dispatchHandleException(e);
//     }
//   };

//   private debounceNextIntervalAsync = async (offset: number[]) => {
//     try {
//       const { interval } = this.state;
//       if (interval == null || interval.IntervalString == null) {
//         return;
//       }

//       const { IntervalType, IntervalString } = interval;
//       const nextInterval = await getNextIntervalAsync(
//         IntervalType,
//         IntervalString,
//         offset.reduce((acc, current) => acc + current, 0)
//       );

//       this.setState({
//         interval: {
//           ...nextInterval
//         }
//       });
//     } catch (e) {
//       this.props.dispatchHandleException(e);
//     }
//   };
// }

const mapDispatchToProps = (dispatch: Dispatch<ErrorActions>) => ({
  dispatchHandleException: (resp: IErrorResponse) => {
    dispatch(handleException(resp));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(IntervalSelectorContainer);
