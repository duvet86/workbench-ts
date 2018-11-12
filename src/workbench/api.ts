import { from, Observable } from "rxjs";

import {
  getWithJwtAsync,
  postWithJwtAsync,
  deleteWithJwtAsync
} from "lib/http";

import {
  ISession,
  IQueryGraphChanges,
  IPushQueryGraphResult,
  IQueryGraphPop,
  IQueryGraphData
} from "workbench/types";

export const getSessionInfoObs = (dataViewId?: string): Observable<ISession> =>
  from(
    postWithJwtAsync(
      `api/qes/${process.env.TENANT_ID}/sessions?applyOnly=true${
        dataViewId != null ? `&dataViewId=${dataViewId}` : ""
      }`
    )
  );

export const destroySessionAsync = (tenantId: string, sessionId: string) =>
  deleteWithJwtAsync(`api/qes/${tenantId}/sessions/${sessionId}`);

export const saveGraphObs = (
  tenantId: string,
  sessionId: string,
  queryGraphId: number,
  graphData: IQueryGraphData,
  isApplyOnly = false
) =>
  from(
    postWithJwtAsync(
      `api/qes/${tenantId}/sessions/${sessionId}/querygraph/${queryGraphId}/changes?applyOnly=${isApplyOnly}`,
      graphData
    )
  );

export const getGraphObs = (
  tenantId: string,
  sessionId: string,
  queryGraphId: number,
  nextChangeNumber: number
): Observable<IQueryGraphChanges> =>
  from(
    getWithJwtAsync(
      // tslint:disable-next-line:max-line-length
      `api/qes/${tenantId}/sessions/${sessionId}/querygraph/${queryGraphId}/changes?nextChangeNumber=${nextChangeNumber}`
    )
  );

export const pushGraphChangesObs = (
  tenantId: string,
  sessionId: string,
  queryGraphId: number
): Observable<IPushQueryGraphResult> =>
  from(
    postWithJwtAsync(
      `api/qes/${tenantId}/sessions/${sessionId}/querygraph/${queryGraphId}/push`
    )
  );

export const popGraphChangesObs = (
  tenantId: string,
  sessionId: string,
  queryGraphId: number
): Observable<IQueryGraphPop> =>
  from(
    postWithJwtAsync(
      `api/qes/${tenantId}/sessions/${sessionId}/querygraph/${queryGraphId}/pop`
    )
  );
