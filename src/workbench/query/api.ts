import { from } from "rxjs";

import { TENANT_ID } from "lib/constants";
import { getWithJwtAsync } from "lib/http";

// http://desktop-ejm4rss/dev/api/qes/systemdataviews/demo
// http://desktop-ejm4rss/dev/api/qes/demo/dataservices
export const getDataServicesObs = () =>
  from(getWithJwtAsync(`api/qes/systemdataviews/${TENANT_ID}`));

export const getFilterCapabilitiesObs = () =>
  from(getWithJwtAsync("api/qes/capabilities/aggregationdic"));

export const getDataServiceDescriptionObs = (
  tenantId: string,
  sessionId: number,
  queryGraphId: number,
  elementId: number
) =>
  from(
    getWithJwtAsync(
      `api/qes/${tenantId}/sessions/${sessionId}/querygraph/${queryGraphId}/queries/${elementId}/describe`
    )
  );
