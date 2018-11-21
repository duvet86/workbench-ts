import { Action } from "redux";
import {
  IInteractiveFilter,
  QueryGraphElementTypes,
  QesDataType,
  QesFilterType
} from "workbench/types";

export const enum FilterActionTypes {
  FILTER_ADD = "FILTER_ADD"
}

export interface IAddFilter extends Action {
  type: FilterActionTypes.FILTER_ADD;
  elementId: number;
  filter: IInteractiveFilter;
}

export type FilterActions = IAddFilter;

export const addFilter = (
  elementId: number,
  x: number,
  y: number
): IAddFilter => ({
  type: FilterActionTypes.FILTER_ADD,
  elementId,
  filter: {
    ElementId: elementId,
    ElementType: QueryGraphElementTypes.InteractiveFilter,
    Label: "",
    FilterName: `FILTER_${elementId}`,
    DataType: QesDataType.NotSpecified,
    FilterType: QesFilterType.NotSpecified,
    Required: false,
    IsConfigured: false,
    ChangeNumber: 0,
    ForceRun: false,
    State: "New",
    LayoutX: x,
    LayoutY: y
  }
});
