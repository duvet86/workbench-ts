import update from "immutability-helper";

import {
  IntervalActionTypes,
  IntervalAction
} from "common/intervalSelector/actions";

import { IIntervalTypesDtc, IIntervalDtc } from "common/intervalSelector/types";

interface IIntervalState {
  isLoading: boolean;
  intervalTypes: IIntervalTypesDtc[];
  interval: IIntervalDtc;
  error: any;
}

function interval(
  state: IIntervalState = {
    error: null,
    interval: {
      IntervalType: "DATEOP",
      offset: 0
    },
    intervalTypes: [],
    isLoading: true
  },
  action: IntervalAction
): IIntervalState {
  switch (action.type) {
    case IntervalActionTypes.INTERVALTYPE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case IntervalActionTypes.INTERVALTYPE_SUCCESS:
      return {
        ...state,
        intervalTypes: action.intervalTypes,
        isLoading: false
      };

    case IntervalActionTypes.INTERVALTYPE_ERROR:
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
      return update(state, {
        interval: {
          $merge: {
            ...action.newInterval
          }
        }
      });

    default:
      return state;
  }
}

export default interval;
