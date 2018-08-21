import { Action } from "redux";

export const enum TabsActionTypes {
  MYITEMS_SHOW = "MYITEMS_SHOW",
  FILTERS_SHOW = "FILTERS_SHOW",
  TOOLS_SHOW = "TOOLS_SHOW"
}

type TabsEnabled = [boolean, boolean, boolean];

export interface IShowMyItems extends Action {
  type: TabsActionTypes.MYITEMS_SHOW;
  tabsEnabled?: TabsEnabled;
}

export interface IShowFilters extends Action {
  type: TabsActionTypes.FILTERS_SHOW;
  tabsEnabled?: TabsEnabled;
}

export interface IShowTools extends Action {
  type: TabsActionTypes.TOOLS_SHOW;
  tabsEnabled?: TabsEnabled;
}

export type TabsAction = IShowMyItems | IShowFilters | IShowTools;

export const showMyItems = (tabsEnabled?: TabsEnabled): IShowMyItems => ({
  type: TabsActionTypes.MYITEMS_SHOW,
  tabsEnabled
});

export const showFilters = (tabsEnabled?: TabsEnabled): IShowFilters => ({
  type: TabsActionTypes.FILTERS_SHOW,
  tabsEnabled
});

export const showTools = (tabsEnabled?: TabsEnabled): IShowTools => ({
  type: TabsActionTypes.TOOLS_SHOW,
  tabsEnabled
});
