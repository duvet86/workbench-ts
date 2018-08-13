import { ElementType } from "sideBar/operators/operatorsData";
import { LOGOUT, ILogout } from "login/actions";
import {
  QUERY_CONFIG_OPEN,
  QUERY_CONFIG_CLOSE,
  QUERY_CONFIG_ERROR,
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
    case QUERY_CONFIG_OPEN:
      return {
        elementType: ElementType.QUERY
      };

    case LOGOUT:
    case QUERY_CONFIG_ERROR:
    case QUERY_CONFIG_CLOSE:
      return {
        elementType: ElementType.NONE
      };

    default:
      return state;
  }
}

export default configSwitch;
