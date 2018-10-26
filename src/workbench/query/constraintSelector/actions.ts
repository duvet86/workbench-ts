import { Action } from "redux";
import { IAllowedValueDtc } from "workbench/query/types";

export const enum AllowedValuesTypes {
  ALLOWED_VALUES_REQUEST = "ALLOWED_VALUES_REQUEST",
  ALLOWED_VALUES_SUCCESS = "ALLOWED_VALUES_SUCCESS"
}

export interface IAllowedValuesRequest extends Action {
  type: AllowedValuesTypes.ALLOWED_VALUES_REQUEST;
  allowedValuesSessionId: string;
  allowedValuesQueryGraphId: number;
  filterName: string;
}

export interface IAllowedValuesSuccess extends Action {
  type: AllowedValuesTypes.ALLOWED_VALUES_SUCCESS;
  allowedValues: IAllowedValueDtc[];
}

export type AllowedValuesActions =
  | IAllowedValuesRequest
  | IAllowedValuesSuccess;

export const allowedValuesRequest = (
  allowedValuesSessionId: string,
  allowedValuesQueryGraphId: number,
  filterName: string
): IAllowedValuesRequest => ({
  type: AllowedValuesTypes.ALLOWED_VALUES_REQUEST,
  allowedValuesSessionId,
  allowedValuesQueryGraphId,
  filterName
});

export const allowedValuesSuccess = (
  allowedValues: IAllowedValueDtc[]
): IAllowedValuesSuccess => ({
  type: AllowedValuesTypes.ALLOWED_VALUES_SUCCESS,
  allowedValues
});
