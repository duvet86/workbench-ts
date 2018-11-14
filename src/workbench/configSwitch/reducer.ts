import { ElementType } from "sidebar/operators/operatorsData";
import { TokenActionTypes, IClearToken } from "app/actions";
import {
  QueryConfigActionTypes,
  QueryConfigAction
} from "workbench/query/actions";

interface IConfigSwitchState {
  elementType: ElementType;
}

function configSwitch(
  state: IConfigSwitchState = {
    elementType: ElementType.NONE
  },
  action: QueryConfigAction | IClearToken
): IConfigSwitchState {
  switch (action.type) {
    case QueryConfigActionTypes.QUERY_CONFIG_OPEN:
      return {
        elementType: ElementType.QUERY
      };

    case TokenActionTypes.TOKEN_REMOVE:
    case QueryConfigActionTypes.QUERY_CONFIG_ERROR:
    case QueryConfigActionTypes.QUERY_CONFIG_CLOSE:
      return {
        elementType: ElementType.NONE
      };

    default:
      return state;
  }
}

export default configSwitch;
