import { MyItemsActionTypes, MyItemsAction } from "sideBar/myItems/actions";

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

    default:
      return state;
  }
}

export default myItems;
