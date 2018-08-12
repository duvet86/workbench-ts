import {
  MY_ITEMS_REQUEST,
  MY_ITEMS_SUCCESS,
  MyItemsAction
} from "sideBar/myItems/actions";

interface IState {
  isLoading: boolean;
  items?: {
    myItems: Array<{
      ChildType: string;
      ChildFolderId?: string;
      ChildFolder?: any;
      ChildItemId?: string;
      ChildItem?: any;
    }>;
  };
}

function myItems(
  state: IState = {
    isLoading: true,
    items: undefined
  },
  action: MyItemsAction
) {
  switch (action.type) {
    case MY_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case MY_ITEMS_SUCCESS:
      return {
        isLoading: false,
        items: action.items
      };

    default:
      return state;
  }
}

export default myItems;
