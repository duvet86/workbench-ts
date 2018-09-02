import {
  LinkModel,
  DiagramEngine,
  PortModel,
  DefaultLinkModel
} from "storm-react-diagrams";

export default class WorkbenchPortModel extends PortModel {
  private position: string;

  constructor(pos: "from" | "to" = "from") {
    super(pos, "workbench");
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

  public link(port: PortModel): LinkModel {
    const link = this.createLinkModel();
    link.setSourcePort(this);
    link.setTargetPort(port);

    return link;
  }

  public createLinkModel(): LinkModel {
    return new DefaultLinkModel();
  }
}
