import { Action } from "redux";
import { normalize } from "normalizr";

import { graphSchema } from "workbench/schema";

import {
  ISession,
  IQueryGraphData,
  IQuery,
  IInteractiveFilter,
  IConnection,
  IQueryGraphChanges
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
    session: ISession;
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
}: ISession): ISessionSuccess => {
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

export const enum GraphChangesActionTypes {
  GRAPH_CHANGES_SUCCESS = "GRAPH_CHANGES_SUCCESS"
}

export interface IGraphChangesSuccess extends Action {
  type: GraphChangesActionTypes.GRAPH_CHANGES_SUCCESS;
  graph: IQueryGraphData;
  queries: { [key: string]: IQuery };
  filters: { [key: string]: IInteractiveFilter };
  connections: { [key: string]: IConnection };
}

export const graphChangesSuccess = (
  rawGraphChanges: IQueryGraphChanges
): IGraphChangesSuccess => {
  const normalizedGraph = normalize(rawGraphChanges.ChangesGraph, graphSchema);
  const { queries, filters, connections } = normalizedGraph.entities;

  return {
    type: GraphChangesActionTypes.GRAPH_CHANGES_SUCCESS,
    graph: normalizedGraph.result,
    queries: queries || {},
    filters: filters || {},
    connections: connections || {}
  };
};
