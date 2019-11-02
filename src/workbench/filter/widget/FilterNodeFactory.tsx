import React from "react";
import {
  AbstractReactFactory,
  GenerateWidgetEvent,
  GenerateModelEvent
} from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

import FilterNodeModel from "workbench/filter/widget/FilterNodeModel";
import FilterNodeWidget from "workbench/filter/widget/FilterNodeWidget";

export default class FilterNodeFactory extends AbstractReactFactory<
  FilterNodeModel,
  DiagramEngine
> {
  constructor() {
    super("filter");
  }

  public generateModel(event: GenerateModelEvent) {
    return new FilterNodeModel(event.initialConfig);
  }

  public generateReactWidget(
    event: GenerateWidgetEvent<FilterNodeModel>
  ): JSX.Element {
    return (
      <FilterNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    );
  }
}
