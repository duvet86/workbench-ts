import { QUERY_DATASERVICE_UPDATE, QueryAction } from "workbench/actions";
import {
  QUERY_CONFIG_ERROR,
  QUERY_CONFIG_OPEN,
  QUERY_CONFIG_CLOSE,
  GO_TO_STEP,
  DATASERVICES_REQUEST,
  DATASERVICES_SUCCESS,
  FILTER_CAPABILITIES_SUCCESS,
  QUERY_DESCRIBE_SUCCESS,
  QueryConfigAction,
  IGoToStep,
  DataServicesAction,
  FilterCapabilitiesAction,
  QueryDescribeAction
} from "workbench/query/actions";

// TODO: fix me.
interface IInitialState {
  currentStep: number;
  isLoading: boolean;
  elementId: number;
  dataServices: any[];
  availableColumns: any[];
  availableFilters: any[];
  filterCapabilities: any;
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
    case QUERY_CONFIG_OPEN:
      return {
        ...state,
        elementId: action.elementId
      };

    case QUERY_CONFIG_ERROR:
    case QUERY_CONFIG_CLOSE:
      return {
        ...initialState
      };

    case GO_TO_STEP:
      return {
        ...state,
        currentStep: action.step
      };

    case DATASERVICES_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case DATASERVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataServices: action.dataServices
      };

    case FILTER_CAPABILITIES_SUCCESS:
      return {
        ...state,
        filterCapabilities: action.filterCapabilities
      };

    // It dispatches QUERY_DESCRIBE_REQUEST.
    // Starts the loading spinner when waiting for columns.
    case QUERY_DATASERVICE_UPDATE:
      return {
        ...state,
        isLoading: true
      };

    case QUERY_DESCRIBE_SUCCESS:
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
