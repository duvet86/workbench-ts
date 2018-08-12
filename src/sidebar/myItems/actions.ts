export const MY_ITEMS_REQUEST = "MY_ITEMS_REQUEST";
type MY_ITEMS_REQUEST = typeof MY_ITEMS_REQUEST;
export const MY_ITEMS_SUCCESS = "MY_ITEMS_SUCCESS";
type MY_ITEMS_SUCCESS = typeof MY_ITEMS_SUCCESS;
export const MY_ITEMS_ERROR = "MY_ITEMS_ERROR";
type MY_ITEMS_ERROR = typeof MY_ITEMS_ERROR;

export interface IMyItemsRequest {
  type: MY_ITEMS_REQUEST;
}

interface IItems {
  myItems: any[];
  sharedWithMe: any[];
}

// TODO: fix me.
export interface IMyItemsSuccess {
  type: MY_ITEMS_SUCCESS;
  items: IItems;
}

export interface IMyItemsError {
  type: MY_ITEMS_ERROR;
  error: any;
}

export type MyItemsAction = IMyItemsRequest | IMyItemsSuccess | IMyItemsError;

export const myItemsRequest = (): IMyItemsRequest => ({
  type: MY_ITEMS_REQUEST
});

export const myItemsSuccess = (items: IItems): IMyItemsSuccess => ({
  type: MY_ITEMS_SUCCESS,
  items
});

export const myItemsError = (error: any): IMyItemsError => ({
  type: MY_ITEMS_ERROR,
  error
});
