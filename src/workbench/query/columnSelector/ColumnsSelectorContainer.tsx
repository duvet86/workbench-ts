import React, { Component } from "react";
import PropTypes from "prop-types";
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

import ColumnsSelector from "workbench/query/columnSelector/ColumnsSelector";

interface IDispatchProps {
  dispatchAddQueryColumn: (elementId: number, column: any) => void;
  dispatchRemoveQueryColumn: (elementId: number, column: any) => void;
}

interface IStateProps {
  elementId: number;
  availableColumns: any[];
  selectedColumns: any[];
}

type Props = IStateProps & IDispatchProps;

class ColumnsSelectorContainer extends Component<Props> {
  public static propTypes = {
    elementId: PropTypes.number.isRequired,
    availableColumns: PropTypes.array.isRequired,
    selectedColumns: PropTypes.array.isRequired,
    dispatchAddQueryColumn: PropTypes.func.isRequired,
    dispatchRemoveQueryColumn: PropTypes.func.isRequired
  };

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

  private handleAddQueryColumn = (column: any) => {
    const { elementId, dispatchAddQueryColumn } = this.props;
    dispatchAddQueryColumn(elementId, column);
  };

  private handleRemoveQueryColumn = ({
    ColumnName
  }: {
    ColumnName: string;
  }) => {
    const { elementId, dispatchRemoveQueryColumn } = this.props;
    dispatchRemoveQueryColumn(elementId, ColumnName);
  };
}

const mapStateToProps = (state: any) => ({
  availableColumns: getAvailableColumns(state),
  selectedColumns: getQueryColumns(state)
});

const mapDispatchToProps = (dispatch: Dispatch<QueryColumnAction>) => ({
  dispatchAddQueryColumn: (elementId: number, column: any) =>
    dispatch(addQueryColumn(elementId, column)),
  dispatchRemoveQueryColumn: (elementId: number, column: any) =>
    dispatch(removeQueryColumn(elementId, column))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnsSelectorContainer);
