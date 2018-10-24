import { IDisplayFormat } from "workbench/types";

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
  AllowedValuesQueryGraphId?: number;
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
  ValueVector: object[];
  DisplayValue: string;
  Selected: boolean;
}
