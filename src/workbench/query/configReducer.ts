import { TokenActionTypes, IClearToken } from "app/actions";
import { ErrorActionTypes, ICleanError } from "common/errorBoundary/actions";
import {
  ConfigElementsActionTypes,
  ICloseConfig
} from "workbench/configElements/actions";
import {
  QueryActionTypes,
  QueryActions,
  QueryDescActionTypes,
  QueryDescribeActions
} from "workbench/query/actions";
import {
  DataServicesActionTypes,
  DataServicesAction
} from "workbench/query/source/actions";
import {
  FilterCapActionTypes,
  FilterCapabilitiesAction
} from "workbench/query/constraints/actions";
import {
  QueryDataTableActionTypes,
  QueryDataTableAction
} from "workbench/query/dataPreview/actions";

import { IItemDtc } from "sidebar/userItems/types";
import {
  IUdsColumnDescriptionDtc,
  IUdsFilterDescriptionDtc,
  IFilterCapabilitiesDic,
  IPagedRows
} from "workbench/query/types";

interface IQueryState {
  isLoading: boolean;
  dataServices: IItemDtc[];
  availableColumns: IUdsColumnDescriptionDtc[];
  availableFilters: IUdsFilterDescriptionDtc[];
  filterCapabilities: IFilterCapabilitiesDic;
  dataTableTows?: IPagedRows;
}

const initialState: IQueryState = {
  isLoading: true,
  dataServices: [],
  availableColumns: [],
  availableFilters: [],
  filterCapabilities: {},
  dataTableTows: undefined
};

function queryConfig(
  state: IQueryState = { ...initialState },
  action:
    | DataServicesAction
    | FilterCapabilitiesAction
    | QueryActions
    | QueryDescribeActions
    | QueryDataTableAction
    | ICleanError
    | IClearToken
    | ICloseConfig
): IQueryState {
  switch (action.type) {
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
    case QueryActionTypes.QUERY_SOURCE_UPDATE:
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
    case ConfigElementsActionTypes.CONFIG_CLOSE:
      return {
        ...initialState
      };

    default:
      return state;
  }
}

export default queryConfig;
