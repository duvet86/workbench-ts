import { Action } from "redux";

import { IQuery } from "workbench/types";
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

export type QueryDescribeAction = IQueryDescribeRequest | IQueryDescribeSuccess;

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
  QUERY_ADD = "QUERY_ADD",
  QUERY_SOURCE_UPDATE = "QUERY_SOURCE_UPDATE",
  QUERY_LABEL_UPDATE = "QUERY_LABEL_UPDATE"
}

export interface IAddQuery extends Action {
  type: QueryActionTypes.QUERY_ADD;
  elementId: number;
  query: IQuery;
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

export type QueryAction = IAddQuery | IUpdateQuerySource | IUpdateQueryLabel;

export const addQuery = (
  elementId: number,
  x: number,
  y: number
): IAddQuery => ({
  type: QueryActionTypes.QUERY_ADD,
  elementId,
  query: {
    Label: "",
    ElementId: elementId,
    IsConfigured: false,
    TargetDataServiceId: "",
    TargetDataViewId: "",
    ElementType: "Query",
    Columns: [],
    SortBys: [],
    Constraints: [],
    IsQueryGraphResult: false,
    ChangeNumber: 0,
    ForceRun: false,
    State: "New",
    LayoutX: x,
    LayoutY: y
  }
});

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
