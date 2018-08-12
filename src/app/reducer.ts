import {
  AppAction,
  QES_ENABLED_REQUEST,
  QES_ENABLED_SUCCESS
} from "app/actions";

interface IState {
  isLoading: boolean;
  isQesEnabled: boolean;
}

function login(
  state: IState = {
    isLoading: true,
    isQesEnabled: false
  },
  action: AppAction
) {
  switch (action.type) {
    case QES_ENABLED_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case QES_ENABLED_SUCCESS:
      return {
        isLoading: false,
        isQesEnabled: action.isQesEnabled
      };

    default:
      return state;
  }
}

export default login;
