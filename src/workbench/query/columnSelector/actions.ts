import { Action } from "redux";
import { IColumn } from "workbench/types";

export const enum QueryColumnActionTypes {
  QUERY_COLUMN_ADD = "QUERY_COLUMN_ADD",
  QUERY_COLUMN_REMOVE = "QUERY_COLUMN_REMOVE"
}

export interface IAddQueryColumn extends Action {
  type: QueryColumnActionTypes.QUERY_COLUMN_ADD;
  elementId: number;
  column: IColumn;
}

export interface IRemoveQueryColumn extends Action {
  type: QueryColumnActionTypes.QUERY_COLUMN_REMOVE;
  elementId: number;
  columnName: string;
}

export type QueryColumnAction = IAddQueryColumn | IRemoveQueryColumn;

export const addQueryColumn = (
  elementId: number,
  column: IColumn
): IAddQueryColumn => ({
  type: QueryColumnActionTypes.QUERY_COLUMN_ADD,
  elementId,
  column
});

export const removeQueryColumn = (
  elementId: number,
  columnName: string
): IRemoveQueryColumn => ({
  type: QueryColumnActionTypes.QUERY_COLUMN_REMOVE,
  elementId,
  columnName
});
