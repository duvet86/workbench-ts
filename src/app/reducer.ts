import { QesEnabledAction, QesEnabledActionTypes } from "app/actions";

interface IAppState {
  isLoading: boolean;
  isQesEnabled: boolean;
}

function login(
  state: IAppState = {
    isLoading: true,
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
        isLoading: false,
        isQesEnabled: action.isQesEnabled
      };

    default:
      return state;
  }
}

export default login;
