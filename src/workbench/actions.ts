import { Action } from "redux";
import { normalize } from "normalizr";

import { graphSchema } from "workbench/schema";

import {
  ISessionDtc,
  IQueryGraphData,
  IQuery,
  IColumn,
  IConstraint,
  IInteractiveFilter,
  IConnection,
  IQueryGraphChangesDtc
} from "workbench/types";

export const enum SessionActionTypes {
  SESSION_REQUEST = "SESSION_REQUEST",
  SESSION_SUCCESS = "SESSION_SUCCESS"
}

export interface ISessionRequest extends Action {
  type: SessionActionTypes.SESSION_REQUEST;
  dataViewId?: string;
}

export interface ISessionSuccess extends Action {
  type: SessionActionTypes.SESSION_SUCCESS;
  graphData: {
    session: ISessionDtc;
    graph: IQueryGraphData;
    queries: { [key: string]: IQuery };
    filters: { [key: string]: IInteractiveFilter };
    connections: { [key: string]: IConnection };
  };
}

export type SessionAction = ISessionRequest | ISessionSuccess;

export const sessionRequest = (dataViewId?: string): ISessionRequest => ({
  type: SessionActionTypes.SESSION_REQUEST,
  dataViewId
});

export const sessionSuccess = ({
  InitialQueryGraph,
  ...sessionInfo
}: ISessionDtc): ISessionSuccess => {
  const normalizedGraph = normalize(InitialQueryGraph, graphSchema);
  const { queries, filters, connections } = normalizedGraph.entities;

  return {
    type: SessionActionTypes.SESSION_SUCCESS,
    graphData: {
      session: { ...sessionInfo },
      graph: normalizedGraph.result,
      queries: queries || {},
      filters: filters || {},
      connections: connections || {}
    }
  };
};

export const enum GraphSaveActionTypes {
  GRAPH_SAVE_REQUEST = "GRAPH_SAVE_REQUEST",
  GRAPH_SAVE_SUCCESS = "GRAPH_SAVE_SUCCESS"
}

export interface IGraphSaveChangesRequest extends Action {
  type: GraphSaveActionTypes.GRAPH_SAVE_REQUEST;
}

export interface IGraphSaveChangesSuccess extends Action {
  type: GraphSaveActionTypes.GRAPH_SAVE_SUCCESS;
}

export type GraphSaveChangesAction =
  | IGraphSaveChangesRequest
  | IGraphSaveChangesSuccess;

export const graphSaveChangesRequest = (): IGraphSaveChangesRequest => ({
  type: GraphSaveActionTypes.GRAPH_SAVE_REQUEST
});

export const graphSaveChangesSuccess = (): IGraphSaveChangesSuccess => ({
  type: GraphSaveActionTypes.GRAPH_SAVE_SUCCESS
});

export const enum GraphActionTypes {
  GRAPH_REQUEST = "GRAPH_REQUEST",
  GRAPH_SUCCESS = "GRAPH_SUCCESS"
}

export interface IGraphRequest extends Action {
  type: GraphActionTypes.GRAPH_REQUEST;
}

export interface IGraphSuccess extends Action {
  type: GraphActionTypes.GRAPH_SUCCESS;
  graphData: IQueryGraphData;
}

export type GraphAction = IGraphRequest | IGraphSuccess;

export const graphRequest = (): IGraphRequest => ({
  type: GraphActionTypes.GRAPH_REQUEST
});

export const graphSuccess = (graphData: IQueryGraphData): IGraphSuccess => ({
  type: GraphActionTypes.GRAPH_SUCCESS,
  graphData
});

export const enum GraphPushActionTypes {
  GRAPH_PUSH_REQUEST = "GRAPH_PUSH_REQUEST",
  GRAPH_PUSH_SUCCESS = "GRAPH_PUSH_SUCCESS"
}

export interface IGraphPushRequest extends Action {
  type: GraphPushActionTypes.GRAPH_PUSH_REQUEST;
}

export interface IGraphPushSuccess extends Action {
  type: GraphPushActionTypes.GRAPH_PUSH_SUCCESS;
}

export type GraphPushAction = IGraphPushRequest | IGraphPushSuccess;

export const graphPushRequest = (): IGraphPushRequest => ({
  type: GraphPushActionTypes.GRAPH_PUSH_REQUEST
});

export const graphPushSuccess = (): IGraphPushSuccess => ({
  type: GraphPushActionTypes.GRAPH_PUSH_SUCCESS
});

export const enum GraphPopActionTypes {
  GRAPH_POP_REQUEST = "GRAPH_POP_REQUEST",
  GRAPH_POP_SUCCESS = "GRAPH_POP_SUCCESS"
}

export interface IGraphPopRequest extends Action {
  type: GraphPopActionTypes.GRAPH_POP_REQUEST;
}

export interface IGraphPopSuccess extends Action {
  type: GraphPopActionTypes.GRAPH_POP_SUCCESS;
}

export type GraphPopAction = IGraphPopRequest | IGraphPopSuccess;

export const graphPopRequest = (): IGraphPopRequest => ({
  type: GraphPopActionTypes.GRAPH_POP_REQUEST
});

export const graphPopSuccess = (): IGraphPopSuccess => ({
  type: GraphPopActionTypes.GRAPH_POP_SUCCESS
});

export const enum QueryActionTypes {
  QUERY_ADD = "QUERY_ADD",
  QUERY_CHANGES_UPDATE = "QUERY_CHANGES_UPDATE",
  QUERY_LABEL_UPDATE = "QUERY_LABEL_UPDATE",
  QUERY_DATASERVICE_UPDATE = "QUERY_DATASERVICE_UPDATE"
}

export interface IUpdateQueryChanges extends Action {
  type: QueryActionTypes.QUERY_CHANGES_UPDATE;
  graph: IQueryGraphData;
  queries: { [key: string]: IQuery };
  filters: { [key: string]: IInteractiveFilter };
  connections: { [key: string]: IConnection };
}

export interface IAddQuery extends Action {
  type: QueryActionTypes.QUERY_ADD;
  elementId: number;
  query: IQuery;
}

export interface IUpdateQueryDataService extends Action {
  type: QueryActionTypes.QUERY_DATASERVICE_UPDATE;
  elementId: number;
  targetDataViewId?: string;
  dataServiceLabel?: string;
}

export interface IUpdateQueryLabel extends Action {
  type: QueryActionTypes.QUERY_LABEL_UPDATE;
  elementId: number;
  label: string;
}

export type QueryAction =
  | IAddQuery
  | IUpdateQueryChanges
  | IUpdateQueryDataService
  | IUpdateQueryLabel;

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

export const updateQueryChanges = (
  rawGraphChanges: IQueryGraphChangesDtc
): IUpdateQueryChanges => {
  const normalizedGraph = normalize(rawGraphChanges.ChangesGraph, graphSchema);
  const { queries, filters, connections } = normalizedGraph.entities;

  return {
    type: QueryActionTypes.QUERY_CHANGES_UPDATE,
    graph: normalizedGraph.result,
    queries: queries || {},
    filters: filters || {},
    connections: connections || {}
  };
};

export const updateQueryDataService = (
  elementId: number,
  targetDataViewId?: string,
  dataServiceLabel?: string
): IUpdateQueryDataService => ({
  type: QueryActionTypes.QUERY_DATASERVICE_UPDATE,
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

export const enum QueryConstraintActionTypes {
  QUERY_CONSTRAINT_ADD = "QUERY_CONSTRAINT_ADD",
  QUERY_CONSTRAINT_TYPE_UPDATE = "QUERY_CONSTRAINT_TYPE_UPDATE",
  QUERY_CONSTRAINT_VALUES_UPDATE = "QUERY_CONSTRAINT_VALUES_UPDATE",
  QUERY_CONSTRAINT_REMOVE = "QUERY_CONSTRAINT_REMOVE"
}

export interface IAddQueryConstraint extends Action {
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_ADD;
  elementId: number;
  constraint: IConstraint;
}

export interface IUpdateQueryConstraintType extends Action {
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_TYPE_UPDATE;
  elementId: number;
  constraintId: number;
  constraintType: string;
}

export interface IUpdateQueryConstraintValues extends Action {
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_VALUES_UPDATE;
  elementId: number;
  constraintId: number;
  vectorValues: any[][];
  valuesHint?: string;
}

export interface IRemoveQueryConstraint extends Action {
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_REMOVE;
  elementId: number;
  constraintId: number;
}

export type QueryConstraintAction =
  | IAddQueryConstraint
  | IUpdateQueryConstraintType
  | IUpdateQueryConstraintValues
  | IRemoveQueryConstraint;

export const addQueryConstraint = (
  elementId: number,
  constraint: IConstraint
): IAddQueryConstraint => ({
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_ADD,
  elementId,
  constraint
});

export const updateQueryConstraintType = (
  elementId: number,
  constraintId: number,
  constraintType: string
): IUpdateQueryConstraintType => ({
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_TYPE_UPDATE,
  elementId,
  constraintId,
  constraintType
});

export const updateQueryConstraintValues = (
  elementId: number,
  constraintId: number,
  vectorValues: any[][],
  valuesHint?: string
): IUpdateQueryConstraintValues => ({
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_VALUES_UPDATE,
  elementId,
  constraintId,
  vectorValues,
  valuesHint
});

export const removeQueryConstraint = (
  elementId: number,
  constraintId: number
): IRemoveQueryConstraint => ({
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_REMOVE,
  elementId,
  constraintId
});
