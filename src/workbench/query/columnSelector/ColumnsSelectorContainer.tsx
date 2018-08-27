import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

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
import { IOption } from "common/searchableList/types";

import ColumnsSelector from "workbench/query/columnSelector/ColumnsSelector";

interface IOwnProps {
  elementId: number;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

class ColumnsSelectorContainer extends Component<Props> {
  public render() {
    const { availableColumns, selectedColumns } = this.props;

    return (
      <ColumnsSelector
        availableColumns={availableColumns}
        selectedColumns={selectedColumns}
        handleAddQueryColumn={this.handleAddQueryColumn}
        handleRemoveQueryColumn={this.handleRemoveQueryColumn}
      />
    );
  }

  private handleAddQueryColumn = ({ label }: IOption) => {
    const { elementId, dispatchAddQueryColumn } = this.props;
    const queryColumn = {
      ColumnName: label,
      Label: label,
      Aggregation: "None"
    };
    dispatchAddQueryColumn(elementId, queryColumn);
  };

  private handleRemoveQueryColumn = ({ label }: IOption) => {
    const { elementId, dispatchRemoveQueryColumn } = this.props;
    dispatchRemoveQueryColumn(elementId, label);
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
