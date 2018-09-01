import React from "react";
import {
  AbstractNodeFactory,
  DiagramEngine,
  NodeModel
} from "storm-react-diagrams";

import QueryNodeModel from "workbench/query/canvas/QueryNodeModel";
import QueryNodeWidget from "workbench/query/canvas/QueryNodeWidget";

export default class QueryNodeFactory extends AbstractNodeFactory {
  constructor() {
    super("query");
  }

  public generateReactWidget(
    _: DiagramEngine,
    node: QueryNodeModel
  ): JSX.Element {
    return <QueryNodeWidget node={node} />;
  }

  public getNewInstance() {
    return new NodeModel();
  }
}
