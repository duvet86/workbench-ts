import { Action } from "redux";
import { normalize } from "normalizr";

import { graphSchema } from "workbench/schema";

import {
  IQueryGraphData,
  IQuery,
  IInteractiveFilter,
  IConnection,
  IQueryGraphChanges,
  QueryGraphElementTypes,
  QesDataType,
  QesFilterType
} from "workbench/types";

export const enum GraphActionTypes {
  GRAPH_QUERY_ADD = "GRAPH_QUERY_ADD",
  GRAPH_FILTER_ADD = "GRAPH_FILTER_ADD",
  GRAPH_CHANGES_SUCCESS = "GRAPH_CHANGES_SUCCESS"
}

export interface IGraphAddQuery extends Action {
  type: GraphActionTypes.GRAPH_QUERY_ADD;
  elementId: number;
  query: IQuery;
}

export interface IGraphAddFilter extends Action {
  type: GraphActionTypes.GRAPH_FILTER_ADD;
  elementId: number;
  filter: IInteractiveFilter;
}

export interface IGraphChangesSuccess extends Action {
  type: GraphActionTypes.GRAPH_CHANGES_SUCCESS;
  graph: IQueryGraphData;
  queries: { [key: string]: IQuery };
  filters: { [key: string]: IInteractiveFilter };
  connections: { [key: string]: IConnection };
}

export type GraphActions =
  | IGraphAddQuery
  | IGraphAddFilter
  | IGraphChangesSuccess;

export const graphAddQuery = (
  elementId: number,
  x: number,
  y: number
): IGraphAddQuery => ({
  type: GraphActionTypes.GRAPH_QUERY_ADD,
  elementId,
  query: {
    ElementId: elementId,
    ElementType: QueryGraphElementTypes.Query,
    Label: "",
    IsConfigured: false,
    TargetDataServiceId: "",
    TargetDataViewId: "",
    Columns: [],
    SortBys: [],
    Constraints: [],
    IsQueryGraphResult: false,
    ChangeNumber: 0,
    ForceRun: false,
    State: "New",
    LayoutX: x,
    LayoutY: y
  }
});

export const graphAddFilter = (
  elementId: number,
  x: number,
  y: number
): IGraphAddFilter => ({
  type: GraphActionTypes.GRAPH_FILTER_ADD,
  elementId,
  filter: {
    ElementId: elementId,
    ElementType: QueryGraphElementTypes.InteractiveFilter,
    Label: "",
    FilterName: `FILTER_${elementId}`,
    DataType: QesDataType.NotSpecified,
    FilterType: QesFilterType.NotSpecified,
    Required: false,
    IsConfigured: false,
    ChangeNumber: 0,
    ForceRun: false,
    State: "New",
    LayoutX: x,
    LayoutY: y
  }
});

export const graphChangesSuccess = (
  rawGraphChanges: IQueryGraphChanges
): IGraphChangesSuccess => {
  const normalizedGraph = normalize(rawGraphChanges.ChangesGraph, graphSchema);
  const { queries, filters, connections } = normalizedGraph.entities;

  return {
    type: GraphActionTypes.GRAPH_CHANGES_SUCCESS,
    graph: normalizedGraph.result,
    queries: queries || {},
    filters: filters || {},
    connections: connections || {}
  };
};
