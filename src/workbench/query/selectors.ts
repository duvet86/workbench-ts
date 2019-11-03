import { createSelector } from "reselect";

import { RootState } from "rootReducer";
import { getConstraintDisplayValue } from "workbench/utils";
import { IOption } from "common/select/SelectInputContainer";
import { IAvailableColumns, IAvailableFilters } from "workbench/query/types";

const dataServicesSelector = (state: RootState) =>
  state.queryConfig.dataServices;

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

const elementIdSelector = (state: RootState) => state.configElements.elementId;

const queriesSelector = (state: RootState) => state.sessionGraph.queries;

const availableColumnsSelector = (state: RootState) =>
  state.queryConfig.availableColumns;

const availableFiltersSelector = (state: RootState) =>
  state.queryConfig.availableFilters;

export const getAvailableColumns = createSelector(
  elementIdSelector,
  queriesSelector,
  availableColumnsSelector,
  (elementId, queries, availableColumns) =>
    availableColumns.filter(
      ac =>
        !queries[elementId].Columns.map(c => c.OutputColumnName).includes(
          ac.ColumnName
        )
    )
);

export const getQuery = createSelector(
  elementIdSelector,
  queriesSelector,
  (elementId, queries) => queries[elementId]
);

export const getQueryColumns = createSelector(
  elementIdSelector,
  queriesSelector,
  (elementId, queries) => queries[elementId].Columns
);

export const getQueryCompletedSteps = createSelector(
  elementIdSelector,
  queriesSelector,
  (elementId, queries) => {
    const selectedQuery = queries[elementId];

    if (selectedQuery.DataTableId != null) {
      return [true, true, true, true];
    }
    if (selectedQuery.Columns.length > 0) {
      return [true, true, true, false];
    }
    if (selectedQuery.TargetDataViewId && selectedQuery.Label !== "") {
      return [true, false, false, false];
    }

    return [false, false, false, false];
  }
);

// True means not supported.
const noteSupportedDataTypes: { [key: string]: boolean } = {
  DateTimeValue: true,
  DateValue: true,
  TimeValue: true
};

// NOTE: date types are not supported yet.
export const getAvailableConstraint = createSelector(
  availableColumnsSelector,
  availableFiltersSelector,
  elementIdSelector,
  queriesSelector,
  (columns, filters, elementId, queries) => {
    const optionFilters = filters.map<IOption<string>>(
      ({ Label, FilterName }) => ({
        value: FilterName,
        label: Label + " (F)"
      })
    );

    const columnsSelect = columns
      // Remove columns that have unsupported dataTypes, see noteSupportedDataTypes obj.
      .filter(({ DataType }) => !noteSupportedDataTypes[DataType])
      // Remove columns that are replaced by filters.
      .filter(
        ({ ColumnName }) =>
          !filters.some(
            ({ ToColumnName }) =>
              ToColumnName != null && ToColumnName === ColumnName
          )
      );

    const optionColumns = columnsSelect.map<IOption<string>>(
      ({ DisplayLabel, ColumnName }) => ({
        value: ColumnName,
        label: DisplayLabel + " (C)"
      })
    );

    const availableConstraints = optionFilters
      .concat(optionColumns)
      .filter(
        opt =>
          !queries[elementId].Constraints.some(
            qc =>
              opt.value === qc.FilterName || opt.value === qc.OutputColumnName
          )
      );

    return availableConstraints;
  }
);

export const getAvailableFilterDic = createSelector(
  availableFiltersSelector,
  filters => {
    const availableFiltersDic = filters.reduce(
      (res, f) => {
        res[f.FilterName] = f;
        return res;
      },
      {} as IAvailableFilters
    );

    return availableFiltersDic;
  }
);

export const getAvailableColumnsDic = createSelector(
  availableColumnsSelector,
  availableFiltersSelector,
  (columns, filters) => {
    const columnsSelect = columns
      // Remove columns that have unsupported dataTypes, see noteSupportedDataTypes obj.
      .filter(({ DataType }) => !noteSupportedDataTypes[DataType])
      // Remove columns that are replaced by filters.
      .filter(
        ({ ColumnName }) =>
          !filters.some(
            ({ ToColumnName }) =>
              ToColumnName != null && ToColumnName === ColumnName
          )
      );

    const availableColumnsDic = columnsSelect.reduce(
      (res, c) => {
        res[c.ColumnName] = c;
        return res;
      },
      {} as IAvailableColumns
    );

    return availableColumnsDic;
  }
);

export const getQueryConstraints = createSelector(
  elementIdSelector,
  queriesSelector,
  (elementId, queries) =>
    queries[elementId].Constraints.map(c => getConstraintDisplayValue(c))
);

export const getQuerySourceLabel = createSelector(
  elementIdSelector,
  queriesSelector,
  dataServicesSelector,
  (elementId, queries, dataServices) => {
    const selectedDataSource = dataServices.find(
      ({ ItemId }) => ItemId === queries[elementId].TargetDataViewId
    );
    if (selectedDataSource == null) {
      throw new Error("Cannot find selected datasource.");
    }
    return selectedDataSource.Label;
  }
);
