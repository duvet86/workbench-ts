import { Action } from "redux";

import { ISideBarItems } from "sidebar/userItems/types";

export const enum UserItemsActionTypes {
  USER_ITEMS_REQUEST = "USER_ITEMS_REQUEST",
  USER_ITEMS_SUCCESS = "USER_ITEMS_SUCCESS",
  USER_ITEMS_ERROR = "USER_ITEMS_ERROR"
}

export interface IUserItemsRequest extends Action {
  type: UserItemsActionTypes.USER_ITEMS_REQUEST;
}

export interface IUserItemsSuccess extends Action {
  type: UserItemsActionTypes.USER_ITEMS_SUCCESS;
  items: ISideBarItems;
}

export interface IUserItemsError extends Action {
  type: UserItemsActionTypes.USER_ITEMS_ERROR;
  error: any;
}

export type UserItemsActions =
  | IUserItemsRequest
  | IUserItemsSuccess
  | IUserItemsError;

export const userItemsRequest = (): IUserItemsRequest => ({
  type: UserItemsActionTypes.USER_ITEMS_REQUEST
});

export const userItemsSuccess = (items: ISideBarItems): IUserItemsSuccess => ({
  type: UserItemsActionTypes.USER_ITEMS_SUCCESS,
  items
});

export const userItemsError = (error: any): IUserItemsError => ({
  type: UserItemsActionTypes.USER_ITEMS_ERROR,
  error
});
