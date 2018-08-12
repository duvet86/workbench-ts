import {
  DEFAULTS,
  IExtraInfo,
  operatorsExtraInfo,
  staticOperatorsList
} from "sideBar/operators/operatorsData";

export const OPERATORS_REQUEST = "OPERATORS_REQUEST";
export type OPERATORS_REQUEST = typeof OPERATORS_REQUEST;
export const OPERATORS_SUCCESS = "OPERATORS_SUCCESS";
export type OPERATORS_SUCCESS = typeof OPERATORS_SUCCESS;
export const OPERATORS_ERROR = "OPERATORS_ERROR";
export type OPERATORS_ERROR = typeof OPERATORS_ERROR;

export interface IOperatorsRequest {
  type: OPERATORS_REQUEST;
}

export interface IOperatorsSuccess {
  type: OPERATORS_SUCCESS;
  operators: { [key: string]: IOperatorResult };
}

export interface IOperatorsError {
  type: OPERATORS_ERROR;
  error: any;
}

export type OperatorsAction =
  | IOperatorsRequest
  | IOperatorsSuccess
  | IOperatorsError;

export const operatorsRequest = (): IOperatorsRequest => ({
  type: OPERATORS_REQUEST
});

export interface IOperatorResult extends IExtraInfo {
  operatorServiceId: string;
  label: string;
  description: string;
}

interface IInputOperator {
  OperatorServiceId: string;
  Label: string;
  Description: string;
}

export const operatorsSuccess = (
  operators: IInputOperator[]
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
    type: OPERATORS_SUCCESS,
    operators: normalizedOperators
  };
};

export const operatorsError = (error: any): IOperatorsError => ({
  type: OPERATORS_ERROR,
  error
});
