import { Action } from "redux";
import { IIntervalTypesDtc, IIntervalDtc } from "common/intervalSelector/types";

export const enum IntervalActionTypes {
  INTERVALTYPE_REQUEST = "INTERVALTYPE_REQUEST",
  INTERVALTYPE_SUCCESS = "INTERVALTYPE_SUCCESS",
  INTERVALTYPE_ERROR = "INTERVALTYPE_ERROR",
  RESOLVE_INTERVAL_REQUEST = "RESOLVE_INTERVAL_REQUEST",
  RESOLVE_INTERVAL_SUCCESS = "RESOLVE_INTERVAL_SUCCESS",
  RESOLVE_INTERVAL_ERROR = "RESOLVE_INTERVAL_ERROR",
  INTERVAL_UPDATE = "INTERVAL_UPDATE"
}

interface IIntervalTypesRequest extends Action {
  type: IntervalActionTypes.INTERVALTYPE_REQUEST;
}

interface IIntervalTypesSuccess extends Action {
  type: IntervalActionTypes.INTERVALTYPE_SUCCESS;
  intervalTypes: IIntervalTypesDtc[];
}

interface IIntervalTypesError extends Action {
  type: IntervalActionTypes.INTERVALTYPE_ERROR;
  error: object;
}

interface IResolveIntervalSuccess extends Action {
  type: IntervalActionTypes.RESOLVE_INTERVAL_SUCCESS;
  interval: IIntervalDtc;
}

interface IResolveIntervalError extends Action {
  type: IntervalActionTypes.RESOLVE_INTERVAL_ERROR;
  error: object;
}

interface IIntervalUpdate extends Action {
  newInterval: IIntervalDtc;
  type: IntervalActionTypes.INTERVAL_UPDATE;
}

export type IntervalAction =
  | IIntervalTypesRequest
  | IIntervalTypesSuccess
  | IIntervalTypesError
  | IIntervalUpdate
  | IResolveIntervalRequest
  | IResolveIntervalSuccess
  | IResolveIntervalError
  | IIntervalUpdate;

export const intervalTypesRequest = (): IIntervalTypesRequest => ({
  type: IntervalActionTypes.INTERVALTYPE_REQUEST
});

export const intervalTypesSuccess = (
  intervalTypes: IIntervalTypesDtc[]
): IIntervalTypesSuccess => ({
  intervalTypes,
  type: IntervalActionTypes.INTERVALTYPE_SUCCESS
});

export const intervalTypesError = (error: object): IIntervalTypesError => ({
  error,
  type: IntervalActionTypes.INTERVALTYPE_ERROR
});

export interface IResolveIntervalRequest extends Action {
  type: IntervalActionTypes.RESOLVE_INTERVAL_REQUEST;
  intervalType: string;
  offset: number;
}

export const resolveIntervalRequest = (
  intervalType: string,
  offset: number
): IResolveIntervalRequest => ({
  type: IntervalActionTypes.RESOLVE_INTERVAL_REQUEST,
  intervalType,
  offset
});

export const resolveIntervalSuccess = (
  interval: IIntervalDtc
): IResolveIntervalSuccess => ({
  type: IntervalActionTypes.RESOLVE_INTERVAL_SUCCESS,
  interval
});

export const resolveIntervalError = (error: object): IResolveIntervalError => ({
  error,
  type: IntervalActionTypes.RESOLVE_INTERVAL_ERROR
});

export const intervalUpdate = (newInterval: IIntervalDtc): IIntervalUpdate => ({
  newInterval,
  type: IntervalActionTypes.INTERVAL_UPDATE
});
