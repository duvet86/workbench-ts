import { ErrorActionTypes, IErrorAction } from "errorPage/actions";

interface IErrorState {
  error: any;
}

function errorPage(
  state: IErrorState = {
    error: undefined
  },
  action: IErrorAction
): IErrorState {
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
