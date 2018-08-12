import {
  FILTERS_SHOW,
  MYITEMS_SHOW,
  TabsAction,
  TOOLS_SHOW
} from "sideBar/navigationTabs/actions";

interface IState {
  selectedTab: number;
  tabsState: [boolean, boolean, boolean];
}

function navigationTabs(
  // Only myItems enabled at the beginning.
  // Suppose we are on "/".
  state: IState = {
    selectedTab: 0,
    tabsState: [false, true, true]
  },
  action: TabsAction
) {
  const tabsState = action.tabsState || state.tabsState;

  switch (action.type) {
    case MYITEMS_SHOW:
      return {
        selectedTab: 0,
        tabsState
      };

    case FILTERS_SHOW:
      return {
        selectedTab: 1,
        tabsState
      };
    case TOOLS_SHOW:
      return {
        selectedTab: 2,
        tabsState
      };

    default:
      return state;
  }
}

export default navigationTabs;
