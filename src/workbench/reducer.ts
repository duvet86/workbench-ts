import update from "immutability-helper";

import {
  SessionActionTypes,
  QueryActionTypes,
  QueryColumnActionTypes,
  QueryConstraintActionTypes,
  SessionAction,
  QueryAction,
  QueryColumnAction,
  QueryConstraintAction
} from "workbench/actions";

import {
  ISessionDtc,
  IQueryGraphDataDtc,
  IQuery,
  IInteractiveFilter,
  IConnection,
  IColumn,
  IConstraint
} from "workbench/types";

interface ISessionState {
  isLoading: boolean;
  dataViewId?: string;
  session: ISessionDtc;
  graph: IQueryGraphDataDtc;
  queries: { [id: string]: IQuery };
  filters: { [id: string]: IInteractiveFilter };
  connections: { [id: string]: IConnection };
}

function session(
  state: ISessionState = {
    isLoading: true,
    session: {} as ISessionDtc,
    graph: {} as IQueryGraphDataDtc,
    queries: {},
    filters: {},
    connections: {}
  },
  action:
    | SessionAction
    | QueryAction
    | QueryColumnAction
    | QueryConstraintAction
): ISessionState {
  switch (action.type) {
    case SessionActionTypes.SESSION_REQUEST:
      return {
        ...state,
        isLoading: true,
        dataViewId: action.dataViewId
      };

    case SessionActionTypes.SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload
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

    case QueryActionTypes.QUERY_DATASERVICE_UPDATE:
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
            Columns: { $push: [action.column] }
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
            }
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

    case QueryConstraintActionTypes.QUERY_CONSTRAINT_TYPE:
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

    case QueryConstraintActionTypes.QUERY_CONSTRAINT_VALUES:
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
