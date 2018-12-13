import { PortModel, AbstractPortFactory } from "diagram/main";

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
