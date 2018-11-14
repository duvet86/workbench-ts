import { QesEnabledAction, QesEnabledActionTypes } from "app/actions";

interface IAppState {
  isLoading: boolean;
  isUserAuthenticated: boolean;
  isQesEnabled: boolean;
}

function login(
  state: IAppState = {
    isLoading: true,
    isUserAuthenticated: false,
    isQesEnabled: false
  },
  action: QesEnabledAction
): IAppState {
  switch (action.type) {
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
