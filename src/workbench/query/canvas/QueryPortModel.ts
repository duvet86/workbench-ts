import {
  LinkModel,
  DiagramEngine,
  PortModel,
  DefaultLinkModel
} from "storm-react-diagrams";

export default class QueryPortModel extends PortModel {
  private position: string;

  constructor(pos: "top" | "bottom" = "top") {
    super(pos, "query");
    this.position = pos;
  }

  public serialize() {
    return Object.assign(super.serialize(), {
      position: this.position
    });
  }

  public deSerialize(data: any, engine: DiagramEngine) {
    super.deSerialize(data, engine);
    this.position = data.position;
  }

  public createLinkModel(): LinkModel {
    return new DefaultLinkModel();
  }
}
