import { denormalize } from "normalizr";
import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Action } from "redux";

import { handleException } from "errorPage/actions";

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
  updateQueryLabel,
  graphPushSuccess,
  graphSaveChangesSuccess,
  sessionSuccess,
  SessionActionTypes,
  SessionAction,
  IUpdateQueryDataService,
  ISessionRequest,
  IAddQuery
} from "workbench/actions";
import { openQueryConfig, queryDescribeRequest } from "workbench/query/actions";

import { RootState } from "rootReducer";

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
  action$: ActionsObservable<Action>,
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
    mergeMap(({ elementId, targetDataViewId, dataServiceLabel }) => {
      if (targetDataViewId == null) {
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

      // Update the query label to the source name + elementId
      // if the user has not defined a label.
      let queryLabel = "";
      if (queries[elementId].Label === "") {
        queryLabel =
          dataServiceLabel != null ? `${dataServiceLabel} ${elementId}` : "";
      }

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
          ).pipe(
            mergeMap(() => [
              updateQueryLabel(elementId, queryLabel),
              queryDescribeRequest()
            ])
          )
        ),
        catchError(error => handleException(error))
      );
    })
  );
