import React, { FC } from "react";

import { withStyles } from "@material-ui/core/styles";
import { IColumn } from "workbench/types";
import { IPagedRows } from "workbench/query/types";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import LoadingContainer from "common/loading/LoadingContainer";

interface IProps {
  columns: IColumn[];
  dataTableRows: IPagedRows | undefined;
  rowsPerPageOptions: number[];
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HeadTableCell = withStyles(theme => ({
  head: {
    ...theme.typography.subtitle2
  }
}))(TableCell);

const TitleTableCell = withStyles(theme => ({
  head: {
    ...theme.typography.h6
  }
}))(TableCell);

const DataPreview: FC<IProps> = ({
  columns,
  dataTableRows,
  rowsPerPageOptions,
  onChangePage,
  onChangeRowsPerPage
}) => (
  <Paper>
    <LoadingContainer isLoading={dataTableRows == null}>
      {dataTableRows && (
        <Table>
          <TableHead>
            <TableRow>
              <TitleTableCell>Preview</TitleTableCell>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                count={dataTableRows.TotalRowCount}
                rowsPerPage={dataTableRows.PageSize}
                page={dataTableRows.PageNumber}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
              />
            </TableRow>
            <TableRow>
              {columns.map(({ ColumnName, Label }) => (
                <HeadTableCell key={ColumnName}>{Label}</HeadTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTableRows.DisplayRows.map((row, ri) => (
              <TableRow key={ri} hover>
                {row.map((column, ci) => (
                  <TableCell key={ci}>{column}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                count={dataTableRows.TotalRowCount}
                rowsPerPage={dataTableRows.PageSize}
                page={dataTableRows.PageNumber}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </LoadingContainer>
  </Paper>
);

export default DataPreview;
