import { Action } from "redux";

import { ISideBarItems } from "sidebar/myItems/types";

export const enum MyItemsActionTypes {
  MY_ITEMS_REQUEST = "MY_ITEMS_REQUEST",
  MY_ITEMS_SUCCESS = "MY_ITEMS_SUCCESS",
  MY_ITEMS_ERROR = "MY_ITEMS_ERROR"
}

export interface IMyItemsRequest extends Action {
  type: MyItemsActionTypes.MY_ITEMS_REQUEST;
}

export interface IMyItemsSuccess extends Action {
  type: MyItemsActionTypes.MY_ITEMS_SUCCESS;
  items: ISideBarItems;
}

export interface IMyItemsError extends Action {
  type: MyItemsActionTypes.MY_ITEMS_ERROR;
  error: any;
}

export type MyItemsAction = IMyItemsRequest | IMyItemsSuccess | IMyItemsError;

export const myItemsRequest = (): IMyItemsRequest => ({
  type: MyItemsActionTypes.MY_ITEMS_REQUEST
});

export const myItemsSuccess = (items: ISideBarItems): IMyItemsSuccess => ({
  type: MyItemsActionTypes.MY_ITEMS_SUCCESS,
  items
});

export const myItemsError = (error: any): IMyItemsError => ({
  type: MyItemsActionTypes.MY_ITEMS_ERROR,
  error
});
