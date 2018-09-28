import { createSelector } from "reselect";

import { RootState } from "rootReducer";
import { getConstraintDisplayValue } from "workbench/utils";
import { IOption } from "common/select/SelectInputContainer";
import { IAvailableColumns, IAvailableFilters } from "workbench/query/types";

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

// True means not supported.
const noteSupportedDataTypes: { [key: string]: boolean } = {
  DateTimeValue: true,
  DateValue: true,
  TimeValue: true
};

// NOTE: date types are not supported yet.
export const getAvailableConstraintsObj = createSelector(
  availableColumnsSelector,
  availableFiltersSelector,
  elementIdSelector,
  querySelector,
  (columns, filters, elementId, queries) => {
    const optionFilters = filters.map<IOption<string>>(
      ({ Label, FilterName }) => ({
        value: FilterName,
        label: Label + " (F)"
      })
    );

    const filtersDic = filters.reduce(
      (res, f) => {
        res[f.FilterName] = f;
        return res;
      },
      {} as IAvailableFilters
    );

    const columnsSelect = columns
      // Remove columns that have unsupported dataTypes, see noteSupportedDataTypes obj.
      .filter(({ DataType }) => !noteSupportedDataTypes[DataType])
      // Remove columns that are replace by filters.
      .filter(
        ({ ColumnName }) =>
          !filters.some(
            ({ ToColumnName }) =>
              ToColumnName != null && ToColumnName === ColumnName
          )
      );

    const optionColumns = columnsSelect.map<IOption<string>>(
      ({ Label, ColumnName }) => ({
        value: ColumnName,
        label: Label + " (C)"
      })
    );

    const columnsDic = columnsSelect.reduce(
      (res, c) => {
        res[c.ColumnName] = c;
        return res;
      },
      {} as IAvailableColumns
    );

    const availableConstraints = optionFilters
      .concat(optionColumns)
      .filter(
        opt =>
          !queries[elementId].Constraints.some(
            qc => opt.value === qc.FilterName || opt.value === qc.ColumnName
          )
      );

    return {
      availableConstraints,
      filtersDic,
      columnsDic
    };
  }
);

export const getQueryConstraints = createSelector(
  elementIdSelector,
  querySelector,
  (elementId, queries) =>
    queries[elementId].Constraints.map(c => getConstraintDisplayValue(c))
);
