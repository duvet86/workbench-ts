import { from, Observable } from "rxjs";

import { TENANT_ID } from "lib/constants";
import { getWithJwtAsync, postWithJwtAsync } from "lib/http";

import { ISessionDtc, IQueryGraphChangesDtc } from "workbench/types";

export const getSessionInfoObs = (
  dataViewId?: string
): Observable<ISessionDtc> =>
  from(
    postWithJwtAsync(
      `api/qes/${TENANT_ID}/sessions${
        dataViewId != null ? `?dataViewId=${dataViewId}` : ""
      }`
    )
  );

export const saveGraphObs = (
  tenantId: string,
  sessionId: string,
  queryGraphId: number,
  graphData: any,
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
) =>
  from(
    postWithJwtAsync(
      `api/qes/${tenantId}/sessions/${sessionId}/querygraph/${queryGraphId}/push`
    )
  );

export const popGraphChangesObs = (
  tenantId: string,
  sessionId: string,
  queryGraphId: number
) =>
  from(
    postWithJwtAsync(
      `api/qes/${tenantId}/sessions/${sessionId}/querygraph/${queryGraphId}/pop`
    )
  );
