import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";

import { RootState } from "rootReducer";
import {
  addQueryColumn,
  removeQueryColumn,
  QueryColumnAction
} from "workbench/actions";
import {
  getAvailableColumns,
  getQueryColumns
} from "workbench/query/selectors";

import { IColumn } from "workbench/types";
import { IOption } from "common/select/SelectInputContainer";

import ColumnsSelector from "workbench/query/columnSelector/ColumnsSelector";

interface IOwnProps {
  elementId: number;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

const availableColumnsSelector = (props: Props) => props.availableColumns;
const selectedColumnsSelector = (props: Props) => props.selectedColumns;

class ColumnsSelectorContainer extends Component<Props> {
  private availableColumnOptions = createSelector(
    availableColumnsSelector,
    availableColumns =>
      availableColumns.map<IOption>(column => ({
        label: column.Label,
        value: column.ColumnName
      }))
  );

  private selectedColumnOptions = createSelector(
    selectedColumnsSelector,
    selectedColumns =>
      selectedColumns.map<IOption>(column => ({
        label: column.Label,
        value: column.ColumnName
      }))
  );

  public render() {
    return (
      <ColumnsSelector
        availableColumns={this.availableColumnOptions(this.props)}
        selectedColumns={this.selectedColumnOptions(this.props)}
        handleAddQueryColumn={this.handleAddQueryColumn}
        handleRemoveQueryColumn={this.handleRemoveQueryColumn}
      />
    );
  }

  private handleAddQueryColumn = ({ value, label }: IOption) => (
    _: React.MouseEvent
  ) => {
    const { elementId, dispatchAddQueryColumn } = this.props;
    const queryColumn = {
      ColumnName: value,
      Label: label,
      Aggregation: "None"
    };
    dispatchAddQueryColumn(elementId, queryColumn);
  };

  private handleRemoveQueryColumn = ({ value }: IOption) => (
    _: React.MouseEvent
  ) => {
    const { elementId, dispatchRemoveQueryColumn } = this.props;
    dispatchRemoveQueryColumn(elementId, value);
  };
}

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
