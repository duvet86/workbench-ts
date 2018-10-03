import update from "immutability-helper";

import {
  IntervalTypeActionTypes,
  ResolveIntervalActionTypes,
  IntervalTypeAction
} from "common/intervalSelector/actions";

import { IIntervalTypesDtc, IInterval } from "common/intervalSelector/types";

interface IIntervalState {
  isLoading: boolean;
  intervalTypes: IIntervalTypesDtc[];
  interval: IInterval;
  error: any;
}

function interval(
  state: IIntervalState = {
    error: null,
    interval: {
      type: "DATEOP"
    },
    intervalTypes: [],
    isLoading: true
  },
  action: IntervalTypeAction
): IIntervalState {
  switch (action.type) {
    case IntervalTypeActionTypes.INTERVALTYPE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case IntervalTypeActionTypes.INTERVALTYPE_SUCCESS:
      return {
        ...state,
        intervalTypes: action.intervalTypes,
        isLoading: false
      };

    case IntervalTypeActionTypes.INTERVALTYPE_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };

    case ResolveIntervalActionTypes.INTERVAL_UPDATE:
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
