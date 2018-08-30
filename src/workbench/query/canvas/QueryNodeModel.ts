import { NodeModel } from "storm-react-diagrams";
import QueryPortModel from "workbench/query/canvas/QueryPortModel";

export default class QueryNodeModel extends NodeModel {
  constructor() {
    super("query");
    this.addPort(new QueryPortModel("top"));
    this.addPort(new QueryPortModel("bottom"));
  }
}
