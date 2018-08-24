import { MyItemsActionTypes, MyItemsAction } from "sidebar/myItems/actions";

import { IFolderChild } from "sidebar/myItems/types";

interface IState {
  isLoading: boolean;
  items: IFolderChild[];
}

function myItems(
  state: IState = {
    isLoading: true,
    items: []
  },
  action: MyItemsAction
) {
  switch (action.type) {
    case MyItemsActionTypes.MY_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case MyItemsActionTypes.MY_ITEMS_SUCCESS:
      return {
        isLoading: false,
        items: action.items
      };

    case MyItemsActionTypes.MY_ITEMS_ERROR:
      return {
        isLoading: false,
        items: []
      };

    default:
      return state;
  }
}

export default myItems;
