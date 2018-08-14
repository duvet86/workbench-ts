import { Action } from "redux";

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
  userInfo: any;
}

export interface IProfileError extends Action {
  type: ProfileActionTypes.PROFILE_ERROR;
  error: any;
}

export type ProfileAction = IProfileRequest | IProfileSuccess | IProfileError;

export const profileRequest = (): IProfileRequest => ({
  type: ProfileActionTypes.PROFILE_REQUEST
});

// TODO: fix me.
export const profileSuccess = (userInfo: any): IProfileSuccess => ({
  type: ProfileActionTypes.PROFILE_SUCCESS,
  userInfo
});

export const profileError = (error: any): IProfileError => ({
  type: ProfileActionTypes.PROFILE_ERROR,
  error
});
