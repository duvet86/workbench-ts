import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import {
  IQueryDataTableRequest,
  queryDataTableRequest
} from "workbench/query/dataPreview/actions";
import { IColumn } from "workbench/types";

import DataPreview from "workbench/query/dataPreview/DataPreview";

interface IOwnProps {
  columns: IColumn[];
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

const DataPreviewContainer: FC<Props> = ({
  columns,
  dataTableRows,
  dispatchDataTableRequest
}) => {
  useEffect(() => {
    dispatchDataTableRequest();
  }, []);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    pageNumber: number
  ) => {
    if (dataTableRows == null) {
      throw new Error("dataTableRows cannot be null.");
    }
    dispatchDataTableRequest(dataTableRows.PageSize, pageNumber);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (dataTableRows == null) {
      throw new Error("dataTableRows cannot be null.");
    }
    dispatchDataTableRequest(
      Number(event.target.value),
      dataTableRows.PageNumber
    );
  };

  return (
    <DataPreview
      columns={columns}
      dataTableRows={dataTableRows}
      rowsPerPageOptions={[10, 25, 50, 100]}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  dataTableRows: state.queryConfig.dataTableTows
});

const mapDispatchToProps = (dispatch: Dispatch<IQueryDataTableRequest>) => ({
  dispatchDataTableRequest: (pageSize = 10, pageNumber = 0) =>
    dispatch(queryDataTableRequest(pageSize, pageNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataPreviewContainer);
