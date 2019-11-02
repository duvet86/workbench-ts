import { NodeModel, DefaultPortModel } from "@projectstorm/react-diagrams";
import { BaseModelOptions } from "@projectstorm/react-canvas-core";

import { IInteractiveFilter } from "workbench/types";

type FilterNodeModelOptions = IInteractiveFilter & BaseModelOptions;

export default class FilterNodeModel extends NodeModel {
  private filterInfo: IInteractiveFilter;

  constructor(options: FilterNodeModelOptions) {
    super({
      ...options,
      id: options.ElementId.toString(),
      type: "filter"
    });

    this.addPort(new DefaultPortModel(true, "from"));
    this.addPort(new DefaultPortModel(false, "to"));

    this.setPosition(options.LayoutX, options.LayoutY);

    this.filterInfo = options;
  }

  public getFilterInfo() {
    return this.filterInfo;
  }
}
