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
  ElementType: string;
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
  DataType: string;
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
  ConstraintId: number;
  DataType: string;
  ColumnName: string;
  FilterType: string;

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
  ExpandedSubQueryGraphData?: IQueryGraphDataDtc;
  EnableAggregation?: boolean;
  DataTableDescription?: IQesDataTableColumn[];
}

export interface IInteractiveFilter extends IQueryGraphElementBase {
  FilterGuid: string;
  FilterName: string;
  FilterType: string;
  Label: string;
  DataType: string;
  Required: boolean;
  SelectAllHasNoEffect: boolean;
  ValuesHint: string;
  Values: object[][];
  FilterJson: string;
  ResolvedDependsOnFilterNames: string[];
  HasAllowedValues: boolean;
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

export interface IQueryGraphDataDtc {
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

export interface IQueryGraphDataDenormalisedDtc {
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

export interface ISessionDtc {
  TenantId: string;
  SessionId: string;
  QueryGraphId: number;
  SessionDatabaseId: string;
  DataViewId?: string;
  UserName: string;
  CacheConfiguration?: ICacheConfiguration;
  InitialQueryGraph?: IQueryGraphDataDtc;
}

export interface IQueryGraphChangesDtc {
  FoundChanges: boolean;
  Running: boolean;
  Cancelled: boolean;
  Exception: IException;
  ChangesGraph: IQueryGraphDataDenormalisedDtc;
}

export interface IPushQueryGraphResultDtc {
  HistoryNumber?: number;
}

export interface IQueryGraphPopDtc {
  QueryGraphData: IQueryGraphDataDtc;
}
