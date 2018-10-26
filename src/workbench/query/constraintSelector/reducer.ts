import {
  AllowedValuesActions,
  AllowedValuesTypes
} from "workbench/query/constraintSelector/actions";
import { IAllowedValueDtc } from "workbench/query/types";

interface IAllowedValueState {
  isLoading: boolean;
  allowedValues: IAllowedValueDtc[];
}

function queryConfig(
  state: IAllowedValueState = {
    isLoading: false,
    allowedValues: []
  },
  action: AllowedValuesActions
): IAllowedValueState {
  switch (action.type) {
    case AllowedValuesTypes.ALLOWED_VALUES_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case AllowedValuesTypes.ALLOWED_VALUES_SUCCESS:
      return {
        allowedValues: action.allowedValues,
        isLoading: false
      };

    default:
      return state;
  }
}

export default queryConfig;