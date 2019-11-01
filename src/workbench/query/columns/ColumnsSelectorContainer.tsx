import React, { FC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";

import { RootState } from "rootReducer";
import {
  addQueryColumn,
  removeQueryColumn,
  QueryColumnAction
} from "workbench/query/columns/actions";
import {
  getAvailableColumns,
  getQueryColumns
} from "workbench/query/selectors";

import { IColumn } from "workbench/types";
import { IOption } from "common/select/SelectInputContainer";

import ColumnsSelector from "workbench/query/columns/ColumnsSelector";

interface IOwnProps {
  elementId: number;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

const availableColumnsSelector = (props: Props) => props.availableColumns;
const selectedColumnsSelector = (props: Props) => props.selectedColumns;

const availableColumnOptions = createSelector(
  availableColumnsSelector,
  availableColumns =>
    availableColumns.map<IOption>(column => ({
      label: column.Label,
      value: column.ColumnName
    }))
);

const selectedColumnOptions = createSelector(
  selectedColumnsSelector,
  selectedColumns =>
    selectedColumns.map<IOption>(column => ({
      label: column.Label,
      value: column.ColumnName
    }))
);

const ColumnsSelectorContainer: FC<Props> = props => {
  const handleAddQueryColumn = ({ value, label }: IOption) => (
    _: React.MouseEvent
  ) => {
    const { elementId, dispatchAddQueryColumn } = props;
    const queryColumn = {
      ColumnName: value,
      Label: label,
      Aggregation: "None"
    };
    dispatchAddQueryColumn(elementId, queryColumn);
  };

  const handleRemoveQueryColumn = ({ value }: IOption) => (
    _: React.MouseEvent
  ) => {
    const { elementId, dispatchRemoveQueryColumn } = props;
    dispatchRemoveQueryColumn(elementId, value);
  };

  return (
    <ColumnsSelector
      availableColumns={availableColumnOptions(props)}
      selectedColumns={selectedColumnOptions(props)}
      handleAddQueryColumn={handleAddQueryColumn}
      handleRemoveQueryColumn={handleRemoveQueryColumn}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  availableColumns: getAvailableColumns(state),
  selectedColumns: getQueryColumns(state)
});

const mapDispatchToProps = (dispatch: Dispatch<QueryColumnAction>) => ({
  dispatchAddQueryColumn: (elementId: number, column: IColumn) =>
    dispatch(addQueryColumn(elementId, column)),
  dispatchRemoveQueryColumn: (elementId: number, columnName: string) =>
    dispatch(removeQueryColumn(elementId, columnName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnsSelectorContainer);
