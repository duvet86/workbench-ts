import { denormalize } from "normalizr";
import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap, withLatestFrom } from "rxjs/operators";
import { Action } from "redux";

import { handleException } from "common/errorBoundary/actions";
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
  QueryActionTypes,
  graphPushSuccess,
  graphSaveChangesSuccess,
  sessionSuccess,
  SessionActionTypes,
  SessionAction,
  IUpdateQueryDataService,
  ISessionRequest,
  IAddQuery,
  updateQueryChanges
} from "workbench/actions";
import { openQueryConfig, queryDescribeRequest } from "workbench/query/actions";

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
        mergeMap(queryChanges => [updateQueryChanges(queryChanges), ...actions])
      )
    ),
    catchError(error => handleException(error))
  );
};

export const sessionEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType<SessionAction, ISessionRequest>(SessionActionTypes.SESSION_REQUEST),
    mergeMap(({ dataViewId }) =>
      getSessionInfoObs(dataViewId).pipe(
        map(response => sessionSuccess(response)),
        catchError(error => handleException(error))
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
    mergeMap(([, { sessionReducer: { session, graph } }]) => {
      if (session == null || graph == null) {
        throw new Error("saveGraphEpic: session or graph cannot be null.");
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
  action$: ActionsObservable<Action>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(GraphPushActionTypes.GRAPH_PUSH_REQUEST),
    withLatestFrom(state$),
    mergeMap(([, { sessionReducer: { session } }]) => {
      if (session == null) {
        throw new Error("pushGraphChangesEpic: session cannot be null.");
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
    ofType<Action, IUpdateQueryDataService>(
      QueryActionTypes.QUERY_DATASERVICE_UPDATE
    ),
    withLatestFrom(state$),
    mergeMap(
      ([
        { elementId, targetDataViewId, dataServiceLabel },
        {
          sessionReducer: { session, graph, queries, filters, connections }
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
