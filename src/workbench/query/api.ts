import { from, Observable } from "rxjs";
import { getWithJwtAsync } from "lib/http";
import {
  IFilterCapabilitiesDic,
  IUdsDescriptionDtc,
  IAllowedValueDtc,
  IPagedRows
} from "workbench/query/types";
import { IItemDtc } from "sidebar/userItems/types";

// http://desktop-ejm4rss/dev/api/qes/systemdataviews/demo
// http://desktop-ejm4rss/dev/api/qes/demo/dataservices
export const getDataServicesObs = (): Observable<IItemDtc[]> =>
  from(
    getWithJwtAsync<IItemDtc[]>(
      `api/qes/systemdataviews/${process.env.TENANT_ID}`
    )
  );

export const getFilterCapabilitiesObs = (): Observable<IFilterCapabilitiesDic> =>
  from(
    getWithJwtAsync<IFilterCapabilitiesDic>(
      "api/qes/capabilities/aggregationdic"
    )
  );

export const getDataServiceDescriptionObs = (
  tenantId: string,
  sessionId: string,
  queryGraphId: number,
  elementId: number
): Observable<IUdsDescriptionDtc> =>
  from(
    getWithJwtAsync<IUdsDescriptionDtc>(
      `api/qes/${tenantId}/sessions/${sessionId}/querygraph/${queryGraphId}/queries/${elementId}/describe`
    )
  );

export const getAllowedValuesAsync = (
  tenantId: string,
  sessionId: string,
  queryGraphId: number,
  filterName: string
): Promise<IAllowedValueDtc[]> =>
  getWithJwtAsync(
    `api/qes/${tenantId}/sessions/${sessionId}/querygraph/${queryGraphId}/filters/${filterName}/allowedvalues`
  );

export const getDataTablePageObs = (
  tenantId: string,
  sessionId: string,
  dataTableId: number,
  pageSize: number,
  pageNumber: number
): Observable<IPagedRows> =>
  from(
    getWithJwtAsync<IPagedRows>(
      `api/qes/${tenantId}/sessions/${sessionId}/datatables/${dataTableId}/rows?pageSize=${pageSize}&pageNumber=${pageNumber}&forDisplay=true`
    )
  );
