import { ProfileActionTypes, ProfileAction } from "profile/actions";

import { IUserInfo } from "profile/types";

interface IProfileState {
  isLoading: boolean;
  userInfo?: IUserInfo;
}

function profile(
  state: IProfileState = {
    isLoading: true,
    userInfo: undefined
  },
  action: ProfileAction
): IProfileState {
  switch (action.type) {
    case ProfileActionTypes.PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case ProfileActionTypes.PROFILE_SUCCESS:
      return {
        isLoading: false,
        userInfo: action.userInfo
      };

    default:
      return state;
  }
}

export default profile;
