import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LoginAction
} from "login/actions";

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
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false
      };

    case LOGIN_ERROR:
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
