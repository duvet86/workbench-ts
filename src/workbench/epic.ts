import { denormalize } from "normalizr";
import { RouterAction } from "connected-react-router";
import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import { Observable } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { handleException } from "errorPage/epic";
import { IErrorAction } from "errorPage/actions";
import {
  GraphPushActionTypes,
  GraphSaveActionTypes,
  QueryActionTypes,
  graphPushSuccess,
  graphSaveChangesSuccess,
  sessionSuccess,
  SessionActionTypes,
  SessionAction,
  GraphSaveChangesAction,
  GraphPushAction,
  QueryAction,
  ISessionSuccess,
  IUpdateQueryDataService
} from "workbench/actions";
import {
  getSessionInfoObs,
  pushGraphChangesObs,
  saveGraphObs,
  getGraphObs
} from "workbench/api";
import { graphSchema } from "workbench/schema";
import {
  openQueryConfig,
  queryDescribeRequest,
  QueryConfigAction,
  IQueryDescribeRequest,
  IOpenQueryConfig,
  QueryDescribeAction
} from "workbench/query/actions";

import { RootState } from "rootReducer";

export const sessionEpic = (
  action$: ActionsObservable<SessionAction>
): Observable<RouterAction | IErrorAction | ISessionSuccess> =>
  action$.pipe(
    ofType(SessionActionTypes.SESSION_REQUEST),
    mergeMap(({ dataViewId }: { dataViewId: string }) =>
      getSessionInfoObs(dataViewId).pipe(
        map(response => sessionSuccess(response)),
        catchError(error => handleException(error))
      )
    )
  );

export const saveGraphEpic = (
  action$: ActionsObservable<GraphSaveChangesAction>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(GraphSaveActionTypes.GRAPH_SAVE_REQUEST),
    mergeMap(() => {
      const {
        sessionReducer: { session, graph }
      } = state$.value;

      if (session == null || graph == null) {
        throw new Error(
          "serviceDescriptionEpic: session or graph cannot be null."
        );
      }

      const { TenantId, SessionId, QueryGraphId } = session;

      return saveGraphObs(TenantId, SessionId, QueryGraphId, graph, true).pipe(
        map(() => graphSaveChangesSuccess()),
        catchError(error => handleException(error))
      );
    })
  );

// export const getGraphEpic = action$ =>
//   action$.pipe(
//     ofType(GRAPH_REQUEST),
//     mergeMap(() =>
//       getGraphObs().pipe(
//         map(response => graphSuccess(response)),
//         catchError(error => handleException(error))
//       )
//     )
//   );

export const pushGraphChangesEpic = (
  action$: ActionsObservable<GraphPushAction>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(GraphPushActionTypes.GRAPH_PUSH_REQUEST),
    mergeMap(() => {
      const {
        sessionReducer: { session }
      } = state$.value;

      if (session == null) {
        throw new Error("serviceDescriptionEpic: session cannot be null.");
      }

      const { TenantId, SessionId, QueryGraphId } = session;

      return pushGraphChangesObs(TenantId, SessionId, QueryGraphId).pipe(
        map(() => graphPushSuccess()),
        catchError(error => handleException(error))
      );
    })
  );

// export const popGraphChangesEpic = (action$, state$) =>
//   action$.pipe(
//     ofType(CLOSE_QUERY_CONFIG),
//     mergeMap(() => {
//       const {
//         sessionReducer: { session: { TenantId, SessionId, QueryGraphId } }
//       } = state$.value;

//       return popGraphChangesObs(TenantId, SessionId, QueryGraphId).pipe(
//         map(response => graphPopSuccess(response)),
//         catchError(error => handleException(error))
//       );
//     })
//   );

export const addQueryEpic = (
  action$: ActionsObservable<QueryAction | QueryConfigAction>
): Observable<IOpenQueryConfig> =>
  action$.pipe(
    ofType(QueryActionTypes.QUERY_ADD),
    map(({ elementId }: { elementId: number }) => openQueryConfig(elementId))
  );

export const updateQueryDataServiceEpic = (
  action$: ActionsObservable<QueryAction | QueryDescribeAction>,
  state$: StateObservable<RootState>
): Observable<RouterAction | IErrorAction | IQueryDescribeRequest> =>
  action$.pipe(
    ofType<IUpdateQueryDataService>(QueryActionTypes.QUERY_DATASERVICE_UPDATE),
    mergeMap(({ elementId, query: { TargetDataViewId } }) => {
      if (TargetDataViewId == null) {
        return [openQueryConfig(elementId)];
      }

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
        mergeMap(() =>
          getGraphObs(
            TenantId,
            SessionId,
            QueryGraphId,
            graph.NextChangeNumber
          ).pipe(map(() => queryDescribeRequest()))
        ),
        catchError(error => handleException(error))
      );
    })
  );
