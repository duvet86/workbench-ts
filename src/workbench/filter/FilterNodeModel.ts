import { NodeModel } from "storm-react-diagrams";

import WorkbenchPortModel from "workbench/WorkbenchPortModel";
import { IInteractiveFilter } from "workbench/types";

export default class FilterNodeModel extends NodeModel {
  private filterInfo: IInteractiveFilter;

  constructor(filterInfo: IInteractiveFilter) {
    super("filter", filterInfo.ElementId.toString());

    this.addPort(new WorkbenchPortModel("from"));
    this.addPort(new WorkbenchPortModel("to"));
    this.setPosition(filterInfo.LayoutX, filterInfo.LayoutY);

    this.filterInfo = filterInfo;
  }

  public getFilterInfo() {
    return this.filterInfo;
  }
}
