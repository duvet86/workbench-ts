import update from "immutability-helper";

import { QueryActions, QueryActionTypes } from "workbench/query/actions";
import {
  QueryColumnAction,
  QueryColumnActionTypes
} from "workbench/query/columns/actions";
import {
  QueryConstraintAction,
  QueryConstraintActionTypes
} from "workbench/query/constraints/actions";

import { IQuery, IColumn, IConstraint } from "workbench/types";

interface IQueryState {
  [id: string]: IQuery;
}

function session(
  state: IQueryState = {},
  action: QueryActions | QueryColumnAction | QueryConstraintAction
): IQueryState {
  switch (action.type) {
    case QueryActionTypes.QUERY_LABEL_UPDATE:
      return update(state, {
        [action.elementId]: {
          $merge: {
            Label: action.label
          }
        }
      });

    case QueryActionTypes.QUERY_SOURCE_UPDATE:
      return update(state, {
        [action.elementId]: {
          $merge: {
            TargetDataViewId: action.targetDataViewId,
            Columns: [],
            Constraints: []
          }
        }
      });

    case QueryColumnActionTypes.QUERY_COLUMN_ADD:
      return update(state, {
        [action.elementId]: {
          Columns: { $push: [action.column] },
          DataTableId: { $set: undefined } // NOTE: remove DataTableId to retrigger graph changes.
        }
      });

    case QueryColumnActionTypes.QUERY_COLUMN_REMOVE:
      return update(state, {
        [action.elementId]: {
          Columns: {
            $apply: (columns: IColumn[]) =>
              columns.filter(
                ({ OutputColumnName }) => OutputColumnName !== action.columnName
              )
          },
          DataTableId: { $set: undefined } // NOTE: remove DataTableId to retrigger graph changes.
        }
      });

    case QueryConstraintActionTypes.QUERY_CONSTRAINT_ADD:
      return update(state, {
        [action.elementId]: {
          Constraints: { $push: [action.constraint] }
        }
      });

    case QueryConstraintActionTypes.QUERY_CONSTRAINT_TYPE_UPDATE:
      return update(state, {
        [action.elementId]: {
          Constraints: {
            [action.constraintId]: {
              $merge: {
                FilterType: action.constraintType
              }
            }
          }
        }
      });

    case QueryConstraintActionTypes.QUERY_CONSTRAINT_VALUES_UPDATE:
      return update(state, {
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
      });

    case QueryConstraintActionTypes.QUERY_CONSTRAINT_REMOVE:
      return update(state, {
        [action.elementId]: {
          Constraints: {
            $apply: (constraints: IConstraint[]) =>
              constraints.filter(
                ({ ConstraintIndex }) =>
                  ConstraintIndex !== action.constraintIndex
              )
          }
        }
      });

    default:
      return state;
  }
}

export default session;
