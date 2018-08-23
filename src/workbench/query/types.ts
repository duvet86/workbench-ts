interface IFilterTypeMapping {
  Type: string;
  Label: string;
}

interface IDisplayFormat {
  ReportMetric: string;
  Uom: string;
  FormatString: string;
  Units: string;
  ConversionFactor?: number;
  ConversionOffset?: number;
}

interface IUdsColumnDescriptionDtc {
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

interface IUdsFilterDescriptionDtc {
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
