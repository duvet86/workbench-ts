import { Action } from "redux";

import { IItemDtc } from "sidebar/myItems/types";
import {
  IUdsDescriptionDtc,
  IFilterCapabilitiesDic,
  IUdsFilterDescriptionDtc,
  IUdsColumnDescriptionDtc
} from "workbench/query/types";

export const enum QueryConfigActionTypes {
  QUERY_CONFIG_OPEN = "QUERY_CONFIG_OPEN",
  QUERY_CONFIG_CLOSE = "QUERY_CONFIG_CLOSE",
  QUERY_CONFIG_ERROR = "QUERY_CONFIG_ERROR",
  GO_TO_STEP = "GO_TO_STEP"
}

export interface IOpenQueryConfig extends Action {
  type: QueryConfigActionTypes.QUERY_CONFIG_OPEN;
  elementId: number;
}

export interface ICloseQueryConfig extends Action {
  type: QueryConfigActionTypes.QUERY_CONFIG_CLOSE;
}

export interface IQueryConfigError extends Action {
  type: QueryConfigActionTypes.QUERY_CONFIG_ERROR;
}

export interface IGoToStep extends Action {
  type: QueryConfigActionTypes.GO_TO_STEP;
  step: number;
}

export type QueryConfigAction =
  | IOpenQueryConfig
  | ICloseQueryConfig
  | IQueryConfigError;

export const openQueryConfig = (elementId: number): IOpenQueryConfig => ({
  type: QueryConfigActionTypes.QUERY_CONFIG_OPEN,
  elementId
});

export const closeQueryConfig = (): ICloseQueryConfig => ({
  type: QueryConfigActionTypes.QUERY_CONFIG_CLOSE
});

export const queryConfigError = (): IQueryConfigError => ({
  type: QueryConfigActionTypes.QUERY_CONFIG_ERROR
});

export const goToStep = (step: number): IGoToStep => ({
  type: QueryConfigActionTypes.GO_TO_STEP,
  step
});

export const enum DataServicesActionTypes {
  DATASERVICES_REQUEST = "DATASERVICES_REQUEST",
  DATASERVICES_SUCCESS = "DATASERVICES_SUCCESS",
  DATASERVICES_ERROR = "DATASERVICES_ERROR"
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

export const enum FilterCapActionTypes {
  FILTER_CAPABILITIES_REQUEST = "FILTER_CAPABILITIES_REQUEST",
  FILTER_CAPABILITIES_SUCCESS = "FILTER_CAPABILITIES_SUCCESS"
}

interface IFilterCapabilitiesRequest extends Action {
  type: FilterCapActionTypes.FILTER_CAPABILITIES_REQUEST;
}

interface IFilterCapabilitiesSuccess extends Action {
  type: FilterCapActionTypes.FILTER_CAPABILITIES_SUCCESS;
  filterCapabilities: IFilterCapabilitiesDic;
}

export type FilterCapabilitiesAction =
  | IFilterCapabilitiesRequest
  | IFilterCapabilitiesSuccess;

export const filterCapabilitiesRequest = (): IFilterCapabilitiesRequest => ({
  type: FilterCapActionTypes.FILTER_CAPABILITIES_REQUEST
});

export const filterCapabilitiesSuccess = (
  filterCapabilities: IFilterCapabilitiesDic
): IFilterCapabilitiesSuccess => ({
  type: FilterCapActionTypes.FILTER_CAPABILITIES_SUCCESS,
  filterCapabilities
});

export const enum QueryDescActionTypes {
  QUERY_DESCRIBE_REQUEST = "QUERY_DESCRIBE_REQUEST",
  QUERY_DESCRIBE_SUCCESS = "QUERY_DESCRIBE_SUCCESS"
}

export interface IQueryDescribeRequest extends Action {
  type: QueryDescActionTypes.QUERY_DESCRIBE_REQUEST;
}

interface IQueryDescribeSuccess extends Action {
  type: QueryDescActionTypes.QUERY_DESCRIBE_SUCCESS;
  availableColumns: IUdsColumnDescriptionDtc[];
  availableFilters: IUdsFilterDescriptionDtc[];
  elementId: number;
}

export type QueryDescribeAction = IQueryDescribeRequest | IQueryDescribeSuccess;

export const queryDescribeRequest = (): IQueryDescribeRequest => ({
  type: QueryDescActionTypes.QUERY_DESCRIBE_REQUEST
});

export const queryDescribeSuccess = (
  { Columns, AvailableFilters }: IUdsDescriptionDtc,
  elementId: number
): IQueryDescribeSuccess => ({
  type: QueryDescActionTypes.QUERY_DESCRIBE_SUCCESS,
  availableColumns: Columns,
  availableFilters: AvailableFilters,
  elementId
});
