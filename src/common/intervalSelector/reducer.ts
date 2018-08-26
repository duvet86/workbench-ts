import update from "immutability-helper";

import {
  IntervalActionTypes,
  IntervalAction
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
