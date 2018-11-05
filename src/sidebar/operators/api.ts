import { getWithJwtAsync } from "lib/http";
import { IOperatorServiceDtc } from "sidebar/operators/types";

export const getOperatorsAsync = (): Promise<IOperatorServiceDtc[]> =>
  getWithJwtAsync(`api/qes/${process.env.TENANT_ID}/operatorservices`);
