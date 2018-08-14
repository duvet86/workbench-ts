import { Action } from "redux";

export const MYITEMS_SHOW = "MYITEMS_SHOW";
export type MYITEMS_SHOW = typeof MYITEMS_SHOW;
export const FILTERS_SHOW = "FILTERS_SHOW";
export type FILTERS_SHOW = typeof FILTERS_SHOW;
export const TOOLS_SHOW = "TOOLS_SHOW";
export type TOOLS_SHOW = typeof TOOLS_SHOW;

type TabsState = [boolean, boolean, boolean];

export interface IShowMyItems extends Action {
  type: MYITEMS_SHOW;
  tabsState?: TabsState;
}

export interface IShowFilters {
  type: FILTERS_SHOW;
  tabsState?: TabsState;
}

export interface IShowTools {
  type: TOOLS_SHOW;
  tabsState?: TabsState;
}

export type TabsAction = IShowMyItems | IShowFilters | IShowTools;

export const showMyItems = (tabsState?: TabsState): IShowMyItems => ({
  type: MYITEMS_SHOW,
  tabsState
});

export const showFilters = (tabsState?: TabsState): IShowFilters => ({
  type: FILTERS_SHOW,
  tabsState
});

export const showTools = (tabsState?: TabsState): IShowTools => ({
  type: TOOLS_SHOW,
  tabsState
});
