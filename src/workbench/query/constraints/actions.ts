import { Action } from "redux";

import { IConstraint, QesFilterType } from "workbench/types";
import { IFilterCapabilitiesDic } from "workbench/query/types";

export const enum FilterCapActionTypes {
  FILTER_CAPABILITIES_REQUEST = "FILTER_CAPABILITIES_REQUEST",
  FILTER_CAPABILITIES_SUCCESS = "FILTER_CAPABILITIES_SUCCESS"
}

interface IFilterCapabilitiesRequest extends Action {
  type: FilterCapActionTypes.FILTER_CAPABILITIES_REQUEST;
}

interface IFilterCapabilitiesSuccess extends Action {
  type: FilterCapActionTypes.FILTER_CAPABILITIES_SUCCESS;
  filterCapabilities: IFilterCapabilitiesDic;
}

export type FilterCapabilitiesAction =
  | IFilterCapabilitiesRequest
  | IFilterCapabilitiesSuccess;

export const filterCapabilitiesRequest = (): IFilterCapabilitiesRequest => ({
  type: FilterCapActionTypes.FILTER_CAPABILITIES_REQUEST
});

export const filterCapabilitiesSuccess = (
  filterCapabilities: IFilterCapabilitiesDic
): IFilterCapabilitiesSuccess => ({
  type: FilterCapActionTypes.FILTER_CAPABILITIES_SUCCESS,
  filterCapabilities
});

export const enum QueryConstraintActionTypes {
  QUERY_CONSTRAINT_ADD = "QUERY_CONSTRAINT_ADD",
  QUERY_CONSTRAINT_TYPE_UPDATE = "QUERY_CONSTRAINT_TYPE_UPDATE",
  QUERY_CONSTRAINT_VALUES_UPDATE = "QUERY_CONSTRAINT_VALUES_UPDATE",
  QUERY_CONSTRAINT_REMOVE = "QUERY_CONSTRAINT_REMOVE"
}

export interface IAddQueryConstraint extends Action {
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_ADD;
  elementId: number;
  constraint: IConstraint;
}

export interface IUpdateQueryConstraintType extends Action {
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_TYPE_UPDATE;
  elementId: number;
  constraintId: number;
  constraintType: QesFilterType;
}

export interface IUpdateQueryConstraintValues extends Action {
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_VALUES_UPDATE;
  elementId: number;
  constraintId: number;
  vectorValues: any[][];
  valuesHint?: string;
}

export interface IRemoveQueryConstraint extends Action {
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_REMOVE;
  elementId: number;
  constraintIndex: number;
}

export type QueryConstraintAction =
  | IAddQueryConstraint
  | IUpdateQueryConstraintType
  | IUpdateQueryConstraintValues
  | IRemoveQueryConstraint;

export const addQueryConstraint = (
  elementId: number,
  constraint: IConstraint
): IAddQueryConstraint => ({
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_ADD,
  elementId,
  constraint
});

export const updateQueryConstraintType = (
  elementId: number,
  constraintId: number,
  constraintType: QesFilterType
): IUpdateQueryConstraintType => ({
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_TYPE_UPDATE,
  elementId,
  constraintId,
  constraintType
});

export const updateQueryConstraintValues = (
  elementId: number,
  constraintId: number,
  vectorValues: any[][],
  valuesHint?: string
): IUpdateQueryConstraintValues => ({
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_VALUES_UPDATE,
  elementId,
  constraintId,
  vectorValues,
  valuesHint
});

export const removeQueryConstraint = (
  elementId: number,
  constraintIndex: number
): IRemoveQueryConstraint => ({
  type: QueryConstraintActionTypes.QUERY_CONSTRAINT_REMOVE,
  elementId,
  constraintIndex
});
