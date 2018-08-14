import { Action } from "redux";
import { IInterval, IIntervalTypes } from "common/intervalSelector/types";

export const enum IntervalActionTypes {
  INTERVALTYPE_REQUEST = "INTERVALTYPE_REQUEST",
  INTERVALTYPE_SUCCESS = "INTERVALTYPE_SUCCESS",
  INTERVALTYPE_ERROR = "INTERVALTYPE_ERROR",
  INTERVAL_UPDATE = "INTERVAL_UPDATE"
}

interface IIntervalTypesRequest extends Action {
  type: IntervalActionTypes.INTERVALTYPE_REQUEST;
}

interface IIntervalTypesSuccess extends Action {
  type: IntervalActionTypes.INTERVALTYPE_SUCCESS;
  intervalTypes: IIntervalTypes[];
}

interface IIntervalTypesError extends Action {
  type: IntervalActionTypes.INTERVALTYPE_ERROR;
  error: object;
}

interface IIntervalUpdate extends Action {
  newInterval: IInterval;
  type: IntervalActionTypes.INTERVAL_UPDATE;
}

export type IntervalAction =
  | IIntervalTypesRequest
  | IIntervalTypesSuccess
  | IIntervalTypesError
  | IIntervalUpdate;

export const intervalTypesRequest = (): IIntervalTypesRequest => ({
  type: IntervalActionTypes.INTERVALTYPE_REQUEST
});

export const intervalTypesSuccess = (
  intervalTypes: IIntervalTypes[]
): IIntervalTypesSuccess => ({
  intervalTypes,
  type: IntervalActionTypes.INTERVALTYPE_SUCCESS
});

export const intervalTypesError = (error: object): IIntervalTypesError => ({
  error,
  type: IntervalActionTypes.INTERVALTYPE_ERROR
});

export const intervalUpdate = (newInterval: IInterval): IIntervalUpdate => ({
  newInterval,
  type: IntervalActionTypes.INTERVAL_UPDATE
});
