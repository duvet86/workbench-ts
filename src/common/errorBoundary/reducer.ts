import {
  ErrorActionTypes,
  ITriggerErrorAction,
  ICleanErrorAction
} from "common/errorBoundary/actions";

interface IErrorState {
  error: Error | undefined;
}

function error(
  state: IErrorState = {
    error: undefined
  },
  action: ITriggerErrorAction | ICleanErrorAction
): IErrorState {
  switch (action.type) {
    case ErrorActionTypes.ERROR_TRIGGER:
      return {
        error: action.error
      };

    case ErrorActionTypes.ERROR_CLEAN:
      return {
        error: undefined
      };

    default:
      return state;
  }
}

export default error;
