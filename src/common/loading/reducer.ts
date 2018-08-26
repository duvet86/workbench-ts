import { DelayActionTypes, LoadingAction } from "common/loading/actions";

interface ILoadingState {
  pastDelay: boolean;
}

function loading(
  state: ILoadingState = {
    pastDelay: false
  },
  action: LoadingAction
): ILoadingState {
  switch (action.type) {
    case DelayActionTypes.DELAY_START:
      return {
        pastDelay: false
      };

    case DelayActionTypes.DELAY_END:
      return {
        pastDelay: true
      };

    default:
      return state;
  }
}

export default loading;
