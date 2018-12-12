import { DefaultPortModel } from "./DefaultPortModel";
import _ from "lodash";

import { NodeModel } from "../../models/NodeModel";
import { Toolkit } from "../../Toolkit";
import { DiagramEngine } from "../../DiagramEngine";

/**
 * @author Dylan Vorster
 */
export class DefaultNodeModel extends NodeModel {
  private name: string;
  private color: string;

  constructor(name: string = "Untitled", color: string = "rgb(0,192,255)") {
    super("default");
    this.name = name;
    this.color = color;
  }

  public addInPort(label: string): DefaultPortModel {
    return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
  }

  public addOutPort(label: string): DefaultPortModel {
    return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
  }

  public deSerialize(object: any, engine: DiagramEngine) {
    super.deSerialize(object, engine);
    this.name = object.name;
    this.color = object.color;
  }

  public serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color
    });
  }

  public getInPorts(): DefaultPortModel[] {
    return _.filter(this.ports, portModel => {
      return portModel.in;
    });
  }

  public getOutPorts(): DefaultPortModel[] {
    return _.filter(this.ports, portModel => {
      return !portModel.in;
    });
  }
}
