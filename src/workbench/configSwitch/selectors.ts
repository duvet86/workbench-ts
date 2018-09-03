import { createSelector } from "reselect";

import { RootState } from "rootReducer";
import { ElementType } from "sidebar/operators/operatorsData";

const elementTypeSelector = (state: RootState) =>
  state.configSwitchReducer.elementType;

export const isDrawerOpen = createSelector(
  elementTypeSelector,
  elementType => elementType !== ElementType.NONE
);
