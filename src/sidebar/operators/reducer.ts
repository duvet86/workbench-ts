import {
  IOperatorResult,
  OPERATORS_REQUEST,
  OPERATORS_SUCCESS,
  OperatorsAction
} from "sideBar/operators/actions";

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
    case OPERATORS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case OPERATORS_SUCCESS:
      return {
        isLoading: false,
        operators: action.operators
      };

    default:
      return state;
  }
}

export default operators;
