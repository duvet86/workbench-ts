import fetch from "node-fetch";
import { encode } from "base-64";
import { getAsync, postAsync } from "lib/http";
import { ISession, IQueryGraphChanges } from "workbench/types";
import { IUdsDescriptionDtc } from "workbench/query/types";

export interface IFetchGlobal extends NodeJS.Global {
  fetch: typeof fetch;
}

(global as IFetchGlobal).fetch = fetch;

process.env.BASE_URL = "https://app.connect.trimble.com/tc";
process.env.TENANT_ID = "demo";

test("Test AllowedValues", async () => {
  const userName = "livemine";
  const password = "Trimble456";

  const token = await getAsync("api/token", {
    Authorization: `Basic ${encode(userName + ":" + password)}`
  });

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    section: process.env.TENANT_ID!
  };

  // SESSION
  const session = await postAsync<ISession>(
    `api/qes/${
      process.env.TENANT_ID
    }/sessions?linkLabel=New+Data+View&linkType=Workbench`,
    null,
    headers
  );

  if (session.InitialQueryGraph == null) {
    throw new Error();
  }

  expect(session.InitialQueryGraph.NextChangeNumber).toBe(1);

  // nextChangeNumber: 1
  let graphChanges = await getAsync<IQueryGraphChanges>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?nextChangeNumber=${
      session.InitialQueryGraph.NextChangeNumber
    }`,
    headers
  );

  // let graphData: IQueryGraphDataDenormalised = {
  //   ...graphChanges.ChangesGraph,
  //   Type: "Partial",
  //   Queries: [],
  //   Operators: [],
  //   Aspect2s: [],
  //   InteractiveFilters: [],
  //   Aspects: [],
  //   Limit: "Unspecified"
  // };

  const graphData1 = {
    Type: "Partial",
    Queries: [],
    Operators: [],
    Aspect2s: [],
    InteractiveFilters: [],
    Aspects: [],
    Limit: "Unspecified"
  };

  // POST CHANGES
  await postAsync(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?applyOnly=true`,
    graphData1,
    headers
  );

  // PUSH
  await postAsync(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/push`,
    null,
    headers
  );

  // graphData = {
  //   ...graphChanges.ChangesGraph,
  //   Type: "Partial",
  //   Connections: [],
  //   ArchiveHistory: [],
  //   Queries: [
  //     {
  //       Label: "Query",
  //       IsConfigured: false,
  //       ElementType: "Query",
  //       LayoutX: 248,
  //       LayoutY: 31.453125,
  //       ElementId: 1,
  //       IsQueryGraphResult: false,
  //       Columns: [],
  //       SortBys: [],
  //       Constraints: [],
  //       ChangeNumber: 1,
  //       ForceRun: false,
  //       State: "None"
  //     }
  //   ],
  //   InteractiveFilters: [],
  //   Operators: [],
  //   Aspects: [],
  //   Aspect2s: []
  // };

  const graphData2 = {
    Type: "Partial",
    Connections: [],
    ArchiveHistory: [],
    Queries: [
      {
        IsConfigured: false,
        TargetDataServiceId: null,
        TargetDataViewId: null,
        ElementType: "Query",
        LayoutX: 248,
        LayoutY: 31.453125,
        ElementId: 1
      }
    ],
    InteractiveFilters: [],
    Operators: [],
    Aspects: [],
    Aspect2s: []
  };

  // POST CHANGES
  await postAsync(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?refreshAll=false`,
    graphData2,
    headers
  );

  expect(graphChanges.ChangesGraph.NextChangeNumber).toBe(1);

  // nextChangeNumber: 1
  graphChanges = await getAsync<IQueryGraphChanges>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?nextChangeNumber=${
      graphChanges.ChangesGraph.NextChangeNumber
    }`,
    headers
  );

  expect(graphChanges.ChangesGraph.NextChangeNumber).toBe(4);

  // nextChangeNumber: 4
  graphChanges = await getAsync<IQueryGraphChanges>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?nextChangeNumber=${
      graphChanges.ChangesGraph.NextChangeNumber
    }`,
    headers
  );

  // graphData = {
  //   ...graphChanges.ChangesGraph,
  //   Type: "Partial",
  //   Connections: [],
  //   ArchiveHistory: [],
  //   Queries: [
  //     {
  //       Label: "Query #1",
  //       IsQueryGraphResult: false,
  //       TargetDataViewId: "d5e55e8e-008a-4175-8950-128e896aed4b",
  //       Columns: [],
  //       SortBys: [],
  //       RowLimitMode: "NumberOfRows",
  //       Constraints: [],
  //       EnableAggregation: false,
  //       ElementId: 1,
  //       IsConfigured: false,
  //       ChangeNumber: 3,
  //       ForceRun: false,
  //       State: "Blocked",
  //       StateReason: "Element not configured",
  //       ElementType: "Query",
  //       DependsOn: [],
  //       DependedOnBy: [],
  //       LayoutX: 248,
  //       LayoutY: 31.453125
  //     }
  //   ],
  //   Limit: "SaveOnly",
  //   InteractiveFilters: [],
  //   Operators: [],
  //   Aspects: [],
  //   Aspect2s: []
  // };

  const graphData3 = {
    Type: "Partial",
    Connections: [],
    ArchiveHistory: [],
    Queries: [
      {
        Label: "Query #1",
        SubQueryGraphId: null,
        DataTableId: null,
        DataTableSessionId: null,
        IsQueryGraphResult: false,
        TargetDataServiceId: null,
        TargetDataViewId: "d5e55e8e-008a-4175-8950-128e896aed4b",
        ResolvedServiceUrl: null,
        ResolvedLabel: null,
        ResolvedDescription: null,
        ResolvedIconUrl: null,
        SelectAllColumns: null,
        Columns: [],
        SortBys: [],
        RowLimitMode: "NumberOfRows",
        RowLimitValue: null,
        Constraints: [],
        ColumnDependencySets: null,
        AvailableFilterDependencySets: null,
        ExpandedSubQueryGraphData: null,
        EnableAggregation: false,
        DataTableDescription: null,
        ElementId: 1,
        IsConfigured: false,
        ChangeNumber: 3,
        ForceRun: false,
        LastExecuteMs: null,
        LastExecuteRecordCount: null,
        LastExecuteStartTime: null,
        State: "Blocked",
        StateReason: "Element not configured",
        ElementType: "Query",
        Exception: null,
        ExceptionSummary: null,
        ExtraData: null,
        DependsOn: [],
        DependedOnBy: [],
        LayoutX: 248,
        LayoutY: 31.453125,
        _hasQueuedChange: false,
        _resolvedStyle: { color: "gray", iconClass: "fa-ban" }
      }
    ],
    Limit: "SaveOnly",
    InteractiveFilters: [],
    Operators: [],
    Aspects: [],
    Aspect2s: []
  };

  // POST CHANGES
  await postAsync(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?refreshAll=false`,
    graphData3,
    headers
  );

  expect(graphChanges.ChangesGraph.NextChangeNumber).toBe(4);

  // nextChangeNumber: 4
  graphChanges = await getAsync<IQueryGraphChanges>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?nextChangeNumber=${
      graphChanges.ChangesGraph.NextChangeNumber
    }`,
    headers
  );

  expect(graphChanges.ChangesGraph.NextChangeNumber).toBe(5);

  // nextChangeNumber: 5
  graphChanges = await getAsync<IQueryGraphChanges>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?nextChangeNumber=${
      graphChanges.ChangesGraph.NextChangeNumber
    }`,
    headers
  );

  expect(graphChanges.ChangesGraph.NextChangeNumber).toBe(6);

  // nextChangeNumber: 6
  graphChanges = await getAsync<IQueryGraphChanges>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?nextChangeNumber=${
      graphChanges.ChangesGraph.NextChangeNumber
    }`,
    headers
  );

  expect(graphChanges.ChangesGraph.NextChangeNumber).toBe(7);

  // nextChangeNumber: 7
  graphChanges = await getAsync<IQueryGraphChanges>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?nextChangeNumber=${
      graphChanges.ChangesGraph.NextChangeNumber
    }`,
    headers
  );

  // DESCRIBE
  let describe = await getAsync<IUdsDescriptionDtc>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/queries/1/describe`,
    headers
  );

  // graphData = {
  //   ...graphChanges.ChangesGraph,
  //   Type: "Partial",
  //   Connections: [],
  //   ArchiveHistory: [],
  //   Queries: [
  //     {
  //       Label: "Query #1",
  //       SubQueryGraphId: 2,
  //       IsQueryGraphResult: false,
  //       TargetDataViewId: "d5e55e8e-008a-4175-8950-128e896aed4b",
  //       Columns: [],
  //       SortBys: [],
  //       RowLimitMode: "NumberOfRows",
  //       Constraints: [],
  //       ColumnDependencySets: [],
  //       AvailableFilterDependencySets: [],
  //       EnableAggregation: false,
  //       DataTableDescription: [],
  //       ElementId: 1,
  //       IsConfigured: false,
  //       ChangeNumber: 6,
  //       ForceRun: false,
  //       State: "Limited",
  //       StateReason: "Element is limited - Save only.",
  //       ElementType: "Query",
  //       DependsOn: [],
  //       DependedOnBy: [],
  //       LayoutX: 248,
  //       LayoutY: 31.453125
  //     }
  //   ],
  //   Limit: "SaveOnly",
  //   InteractiveFilters: [],
  //   Operators: [],
  //   Aspects: [],
  //   Aspect2s: []
  // };

  const graphData4 = {
    Type: "Partial",
    Connections: [],
    ArchiveHistory: [],
    Queries: [
      {
        Label: "Query #1",
        SubQueryGraphId: 2,
        DataTableId: null,
        DataTableSessionId: null,
        IsQueryGraphResult: false,
        TargetDataServiceId: null,
        TargetDataViewId: "d5e55e8e-008a-4175-8950-128e896aed4b",
        ResolvedServiceUrl: null,
        ResolvedLabel: null,
        ResolvedDescription: null,
        ResolvedIconUrl: null,
        SelectAllColumns: null,
        Columns: [],
        SortBys: [],
        RowLimitMode: "NumberOfRows",
        RowLimitValue: null,
        Constraints: [],
        ColumnDependencySets: [],
        AvailableFilterDependencySets: [],
        ExpandedSubQueryGraphData: null,
        EnableAggregation: false,
        DataTableDescription: [],
        ElementId: 1,
        IsConfigured: false,
        ChangeNumber: 6,
        ForceRun: false,
        LastExecuteMs: null,
        LastExecuteRecordCount: null,
        LastExecuteStartTime: null,
        State: "Limited",
        StateReason: "Element is limited - Save only.",
        ElementType: "Query",
        Exception: null,
        ExceptionSummary: null,
        ExtraData: null,
        DependsOn: [],
        DependedOnBy: [],
        LayoutX: 248,
        LayoutY: 31.453125,
        _hasQueuedChange: false,
        _resolvedStyle: { color: "gray", iconClass: "fa-ban" }
      }
    ],
    Limit: "SaveOnly",
    InteractiveFilters: [],
    Operators: [],
    Aspects: [],
    Aspect2s: []
  };

  // POST CHANGES
  await postAsync(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?refreshAll=false`,
    graphData4,
    headers
  );

  expect(graphChanges.ChangesGraph.NextChangeNumber).toBe(7);

  // nextChangeNumber: 7
  graphChanges = await getAsync<IQueryGraphChanges>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?nextChangeNumber=${
      graphChanges.ChangesGraph.NextChangeNumber
    }`,
    headers
  );

  expect(graphChanges.ChangesGraph.NextChangeNumber).toBe(8);

  // nextChangeNumber: 8
  graphChanges = await getAsync<IQueryGraphChanges>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?nextChangeNumber=${
      graphChanges.ChangesGraph.NextChangeNumber
    }`,
    headers
  );

  // DESCRIBE
  describe = await getAsync<IUdsDescriptionDtc>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/queries/1/describe`,
    headers
  );

  const graphData5 = {
    Type: "Partial",
    Connections: [],
    ArchiveHistory: [],
    InteractiveFilters: [
      {
        DataType: "TextValue",
        FilterGuid: "18f91599-4b52-2ff8-7c08-590afed4f97c",
        ElementId: 2,
        FilterName: "FILTER_2",
        IsConfigured: true
      }
    ],
    Limit: "ChangesOnly",
    Queries: [],
    Operators: [],
    Aspects: [],
    Aspect2s: []
  };

  // POST CHANGES
  await postAsync(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?refreshAll=false`,
    graphData5,
    headers
  );

  expect(graphChanges.ChangesGraph.NextChangeNumber).toBe(8);

  // nextChangeNumber: 8
  graphChanges = await getAsync<IQueryGraphChanges>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?nextChangeNumber=${
      graphChanges.ChangesGraph.NextChangeNumber
    }`,
    headers
  );

  expect(graphChanges.ChangesGraph.NextChangeNumber).toBe(13);

  // nextChangeNumber: 13
  graphChanges = await getAsync<IQueryGraphChanges>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?nextChangeNumber=${
      graphChanges.ChangesGraph.NextChangeNumber
    }`,
    headers
  );

  const filter = describe.AvailableFilters.find(
    ({ Label }) => Label === "Operation"
  );

  const allowedValues = await getAsync(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${filter!.AllowedValuesQueryGraphId}/filters/${
      filter!.FilterName
    }/allowedvalues`,
    headers
  );

  // tslint:disable-next-line:no-console
  console.log(allowedValues);
});
