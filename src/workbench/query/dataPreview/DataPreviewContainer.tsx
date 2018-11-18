import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import {
  IQueryDataTableRequest,
  queryDataTableRequest
} from "workbench/query/dataPreview/actions";
import { getQuerySourceLabel } from "workbench/query/selectors";
import { IQuery } from "workbench/types";

import DataPreview from "workbench/query/dataPreview/DataPreview";

interface IOwnProps {
  query: IQuery;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

class DataPreviewContainer extends Component<Props> {
  private rowsPerPageOptions = [10, 25, 50, 100];

  public componentDidMount() {
    this.props.dispatchDataTableRequest();
  }

  public render() {
    const { query, querySourceLabel, dataTableRows } = this.props;

    return (
      <DataPreview
        query={query}
        querySourceLabel={querySourceLabel}
        dataTableRows={dataTableRows}
        rowsPerPageOptions={this.rowsPerPageOptions}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    );
  }

  private handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    pageNumber: number
  ) => {
    const { dataTableRows } = this.props;
    if (dataTableRows == null) {
      throw new Error("dataTableRows cannot be null.");
    }
    this.props.dispatchDataTableRequest(dataTableRows.PageSize, pageNumber);
  };

  private handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { dataTableRows } = this.props;
    if (dataTableRows == null) {
      throw new Error("dataTableRows cannot be null.");
    }
    this.props.dispatchDataTableRequest(
      Number(event.target.value),
      dataTableRows.PageNumber
    );
  };
}

const mapStateToProps = (state: RootState) => ({
  querySourceLabel: getQuerySourceLabel(state),
  dataTableRows: state.queryConfig.dataTableTows
});

const mapDispatchToProps = (dispatch: Dispatch<IQueryDataTableRequest>) => ({
  dispatchDataTableRequest: (pageSize: number = 10, pageNumber: number = 0) =>
    dispatch(queryDataTableRequest(pageSize, pageNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataPreviewContainer);
