import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import {
  mergeMap,
  map,
  catchError,
  filter,
  withLatestFrom
} from "rxjs/operators";
import { Action } from "redux";

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
import { IUdsFilterDescriptionDtc } from "workbench/query/types";
import { getAllowedValuesForForFilterObs } from "workbench/query/constraintSelector/api";

import { RootState } from "rootReducer";

interface IFilterDescriptionDtc extends IUdsFilterDescriptionDtc {
  AllowedValuesQueryGraphId: number;
}

export const requestAllowedValuesEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType<Action, IAddQueryConstraint>(
      QueryConstraintActionTypes.QUERY_CONSTRAINT_ADD
    ),
    filter(({ constraint: { FilterName } }) => FilterName != null),
    withLatestFrom(state$),
    map(
      ([
        {
          constraint: { FilterName: queryFilter }
        },
        {
          queryConfigReducer: { availableFilters }
        }
      ]) => {
        const describeFilter = availableFilters.find(
          ({ FilterName }) => FilterName === queryFilter
        );

        if (
          describeFilter != null &&
          describeFilter.HasAllowedValues &&
          describeFilter.AllowedValuesQueryGraphId != null
        ) {
          return describeFilter;
        }

        return null;
      }
    ),
    filter(
      (describeFilter): describeFilter is IFilterDescriptionDtc =>
        describeFilter != null
    ),
    map(({ AllowedValuesSessionId, AllowedValuesQueryGraphId, FilterName }) =>
      allowedValuesRequest(
        AllowedValuesSessionId,
        AllowedValuesQueryGraphId,
        FilterName
      )
    )
  );

export const getAllowedValuesEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType<Action, IAllowedValuesRequest>(
      AllowedValuesTypes.ALLOWED_VALUES_REQUEST
    ),
    withLatestFrom(state$),
    mergeMap(
      ([
        { allowedValuesSessionId, allowedValuesQueryGraphId, filterName },
        {
          sessionReducer: { session }
        }
      ]) => {
        if (session == null) {
          throw new Error("allowedValuesEpic: session cannot be null.");
        }

        const { TenantId } = session;

        return getAllowedValuesForForFilterObs(
          TenantId,
          allowedValuesSessionId,
          allowedValuesQueryGraphId,
          filterName
        ).pipe(
          map(allowedValues => allowedValuesSuccess(allowedValues)),
          catchError(error => handleException(error, queryConfigError()))
        );
      }
    )
  );
