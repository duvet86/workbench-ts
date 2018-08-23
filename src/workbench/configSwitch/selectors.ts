import { createSelector } from "reselect";
import { ElementType } from "sideBar/operators/types";

interface IStoreState {
  configSwitchReducer: {
    elementType: ElementType;
  };
}

const elementTypeSelector = (state: IStoreState) =>
  state.configSwitchReducer.elementType;

export const isDrawerOpen = createSelector(
  elementTypeSelector,
  elementType => elementType !== ElementType.NONE
);
