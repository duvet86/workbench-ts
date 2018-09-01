import { PortModel, AbstractPortFactory } from "storm-react-diagrams";

export default class QueryPortFactory extends AbstractPortFactory {
  private portModel: PortModel;

  constructor(portModel: PortModel) {
    super("query");
    this.portModel = portModel;
  }

  public getNewInstance(initialConfig?: any): PortModel {
    return this.portModel;
  }
}
