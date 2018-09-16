import { from, Observable } from "rxjs";

import { TENANT_ID } from "lib/constants";
import { getWithJwtAsync } from "lib/http";

import { IOperatorServiceDtc } from "sidebar/operators/types";

export const getOperatorsObs = (): Observable<IOperatorServiceDtc[]> =>
  from(getWithJwtAsync(`api/qes/${TENANT_ID}/operatorservices`));
