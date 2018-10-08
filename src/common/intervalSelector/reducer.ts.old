import {
  IntervalActionTypes,
  IntervalAction
} from "common/intervalSelector/actions";

import { IIntervalTypesDtc, IIntervalDtc } from "common/intervalSelector/types";

interface IIntervalState {
  isLoading: boolean;
  intervalTypes: IIntervalTypesDtc[];
  interval?: IIntervalDtc;
  error: any;
}

function interval(
  state: IIntervalState = {
    isLoading: true,
    interval: undefined,
    intervalTypes: [],
    error: undefined
  },
  action: IntervalAction
): IIntervalState {
  switch (action.type) {
    case IntervalActionTypes.INIT_INTERVAL_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case IntervalActionTypes.INIT_INTERVAL_SUCCESS:
      return {
        ...state,
        intervalTypes: action.intervalTypes,
        interval: action.interval,
        isLoading: false
      };

    case IntervalActionTypes.INIT_INTERVAL_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };

    case IntervalActionTypes.RESOLVE_INTERVAL_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case IntervalActionTypes.RESOLVE_INTERVAL_SUCCESS:
      return {
        ...state,
        interval: action.interval,
        isLoading: false
      };

    case IntervalActionTypes.RESOLVE_INTERVAL_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };

    case IntervalActionTypes.INTERVAL_UPDATE:
      return {
        ...state,
        interval: {
          ...state.interval,
          ...action.newInterval
        }
      };

    default:
      return state;
  }
}

export default interval;
