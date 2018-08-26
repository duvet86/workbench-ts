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
  ISessionSuccess
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
  QueryDescribeAction,
  IQueryDescribeRequest,
  IOpenQueryConfig
} from "workbench/query/actions";

import {
  ISessionDtc,
  IQueryGraphDataDtc,
  IQuery,
  IInteractiveFilter,
  IConnection
} from "workbench/types";

interface IState {
  sessionReducer: {
    session: ISessionDtc;
    graph: IQueryGraphDataDtc;
    queries: IQuery[];
    filters: IInteractiveFilter[];
    connections: IConnection[];
  };
}

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
  state$: StateObservable<IState>
) =>
  action$.pipe(
    ofType(GraphSaveActionTypes.GRAPH_SAVE_REQUEST),
    mergeMap(() => {
      const {
        sessionReducer: {
          session: { TenantId, SessionId, QueryGraphId },
          graph
        }
      } = state$.value;

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
  state$: StateObservable<IState>
) =>
  action$.pipe(
    ofType(GraphPushActionTypes.GRAPH_PUSH_REQUEST),
    mergeMap(() => {
      const {
        sessionReducer: {
          session: { TenantId, SessionId, QueryGraphId }
        }
      } = state$.value;

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

interface IDataserviceUpdate {
  elementId: number;
  query: IQuery;
}

export const updateQueryDataServiceEpic = (
  action$: ActionsObservable<QueryAction | QueryDescribeAction>,
  state$: StateObservable<IState>
): Observable<RouterAction | IErrorAction | IQueryDescribeRequest> =>
  action$.pipe(
    ofType(QueryActionTypes.QUERY_DATASERVICE_UPDATE),
    mergeMap(
      ({ elementId, query: { TargetDataViewId } }: IDataserviceUpdate) => {
        if (!TargetDataViewId) {
          return [openQueryConfig(elementId)];
        }

        const {
          sessionReducer: {
            session: { TenantId, SessionId, QueryGraphId },
            graph,
            queries,
            filters,
            connections
          }
        } = state$.value;

        const denormalizedGraph = denormalize(graph, graphSchema, {
          queries,
          filters,
          connections
        });

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
      }
    )
  );
