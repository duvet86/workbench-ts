import { IInterval, IIntervalTypes } from "common/intervalSelector/types";

export const INTERVALTYPE_REQUEST = "INTERVALTYPE_REQUEST";
type INTERVALTYPE_REQUEST = typeof INTERVALTYPE_REQUEST;

export const INTERVALTYPE_SUCCESS = "INTERVALTYPE_SUCCESS";
type INTERVALTYPE_SUCCESS = typeof INTERVALTYPE_SUCCESS;

export const INTERVALTYPE_ERROR = "INTERVALTYPE_ERROR";
type INTERVALTYPE_ERROR = typeof INTERVALTYPE_ERROR;

interface IIntervalTypesRequest {
  type: INTERVALTYPE_REQUEST;
}

interface IIntervalTypesSuccess {
  type: INTERVALTYPE_SUCCESS;
  intervalTypes: IIntervalTypes[];
}

interface IIntervalTypesError {
  type: INTERVALTYPE_ERROR;
  error: object;
}

export const intervalTypesRequest = (): IIntervalTypesRequest => ({
  type: INTERVALTYPE_REQUEST
});

export const intervalTypesSuccess = (
  intervalTypes: IIntervalTypes[]
): IIntervalTypesSuccess => ({
  intervalTypes,
  type: INTERVALTYPE_SUCCESS
});

export const intervalTypesError = (error: object): IIntervalTypesError => ({
  error,
  type: INTERVALTYPE_ERROR
});

export const INTERVAL_UPDATE = "INTERVAL_UPDATE";
type INTERVAL_UPDATE = typeof INTERVAL_UPDATE;

interface IIntervalUpdate {
  newInterval: IInterval;
  type: INTERVAL_UPDATE;
}

export const intervalUpdate = (newInterval: IInterval): IIntervalUpdate => ({
  newInterval,
  type: INTERVAL_UPDATE
});

export type IntervalAction =
  | IIntervalTypesRequest
  | IIntervalTypesSuccess
  | IIntervalTypesError
  | IIntervalUpdate;
