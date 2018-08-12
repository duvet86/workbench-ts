import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  ProfileAction
} from "profile/actions";

interface IState {
  isLoading: boolean;
  userInfo: {
    Profile: { UserName: string };
  } | null;
}

function profile(
  state: IState = {
    isLoading: true,
    userInfo: null
  },
  action: ProfileAction
) {
  switch (action.type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case PROFILE_SUCCESS:
      return {
        isLoading: false,
        userInfo: action.userInfo
      };

    default:
      return state;
  }
}

export default profile;
