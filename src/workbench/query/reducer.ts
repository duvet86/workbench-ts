import { QueryActionTypes, QueryAction } from "workbench/actions";
import {
  QueryConfigActionTypes,
  DataServicesActionTypes,
  FilterCapActionTypes,
  QueryDescActionTypes,
  QueryDataTableActionTypes,
  QueryConfigAction,
  IGoToStep,
  DataServicesAction,
  FilterCapabilitiesAction,
  QueryDescribeAction,
  QueryDataTableAction
} from "workbench/query/actions";
import { ErrorActionTypes, ICleanError } from "common/errorBoundary/actions";
import { TokenActionTypes, IClearToken } from "app/actions";

import { IItemDtc } from "sidebar/userItems/types";
import {
  IUdsColumnDescriptionDtc,
  IUdsFilterDescriptionDtc,
  IFilterCapabilitiesDic,
  IPagedRows
} from "workbench/query/types";

interface IQueryState {
  currentStep: number;
  isLoading: boolean;
  elementId: number;
  dataServices: IItemDtc[];
  availableColumns: IUdsColumnDescriptionDtc[];
  availableFilters: IUdsFilterDescriptionDtc[];
  filterCapabilities: IFilterCapabilitiesDic;
  dataTableTows?: IPagedRows;
}

const initialState: IQueryState = {
  currentStep: 0,
  isLoading: true,
  elementId: 0,
  dataServices: [],
  availableColumns: [],
  availableFilters: [],
  filterCapabilities: {},
  dataTableTows: undefined
};

function queryConfig(
  state: IQueryState = { ...initialState },
  action:
    | QueryConfigAction
    | IGoToStep
    | DataServicesAction
    | FilterCapabilitiesAction
    | QueryAction
    | QueryDescribeAction
    | QueryDataTableAction
    | ICleanError
    | IClearToken
): IQueryState {
  switch (action.type) {
    case QueryConfigActionTypes.QUERY_CONFIG_OPEN:
      return {
        ...state,
        isLoading: false,
        elementId: action.elementId
      };

    case QueryConfigActionTypes.GO_TO_STEP:
      return {
        ...state,
        currentStep: action.step
      };

    case DataServicesActionTypes.DATASERVICES_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case DataServicesActionTypes.DATASERVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataServices: action.dataServices
      };

    case FilterCapActionTypes.FILTER_CAPABILITIES_SUCCESS:
      return {
        ...state,
        filterCapabilities: action.filterCapabilities
      };

    // It dispatches QUERY_DESCRIBE_REQUEST.
    // Starts the loading spinner when waiting for columns.
    case QueryActionTypes.QUERY_DATASERVICE_UPDATE:
      return {
        ...state,
        isLoading: action.targetDataViewId != null // Show loading spinner if the targetDataViewId is valid.
      };

    case QueryDescActionTypes.QUERY_DESCRIBE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        availableColumns: action.availableColumns,
        availableFilters: action.availableFilters
      };

    case QueryDataTableActionTypes.QUERY_DATATABLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataTableTows: action.rows
      };

    case ErrorActionTypes.ERROR_CLEAN:
    case TokenActionTypes.TOKEN_REMOVE:
    case QueryConfigActionTypes.QUERY_CONFIG_CLOSE:
      return {
        ...initialState
      };

    default:
      return state;
  }
}

export default queryConfig;
