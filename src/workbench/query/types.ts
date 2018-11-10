import { IDisplayFormat } from "workbench/types";

export enum QesDataType {
  NotSpecified = "NotSpecified",
  IntValue = "IntValue",
  DoubleValue = "DoubleValue",
  TextValue = "TextValue",
  DateTimeValue = "DateTimeValue",
  Ratio = "Ratio",
  ValueWithWeight = "ValueWithWeight",
  ValueWithDisplayFormat = "ValueWithDisplayFormat",
  ValueWithFormatString = "ValueWithFormatString",
  ListValue = "ListValue",
  Entity = "Entity",
  Interval = "Interval",
  IntValueWithMask = "IntValueWithMask",
  TextValueWithMask = "TextValueWithMask",
  TextValueWithLabel = "TextValueWithLabel",
  TextValueWithOrder = "TextValueWithOrder",
  Range = "Range",
  Vector = "Vector",
  Vector3 = "Vector3",
  BoolValue = "BoolValue",
  MeasurementValue = "MeasurementValue",
  TimeValue = "TimeValue",
  DateValue = "DateValue",
  LinkValue = "LinkValue"
}

export const enum QesFilterType {
  NotSpecified = "NotSpecified",
  Interval = "Interval",
  InList = "InList",
  SingleSelect = "SingleSelect",
  Equal = "Equal",
  NotEqual = "NotEqual",
  NotInList = "NotInList",
  BetweenInclusive = "BetweenInclusive",
  BetweenExclusive = "BetweenExclusive",
  GreaterThan = "GreaterThan",
  LessThan = "LessThan",
  GreaterThanEqualTo = "GreaterThanEqualTo",
  LessThanEqualTo = "LessThanEqualTo",
  Like = "Like",
  BoolValue = "BoolValue",
  IsNull = "IsNull",
  IsNotNull = "IsNotNull"
}

interface IFilterTypeMapping {
  Type: string;
  Label: string;
}

export interface IUdsColumnDescriptionDtc {
  ColumnIndex: number;
  ColumnName: string;
  Label: string;
  DisplayLabel: string;
  Description: string;
  DisplayFormat: IDisplayFormat;
  DataType: string;
  DataLength?: number;
  DefaultAggregate: string;
  ProhibitedAggregations: string[];
  AggregationDisplayFormat: { [QesAggregate: string]: IDisplayFormat };
  IsNumeric: boolean;
  IsAggregationRequired: boolean;
  HandleFiltering: boolean;
  HandleAggregation: boolean;
  HandleSorting: boolean;
}

export interface IUdsFilterDescriptionDtc {
  FilterName: string;
  Label: string;
  Description: string;
  DataType: string;
  SupportedFilterTypes: string[];
  FilterRequired: boolean;
  HasAllowedValues: boolean;
  AllowedValuesSessionId: string;
  AllowedValuesQueryGraphId: number;
  AllowedValuesFilterName: string;
  ResolvedDependsOnFilterNames: string[];
  // Added by me.
  ToColumnName: string;
}

export interface IAvailableColumns {
  [name: string]: IUdsColumnDescriptionDtc;
}

export interface IAvailableFilters {
  [name: string]: IUdsFilterDescriptionDtc;
}

export interface IFilterCapabilitiesDic {
  [QesDataType: string]: IFilterTypeMapping[];
}

export interface IUdsDescriptionDtc {
  Version: number;
  SupportedVersions: number[];
  HandleRowLimit: boolean;
  Columns: IUdsColumnDescriptionDtc[];
  ColumnDependencySets: string[];
  AvailableFilters: IUdsFilterDescriptionDtc[];
  AvailableFiltersDependencySets: string[];
}

export interface IAllowedValueDtc {
  ValueVector: any[];
  DisplayValue: string;
  Selected: boolean;
}

export interface IPagedRows {
  PageNumber: number;
  PageSize: number;
  TotalRowCount: number;
  VectorRows: any[];
  DisplayRows: string[][];
}
