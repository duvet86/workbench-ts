import { from, Observable } from "rxjs";

import { TENANT_ID } from "lib/constants";
import {
  getWithJwtAsync,
  postWithJwtAsync,
  deleteWithJwtAsync
} from "lib/http";

import {
  ISessionDtc,
  IQueryGraphChangesDtc,
  IPushQueryGraphResultDtc,
  IQueryGraphPopDtc,
  IQueryGraphDataDtc
} from "workbench/types";

export const getSessionInfoObs = (
  dataViewId?: string
): Observable<ISessionDtc> =>
  from(
    postWithJwtAsync(
      `api/qes/${TENANT_ID}/sessions?applyOnly=true${
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
  graphData: IQueryGraphDataDtc,
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
): Observable<IQueryGraphChangesDtc> =>
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
): Observable<IPushQueryGraphResultDtc> =>
  from(
    postWithJwtAsync(
      `api/qes/${tenantId}/sessions/${sessionId}/querygraph/${queryGraphId}/push`
    )
  );

export const popGraphChangesObs = (
  tenantId: string,
  sessionId: string,
  queryGraphId: number
): Observable<IQueryGraphPopDtc> =>
  from(
    postWithJwtAsync(
      `api/qes/${tenantId}/sessions/${sessionId}/querygraph/${queryGraphId}/pop`
    )
  );
