import { from, Observable } from "rxjs";

import { getWithJwtAsync } from "lib/http";

export const getQesEnabledAsync = (): Observable<boolean> =>
  from(getWithJwtAsync("api/qes/cma-enabled"));
