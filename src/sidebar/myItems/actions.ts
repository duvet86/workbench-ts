import { Action } from "redux";

import { IFolderChild } from "sidebar/myItems/types";

interface IItems {
  myItems: IFolderChild[];
  sharedWithMe: IFolderChild[];
}

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
  items: IItems;
}

export interface IMyItemsError extends Action {
  type: MyItemsActionTypes.MY_ITEMS_ERROR;
  error: any;
}

export type MyItemsAction = IMyItemsRequest | IMyItemsSuccess | IMyItemsError;

export const myItemsRequest = (): IMyItemsRequest => ({
  type: MyItemsActionTypes.MY_ITEMS_REQUEST
});

export const myItemsSuccess = (items: IItems): IMyItemsSuccess => ({
  type: MyItemsActionTypes.MY_ITEMS_SUCCESS,
  items
});

export const myItemsError = (error: any): IMyItemsError => ({
  type: MyItemsActionTypes.MY_ITEMS_ERROR,
  error
});
