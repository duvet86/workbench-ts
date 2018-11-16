import {
  TokenActionTypes,
  TokenActions,
  QesEnabledAction,
  QesEnabledActionTypes
} from "app/actions";

interface IAppState {
  isLoading: boolean;
  forceLogout: boolean;
  isQesEnabled: boolean;
}

function login(
  state: IAppState = {
    isLoading: false,
    forceLogout: false,
    isQesEnabled: false
  },
  action: QesEnabledAction | TokenActions
): IAppState {
  switch (action.type) {
    case TokenActionTypes.TOKEN_REMOVE:
      return {
        ...state,
        forceLogout: true
      };

    case TokenActionTypes.TOKEN_STORE:
      return {
        ...state,
        forceLogout: false
      };

    case QesEnabledActionTypes.QES_ENABLED_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case QesEnabledActionTypes.QES_ENABLED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isQesEnabled: action.isQesEnabled
      };

    default:
      return state;
  }
}

export default login;
