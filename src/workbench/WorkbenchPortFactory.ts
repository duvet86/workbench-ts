import { PortModel, AbstractPortFactory } from "storm-react-diagrams";

export default class DiagramPortFactory extends AbstractPortFactory {
  private portModel: PortModel;

  constructor(portModel: PortModel) {
    super("workbench");
    this.portModel = portModel;
  }

  public getNewInstance(initialConfig?: any): PortModel {
    return this.portModel;
  }
}
