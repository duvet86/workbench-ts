import React from "react";
import {
  AbstractNodeFactory,
  DiagramEngine,
  NodeModel
} from "storm-react-diagrams";

import FilterNodeModel from "workbench/filter/FilterNodeModel";
import FilterNodeWidget from "workbench/filter/FilterNodeWidget";

export default class FilterNodeFactory extends AbstractNodeFactory {
  constructor() {
    super("filter");
  }

  public generateReactWidget(
    _: DiagramEngine,
    node: FilterNodeModel
  ): JSX.Element {
    return <FilterNodeWidget node={node} />;
  }

  public getNewInstance() {
    return new NodeModel();
  }
}
