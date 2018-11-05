import { Action } from "redux";
import {
  DEFAULTS,
  operatorsExtraInfo,
  staticOperatorsList
} from "sidebar/operators/operatorsData";

import {
  IOperatorServiceDtc,
  IOperatorResult,
  IExtraInfo
} from "sidebar/operators/types";

export const enum OperatorsActionTypes {
  OPERATORS_REQUEST = "OPERATORS_REQUEST",
  OPERATORS_SUCCESS = "OPERATORS_SUCCESS",
  OPERATORS_ERROR = "OPERATORS_ERROR"
}

export interface IOperatorsRequest extends Action {
  type: OperatorsActionTypes.OPERATORS_REQUEST;
}

export interface IOperatorsSuccess extends Action {
  type: OperatorsActionTypes.OPERATORS_SUCCESS;
  operators: { [key: string]: IOperatorResult };
}

export interface IOperatorsError extends Action {
  type: OperatorsActionTypes.OPERATORS_ERROR;
  error: any;
}

export type OperatorsAction =
  | IOperatorsRequest
  | IOperatorsSuccess
  | IOperatorsError;

export const operatorsRequest = (): IOperatorsRequest => ({
  type: OperatorsActionTypes.OPERATORS_REQUEST
});

export const operatorsSuccess = (
  operators: IOperatorServiceDtc[]
): IOperatorsSuccess => {
  const normalizedOperators = staticOperatorsList.concat(operators).reduce<{
    [key: string]: IOperatorResult;
  }>((result, { OperatorServiceId, Description, Label }) => {
    const extraInfo: IExtraInfo =
      operatorsExtraInfo[OperatorServiceId] || DEFAULTS;

    result[OperatorServiceId] = {
      operatorServiceId: OperatorServiceId,
      label: Label,
      description: Description,
      ...extraInfo
    };

    return result;
  }, {});

  return {
    type: OperatorsActionTypes.OPERATORS_SUCCESS,
    operators: normalizedOperators
  };
};

export const operatorsError = (error: any): IOperatorsError => ({
  type: OperatorsActionTypes.OPERATORS_ERROR,
  error
});
