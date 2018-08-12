import { createSelector } from "reselect";
import { setConstraintDisplayValue, DATA_TYPES } from "workbench/utils";

const dataServicesSelector = (state: any) =>
  state.queryConfigReducer.dataServices;

interface IDataServiceInput {
  ItemId: number;
  Label: string;
}

interface IDataServiceOutput {
  value: number;
  label: string;
}

export const getDataServices = createSelector(
  dataServicesSelector,
  dataServices =>
    dataServices
      .map(({ ItemId, Label }: IDataServiceInput) => ({
        value: ItemId,
        label: Label
      }))
      .sort((a: IDataServiceOutput, b: IDataServiceOutput) => {
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1;
        }
        return 0;
      })
);

const elementIdSelector = (state: any) => state.queryConfigReducer.elementId;
const querySelector = (state: any) => state.sessionReducer.queries;
const availableColumnsSelector = (state: any) =>
  state.queryConfigReducer.availableColumns;

export const getAvailableColumns = createSelector(
  elementIdSelector,
  querySelector,
  availableColumnsSelector,
  (elementId, queries, availableColumns) =>
    availableColumns.filter(
      (ac: any) => !queries[elementId].Columns.includes(ac)
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
  (elementId: number, queries: any[]) => {
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

const availableFiltersSelector = (state: any) =>
  state.queryConfigReducer.availableFilters;

const noteSupportedDataTypes = ["DateTimeValue", "DateValue", "TimeValue"];

interface IFilterInput {
  Label: string;
  FilterName: string;
  DataType: DATA_TYPES;
  ToColumnName: string;
}

interface IColumn {
  Label: string;
  DataType: DATA_TYPES;
  ColumnName: string;
  ToColumnName: string;
}

interface IConstraint {
  FilterName: string;
  ColumnName: string;
}

// NOTE: date types are not supported yet.
export const getConstraintTargets = createSelector(
  availableColumnsSelector,
  availableFiltersSelector,
  elementIdSelector,
  querySelector,
  (columns, filters, elementId, queries) => {
    const filtersSelect = filters.map(
      ({ Label, FilterName, DataType, ToColumnName }: IFilterInput) => ({
        FilterName,
        ToColumnName,
        value: {
          label: Label,
          FilterName,
          DataType
        },
        label: Label + " (F)",
        secondaryLabel: `(${DataType})`
      })
    );

    const columnsSelect = columns
      .filter(
        ({ DataType }: IColumn) => !noteSupportedDataTypes.includes(DataType)
      )
      .filter(
        ({ ColumnName }: IColumn) =>
          !filters.some(
            ({ ToColumnName }: IColumn) =>
              ToColumnName && ToColumnName === ColumnName
          )
      )
      .map(({ Label, ColumnName, DataType }: IColumn) => ({
        ColumnName,
        value: {
          label: Label,
          ColumnName,
          DataType
        },
        label: Label,
        secondaryLabel: `(${DataType})`
      }));

    return []
      .concat(filtersSelect, columnsSelect)
      .filter(
        (availConstraint: IConstraint) =>
          !queries[elementId].Constraints.some(
            (queryConstraint: IConstraint) =>
              (availConstraint.FilterName &&
                availConstraint.FilterName === queryConstraint.FilterName) ||
              (availConstraint.ColumnName &&
                availConstraint.ColumnName === queryConstraint.ColumnName)
          )
      );
  }
);

// Duplicate.
interface IContraint {
  DataType: DATA_TYPES;
  Values: any[];
  displayValue?: any;
}

export const getQueryConstraints = createSelector(
  elementIdSelector,
  querySelector,
  (elementId, queries) =>
    queries[elementId].Constraints.map((c: IContraint) =>
      setConstraintDisplayValue(c)
    )
);
