import {
  TokenActionTypes,
  TokenActions,
  QesEnabledAction,
  QesEnabledActionTypes
} from "app/actions";

interface IAppState {
  isLoading: boolean;
  hasToken: boolean;
  isQesEnabled: boolean;
}

const initialState: IAppState = {
  isLoading: false,
  hasToken: false,
  isQesEnabled: false
};

function login(
  state: IAppState = {
    ...initialState
  },
  action: QesEnabledAction | TokenActions
): IAppState {
  switch (action.type) {
    case TokenActionTypes.TOKEN_STORE:
      return {
        ...state,
        hasToken: true
      };

    case TokenActionTypes.TOKEN_REMOVE:
      return {
        ...initialState
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
