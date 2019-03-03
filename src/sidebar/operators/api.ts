import { from, Observable } from "rxjs";

import { getWithJwtAsync } from "lib/http";

import { IOperatorServiceDtc } from "sidebar/operators/types";

export const getOperatorsObs = (): Observable<IOperatorServiceDtc[]> =>
  from(
    getWithJwtAsync<IOperatorServiceDtc[]>(
      `api/qes/${process.env.TENANT_ID}/operatorservices`
    )
  );
