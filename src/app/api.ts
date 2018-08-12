import { from } from "rxjs";

import { getWithJwtAsync } from "lib/http";

export const getQesEnabledAsync = () =>
  from(getWithJwtAsync("api/qes/cma-enabled"));
