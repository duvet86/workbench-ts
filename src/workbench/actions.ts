import { normalize } from "normalizr";
import { graphSchema } from "workbench/schema";

export const SESSION_REQUEST = "SESSION_REQUEST";
type SESSION_REQUEST = typeof SESSION_REQUEST;
export const SESSION_SUCCESS = "SESSION_SUCCESS";
type SESSION_SUCCESS = typeof SESSION_SUCCESS;

export interface ISessionRequest {
  type: SESSION_REQUEST;
  dataViewId?: string;
}

// TODO: fix me.
export interface ISessionSuccess {
  type: SESSION_SUCCESS;
  payload: {
    session: any;
    graph: any;
  };
}

export type SessionAction = ISessionRequest | ISessionSuccess;

export const sessionRequest = (dataViewId?: string): ISessionRequest => ({
  type: SESSION_REQUEST,
  dataViewId
});

export const sessionSuccess = ({
  InitialQueryGraph,
  ...rest
}: any): ISessionSuccess => {
  const normalizedGraph = normalize(InitialQueryGraph, graphSchema);

  return {
    type: SESSION_SUCCESS,
    payload: {
      session: { ...rest },
      graph: normalizedGraph.result,
      ...normalizedGraph.entities
    }
  };
};

export const GRAPH_SAVE_REQUEST = "GRAPH_SAVE_REQUEST";
type GRAPH_SAVE_REQUEST = typeof GRAPH_SAVE_REQUEST;
export const GRAPH_SAVE_SUCCESS = "GRAPH_SAVE_SUCCESS";
type GRAPH_SAVE_SUCCESS = typeof GRAPH_SAVE_SUCCESS;

export interface IGraphSaveChangesRequest {
  type: GRAPH_SAVE_REQUEST;
}

export interface IGraphSaveChangesSuccess {
  type: GRAPH_SAVE_SUCCESS;
}

export type GraphSaveChangesAction =
  | IGraphSaveChangesRequest
  | IGraphSaveChangesSuccess;

export const graphSaveChangesRequest = (): IGraphSaveChangesRequest => ({
  type: GRAPH_SAVE_REQUEST
});

export const graphSaveChangesSuccess = (): IGraphSaveChangesSuccess => ({
  type: GRAPH_SAVE_SUCCESS
});

export const GRAPH_REQUEST = "GRAPH_REQUEST";
type GRAPH_REQUEST = typeof GRAPH_REQUEST;
export const GRAPH_SUCCESS = "GRAPH_SUCCESS";
type GRAPH_SUCCESS = typeof GRAPH_SUCCESS;

export interface IGraphRequest {
  type: GRAPH_REQUEST;
}

export interface IGraphSuccess {
  type: GRAPH_SUCCESS;
  graphData: any;
}

export type GraphAction = IGraphRequest | IGraphSuccess;

export const graphRequest = (): IGraphRequest => ({
  type: GRAPH_REQUEST
});

export const graphSuccess = (graphData: any): IGraphSuccess => ({
  type: GRAPH_SUCCESS,
  graphData
});

export const GRAPH_PUSH_REQUEST = "GRAPH_PUSH_REQUEST";
type GRAPH_PUSH_REQUEST = typeof GRAPH_PUSH_REQUEST;
export const GRAPH_PUSH_SUCCESS = "GRAPH_PUSH_SUCCESS";
type GRAPH_PUSH_SUCCESS = typeof GRAPH_PUSH_SUCCESS;

export interface IGraphPushRequest {
  type: GRAPH_PUSH_REQUEST;
}

export interface IGraphPushSuccess {
  type: GRAPH_PUSH_SUCCESS;
}

export type GraphPushAction = IGraphPushRequest | IGraphPushSuccess;

export const graphPushRequest = (): IGraphPushRequest => ({
  type: GRAPH_PUSH_REQUEST
});

export const graphPushSuccess = (): IGraphPushSuccess => ({
  type: GRAPH_PUSH_SUCCESS
});

export const GRAPH_POP_REQUEST = "GRAPH_POP_REQUEST";
type GRAPH_POP_REQUEST = typeof GRAPH_POP_REQUEST;
export const GRAPH_POP_SUCCESS = "GRAPH_POP_SUCCESS";
type GRAPH_POP_SUCCESS = typeof GRAPH_POP_SUCCESS;

export interface IGraphPopRequest {
  type: GRAPH_POP_REQUEST;
}

export interface IGraphPopSuccess {
  type: GRAPH_POP_SUCCESS;
}

export type GraphPopAction = IGraphPopRequest | IGraphPopSuccess;

export const graphPopRequest = (): IGraphPopRequest => ({
  type: GRAPH_POP_REQUEST
});

export const graphPopSuccess = (): IGraphPopSuccess => ({
  type: GRAPH_POP_SUCCESS
});

export const QUERY_ADD = "QUERY_ADD";
type QUERY_ADD = typeof QUERY_ADD;
export const QUERY_DATASERVICE_UPDATE = "QUERY_DATASERVICE_UPDATE";
type QUERY_DATASERVICE_UPDATE = typeof QUERY_DATASERVICE_UPDATE;

export interface IAddQuery {
  type: QUERY_ADD;
  elementId: number;
  query: {
    ElementId: number;
    IsConfigured: boolean;
    TargetDataServiceId: string;
    TargetDataViewId: string;
    // TODO: ElementType fix me.
    ElementType: string;
    Columns: any[];
    Constraints: any[];
  };
}

export interface IUpdateQueryDataService {
  type: QUERY_DATASERVICE_UPDATE;
  elementId: number;
  query: any;
}

export type QueryAction = IAddQuery | IUpdateQueryDataService;

export const addQuery = (elementId: number): IAddQuery => ({
  type: QUERY_ADD,
  elementId,
  query: {
    ElementId: elementId,
    IsConfigured: false,
    TargetDataServiceId: "",
    TargetDataViewId: "",
    ElementType: "Query",
    Columns: [],
    Constraints: []
  }
});

export const updateQueryDataService = (
  elementId: number,
  query: any
): IUpdateQueryDataService => ({
  type: QUERY_DATASERVICE_UPDATE,
  elementId,
  query
});

export const QUERY_COLUMN_ADD = "QUERY_COLUMN_ADD";
type QUERY_COLUMN_ADD = typeof QUERY_COLUMN_ADD;
export const QUERY_COLUMN_REMOVE = "QUERY_COLUMN_REMOVE";
type QUERY_COLUMN_REMOVE = typeof QUERY_COLUMN_REMOVE;

export interface IAddQueryColumn {
  type: QUERY_COLUMN_ADD;
  elementId: number;
  column: any;
}

export interface IRemoveQueryColumn {
  type: QUERY_COLUMN_REMOVE;
  elementId: number;
  columnName: string;
}

export type QueryColumnAction = IAddQueryColumn | IRemoveQueryColumn;

export const addQueryColumn = (
  elementId: number,
  column: any
): IAddQueryColumn => ({
  type: QUERY_COLUMN_ADD,
  elementId,
  column
});

export const removeQueryColumn = (
  elementId: number,
  columnName: string
): IRemoveQueryColumn => ({
  type: QUERY_COLUMN_REMOVE,
  elementId,
  columnName
});

export const QUERY_CONSTRAINT_ADD = "QUERY_CONSTRAINT_ADD";
type QUERY_CONSTRAINT_ADD = typeof QUERY_CONSTRAINT_ADD;
export const QUERY_CONSTRAINT_TYPE = "QUERY_CONSTRAINT_TYPE";
type QUERY_CONSTRAINT_TYPE = typeof QUERY_CONSTRAINT_TYPE;
export const QUERY_CONSTRAINT_VALUES = "QUERY_CONSTRAINT_VALUES";
type QUERY_CONSTRAINT_VALUES = typeof QUERY_CONSTRAINT_VALUES;
export const QUERY_CONSTRAINT_REMOVE = "QUERY_CONSTRAINT_REMOVE";
type QUERY_CONSTRAINT_REMOVE = typeof QUERY_CONSTRAINT_REMOVE;

export interface IAddQueryConstraint {
  type: QUERY_CONSTRAINT_ADD;
  elementId: number;
  constraint: {
    ConstraintId: number;
    Values?: any[];
    ValuesHint: string;
  };
}

export interface IUpdateQueryConstraintType {
  type: QUERY_CONSTRAINT_TYPE;
  elementId: number;
  constraintId: number;
  constraintType: any;
}

export interface IUpdateQueryConstraintValues {
  type: QUERY_CONSTRAINT_VALUES;
  elementId: number;
  constraintId: number;
  vectorValues: any[];
  valuesHint?: string;
}

export interface IRemoveQueryConstraint {
  type: QUERY_CONSTRAINT_REMOVE;
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
  constraintId: number,
  contraintTarget: any
): IAddQueryConstraint => ({
  type: QUERY_CONSTRAINT_ADD,
  elementId,
  constraint: {
    ConstraintId: constraintId,
    Values: undefined,
    ValuesHint: "NoHint",
    ...contraintTarget
  }
});

export const updateQueryConstraintType = (
  elementId: number,
  constraintId: number,
  constraintType: any
): IUpdateQueryConstraintType => ({
  type: QUERY_CONSTRAINT_TYPE,
  elementId,
  constraintId,
  constraintType
});

export const updateQueryConstraintValues = (
  elementId: number,
  constraintId: number,
  vectorValues: any[],
  valuesHint?: string
): IUpdateQueryConstraintValues => ({
  type: QUERY_CONSTRAINT_VALUES,
  elementId,
  constraintId,
  vectorValues,
  valuesHint
});

export const removeQueryConstraint = (
  elementId: number,
  constraintId: number
): IRemoveQueryConstraint => ({
  type: QUERY_CONSTRAINT_REMOVE,
  elementId,
  constraintId
});
