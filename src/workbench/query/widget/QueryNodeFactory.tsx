import React from "react";
import { AbstractNodeFactory, DiagramEngine, NodeModel } from "diagram/main";

import QueryNodeModel from "workbench/query/widget/QueryNodeModel";
import QueryNodeWidget from "workbench/query/widget/QueryNodeWidget";

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
