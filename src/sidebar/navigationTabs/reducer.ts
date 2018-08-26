import { TabsActionTypes, TabsAction } from "sidebar/navigationTabs/actions";

interface ITabsState {
  selectedTab: number;
  tabsEnabled: [boolean, boolean, boolean];
}

function navigationTabs(
  // Only myItems enabled at the beginning.
  // Suppose we are on "/".
  state: ITabsState = {
    selectedTab: 0,
    tabsEnabled: [false, true, true]
  },
  action: TabsAction
): ITabsState {
  const tabsEnabled = action.tabsEnabled || state.tabsEnabled;

  switch (action.type) {
    case TabsActionTypes.MYITEMS_SHOW:
      return {
        selectedTab: 0,
        tabsEnabled
      };

    case TabsActionTypes.FILTERS_SHOW:
      return {
        selectedTab: 1,
        tabsEnabled
      };
    case TabsActionTypes.TOOLS_SHOW:
      return {
        selectedTab: 2,
        tabsEnabled
      };

    default:
      return state;
  }
}

export default navigationTabs;
