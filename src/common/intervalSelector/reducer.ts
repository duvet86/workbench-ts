import update from "immutability-helper";

import {
  INTERVAL_UPDATE,
  IntervalAction,
  INTERVALTYPE_ERROR,
  INTERVALTYPE_REQUEST,
  INTERVALTYPE_SUCCESS
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
    case INTERVALTYPE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case INTERVALTYPE_SUCCESS:
      return {
        ...state,
        intervalTypes: action.intervalTypes,
        isLoading: false
      };

    case INTERVALTYPE_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };

    case INTERVAL_UPDATE:
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
