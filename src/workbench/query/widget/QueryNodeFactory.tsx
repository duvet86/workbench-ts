import React from "react";
import {
  AbstractReactFactory,
  GenerateWidgetEvent,
  GenerateModelEvent
} from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

import QueryNodeModel from "workbench/query/widget/QueryNodeModel";
import QueryNodeWidget from "workbench/query/widget/QueryNodeWidget";

export default class QueryNodeFactory extends AbstractReactFactory<
  QueryNodeModel,
  DiagramEngine
> {
  constructor() {
    super("query");
  }
  public generateModel(event: GenerateModelEvent) {
    return new QueryNodeModel(event.initialConfig);
  }

  public generateReactWidget(
    event: GenerateWidgetEvent<QueryNodeModel>
  ): JSX.Element {
    return (
      <QueryNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    );
  }
}
