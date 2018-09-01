import { NodeModel } from "storm-react-diagrams";

import QueryPortModel from "workbench/query/canvas/QueryPortModel";
import { IQuery } from "workbench/types";

export default class QueryNodeModel extends NodeModel {
  private queryInfo: IQuery;

  constructor(queryInfo: IQuery) {
    super("query");

    this.addPort(new QueryPortModel("top"));
    this.addPort(new QueryPortModel("bottom"));
    this.setPosition(queryInfo.LayoutX, queryInfo.LayoutY);

    this.queryInfo = queryInfo;
  }

  public getQueryInfo() {
    return this.queryInfo;
  }
}
