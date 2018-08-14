import { ElementType } from "sideBar/operators/operatorsData";
import { LoginActionTypes, ILogout } from "login/actions";
import {
  QueryConfigActionTypes,
  QueryConfigAction
} from "workbench/query/actions";

interface IState {
  elementType: ElementType;
}

function configSwitch(
  state: IState = {
    elementType: ElementType.NONE
  },
  action: QueryConfigAction | ILogout
) {
  switch (action.type) {
    case QueryConfigActionTypes.QUERY_CONFIG_OPEN:
      return {
        elementType: ElementType.QUERY
      };

    case LoginActionTypes.LOGOUT:
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
