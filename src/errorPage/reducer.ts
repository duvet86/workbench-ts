import { ERROR_TRIGGER, IErrorAction } from "errorPage/actions";

interface IState {
  error?: any;
}

function errorPage(
  state: IState = {
    error: undefined
  },
  action: IErrorAction
) {
  switch (action.type) {
    case ERROR_TRIGGER:
      return {
        error: action.error
      };

    default:
      return state;
  }
}

export default errorPage;
