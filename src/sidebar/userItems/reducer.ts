import { MyItemsActionTypes, MyItemsAction } from "sidebar/userItems/actions";

import { IFolderChild } from "sidebar/userItems/types";

interface IMyItemsState {
  isLoading: boolean;
  currentTree: 0 | 1;
  myItems: IFolderChild[];
  sharedWithMe: IFolderChild[];
}

function myItems(
  state: IMyItemsState = {
    isLoading: true,
    currentTree: 0,
    myItems: [],
    sharedWithMe: []
  },
  action: MyItemsAction
): IMyItemsState {
  switch (action.type) {
    case MyItemsActionTypes.MY_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case MyItemsActionTypes.MY_ITEMS_SUCCESS:
      return {
        isLoading: false,
        currentTree: state.currentTree,
        myItems: action.items.myItems,
        sharedWithMe: action.items.sharedWithMe
      };

    case MyItemsActionTypes.FOLDER_TREE_UPDATE:
      return {
        ...state,
        currentTree: action.currentTree
      };

    default:
      return state;
  }
}

export default myItems;
