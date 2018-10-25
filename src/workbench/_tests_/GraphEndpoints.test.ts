import fetch from "node-fetch";
import { encode } from "base-64";
import { getAsync, postAsync } from "lib/http";
import {
  ISessionDtc,
  IQueryGraphChangesDtc,
  IQueryGraphDataDenormalisedDtc
} from "workbench/types";

export interface IFetchGlobal extends NodeJS.Global {
  fetch: typeof fetch;
}

(global as IFetchGlobal).fetch = fetch;

process.env.BASE_URL = "http://lmarang-au-de01/mine2";
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

  const session = await postAsync<ISessionDtc>(
    `api/qes/${process.env.TENANT_ID}/sessions?applyOnly=true`,
    null,
    headers
  );

  if (session.InitialQueryGraph == null) {
    throw new Error();
  }

  let graphData: IQueryGraphDataDenormalisedDtc = {
    Aspect2s: [],
    Aspects: [],
    InteractiveFilters: [],
    Limit: "Unspecified",
    Operators: [],
    Queries: [],
    Type: "Partial",
    NextChangeNumber: 1,
    NextElementId: 1,
    NextConnectionId: 1,
    NextAspectId: 1,
    ArchiveHistory: [],
    LimitExcludedElements: [],
    Connections: []
  };

  await postAsync(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?applyOnly=true`,
    graphData,
    headers
  );

  let graphChanges = await getAsync<IQueryGraphChangesDtc>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?nextChangeNumber=1`,
    headers
  );

  graphData = {
    ArchiveHistory: [],
    Aspect2s: [],
    Aspects: [],
    Connections: [],
    InteractiveFilters: [],
    Operators: [],
    Queries: [
      {
        Label: "Query",
        ElementId: 1,
        ElementType: "Query",
        IsConfigured: false,
        LayoutX: 352,
        LayoutY: 88.453125,
        IsQueryGraphResult: false,
        Columns: [],
        SortBys: [],
        Constraints: [],
        ChangeNumber: 1,
        ForceRun: false,
        State: "None"
      }
    ],
    Type: graphChanges.ChangesGraph.Type,
    Limit: graphChanges.ChangesGraph.Limit,
    NextChangeNumber: graphChanges.ChangesGraph.NextChangeNumber,
    NextAspectId: graphChanges.ChangesGraph.NextAspectId,
    NextConnectionId: graphChanges.ChangesGraph.NextConnectionId,
    NextElementId: graphChanges.ChangesGraph.NextElementId,
    LimitExcludedElements: graphChanges.ChangesGraph.LimitExcludedElements
  };

  await postAsync(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?applyOnly=false`,
    graphData,
    headers
  );

  graphChanges = await getAsync<IQueryGraphChangesDtc>(
    `api/qes/${process.env.TENANT_ID}/sessions/${
      session.SessionId
    }/querygraph/${session.QueryGraphId}/changes?nextChangeNumber=1`,
    headers
  );

  // tslint:disable-next-line:no-console
  console.log(graphChanges);
});
