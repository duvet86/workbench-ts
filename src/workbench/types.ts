export enum OperatorServiceIds {
  NONE = "NONE",
  QUERY = "QUERY",
  FILTER = "FILTER",
  CALCULATOR = "f2b180d1-8c2c-422c-bd70-3a84cad759ee",
  HISTOGRAM = "6ac6ee28-4adf-4a94-9c9c-60393a089b53",
  JOIN = "447a2ad9-6201-4c24-88d9-7dd2b761482f",
  LINK = "51574f40-5959-4550-b599-15d11721e8d9",
  PIVOT = "e27b60fb-e3f4-4619-82db-e7b1ecf572b2",
  UNPIVOT = "b5d85439-cffb-4198-8818-3921607a4e8b"
}

export const enum QueryGraphElementTypes {
  None = "None",
  Query = "Query",
  InteractiveFilter = "InteractiveFilter",
  Operator = "Operator",
  Aspect2 = "Aspect2"
}

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

interface ICacheConfiguration {
  Mode: string;
  ExpiryTimeSeconds?: number;
  ScheduleTimesOfDay: number[];
  ScheduleIntervalSeconds?: number;
}

interface IQueryGraphElementBase {
  ElementId: number;
  IsConfigured: boolean;
  ChangeNumber: number;
  ForceRun: boolean;
  LastExecuteMs?: number;
  LastExecuteRecordCount?: number;
  LastExecuteStartTime?: Date;
  State: string;
  StateReason?: string;
  ElementType: QueryGraphElementTypes;
  Exception?: string;
  ExceptionSummary?: string;
  ExtraData?: object;
  DependsOn?: number[];
  DependedOnBy?: number[];
  LayoutX: number;
  LayoutY: number;
}

interface IAspect2 extends IQueryGraphElementBase {
  Aspect2ServiceId: string;
  ResolvedServiceLabel: string;
  ResolvedServiceUrl: string;
  ResolvedServiceIconColor: string;
  ResolvedServiceIconBorderColor: string;
  AspectGuid: string;
  SourceElementId: string;
  Collapsed: string;
  ZIndex: number;
  Width?: number;
  Height?: number;
  Label: string;
  AspectJson: string;
  Size: string;
  IsVisible: boolean;
  Order?: number;
  ModelId?: number;
  ModelSessionId: string;
}

interface IAspect {
  AspectId: number;
  AspectGuid: string;
  ElementType: string;
  ElementId: number;
  LayoutX?: number;
  LayoutY?: number;
  Collapsed: boolean;
  ZIndex: number;
  Width?: number;
  Height?: number;
  AspectLabel: string;
  AspectTypeId: string;
  AspectJson: string;
  ChangeNumber: number;
  Size: string;
  IsVisible: boolean;
  Order?: number;
}

interface ISortBy {
  ColumnName: string;
  Aggregation: string;
  Direction: "Ascending" | "Descending";
  Order: number;
}

interface IQesDataTableColumn {
  ColumnIndex: number;
  ColumnName: number;
  Label: string;
  DisplayLabel: string;
  Description: string;
  DisplayFormat: IDisplayFormat;
  DataType: QesDataType;
  DataLength?: number;
  DefaultAggregate: string;
  ProhibitedAggregations: string[];
  AggregationDisplayFormat: { [QesAggregate: string]: IDisplayFormat };
  IsNumeric: number;
}

interface IOperator extends IQueryGraphElementBase {
  OperatorServiceId: string;
  ResolvedServiceLabel: string;
  ResolvedServiceUrl: string;
  ResolvedServiceIconColor: string;
  ResolvedServiceIconBorderColor: string;
  Label: string;
  IsQueryGraphResult: boolean;
  DataTableId?: number;
  DataTableSessionId: string;
  OperatorJson: string;
  DataTableDescription: IQesDataTableColumn[];
}

interface IArchivedHistoryEntry {
  ChangeNumber: number;
  InteractiveFilterId?: number;
  QueryId?: number;
  OperatorId?: number;
  Aspect2Id?: number;
  ConnectionId?: number;
  AspectId?: number;
}

interface IException {
  Message: string;
  StackTrace: string;
  InnerException: IException;
}

export interface IConstraint {
  ConstraintIndex: number;
  DataType: QesDataType;
  ColumnName: string;
  FilterType: QesFilterType;

  ConstraintName?: string;
  FilterName?: string;
  Expression1?: string;
  Expression2?: string;
  Values?: any[][];
  ValuesHint?: string;
  ValuesDisplayStringsPreview?: string;
}

export interface IColumn {
  ColumnName: string;
  Label: string;
  Aggregation: string;
  UniqueOutputColumnName?: string;
}

export interface IQuery extends IQueryGraphElementBase {
  Label: string;
  SubQueryGraphId?: number;
  DataTableId?: number;
  DataTableSessionId?: string;
  IsQueryGraphResult: boolean;
  TargetDataServiceId?: string;
  TargetDataViewId?: string;
  ResolvedServiceUrl?: string;
  ResolvedLabel?: string;
  ResolvedDescription?: string;
  ResolvedIconUrl?: string;
  SelectAllColumns?: boolean;
  Columns: IColumn[];
  SortBys: ISortBy[];
  RowLimitMode?: "NumberOfRows" | "Percentage";
  RowLimitValue?: number;
  Constraints: IConstraint[];
  ColumnDependencySets?: string[][];
  AvailableFilterDependencySets?: string[][];
  ExpandedSubQueryGraphData?: IQueryGraphData;
  EnableAggregation?: boolean;
  DataTableDescription?: IQesDataTableColumn[];
}

export interface IInteractiveFilter extends IQueryGraphElementBase {
  Label: string;
  Required: boolean;
  DataType: QesDataType;
  FilterName: string;
  FilterType: QesFilterType;

  ValuesHint?: string;
  Values?: any[][];
  ResolvedDependsOnFilterNames?: string[];
  HasAllowedValues?: boolean;
  SelectAllHasNoEffect?: boolean;
  FilterGuid?: string;
  FilterJson?: string;
}

export interface IConnection {
  ConnectionId: number;
  FromElementType: string;
  FromElementId: number;
  FromColumnName: number;
  FromFilterName: string;
  FromConfigJson: string;
  ToElementType: string;
  ToElementId: number;
  ToColumnName: string;
  ToFilterName: string;
  ToConstraintId?: number;
  ToConfigJson: string;
  ChangeNumber: number;
  State: string;
  IsInactive: boolean;
}

export interface IQueryGraphData {
  Type: "Complete" | "Partial";
  Limit: string;
  NextChangeNumber: number;
  NextElementId: number;
  NextConnectionId: number;
  NextAspectId: number;
  Aspect2s: IAspect2[];
  Aspects: IAspect[];
  Queries: number[];
  Operators: IOperator[];
  InteractiveFilters: number[];
  Connections: number[];
  ArchiveHistory: IArchivedHistoryEntry[];
  LimitExcludedElements: number[];
}

export interface IQueryGraphDataDenormalised {
  Type: "Complete" | "Partial" | "SaveOnly";
  Limit: string;
  NextChangeNumber: number;
  NextElementId: number;
  NextConnectionId: number;
  NextAspectId: number;
  Aspect2s: IAspect2[];
  Aspects: IAspect[];
  Operators: IOperator[];
  ArchiveHistory: IArchivedHistoryEntry[];
  LimitExcludedElements: number[];
  Queries: IQuery[];
  InteractiveFilters: IInteractiveFilter[];
  Connections: IConnection[];
}

export interface IDisplayFormat {
  Default: IDisplayFormat;
  ReportMetric: string;
  Uom: string;
  FormatString: string;
  Units: string;
  ConversionFactor?: number;
  ConversionOffset?: number;
}

export interface ISession {
  TenantId: string;
  SessionId: string;
  QueryGraphId: number;
  SessionDatabaseId: string;
  DataViewId?: string;
  UserName: string;
  CacheConfiguration?: ICacheConfiguration;
  InitialQueryGraph?: IQueryGraphData;
}

export interface IQueryGraphChanges {
  FoundChanges: boolean;
  Running: boolean;
  Cancelled: boolean;
  Exception: IException;
  ChangesGraph: IQueryGraphDataDenormalised;
}

export interface IPushQueryGraphResult {
  HistoryNumber?: number;
}

export interface IQueryGraphPop {
  QueryGraphData: IQueryGraphData;
}
