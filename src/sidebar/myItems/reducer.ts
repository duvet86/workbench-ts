import { MyItemsActionTypes, MyItemsAction } from "sidebar/myItems/actions";

import { ISideBarItems } from "sidebar/myItems/types";

interface IState {
  isLoading: boolean;
  items?: ISideBarItems;
}

function myItems(
  state: IState = {
    isLoading: true,
    items: undefined
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
