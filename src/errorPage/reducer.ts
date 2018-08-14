import { ErrorActionTypes, IErrorAction } from "errorPage/actions";

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
    case ErrorActionTypes.ERROR_TRIGGER:
      return {
        error: action.error
      };

    default:
      return state;
  }
}

export default errorPage;
