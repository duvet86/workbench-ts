import { Action } from "redux";

export const enum QueryConfigActionTypes {
  QUERY_CONFIG_OPEN = "QUERY_CONFIG_OPEN",
  QUERY_CONFIG_CLOSE = "QUERY_CONFIG_CLOSE",
  GO_TO_STEP = "GO_TO_STEP"
}

export interface IOpenQueryConfig extends Action {
  type: QueryConfigActionTypes.QUERY_CONFIG_OPEN;
  elementId: number;
}

export interface ICloseQueryConfig extends Action {
  type: QueryConfigActionTypes.QUERY_CONFIG_CLOSE;
}

export interface IGoToStep extends Action {
  type: QueryConfigActionTypes.GO_TO_STEP;
  step: number;
}

export type QueryConfigAction = IOpenQueryConfig | ICloseQueryConfig;

export const openQueryConfig = (elementId: number): IOpenQueryConfig => ({
  type: QueryConfigActionTypes.QUERY_CONFIG_OPEN,
  elementId
});

export const closeQueryConfig = (): ICloseQueryConfig => ({
  type: QueryConfigActionTypes.QUERY_CONFIG_CLOSE
});

export const goToStep = (step: number): IGoToStep => ({
  type: QueryConfigActionTypes.GO_TO_STEP,
  step
});
