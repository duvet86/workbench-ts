import { Action } from "redux";

export const enum ConfigElementsActionTypes {
  CONFIG_OPEN = "CONFIG_OPEN",
  CONFIG_CLOSE = "CONFIG_CLOSE",
  GO_TO_STEP = "GO_TO_STEP"
}

export interface IOpenConfig extends Action {
  type: ConfigElementsActionTypes.CONFIG_OPEN;
  elementId: number;
}

export interface ICloseConfig extends Action {
  type: ConfigElementsActionTypes.CONFIG_CLOSE;
}

export interface IGoToStep extends Action {
  type: ConfigElementsActionTypes.GO_TO_STEP;
  step: number;
}

export type ConfigElementsActions = IOpenConfig | ICloseConfig | IGoToStep;

export const openConfig = (elementId: number): IOpenConfig => ({
  type: ConfigElementsActionTypes.CONFIG_OPEN,
  elementId
});

export const closeConfig = (): ICloseConfig => ({
  type: ConfigElementsActionTypes.CONFIG_CLOSE
});

export const goToStep = (step: number): IGoToStep => ({
  type: ConfigElementsActionTypes.GO_TO_STEP,
  step
});
