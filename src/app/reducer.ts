import { QesEnabledAction, QesEnabledActionTypes } from "app/actions";

interface IState {
  isLoading: boolean;
  isQesEnabled: boolean;
}

function login(
  state: IState = {
    isLoading: true,
    isQesEnabled: false
  },
  action: QesEnabledAction
) {
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
