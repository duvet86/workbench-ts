import { NodeModel } from "diagram/main";

import WidgetPortModel from "workbench/WidgetPortModel";
import { IQuery } from "workbench/types";

export default class QueryNodeModel extends NodeModel {
  private queryInfo: IQuery;

  constructor(queryInfo: IQuery) {
    super("query", queryInfo.ElementId.toString());

    this.addPort(new WidgetPortModel("from"));
    this.addPort(new WidgetPortModel("to"));
    this.setPosition(queryInfo.LayoutX, queryInfo.LayoutY);

    this.queryInfo = queryInfo;
  }

  public getQueryInfo() {
    return this.queryInfo;
  }
}
