import update from "immutability-helper";

import { GraphActions, GraphActionTypes } from "workbench/graphActions";
import { SessionActionTypes, SessionAction } from "workbench/sessionActions";
import { QueryActions } from "workbench/query/actions";
import { QueryColumnAction } from "workbench/query/columns/actions";
import { QueryConstraintAction } from "workbench/query/constraints/actions";

import {
  ISession,
  IQueryGraphData,
  IQuery,
  IInteractiveFilter,
  IConnection
} from "workbench/types";

import querySubReducer from "workbench/query/querySubReducer";

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
    | GraphActions
    | QueryActions
    | QueryColumnAction
    | QueryConstraintAction
): ISessionState {
  switch (action.type) {
    case SessionActionTypes.SESSION_REQUEST:
      return {
        ...initialState,
        dataViewId: action.dataViewId
      };

    case SessionActionTypes.SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.graphData
      };

    case GraphActionTypes.GRAPH_CHANGES_SUCCESS:
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

    case GraphActionTypes.GRAPH_QUERY_ADD:
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

    case GraphActionTypes.GRAPH_FILTER_ADD:
      return update(state, {
        graph: { InteractiveFilters: { $push: [action.elementId] } },
        filters: {
          $merge: {
            [action.elementId]: {
              ...action.filter
            }
          }
        }
      });

    default:
      return {
        ...state,
        queries: querySubReducer(state.queries, action)
      };
  }
}

export default session;
