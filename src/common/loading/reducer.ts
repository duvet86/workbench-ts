import { DELAY_END, DELAY_START, LoadingAction } from "common/loading/actions";

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
    case DELAY_START:
      return {
        pastDelay: false
      };

    case DELAY_END:
      return {
        pastDelay: true
      };

    default:
      return state;
  }
}

export default loading;
