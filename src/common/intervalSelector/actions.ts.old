import { Action } from "redux";
import {
  IIntervalTypesDtc,
  IIntervalDtc,
  ITypesAndInterval
} from "common/intervalSelector/types";

export const enum IntervalActionTypes {
  INIT_INTERVAL_REQUEST = "INIT_INTERVAL_REQUEST",
  INIT_INTERVAL_SUCCESS = "INIT_INTERVAL_SUCCESS",
  INIT_INTERVAL_ERROR = "INIT_INTERVAL_ERROR",
  RESOLVE_INTERVAL_REQUEST = "RESOLVE_INTERVAL_REQUEST",
  RESOLVE_INTERVAL_SUCCESS = "RESOLVE_INTERVAL_SUCCESS",
  RESOLVE_INTERVAL_ERROR = "RESOLVE_INTERVAL_ERROR",
  INTERVAL_UPDATE = "INTERVAL_UPDATE"
}

export interface IInitIntervalRequest extends Action {
  type: IntervalActionTypes.INIT_INTERVAL_REQUEST;
  initInterval: IIntervalDtc;
}

export interface IInitIntervalSuccess extends Action {
  type: IntervalActionTypes.INIT_INTERVAL_SUCCESS;
  intervalTypes: IIntervalTypesDtc[];
  interval: IIntervalDtc;
}

interface IInitIntervalError extends Action {
  type: IntervalActionTypes.INIT_INTERVAL_ERROR;
  error: any;
}

interface IResolveIntervalSuccess extends Action {
  type: IntervalActionTypes.RESOLVE_INTERVAL_SUCCESS;
  interval: IIntervalDtc;
}

interface IResolveIntervalError extends Action {
  type: IntervalActionTypes.RESOLVE_INTERVAL_ERROR;
  error: any;
}

interface IIntervalUpdate extends Action {
  newInterval: IIntervalDtc;
  type: IntervalActionTypes.INTERVAL_UPDATE;
}

export type IntervalAction =
  | IInitIntervalRequest
  | IInitIntervalSuccess
  | IInitIntervalError
  | IResolveIntervalRequest
  | IResolveIntervalSuccess
  | IResolveIntervalError
  | IIntervalUpdate;

export const initIntervalRequest = (
  initInterval: IIntervalDtc
): IInitIntervalRequest => ({
  type: IntervalActionTypes.INIT_INTERVAL_REQUEST,
  initInterval
});

export const initIntervalSuccess = ({
  interval,
  intervalTypes
}: ITypesAndInterval): IInitIntervalSuccess => ({
  type: IntervalActionTypes.INIT_INTERVAL_SUCCESS,
  interval,
  intervalTypes
});

export const initIntervalError = (error: any): IInitIntervalError => ({
  type: IntervalActionTypes.INIT_INTERVAL_ERROR,
  error
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

export const resolveIntervalError = (error: any): IResolveIntervalError => ({
  error,
  type: IntervalActionTypes.RESOLVE_INTERVAL_ERROR
});

export const intervalUpdate = (newInterval: IIntervalDtc): IIntervalUpdate => ({
  newInterval,
  type: IntervalActionTypes.INTERVAL_UPDATE
});
