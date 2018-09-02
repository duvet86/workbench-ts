import { NodeModel } from "storm-react-diagrams";

import WorkbenchPortModel from "workbench/WorkbenchPortModel";
import { IQuery } from "workbench/types";

export default class QueryNodeModel extends NodeModel {
  private queryInfo: IQuery;

  constructor(queryInfo: IQuery) {
    super("query", queryInfo.ElementId.toString());

    this.addPort(new WorkbenchPortModel("from"));
    this.addPort(new WorkbenchPortModel("to"));
    this.setPosition(queryInfo.LayoutX, queryInfo.LayoutY);

    this.queryInfo = queryInfo;
  }

  public getQueryInfo() {
    return this.queryInfo;
  }
}
