import { schema /*, normalize, denormalize */ } from "normalizr";

// const queryColumn = new schema.Entity(
//   "queryColumns",
//   {},
//   {
//     idAttribute: (value, parent, key) => ({
//       [parent.ElementId]: value.ColumnName
//     })
//     // processStrategy: (value, parent, key) => ({
//     //   [value.ColumnName]: { ...value }
//     // })
//   }
// );

const query = new schema.Entity(
  "queries",
  {},
  {
    idAttribute: "ElementId"
  }
);

const filter = new schema.Entity("filters", {}, { idAttribute: "ElementId" });

// const test = {
//   Type: "Partial",
//   Connections: [],
//   ArchiveHistory: [],
//   Queries: [
//     {
//       Label: "Query #1",
//       SubQueryGraphId: 2,
//       DataTableId: null,
//       DataTableSessionId: null,
//       IsQueryGraphResult: false,
//       TargetDataServiceId: null,
//       TargetDataViewId: "75442226-4015-4c7b-8a14-9a0a6a7d0555",
//       ResolvedServiceUrl: null,
//       ResolvedLabel: null,
//       ResolvedDescription: null,
//       ResolvedIconUrl: null,
//       SelectAllColumns: null,
//       Columns: [
//         { ColumnName: "FleetGroup", Aggregation: "None", Label: "Fleet Group" },
//         { ColumnName: "asd", Aggregation: "None", Label: "Fleet Group" },
//         { ColumnName: "aaa", Aggregation: "None", Label: "Fleet Group" },
//         {
//           ColumnName: "FleetGroupDescription",
//           Aggregation: "None",
//           Label: "Fleet Group Description"
//         }
//       ],
//       SortBys: [],
//       Constraints: [],
//       ColumnDependencySets: [],
//       AvailableFilterDependencySets: [],
//       ExpandedSubQueryGraphData: null,
//       EnableAggregation: false,
//       DataTableDescription: [],
//       ElementId: 1,
//       IsConfigured: true,
//       ChangeNumber: 6,
//       ForceRun: true,
//       LastExecuteMs: null,
//       LastExecuteRecordCount: null,
//       State: "Limited",
//       StateReason: "Element is limited - Data service has not been executed.",
//       ElementType: "Query",
//       Exception: null,
//       ExceptionSummary: null,
//       ExtraData: null,
//       DependsOn: [],
//       DependedOnBy: [],
//       LayoutX: 416,
//       LayoutY: 52.453125
//     },
//     {
//       Label: "Query #1",
//       SubQueryGraphId: 2,
//       DataTableId: null,
//       DataTableSessionId: null,
//       IsQueryGraphResult: false,
//       TargetDataServiceId: null,
//       TargetDataViewId: "75442226-4015-4c7b-8a14-9a0a6a7d0555",
//       ResolvedServiceUrl: null,
//       ResolvedLabel: null,
//       ResolvedDescription: null,
//       ResolvedIconUrl: null,
//       SelectAllColumns: null,
//       Columns: [
//         { ColumnName: "FleetGroup", Aggregation: "None", Label: "Fleet Group" },
//         {
//           ColumnName: "FleetGroupDescription",
//           Aggregation: "None",
//           Label: "Fleet Group Description"
//         }
//       ],
//       SortBys: [],
//       Constraints: [],
//       ColumnDependencySets: [],
//       AvailableFilterDependencySets: [],
//       ExpandedSubQueryGraphData: null,
//       EnableAggregation: false,
//       DataTableDescription: [],
//       ElementId: 2,
//       IsConfigured: true,
//       ChangeNumber: 6,
//       ForceRun: true,
//       LastExecuteMs: null,
//       LastExecuteRecordCount: null,
//       State: "Limited",
//       StateReason: "Element is limited - Data service has not been executed.",
//       ElementType: "Query",
//       Exception: null,
//       ExceptionSummary: null,
//       ExtraData: null,
//       DependsOn: [],
//       DependedOnBy: [],
//       LayoutX: 416,
//       LayoutY: 52.453125
//     }
//   ],
//   Limit: "ChangesOnly",
//   InteractiveFilters: [],
//   Operators: [],
//   Aspects: []
// };

export const graphSchema = {
  Queries: [query],
  InteractiveFilters: [filter]
};

// const data = normalize(test, graphSchema);
// console.log(data);
// console.log(denormalize(data.result, graphSchema, data.entities));
