import { Action } from "redux";

export const enum TabsActionTypes {
  MYITEMS_SHOW = "MYITEMS_SHOW",
  FILTERS_SHOW = "FILTERS_SHOW",
  TOOLS_SHOW = "TOOLS_SHOW"
}

type TabsState = [boolean, boolean, boolean];

export interface IShowMyItems extends Action {
  type: TabsActionTypes.MYITEMS_SHOW;
  tabsState?: TabsState;
}

export interface IShowFilters extends Action {
  type: TabsActionTypes.FILTERS_SHOW;
  tabsState?: TabsState;
}

export interface IShowTools extends Action {
  type: TabsActionTypes.TOOLS_SHOW;
  tabsState?: TabsState;
}

export type TabsAction = IShowMyItems | IShowFilters | IShowTools;

export const showMyItems = (tabsState?: TabsState): IShowMyItems => ({
  type: TabsActionTypes.MYITEMS_SHOW,
  tabsState
});

export const showFilters = (tabsState?: TabsState): IShowFilters => ({
  type: TabsActionTypes.FILTERS_SHOW,
  tabsState
});

export const showTools = (tabsState?: TabsState): IShowTools => ({
  type: TabsActionTypes.TOOLS_SHOW,
  tabsState
});
