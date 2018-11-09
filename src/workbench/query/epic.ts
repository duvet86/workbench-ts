import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import { mergeMap, map, catchError, withLatestFrom } from "rxjs/operators";
import { Action } from "redux";

import { handleException } from "errorPage/actions";
import {
  DataServicesActionTypes,
  FilterCapActionTypes,
  QueryDescActionTypes,
  queryConfigError,
  filterCapabilitiesSuccess,
  dataServicesSuccess,
  queryDescribeSuccess
} from "workbench/query/actions";
import {
  getDataServicesObs,
  getFilterCapabilitiesObs,
  getDataServiceDescriptionObs
} from "workbench/query/api";

import { RootState } from "rootReducer";

export const dataServicesEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(DataServicesActionTypes.DATASERVICES_REQUEST),
    mergeMap(() =>
      getDataServicesObs().pipe(
        map(dataServices => dataServicesSuccess(dataServices)),
        catchError(error => handleException(error, queryConfigError()))
      )
    )
  );

export const filterCapabilitiesEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(FilterCapActionTypes.FILTER_CAPABILITIES_REQUEST),
    mergeMap(() =>
      getFilterCapabilitiesObs().pipe(
        map(filterCapabilities =>
          filterCapabilitiesSuccess(filterCapabilities)
        ),
        catchError(error => handleException(error, queryConfigError()))
      )
    )
  );

export const serviceDescriptionEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(QueryDescActionTypes.QUERY_DESCRIBE_REQUEST),
    withLatestFrom(state$),
    mergeMap(
      ([
        ,
        {
          sessionReducer: { session },
          queryConfigReducer: { elementId }
        }
      ]) => {
        if (session == null) {
          throw new Error("serviceDescriptionEpic: session cannot be null.");
        }

        const { TenantId, SessionId, QueryGraphId } = session;
        return getDataServiceDescriptionObs(
          TenantId,
          SessionId,
          QueryGraphId,
          elementId
        ).pipe(
          map(serviceDescription =>
            queryDescribeSuccess(serviceDescription, elementId)
          ),
          catchError(error => handleException(error, queryConfigError()))
        );
      }
    )
  );
