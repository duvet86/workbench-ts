export const QUERY_CONFIG_OPEN = "QUERY_CONFIG_OPEN";
type QUERY_CONFIG_OPEN = typeof QUERY_CONFIG_OPEN;
export const QUERY_CONFIG_CLOSE = "QUERY_CONFIG_CLOSE";
type QUERY_CONFIG_CLOSE = typeof QUERY_CONFIG_CLOSE;
export const QUERY_CONFIG_ERROR = "QUERY_CONFIG_ERROR";
type QUERY_CONFIG_ERROR = typeof QUERY_CONFIG_ERROR;

export interface IOpenQueryConfig {
  type: QUERY_CONFIG_OPEN;
  elementId: number;
}

export interface ICloseQueryConfig {
  type: QUERY_CONFIG_CLOSE;
}

export interface IQueryConfigError {
  type: QUERY_CONFIG_ERROR;
}

export type QueryConfigAction =
  | IOpenQueryConfig
  | ICloseQueryConfig
  | IQueryConfigError;

export const openQueryConfig = (elementId: number): IOpenQueryConfig => ({
  type: QUERY_CONFIG_OPEN,
  elementId
});

export const closeQueryConfig = (): ICloseQueryConfig => ({
  type: QUERY_CONFIG_CLOSE
});

export const queryConfigError = (): IQueryConfigError => ({
  type: QUERY_CONFIG_ERROR
});

export const GO_TO_STEP = "GO_TO_STEP";
type GO_TO_STEP = typeof GO_TO_STEP;

export interface IGoToStep {
  type: GO_TO_STEP;
  step: number;
}

export const goToStep = (step: number): IGoToStep => ({
  type: GO_TO_STEP,
  step
});

export const DATASERVICES_REQUEST = "DATASERVICES_REQUEST";
type DATASERVICES_REQUEST = typeof DATASERVICES_REQUEST;
export const DATASERVICES_SUCCESS = "DATASERVICES_SUCCESS";
type DATASERVICES_SUCCESS = typeof DATASERVICES_SUCCESS;

interface IDataServicesRequest {
  type: DATASERVICES_REQUEST;
}

// TODO: fix me.
interface IDataServicesSuccess {
  type: DATASERVICES_SUCCESS;
  dataServices: any[];
}

export type DataServicesAction = IDataServicesRequest | IDataServicesSuccess;

export const dataServicesRequest = (): IDataServicesRequest => ({
  type: DATASERVICES_REQUEST
});

export const dataServicesSuccess = (
  dataServices: any[]
): IDataServicesSuccess => ({
  type: DATASERVICES_SUCCESS,
  dataServices
});

export const FILTER_CAPABILITIES_REQUEST = "FILTER_CAPABILITIES_REQUEST";
type FILTER_CAPABILITIES_REQUEST = typeof FILTER_CAPABILITIES_REQUEST;
export const FILTER_CAPABILITIES_SUCCESS = "FILTER_CAPABILITIES_SUCCESS";
type FILTER_CAPABILITIES_SUCCESS = typeof FILTER_CAPABILITIES_SUCCESS;

interface IFilterCapabilitiesRequest {
  type: FILTER_CAPABILITIES_REQUEST;
}

interface IFilterCapabilitiesSuccess {
  type: FILTER_CAPABILITIES_SUCCESS;
  filterCapabilities: any[];
}

export type FilterCapabilitiesAction =
  | IFilterCapabilitiesRequest
  | IFilterCapabilitiesSuccess;

export const filterCapabilitiesRequest = (): IFilterCapabilitiesRequest => ({
  type: FILTER_CAPABILITIES_REQUEST
});

export const filterCapabilitiesSuccess = (
  filterCapabilities: any[]
): IFilterCapabilitiesSuccess => ({
  type: FILTER_CAPABILITIES_SUCCESS,
  filterCapabilities
});

export const QUERY_DESCRIBE_REQUEST = "QUERY_DESCRIBE_REQUEST";
type QUERY_DESCRIBE_REQUEST = typeof QUERY_DESCRIBE_REQUEST;
export const QUERY_DESCRIBE_SUCCESS = "QUERY_DESCRIBE_SUCCESS";
type QUERY_DESCRIBE_SUCCESS = typeof QUERY_DESCRIBE_SUCCESS;

interface IQueryDescribeRequest {
  type: QUERY_DESCRIBE_REQUEST;
}

interface IQueryDescribeSuccess {
  type: QUERY_DESCRIBE_SUCCESS;
  availableColumns: any[];
  availableFilters: any[];
  elementId: number;
}

export type QueryDescribeAction = IQueryDescribeRequest | IQueryDescribeSuccess;

export const queryDescribeRequest = (): IQueryDescribeRequest => ({
  type: QUERY_DESCRIBE_REQUEST
});

export const queryDescribeSuccess = (
  { Columns, AvailableFilters }: { Columns: any[]; AvailableFilters: any[] },
  elementId: number
): IQueryDescribeSuccess => ({
  type: QUERY_DESCRIBE_SUCCESS,
  availableColumns: Columns,
  availableFilters: AvailableFilters,
  elementId
});
