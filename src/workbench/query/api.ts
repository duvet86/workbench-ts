import { from, Observable } from "rxjs";

import { TENANT_ID } from "lib/constants";
import { getWithJwtAsync } from "lib/http";

import {
  IFilterCapabilitiesDic,
  IUdsDescriptionDtc
} from "workbench/query/types";
import { IPagedCollection } from "types";
import { IItemDtc } from "sidebar/myItems/types";

// http://desktop-ejm4rss/dev/api/qes/systemdataviews/demo
// http://desktop-ejm4rss/dev/api/qes/demo/dataservices
export const getDataServicesObs = (): Observable<IPagedCollection<IItemDtc>> =>
  from(getWithJwtAsync(`api/qes/systemdataviews/${TENANT_ID}`));

export const getFilterCapabilitiesObs = (): Observable<
  IFilterCapabilitiesDic
> => from(getWithJwtAsync("api/qes/capabilities/aggregationdic"));

export const getDataServiceDescriptionObs = (
  tenantId: string,
  sessionId: string,
  queryGraphId: number,
  elementId: number
): Observable<IUdsDescriptionDtc> =>
  from(
    getWithJwtAsync(
      `api/qes/${tenantId}/sessions/${sessionId}/querygraph/${queryGraphId}/queries/${elementId}/describe`
    )
  );
