import { Action } from "redux";
import {
  IInterval,
  IIntervalTypesDtc,
  IIntervalDtc
} from "common/intervalSelector/types";

export const enum IntervalTypeActionTypes {
  INTERVALTYPE_REQUEST = "INTERVALTYPE_REQUEST",
  INTERVALTYPE_SUCCESS = "INTERVALTYPE_SUCCESS",
  INTERVALTYPE_ERROR = "INTERVALTYPE_ERROR"
}

interface IIntervalTypesRequest extends Action {
  type: IntervalTypeActionTypes.INTERVALTYPE_REQUEST;
}

interface IIntervalTypesSuccess extends Action {
  type: IntervalTypeActionTypes.INTERVALTYPE_SUCCESS;
  intervalTypes: IIntervalTypesDtc[];
}

interface IIntervalTypesError extends Action {
  type: IntervalTypeActionTypes.INTERVALTYPE_ERROR;
  error: object;
}

export type IntervalTypeAction =
  | IIntervalTypesRequest
  | IIntervalTypesSuccess
  | IIntervalTypesError
  | IIntervalUpdate;

export const intervalTypesRequest = (): IIntervalTypesRequest => ({
  type: IntervalTypeActionTypes.INTERVALTYPE_REQUEST
});

export const intervalTypesSuccess = (
  intervalTypes: IIntervalTypesDtc[]
): IIntervalTypesSuccess => ({
  intervalTypes,
  type: IntervalTypeActionTypes.INTERVALTYPE_SUCCESS
});

export const intervalTypesError = (error: object): IIntervalTypesError => ({
  error,
  type: IntervalTypeActionTypes.INTERVALTYPE_ERROR
});

export const enum ResolveIntervalActionTypes {
  RESOLVE_INTERVAL_REQUEST = "RESOLVE_INTERVAL_REQUEST",
  RESOLVE_INTERVAL_SUCCESS = "RESOLVE_INTERVAL_SUCCESS",
  RESOLVE_INTERVAL_ERROR = "RESOLVE_INTERVAL_ERROR",
  INTERVAL_UPDATE = "INTERVAL_UPDATE"
}

export interface IResolveIntervalRequest extends Action {
  type: ResolveIntervalActionTypes.RESOLVE_INTERVAL_REQUEST;
  intervalType: string;
  offset: number;
}

interface IResolveIntervalSuccess extends Action {
  type: ResolveIntervalActionTypes.RESOLVE_INTERVAL_SUCCESS;
  interval: IIntervalDtc;
}

interface IResolveIntervalError extends Action {
  type: ResolveIntervalActionTypes.RESOLVE_INTERVAL_ERROR;
  error: object;
}

interface IIntervalUpdate extends Action {
  newInterval: IInterval;
  type: ResolveIntervalActionTypes.INTERVAL_UPDATE;
}

export type ResolveIntervalAction =
  | IResolveIntervalRequest
  | IResolveIntervalSuccess
  | IResolveIntervalError
  | IIntervalUpdate;

export const intervalStringRequest = (
  intervalType: string,
  offset: number
): IResolveIntervalRequest => ({
  type: ResolveIntervalActionTypes.RESOLVE_INTERVAL_REQUEST,
  intervalType,
  offset
});

export const intervalStringSuccess = (
  interval: IIntervalDtc
): IResolveIntervalSuccess => ({
  type: ResolveIntervalActionTypes.RESOLVE_INTERVAL_SUCCESS,
  interval
});

export const intervalStringError = (error: object): IResolveIntervalError => ({
  error,
  type: ResolveIntervalActionTypes.RESOLVE_INTERVAL_ERROR
});

export const intervalUpdate = (newInterval: IInterval): IIntervalUpdate => ({
  newInterval,
  type: ResolveIntervalActionTypes.INTERVAL_UPDATE
});
