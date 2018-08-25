import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

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
import { IUdsColumnDescriptionDtc } from "workbench/query/types";
import { IOption } from "common/searchableList/types";

import ColumnsSelector from "workbench/query/columnSelector/ColumnsSelector";

interface IDispatchProps {
  dispatchAddQueryColumn: (elementId: number, column: IColumn) => void;
  dispatchRemoveQueryColumn: (elementId: number, columnName: string) => void;
}

interface IStateProps {
  elementId: number;
  availableColumns: IUdsColumnDescriptionDtc[];
  selectedColumns: IColumn[];
}

type Props = IStateProps & IDispatchProps;

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

const mapStateToProps = (state: any) => ({
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
