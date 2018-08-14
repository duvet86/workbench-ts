import { DelayActionTypes, LoadingAction } from "common/loading/actions";

interface IState {
  pastDelay: boolean;
}

function loading(
  state: IState = {
    pastDelay: false
  },
  action: LoadingAction
) {
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
