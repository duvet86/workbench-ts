import { QueryActionTypes, QueryAction } from "workbench/actions";
import {
  QueryConfigActionTypes,
  DataServicesActionTypes,
  FilterCapActionTypes,
  QueryDescActionTypes,
  QueryConfigAction,
  IGoToStep,
  DataServicesAction,
  FilterCapabilitiesAction,
  QueryDescribeAction
} from "workbench/query/actions";

import { IItemDtc } from "sidebar/myItems/types";
import {
  IUdsColumnDescriptionDtc,
  IUdsFilterDescriptionDtc,
  IFilterCapabilitiesDic
} from "workbench/query/types";

interface IInitialState {
  currentStep: number;
  isLoading: boolean;
  elementId: number;
  dataServices: IItemDtc[];
  availableColumns: IUdsColumnDescriptionDtc[];
  availableFilters: IUdsFilterDescriptionDtc[];
  filterCapabilities: IFilterCapabilitiesDic;
}

const initialState: IInitialState = {
  currentStep: 0,
  isLoading: true,
  elementId: 0,
  dataServices: [],
  availableColumns: [],
  availableFilters: [],
  filterCapabilities: {}
};

function queryConfig(
  state = { ...initialState },
  action:
    | QueryConfigAction
    | IGoToStep
    | DataServicesAction
    | FilterCapabilitiesAction
    | QueryAction
    | QueryDescribeAction
) {
  switch (action.type) {
    case QueryConfigActionTypes.QUERY_CONFIG_OPEN:
      return {
        ...state,
        elementId: action.elementId
      };

    case QueryConfigActionTypes.QUERY_CONFIG_ERROR:
    case QueryConfigActionTypes.QUERY_CONFIG_CLOSE:
      return {
        ...initialState
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
        isLoading: true
      };

    case QueryDescActionTypes.QUERY_DESCRIBE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        availableColumns: action.availableColumns,
        availableFilters: action.availableFilters
      };

    default:
      return state;
  }
}

export default queryConfig;
