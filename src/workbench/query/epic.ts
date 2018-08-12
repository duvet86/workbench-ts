import { Epic, ofType } from "redux-observable";
import { mergeMap, map, catchError } from "rxjs/operators";

import { handleException } from "errorPage/epic";
import {
  DATASERVICES_REQUEST,
  FILTER_CAPABILITIES_REQUEST,
  QUERY_DESCRIBE_REQUEST,
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

export const dataServicesEpic: Epic<DataServicesAction, any> = action$ =>
  action$.pipe(
    ofType(DATASERVICES_REQUEST),
    mergeMap(() =>
      getDataServicesObs().pipe(
        map(dataServices => dataServicesSuccess(dataServices)),
        catchError(error => handleException(error, queryConfigError()))
      )
    )
  );

export const filterCapabilitiesEpic: Epic<
  FilterCapabilitiesAction,
  any
> = action$ =>
  action$.pipe(
    ofType(FILTER_CAPABILITIES_REQUEST),
    mergeMap(() =>
      getFilterCapabilitiesObs().pipe(
        map(filterCapabilities =>
          filterCapabilitiesSuccess(filterCapabilities)
        ),
        catchError(error => handleException(error, queryConfigError()))
      )
    )
  );

export const serviceDescriptionEpic: Epic<QueryDescribeAction, any> = (
  action$,
  state$
) =>
  action$.pipe(
    ofType(QUERY_DESCRIBE_REQUEST),
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
