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
  IConnection,
  OperatorServiceIds
} from "workbench/types";
import { getSessionInfoObs, saveGraphObs, getGraphObs } from "workbench/api";
import { graphSchema } from "workbench/schema";

import { graphChangesSuccess } from "workbench/graphActions";
import {
  sessionSuccess,
  SessionActionTypes,
  SessionAction,
  ISessionRequest
} from "workbench/sessionActions";
import { IGraphAddQuery, GraphActionTypes } from "workbench/graphActions";
import {
  queryDescribeRequest,
  IUpdateQuerySource,
  QueryActionTypes
} from "workbench/query/actions";
import { openConfig } from "workbench/configElements/actions";

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

export const openQueryConfigEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType<Action, IGraphAddQuery>(GraphActionTypes.GRAPH_QUERY_ADD),
    map(({ elementId }) => openConfig(OperatorServiceIds.QUERY, elementId))
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
          sessionGraph: { session, graph, queries, filters, connections }
        }
      ]) => {
        if (targetDataViewId == null) {
          throw new Error(
            "updateQueryDataServiceEpic: session or graph cannot be null."
          );
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
