import {
  UserItemsActionTypes,
  UserItemsActions
} from "sidebar/userItems/actions";

import { IFolderChild } from "sidebar/userItems/types";

interface IUserItemsState {
  isLoading: boolean;
  currentTree: 0 | 1;
  myItems: IFolderChild[];
  sharedWithMe: IFolderChild[];
}

function userItems(
  state: IUserItemsState = {
    isLoading: true,
    currentTree: 0,
    myItems: [],
    sharedWithMe: []
  },
  action: UserItemsActions
): IUserItemsState {
  switch (action.type) {
    case UserItemsActionTypes.USER_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case UserItemsActionTypes.USER_ITEMS_SUCCESS:
      return {
        isLoading: false,
        currentTree: state.currentTree,
        myItems: action.items.myItems,
        sharedWithMe: action.items.sharedWithMe
      };

    default:
      return state;
  }
}

export default userItems;
