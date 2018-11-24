import { createSelector } from "reselect";

import { RootState } from "rootReducer";
import { OperatorServiceIds } from "workbench/types";

const elementTypeSelector = (state: RootState) =>
  state.configElements.operatorServiceId;

export const isDrawerOpen = createSelector(
  elementTypeSelector,
  elementType => elementType !== OperatorServiceIds.NONE
);
