import { denormalize } from "normalizr";
import { Action } from "redux";
import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap, withLatestFrom } from "rxjs/operators";

import { handleExceptionObs } from "common/errorBoundary/actions";
import {
  ISession,
  IQueryGraphData,
  IQuery,
  IInteractiveFilter,
  IConnection
} from "workbench/types";
import {
  getSessionInfoObs,
  pushGraphChangesObs,
  saveGraphObs,
  getGraphObs
} from "workbench/api";
import { graphSchema } from "workbench/schema";

import {
  GraphPushActionTypes,
  GraphSaveActionTypes,
  graphPushSuccess,
  graphSaveChangesSuccess,
  sessionSuccess,
  SessionActionTypes,
  SessionAction,
  ISessionRequest,
  graphChangesSuccess
} from "workbench/actions";
import {
  queryDescribeRequest,
  IAddQuery,
  IUpdateQuerySource,
  QueryActionTypes
} from "workbench/query/actions";
import { openQueryConfig } from "workbench/query/config/actions";

import { RootState } from "rootReducer";

// This a utility epic.
export const updateGraphEpic = (
  { TenantId, SessionId, QueryGraphId }: ISession,
  graph: IQueryGraphData,
  queries: { [id: string]: IQuery },
  filters: { [id: string]: IInteractiveFilter },
  connections: { [id: string]: IConnection },
  actions: Action[]
) => {
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
        mergeMap(queryChanges => [
          graphChangesSuccess(queryChanges),
          ...actions
        ])
      )
    ),
    catchError(error => handleExceptionObs(error))
  );
};

export const sessionEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType<SessionAction, ISessionRequest>(SessionActionTypes.SESSION_REQUEST),
    mergeMap(({ dataViewId }) =>
      getSessionInfoObs(dataViewId).pipe(
        map(response => sessionSuccess(response)),
        catchError(error => handleExceptionObs(error))
      )
    )
  );

export const saveGraphEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(GraphSaveActionTypes.GRAPH_SAVE_REQUEST),
    withLatestFrom(state$),
    mergeMap(([, { session: { session, graph } }]) => {
      if (session == null || graph == null) {
        throw new Error("saveGraphEpic: session or graph cannot be null.");
      }

      const { TenantId, SessionId, QueryGraphId } = session;
      return saveGraphObs(TenantId, SessionId, QueryGraphId, graph, true).pipe(
        map(() => graphSaveChangesSuccess()),
        catchError(error => handleExceptionObs(error))
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
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(GraphPushActionTypes.GRAPH_PUSH_REQUEST),
    withLatestFrom(state$),
    mergeMap(([, { session: { session } }]) => {
      if (session == null) {
        throw new Error("pushGraphChangesEpic: session cannot be null.");
      }

      const { TenantId, SessionId, QueryGraphId } = session;
      return pushGraphChangesObs(TenantId, SessionId, QueryGraphId).pipe(
        map(() => graphPushSuccess()),
        catchError(error => handleExceptionObs(error))
      );
    })
  );

// export const popGraphChangesEpic = (action$, state$) =>
//   action$.pipe(
//     ofType(CLOSE_QUERY_CONFIG),
//     withLatestFrom(state$),
//     mergeMap(([{
//         sessionReducer: { session: { TenantId, SessionId, QueryGraphId } }
//       }]) => {

//       return popGraphChangesObs(TenantId, SessionId, QueryGraphId).pipe(
//         map(response => graphPopSuccess(response)),
//         catchError(error => handleException(error))
//       );
//     })
//   );

export const addQueryEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType<Action, IAddQuery>(QueryActionTypes.QUERY_ADD),
    map(({ elementId }) => openQueryConfig(elementId))
  );

export const updateQueryDataServiceEpic = (
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType<Action, IUpdateQuerySource>(QueryActionTypes.QUERY_SOURCE_UPDATE),
    withLatestFrom(state$),
    mergeMap(
      ([
        { elementId, targetDataViewId, dataServiceLabel },
        {
          session: { session, graph, queries, filters, connections }
        }
      ]) => {
        if (targetDataViewId == null) {
          return [openQueryConfig(elementId)];
        }
        if (session == null || graph == null) {
          throw new Error(
            "updateQueryDataServiceEpic: session or graph cannot be null."
          );
        }

        // Update the query label to the source name + elementId
        // if the user hasn't defined a label yet.
        if (queries[elementId].Label === "" && dataServiceLabel != null) {
          queries[elementId].Label = `${dataServiceLabel} ${elementId}`;
        }

        return updateGraphEpic(session, graph, queries, filters, connections, [
          queryDescribeRequest()
        ]);
      }
    )
  );
