import { OperatorServiceIds } from "workbench/types";
import { TokenActionTypes, IClearToken } from "app/actions";
import { ErrorActionTypes, ICleanError } from "common/errorBoundary/actions";
import {
  ConfigElementsActionTypes,
  ConfigElementsActions
} from "workbench/configElements/actions";

interface IConfigSwitchState {
  operatorServiceId: OperatorServiceIds;
  elementId: number;
  currentStep: number;
}

const initialState: IConfigSwitchState = {
  operatorServiceId: OperatorServiceIds.NONE,
  elementId: 0,
  currentStep: 0
};

function configSwitch(
  state: IConfigSwitchState = {
    ...initialState
  },
  action: ConfigElementsActions | IClearToken | ICleanError
): IConfigSwitchState {
  switch (action.type) {
    case ConfigElementsActionTypes.CONFIG_OPEN:
      return {
        operatorServiceId: action.operatorServiceId,
        elementId: action.elementId,
        currentStep: 0
      };

    case ConfigElementsActionTypes.GO_TO_STEP:
      return {
        ...state,
        currentStep: action.step
      };

    case ErrorActionTypes.ERROR_CLEAN:
    case TokenActionTypes.TOKEN_REMOVE:
    case ConfigElementsActionTypes.CONFIG_CLOSE:
      return {
        ...initialState
      };

    default:
      return state;
  }
}

export default configSwitch;
