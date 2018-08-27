import { createSelector } from "reselect";

import { RootState } from "rootReducer";
import { ElementType } from "sidebar/operators/types";

const elementTypeSelector = (state: RootState) =>
  state.configSwitchReducer.elementType;

export const isDrawerOpen = createSelector(
  elementTypeSelector,
  elementType => elementType !== ElementType.NONE
);
