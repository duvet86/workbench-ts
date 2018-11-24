import { OperatorServiceIds } from "workbench/types";
import { TokenActionTypes, IClearToken } from "app/actions";
import { ErrorActionTypes, ICleanError } from "common/errorBoundary/actions";
import {
  QueryConfigActionTypes,
  QueryConfigAction
} from "workbench/query/config/actions";

interface IConfigSwitchState {
  operatorServiceId: OperatorServiceIds;
}

function configSwitch(
  state: IConfigSwitchState = {
    operatorServiceId: OperatorServiceIds.NONE
  },
  action: QueryConfigAction | IClearToken | ICleanError
): IConfigSwitchState {
  switch (action.type) {
    case QueryConfigActionTypes.QUERY_CONFIG_OPEN:
      return {
        operatorServiceId: OperatorServiceIds.QUERY
      };

    case ErrorActionTypes.ERROR_CLEAN:
    case TokenActionTypes.TOKEN_REMOVE:
    case QueryConfigActionTypes.QUERY_CONFIG_CLOSE:
      return {
        operatorServiceId: OperatorServiceIds.NONE
      };

    default:
      return state;
  }
}

export default configSwitch;
