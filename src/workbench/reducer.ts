import update from "immutability-helper";

import {
  SESSION_REQUEST,
  SESSION_SUCCESS,
  QUERY_ADD,
  QUERY_DATASERVICE_UPDATE,
  QUERY_COLUMN_ADD,
  QUERY_COLUMN_REMOVE,
  QUERY_CONSTRAINT_ADD,
  QUERY_CONSTRAINT_TYPE,
  QUERY_CONSTRAINT_VALUES,
  QUERY_CONSTRAINT_REMOVE,
  SessionAction,
  QueryAction,
  QueryColumnAction,
  QueryConstraintAction
} from "workbench/actions";

interface IState {
  isLoading: boolean;
  session: any;
  graph: any;
  queries: any;
  filters: any;
  connections: any;
}

function session(
  state: IState = {
    isLoading: true,
    session: {},
    graph: {},
    queries: {},
    filters: {},
    connections: {}
  },
  action:
    | SessionAction
    | QueryAction
    | QueryColumnAction
    | QueryConstraintAction
) {
  switch (action.type) {
    case SESSION_REQUEST:
      return {
        ...state,
        isLoading: true,
        dataViewId: action.dataViewId
      };

    case SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload
      };

    case QUERY_ADD:
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

    case QUERY_DATASERVICE_UPDATE:
      return update(state, {
        queries: {
          [action.elementId]: {
            $merge: {
              ...action.query,
              Columns: [],
              Constraints: []
            }
          }
        }
      });

    case QUERY_COLUMN_ADD:
      return update(state, {
        queries: {
          [action.elementId]: {
            Columns: { $push: [action.column] }
          }
        }
      });

    case QUERY_COLUMN_REMOVE:
      return update(state, {
        queries: {
          [action.elementId]: {
            Columns: {
              $apply: (columns: Array<{ ColumnName: string }>) =>
                columns.filter(
                  ({ ColumnName }) => ColumnName !== action.columnName
                )
            }
          }
        }
      });

    case QUERY_CONSTRAINT_ADD:
      return update(state, {
        queries: {
          [action.elementId]: {
            Constraints: { $push: [action.constraint] }
          }
        }
      });

    case QUERY_CONSTRAINT_TYPE:
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

    case QUERY_CONSTRAINT_VALUES:
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

    case QUERY_CONSTRAINT_REMOVE:
      return update(state, {
        queries: {
          [action.elementId]: {
            Constraints: {
              $apply: (constraints: Array<{ ConstraintId: number }>) =>
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
