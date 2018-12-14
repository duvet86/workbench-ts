import { NodeModel } from "storm-react-diagrams2";

import WidgetPortModel from "workbench/WidgetPortModel";
import { IInteractiveFilter } from "workbench/types";

export default class FilterNodeModel extends NodeModel {
  private filterInfo: IInteractiveFilter;

  constructor(filterInfo: IInteractiveFilter) {
    super("filter", filterInfo.ElementId.toString());

    this.addPort(new WidgetPortModel("from"));
    this.addPort(new WidgetPortModel("to"));
    this.setPosition(filterInfo.LayoutX, filterInfo.LayoutY);

    this.filterInfo = filterInfo;
  }

  public getFilterInfo() {
    return this.filterInfo;
  }
}
