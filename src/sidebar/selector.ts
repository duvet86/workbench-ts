import { createSelector } from "reselect";
import { RootState } from "rootReducer";
import tabButtons from "sidebar/navigationTabs/tabsData";

const tabsEnabledSelector = (state: RootState) =>
  state.navigationTabs.tabsEnabled;

export const getVisibleTabs = createSelector(
  tabsEnabledSelector,
  tabsEnabled => tabButtons.filter((_, index) => !tabsEnabled[index])
);
