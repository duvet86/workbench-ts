import { Action } from "redux";

export const enum DelayActionTypes {
  DELAY_START = "DELAY_START",
  DELAY_END = "DELAY_END"
}

interface IStartDelay extends Action {
  type: DelayActionTypes.DELAY_START;
}

interface IEndDelay extends Action {
  type: DelayActionTypes.DELAY_END;
}

export type LoadingAction = IStartDelay | IEndDelay;

export const startDelay = (): IStartDelay => ({
  type: DelayActionTypes.DELAY_START
});

export const endDelay = (): IEndDelay => ({
  type: DelayActionTypes.DELAY_END
});
