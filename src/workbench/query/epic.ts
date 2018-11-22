import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import { mergeMap, map, catchError, withLatestFrom } from "rxjs/operators";
import { Action } from "redux";

import { handleExceptionObs } from "common/errorBoundary/actions";
import {
  QueryDescActionTypes,
  queryDescribeSuccess
} from "workbench/query/actions";
import {
  DataServicesActionTypes,
  dataServicesSuccess
} from "workbench/query/source/actions";
import {
  FilterCapActionTypes,
  filterCapabilitiesSuccess
} from "workbench/query/constraints/actions";
import {
  IQueryDataTableRequest,
  QueryDataTableActionTypes,
  queryDataTableSuccess,
  queryDataTableRequest
} from "workbench/query/dataPreview/actions";
import { updateGraphEpic } from "workbench/epic";

import {
  getDataServicesObs,
  getFilterCapabilitiesObs,
  getDataServiceDescriptionObs,
  getDataTablePageObs
} from "workbench/query/api";

import { RootState } from "rootReducer";

export const dataServicesEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(DataServicesActionTypes.DATASERVICES_REQUEST),
    mergeMap(() =>
      getDataServicesObs().pipe(
        map(dataServices => dataServicesSuccess(dataServices)),
        catchError(error => handleExceptionObs(error))
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
        catchError(error => handleExceptionObs(error))
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
          sessionGraph: { session },
          queryConfig: { elementId }
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
          catchError(error => handleExceptionObs(error))
        );
      }
    )
  );

export const getDataTableEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType<Action, IQueryDataTableRequest>(
      QueryDataTableActionTypes.QUERY_DATATABLE_REQUEST
    ),
    withLatestFrom(state$),
    mergeMap(
      ([
        { pageSize, pageNumber },
        {
          sessionGraph: { session, graph, queries, filters, connections },
          queryConfig: { elementId }
        }
      ]) => {
        if (session == null || graph == null) {
          throw new Error(
            "getDataTableEpic: session and graph cannot be null."
          );
        }
        if (queries[elementId].Exception != null) {
          throw new Error(queries[elementId].Exception);
        }

        const { TenantId, SessionId } = session;
        const dataTableId = queries[elementId].DataTableId;
        // If the query dataTableId is not null get the rows.
        if (dataTableId != null) {
          return getDataTablePageObs(
            TenantId,
            SessionId,
            dataTableId,
            pageSize,
            pageNumber
          ).pipe(
            map(rows => queryDataTableSuccess(rows)),
            catchError(error => handleExceptionObs(error))
          );
        }

        // Otherwise apply changes with IsConfigured and ForceRun set to true
        // and then retrigger queryDataTableRequest action.
        queries[elementId].IsConfigured = true;
        queries[elementId].ForceRun = true;

        return updateGraphEpic(session, graph, queries, filters, connections, [
          queryDataTableRequest(pageSize, pageNumber)
        ]);
      }
    ),
    catchError(error => handleExceptionObs(error))
  );
