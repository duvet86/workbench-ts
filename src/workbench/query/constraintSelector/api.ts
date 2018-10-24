import { from, Observable } from "rxjs";
import { getWithJwtAsync } from "lib/http";
import { IAllowedValueDtc } from "workbench/query/types";

export const getAllowedValuesForForFilterObs = (
  tenantId: string,
  sessionId: string,
  queryGraphId: number,
  filterName: string
): Observable<IAllowedValueDtc[]> =>
  from(
    getWithJwtAsync(
      `api/qes/${tenantId}/sessions/${sessionId}/querygraph/${queryGraphId}/filters/${filterName}/allowedvalues`
    )
  );
