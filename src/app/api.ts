import { from, Observable } from "rxjs";

import { getWithJwtAsync } from "lib/http";

export const getQesEnabledObs = (): Observable<boolean> =>
  from(getWithJwtAsync("api/qes/cma-enabled"));
