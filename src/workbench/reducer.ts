import update from "immutability-helper";

import {
  SessionActionTypes,
  GraphChangesActionTypes,
  IGraphChangesSuccess,
  SessionAction
} from "workbench/actions";
import { QueryAction, QueryActionTypes } from "workbench/query/actions";
import {
  QueryColumnAction,
  QueryColumnActionTypes
} from "workbench/query/columnSelector/actions";
import {
  QueryConstraintAction,
  QueryConstraintActionTypes
} from "workbench/query/constraintSelector/actions";

import {
  ISession,
  IQueryGraphData,
  IQuery,
  IInteractiveFilter,
  IConnection,
  IColumn,
  IConstraint
} from "workbench/types";

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

    case QueryActionTypes.QUERY_LABEL_UPDATE:
      return update(state, {
        queries: {
          [action.elementId]: {
            $merge: {
              Label: action.label
            }
          }
        }
      });

    case QueryActionTypes.QUERY_SOURCE_UPDATE:
      return update(state, {
        queries: {
          [action.elementId]: {
            $merge: {
              TargetDataViewId: action.targetDataViewId,
              Columns: [],
              Constraints: []
            }
          }
        }
      });

    case QueryColumnActionTypes.QUERY_COLUMN_ADD:
      return update(state, {
        queries: {
          [action.elementId]: {
            Columns: { $push: [action.column] },
            DataTableId: undefined // NOTE: remove DataTableId to retrigger graph changes.
          }
        }
      });

    case QueryColumnActionTypes.QUERY_COLUMN_REMOVE:
      return update(state, {
        queries: {
          [action.elementId]: {
            Columns: {
              $apply: (columns: IColumn[]) =>
                columns.filter(
                  ({ ColumnName }) => ColumnName !== action.columnName
                )
            },
            DataTableId: undefined // NOTE: remove DataTableId to retrigger graph changes.
          }
        }
      });

    case QueryConstraintActionTypes.QUERY_CONSTRAINT_ADD:
      return update(state, {
        queries: {
          [action.elementId]: {
            Constraints: { $push: [action.constraint] }
          }
        }
      });

    case QueryConstraintActionTypes.QUERY_CONSTRAINT_TYPE_UPDATE:
      return update(state, {
        queries: {
          [action.elementId]: {
            Constraints: {
              [action.constraintId]: {
                $merge: {
                  FilterType: action.constraintType
                }
              }
            }
          }
        }
      });

    case QueryConstraintActionTypes.QUERY_CONSTRAINT_VALUES_UPDATE:
      return update(state, {
        queries: {
          [action.elementId]: {
            Constraints: {
              [action.constraintId]: {
                $merge: {
                  Values: action.vectorValues,
                  ValuesHint: action.valuesHint
                }
              }
            }
          }
        }
      });

    case QueryConstraintActionTypes.QUERY_CONSTRAINT_REMOVE:
      return update(state, {
        queries: {
          [action.elementId]: {
            Constraints: {
              $apply: (constraints: IConstraint[]) =>
                constraints.filter(
                  ({ ConstraintId }) => ConstraintId !== action.constraintId
                )
            }
          }
        }
      });

    default:
      return state;
  }
}

export default session;
