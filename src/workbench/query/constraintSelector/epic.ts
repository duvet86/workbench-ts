import { denormalize } from "normalizr";
import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import { mergeMap, map, catchError, filter } from "rxjs/operators";
import { Action } from "redux";

import { graphSchema } from "workbench/schema";

import { handleException } from "errorPage/actions";
import {
  allowedValuesSuccess,
  allowedValuesRequest,
  AllowedValuesTypes,
  IAllowedValuesRequest
} from "workbench/query/constraintSelector/actions";
import { queryConfigError } from "workbench/query/actions";
import {
  QueryConstraintActionTypes,
  IAddQueryConstraint
} from "workbench/actions";

import { saveGraphObs } from "workbench/api";
import { getAllowedValuesForForFilterObs } from "workbench/query/constraintSelector/api";

import { RootState } from "rootReducer";

// export const addConstraintUpdateGraphEpic = (
//   action$: ActionsObservable<Action>
// ) =>
//   action$.pipe(
//     ofType<Action, IAddQueryConstraint>(
//       QueryConstraintActionTypes.QUERY_CONSTRAINT_ADD
//     ),
//     map(({ constraint: { FilterName } }) => allowedValuesRequest(FilterName!))
//   );

export const requestAllowedValuesEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    filter(
      (action): action is IAddQueryConstraint =>
        action.type === QueryConstraintActionTypes.QUERY_CONSTRAINT_ADD &&
        (action as IAddQueryConstraint).constraint.FilterName != null
    ),
    mergeMap(({ constraint: { FilterName } }) => {
      const {
        sessionReducer: { session, graph, queries, filters, connections }
      } = state$.value;

      if (session == null || graph == null) {
        throw new Error(
          "serviceDescriptionEpic: session or graph cannot be null."
        );
      }

      const denormalizedGraph = denormalize(graph, graphSchema, {
        queries,
        filters,
        connections
      });

      const { TenantId, SessionId, QueryGraphId } = session;
      return saveGraphObs(
        TenantId,
        SessionId,
        QueryGraphId,
        denormalizedGraph
      ).pipe(
        map(() => allowedValuesRequest(FilterName!)),
        catchError(error => handleException(error))
      );
    })
  );

export const getAllowedValuesEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType<Action, IAllowedValuesRequest>(
      AllowedValuesTypes.ALLOWED_VALUES_REQUEST
    ),
    mergeMap(({ filterName }) => {
      const {
        sessionReducer: { session }
      } = state$.value;

      if (session == null) {
        throw new Error("allowedValuesEpic: session cannot be null.");
      }

      const { TenantId, SessionId, QueryGraphId } = session;

      return getAllowedValuesForForFilterObs(
        TenantId,
        SessionId,
        QueryGraphId,
        filterName
      ).pipe(
        map(allowedValues => allowedValuesSuccess(allowedValues)),
        catchError(error => handleException(error, queryConfigError()))
      );
    })
  );
