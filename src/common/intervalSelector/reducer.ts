import update from "immutability-helper";

import {
  IntervalActionTypes,
  IntervalAction
} from "common/intervalSelector/actions";

import { IIntervalTypes } from "common/intervalSelector/types";

interface IState {
  error: any;
  isLoading: boolean;
  intervalTypes: IIntervalTypes[];
  interval: {
    type: string;
  };
}

function interval(
  state: IState = {
    error: null,
    interval: {
      type: "DATEOP"
    },
    intervalTypes: [],
    isLoading: true
  },
  action: IntervalAction
) {
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
