import {
  OperatorsActionTypes,
  OperatorsAction
} from "sidebar/operators/actions";

import { IOperatorResult } from "sidebar/operators/types";

interface IState {
  isLoading: boolean;
  operators?: { [key: string]: IOperatorResult };
}

function operators(
  state: IState = {
    isLoading: true,
    operators: undefined
  },
  action: OperatorsAction
) {
  switch (action.type) {
    case OperatorsActionTypes.OPERATORS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case OperatorsActionTypes.OPERATORS_SUCCESS:
      return {
        isLoading: false,
        operators: action.operators
      };

    default:
      return state;
  }
}

export default operators;
