import { NodeModel } from "storm-react-diagrams";
import QueryPortModel from "workbench/query/canvas/QueryPortModel";

export default class QueryNodeModel extends NodeModel {
  private label: string;

  constructor(label: string, x: number, y: number) {
    super("query");

    this.addPort(new QueryPortModel("top"));
    this.addPort(new QueryPortModel("bottom"));
    this.label = label;
    this.setPosition(x, y);
  }
}
