export const PROFILE_REQUEST = "PROFILE_REQUEST";
type PROFILE_REQUEST = typeof PROFILE_REQUEST;
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
type PROFILE_SUCCESS = typeof PROFILE_SUCCESS;
export const PROFILE_ERROR = "PROFILE_ERROR";
type PROFILE_ERROR = typeof PROFILE_ERROR;

export interface IProfileRequest {
  type: PROFILE_REQUEST;
}

export interface IProfileSuccess {
  type: PROFILE_SUCCESS;
  userInfo: any;
}

export interface IProfileError {
  type: PROFILE_ERROR;
  error: any;
}

export type ProfileAction = IProfileRequest | IProfileSuccess | IProfileError;

export const profileRequest = (): IProfileRequest => ({
  type: PROFILE_REQUEST
});

// TODO: fix me.
export const profileSuccess = (userInfo: any): IProfileSuccess => ({
  type: PROFILE_SUCCESS,
  userInfo
});

export const profileError = (error: any): IProfileError => ({
  type: PROFILE_ERROR,
  error
});
