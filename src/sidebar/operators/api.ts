import { from } from "rxjs";

import { TENANT_ID } from "lib/constants";
import { getWithJwtAsync } from "lib/http";

// TODO: fix me.
export const getOperatorsAsync = () =>
  from(getWithJwtAsync(`api/qes/${TENANT_ID}/operatorservices`));
