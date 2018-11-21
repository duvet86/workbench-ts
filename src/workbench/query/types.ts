import { IDisplayFormat, QesDataType, QesFilterType } from "workbench/types";

interface IFilterTypeMapping {
  Type: QesFilterType;
  Label: string;
}

export interface IUdsColumnDescriptionDtc {
  ColumnIndex: number;
  ColumnName: string;
  Label: string;
  DisplayLabel: string;
  Description: string;
  DisplayFormat: IDisplayFormat;
  DataType: QesDataType;
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
  DataType: QesDataType;
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
