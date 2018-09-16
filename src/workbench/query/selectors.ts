import { createSelector } from "reselect";

import { RootState } from "rootReducer";
import { getConstraintDisplayValue } from "workbench/utils";
import { IOption } from "common/select/SelectInputContainer";

const dataServicesSelector = (state: RootState) =>
  state.queryConfigReducer.dataServices;

export const getDataServices = createSelector(
  dataServicesSelector,
  dataServices =>
    dataServices
      .map(({ ItemId, Label }) => ({
        value: ItemId,
        label: Label
      }))
      .sort((a, b) => {
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1;
        }
        return 0;
      })
);

const elementIdSelector = (state: RootState) =>
  state.queryConfigReducer.elementId;
const querySelector = (state: RootState) => state.sessionReducer.queries;
const availableColumnsSelector = (state: RootState) =>
  state.queryConfigReducer.availableColumns;

export const getAvailableColumns = createSelector(
  elementIdSelector,
  querySelector,
  availableColumnsSelector,
  (elementId, queries, availableColumns) =>
    availableColumns.filter(
      ac =>
        !queries[elementId].Columns.map(c => c.ColumnName).includes(
          ac.ColumnName
        )
    )
);

export const getQuery = createSelector(
  elementIdSelector,
  querySelector,
  (elementId, queries) => queries[elementId]
);

export const getQueryColumns = createSelector(
  elementIdSelector,
  querySelector,
  (elementId, queries) => queries[elementId].Columns
);

export const getCompletedSteps = createSelector(
  elementIdSelector,
  querySelector,
  (elementId, queries) => {
    const selectedQuery = queries[elementId];

    if (selectedQuery.Columns.length > 0) {
      return [true, true, true, false];
    }
    if (selectedQuery.TargetDataViewId) {
      return [true, false];
    }

    return [false];
  }
);

const availableFiltersSelector = (state: RootState) =>
  state.queryConfigReducer.availableFilters;

const noteSupportedDataTypes = ["DateTimeValue", "DateValue", "TimeValue"];

// NOTE: date types are not supported yet.
export const getConstraintTargets = createSelector(
  availableColumnsSelector,
  availableFiltersSelector,
  elementIdSelector,
  querySelector,
  (columns, filters, elementId, queries) => {
    const filtersSelect = filters.map<IOption>(
      ({ Label, FilterName, DataType, ToColumnName }) => ({
        value: {
          key: FilterName,
          label: Label,
          dataType: DataType,
          toColumnName: ToColumnName
        },
        label: Label + " (F)"
      })
    );

    const columnsSelect = columns
      .filter(({ DataType }) => !noteSupportedDataTypes.includes(DataType))
      .filter(
        ({ ColumnName }) =>
          !filters.some(
            ({ ToColumnName }) =>
              ToColumnName != null && ToColumnName === ColumnName
          )
      )
      .map<IOption>(({ Label, ColumnName, DataType }) => ({
        value: {
          key: ColumnName,
          label: Label,
          dataType: DataType
        },
        label: Label
      }));

    return filtersSelect
      .concat(columnsSelect)
      .filter(
        availConstraint =>
          !queries[elementId].Constraints.some(
            queryConstraint =>
              availConstraint.value.key === queryConstraint.FilterName ||
              availConstraint.value.key === queryConstraint.ColumnName
          )
      );
  }
);

export const getQueryConstraints = createSelector(
  elementIdSelector,
  querySelector,
  (elementId, queries) =>
    queries[elementId].Constraints.map(c => getConstraintDisplayValue(c))
);
