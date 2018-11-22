import { Action } from "redux";

import {
  IUdsDescriptionDtc,
  IUdsFilterDescriptionDtc,
  IUdsColumnDescriptionDtc
} from "workbench/query/types";

export const enum QueryDescActionTypes {
  QUERY_DESCRIBE_REQUEST = "QUERY_DESCRIBE_REQUEST",
  QUERY_DESCRIBE_SUCCESS = "QUERY_DESCRIBE_SUCCESS"
}

export interface IQueryDescribeRequest extends Action {
  type: QueryDescActionTypes.QUERY_DESCRIBE_REQUEST;
}

interface IQueryDescribeSuccess extends Action {
  type: QueryDescActionTypes.QUERY_DESCRIBE_SUCCESS;
  availableColumns: IUdsColumnDescriptionDtc[];
  availableFilters: IUdsFilterDescriptionDtc[];
  elementId: number;
}

export type QueryDescribeActions =
  | IQueryDescribeRequest
  | IQueryDescribeSuccess;

export const queryDescribeRequest = (): IQueryDescribeRequest => ({
  type: QueryDescActionTypes.QUERY_DESCRIBE_REQUEST
});

export const queryDescribeSuccess = (
  { Columns, AvailableFilters }: IUdsDescriptionDtc,
  elementId: number
): IQueryDescribeSuccess => ({
  type: QueryDescActionTypes.QUERY_DESCRIBE_SUCCESS,
  availableColumns: Columns,
  availableFilters: AvailableFilters,
  elementId
});

export const enum QueryActionTypes {
  QUERY_SOURCE_UPDATE = "QUERY_SOURCE_UPDATE",
  QUERY_LABEL_UPDATE = "QUERY_LABEL_UPDATE"
}

export interface IUpdateQuerySource extends Action {
  type: QueryActionTypes.QUERY_SOURCE_UPDATE;
  elementId: number;
  targetDataViewId?: string;
  dataServiceLabel?: string;
}

export interface IUpdateQueryLabel extends Action {
  type: QueryActionTypes.QUERY_LABEL_UPDATE;
  elementId: number;
  label: string;
}

export type QueryActions = IUpdateQuerySource | IUpdateQueryLabel;

export const updateQuerySource = (
  elementId: number,
  targetDataViewId?: string,
  dataServiceLabel?: string
): IUpdateQuerySource => ({
  type: QueryActionTypes.QUERY_SOURCE_UPDATE,
  elementId,
  targetDataViewId,
  dataServiceLabel
});

export const updateQueryLabel = (
  elementId: number,
  label: string
): IUpdateQueryLabel => ({
  type: QueryActionTypes.QUERY_LABEL_UPDATE,
  elementId,
  label
});
