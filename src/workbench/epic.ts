import { denormalize } from "normalizr";
import { Epic, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";

import { handleException } from "errorPage/epic";
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
  QueryAction
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
  QueryDescribeAction
} from "workbench/query/actions";

export const sessionEpic: Epic<SessionAction, any> = action$ =>
  action$.pipe(
    ofType(SessionActionTypes.SESSION_REQUEST),
    mergeMap(({ dataViewId }: { dataViewId: string }) =>
      getSessionInfoObs(dataViewId).pipe(
        map(response => sessionSuccess(response)),
        catchError(error => handleException(error))
      )
    )
  );

export const saveGraphEpic: Epic<GraphSaveChangesAction, any> = (
  action$,
  state$
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

// export const getGraphEpic: Epic<GraphAction, any> = action$ =>
//   action$.pipe(
//     ofType(GRAPH_REQUEST),
//     mergeMap(() =>
//       getGraphObs().pipe(
//         map(response => graphSuccess(response)),
//         catchError(error => handleException(error))
//       )
//     )
//   );

export const pushGraphChangesEpic: Epic<GraphPushAction, any> = (
  action$,
  state$
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

export const addQueryEpic: Epic<
  QueryAction | QueryConfigAction,
  any
> = action$ =>
  action$.pipe(
    ofType(QueryActionTypes.QUERY_ADD),
    map(({ elementId }: { elementId: number }) => openQueryConfig(elementId))
  );

interface IDataservice {
  elementId: number;
  query: { TargetDataViewId: number };
}

export const updateQueryDataServiceEpic: Epic<
  QueryAction | QueryDescribeAction,
  any
> = (action$, state$) =>
  action$.pipe(
    ofType(QueryActionTypes.QUERY_DATASERVICE_UPDATE),
    mergeMap(({ elementId, query: { TargetDataViewId } }: IDataservice) => {
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
          ).pipe(
            map(() => queryDescribeRequest()),
            catchError(error => handleException(error))
          )
        ),
        catchError(error => handleException(error))
      );
    })
  );
