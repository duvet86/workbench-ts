import { Action } from "redux";
import { normalize } from "normalizr";

import { graphSchema } from "workbench/schema";

import {
  ISession,
  IQueryGraphData,
  IQuery,
  IInteractiveFilter,
  IConnection
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
