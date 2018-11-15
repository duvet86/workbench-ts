import {
  ErrorActionTypes,
  ITriggerError,
  ICleanError
} from "common/errorBoundary/actions";

interface IErrorState {
  error: any;
}

function error(
  state: IErrorState = {
    error: undefined
  },
  action: ITriggerError | ICleanError
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
