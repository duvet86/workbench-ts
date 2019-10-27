import { createSelector } from "reselect";
import { RootState } from "rootReducer";

const elementIdSelector = (state: RootState) => state.configElements.elementId;

const filterSelector = (state: RootState) => state.sessionGraph.filters;

export const getFilter = createSelector(
  elementIdSelector,
  filterSelector,
  (elementId, filters) => filters[elementId]
);

export const getFilterCompletedSteps = createSelector(
  elementIdSelector,
  filterSelector,
  (elementId, filters) => {
    // const selectedQuery = filters[elementId];

    return [false];
  }
);
