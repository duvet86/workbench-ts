import { LoginActionTypes, LoginAction } from "login/actions";

interface IState {
  isLoading: boolean;
  error: any;
}

function login(
  state: IState = {
    isLoading: false,
    error: null
  },
  action: LoginAction
) {
  switch (action.type) {
    case LoginActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case LoginActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    case LoginActionTypes.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
}

export default login;
