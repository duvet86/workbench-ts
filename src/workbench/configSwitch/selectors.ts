import { createSelector } from "reselect";
import { ElementType } from "sideBar/operators/operatorsData";

const elementTypeSelector = (state: any) =>
  state.configSwitchReducer.elementType;

export const isDrawerOpen = createSelector(
  elementTypeSelector,
  elementType => elementType !== ElementType.NONE
);
