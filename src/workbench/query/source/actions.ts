import { Action } from "redux";
import { IItemDtc } from "sidebar/userItems/types";

export const enum DataServicesActionTypes {
  DATASERVICES_REQUEST = "DATASERVICES_REQUEST",
  DATASERVICES_SUCCESS = "DATASERVICES_SUCCESS"
}

interface IDataServicesRequest extends Action {
  type: DataServicesActionTypes.DATASERVICES_REQUEST;
}

interface IDataServicesSuccess extends Action {
  type: DataServicesActionTypes.DATASERVICES_SUCCESS;
  dataServices: IItemDtc[];
}

export type DataServicesAction = IDataServicesRequest | IDataServicesSuccess;

export const dataServicesRequest = (): IDataServicesRequest => ({
  type: DataServicesActionTypes.DATASERVICES_REQUEST
});

export const dataServicesSuccess = (
  dataServices: IItemDtc[]
): IDataServicesSuccess => ({
  type: DataServicesActionTypes.DATASERVICES_SUCCESS,
  dataServices
});
