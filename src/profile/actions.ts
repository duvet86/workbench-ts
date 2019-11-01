import { Action } from "redux";

import { IUserInfo } from "profile/types";

export const enum ProfileActionTypes {
  PROFILE_REQUEST = "PROFILE_REQUEST",
  PROFILE_SUCCESS = "PROFILE_SUCCESS",
  PROFILE_ERROR = "PROFILE_ERROR"
}

export interface IProfileRequest extends Action {
  type: ProfileActionTypes.PROFILE_REQUEST;
}

export interface IProfileSuccess extends Action {
  type: ProfileActionTypes.PROFILE_SUCCESS;
  userInfo: IUserInfo;
}

export interface IProfileError extends Action {
  type: ProfileActionTypes.PROFILE_ERROR;
  error: unknown;
}

export type ProfileAction = IProfileRequest | IProfileSuccess | IProfileError;

export const profileRequest = (): IProfileRequest => ({
  type: ProfileActionTypes.PROFILE_REQUEST
});

export const profileSuccess = (userInfo: IUserInfo): IProfileSuccess => ({
  type: ProfileActionTypes.PROFILE_SUCCESS,
  userInfo
});

export const profileError = (error: unknown): IProfileError => ({
  type: ProfileActionTypes.PROFILE_ERROR,
  error
});
