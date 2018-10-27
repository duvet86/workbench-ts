import { getWithJwtAsync } from "lib/http";
import { IAllowedValueDtc } from "workbench/query/types";

export const getAllowedValuesAsync = (
  tenantId: string,
  sessionId: string,
  queryGraphId: number,
  filterName: string
): Promise<IAllowedValueDtc[]> =>
  getWithJwtAsync(
    `api/qes/${tenantId}/sessions/${sessionId}/querygraph/${queryGraphId}/filters/${filterName}/allowedvalues`
  );
