import { ActionsObservable, ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";

import { handleException } from "errorPage/epic";
import {
  DataServicesActionTypes,
  FilterCapActionTypes,
  QueryDescActionTypes,
  queryConfigError,
  filterCapabilitiesSuccess,
  dataServicesSuccess,
  queryDescribeSuccess,
  DataServicesAction,
  FilterCapabilitiesAction,
  QueryDescribeAction
} from "workbench/query/actions";
import {
  getDataServicesObs,
  getFilterCapabilitiesObs,
  getDataServiceDescriptionObs
} from "workbench/query/api";

export const dataServicesEpic = (
  action$: ActionsObservable<DataServicesAction>
) =>
  action$.pipe(
    ofType(DataServicesActionTypes.DATASERVICES_REQUEST),
    mergeMap(() =>
      getDataServicesObs().pipe(
        map(dataServices => dataServicesSuccess(dataServices)),
        catchError(error => handleException(error, queryConfigError()))
      )
    )
  );

export const filterCapabilitiesEpic = (
  action$: ActionsObservable<FilterCapabilitiesAction>
) =>
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
  action$: ActionsObservable<FilterCapabilitiesAction>,
  state$: any
) =>
  action$.pipe(
    ofType(QueryDescActionTypes.QUERY_DESCRIBE_REQUEST),
    mergeMap(() => {
      const {
        sessionReducer: {
          session: { TenantId, SessionId, QueryGraphId }
        },
        queryConfigReducer: { elementId }
      } = state$.value;

      return getDataServiceDescriptionObs(
        TenantId,
        SessionId,
        QueryGraphId,
        elementId
      ).pipe(
        // TODO: fix me.
        map((serviceDescription: { Columns: any[]; AvailableFilters: any[] }) =>
          queryDescribeSuccess(serviceDescription, elementId)
        ),
        catchError(error => handleException(error, queryConfigError()))
      );
    })
  );
