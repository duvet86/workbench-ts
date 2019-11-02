import { NodeModel, DefaultPortModel } from "@projectstorm/react-diagrams";
import { BaseModelOptions } from "@projectstorm/react-canvas-core";

import { IQuery } from "workbench/types";

type QueryNodeModelOptions = IQuery & BaseModelOptions;

export default class QueryNodeModel extends NodeModel {
  private queryInfo: IQuery;

  constructor(options: QueryNodeModelOptions) {
    super({
      ...options,
      id: options.ElementId.toString(),
      type: "query"
    });

    this.addPort(new DefaultPortModel(true, "from"));
    this.addPort(new DefaultPortModel(false, "to"));

    this.setPosition(options.LayoutX, options.LayoutY);

    this.queryInfo = options;
  }

  public getQueryInfo() {
    return this.queryInfo;
  }
}
