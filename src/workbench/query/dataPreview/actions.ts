import { Action } from "redux";
import { IPagedRows } from "workbench/query/types";

export const enum QueryDataTableActionTypes {
  QUERY_DATATABLE_CHANGES_REQUEST = "QUERY_DATATABLE_CHANGES_REQUEST",
  QUERY_DATATABLE_REQUEST = "QUERY_DATATABLE_REQUEST",
  QUERY_DATATABLE_SUCCESS = "QUERY_DATATABLE_SUCCESS"
}

export interface IUpdateGraphForDataTableRequest extends Action {
  type: QueryDataTableActionTypes.QUERY_DATATABLE_CHANGES_REQUEST;
  pageSize: number;
  pageNumber: number;
}

export interface IQueryDataTableRequest extends Action {
  type: QueryDataTableActionTypes.QUERY_DATATABLE_REQUEST;
  pageSize: number;
  pageNumber: number;
}

export interface IQueryDataTableSuccess extends Action {
  type: QueryDataTableActionTypes.QUERY_DATATABLE_SUCCESS;
  rows: IPagedRows;
}

export type QueryDataTableAction =
  | IQueryDataTableRequest
  | IQueryDataTableSuccess;

export const queryDataTableRequest = (
  pageSize: number,
  pageNumber: number
): IQueryDataTableRequest => ({
  type: QueryDataTableActionTypes.QUERY_DATATABLE_REQUEST,
  pageSize,
  pageNumber
});

export const queryDataTableSuccess = (
  rows: IPagedRows
): IQueryDataTableSuccess => ({
  type: QueryDataTableActionTypes.QUERY_DATATABLE_SUCCESS,
  rows
});
