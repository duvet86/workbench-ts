import { Action } from "redux";

import { ISideBarItems } from "sidebar/userItems/types";

export const enum MyItemsActionTypes {
  MY_ITEMS_REQUEST = "MY_ITEMS_REQUEST",
  MY_ITEMS_SUCCESS = "MY_ITEMS_SUCCESS",
  MY_ITEMS_ERROR = "MY_ITEMS_ERROR",
  FOLDER_TREE_UPDATE = "FOLDER_TREE_UPDATE"
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

export interface IFolderTreeUpdate extends Action {
  type: MyItemsActionTypes.FOLDER_TREE_UPDATE;
  currentTree: 0 | 1;
}

export type MyItemsAction =
  | IMyItemsRequest
  | IMyItemsSuccess
  | IMyItemsError
  | IFolderTreeUpdate;

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

export const updateFolderTree = (currentTree: 0 | 1): IFolderTreeUpdate => ({
  type: MyItemsActionTypes.FOLDER_TREE_UPDATE,
  currentTree
});
