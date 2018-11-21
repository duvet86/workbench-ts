import update from "immutability-helper";

import {
  SessionActionTypes,
  GraphChangesActionTypes,
  IGraphChangesSuccess,
  SessionAction
} from "workbench/actions";
import { QueryAction, QueryActionTypes } from "workbench/query/actions";
import { QueryColumnAction } from "workbench/query/columns/actions";
import { QueryConstraintAction } from "workbench/query/constraints/actions";

import {
  ISession,
  IQueryGraphData,
  IQuery,
  IInteractiveFilter,
  IConnection
} from "workbench/types";

import queriesReducer from "workbench/query/queriesReducer";

interface ISessionState {
  isLoading: boolean;
  dataViewId: string | undefined;
  session: ISession | undefined;
  graph: IQueryGraphData | undefined;
  queries: { [id: string]: IQuery };
  filters: { [id: string]: IInteractiveFilter };
  connections: { [id: string]: IConnection };
}

const initialState: ISessionState = {
  isLoading: true,
  dataViewId: undefined,
  session: undefined,
  graph: undefined,
  queries: {},
  filters: {},
  connections: {}
};

function session(
  state: ISessionState = {
    ...initialState
  },
  action:
    | SessionAction
    | IGraphChangesSuccess
    | QueryAction
    | QueryColumnAction
    | QueryConstraintAction
): ISessionState {
  switch (action.type) {
    case SessionActionTypes.SESSION_REQUEST:
      return {
        ...initialState,
        isLoading: true,
        dataViewId: action.dataViewId
      };

    case SessionActionTypes.SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.graphData
      };

    case GraphChangesActionTypes.GRAPH_CHANGES_SUCCESS:
      return update(state, {
        graph: {
          $merge: {
            ...action.graph
          }
        },
        queries: {
          $merge: {
            ...action.queries
          }
        },
        filters: {
          $merge: {
            ...action.filters
          }
        },
        connections: {
          $merge: {
            ...action.connections
          }
        }
      });

    case QueryActionTypes.QUERY_ADD:
      return update(state, {
        graph: { Queries: { $push: [action.elementId] } },
        queries: {
          $merge: {
            [action.elementId]: {
              ...action.query
            }
          }
        }
      });

    default:
      return {
        ...state,
        queries: queriesReducer(state.queries, action)
      };
  }
}

export default session;
