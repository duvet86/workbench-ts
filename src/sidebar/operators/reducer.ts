import {
  OperatorsActionTypes,
  OperatorsAction
} from "sidebar/operators/actions";

import { IOperatorResult } from "sidebar/operators/types";

interface IOperatorsState {
  isLoading: boolean;
  operators: { [key: string]: IOperatorResult };
}

function operators(
  state: IOperatorsState = {
    isLoading: true,
    operators: {}
  },
  action: OperatorsAction
): IOperatorsState {
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
