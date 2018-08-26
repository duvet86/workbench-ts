import { LoginActionTypes, LoginAction } from "login/actions";

interface ILoginState {
  isLoading: boolean;
  error: any;
}

function login(
  state: ILoginState = {
    isLoading: false,
    error: undefined
  },
  action: LoginAction
): ILoginState {
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
