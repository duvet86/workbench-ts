import { EndpointOptions, ConnectParams } from "jsplumb";

import { IConstraint } from "workbench/types";

import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

interface IContraintDisplayValue extends IConstraint {
  label: string;
  displayValue: any;
}

export enum DATA_TYPES {
  NOTSPECIFIED = "NotSpecified",
  TEXTVALUE = "TextValue",
  BOOLVALUE = "BoolValue",
  INTERVALVALUE = "Interval",
  INTVALUE = "IntValue",
  DOUBLEVALUE = "DoubleValue",
  TEXTVALUEWITHLABEL = "TextValueWithLabel",
  TEXTVALUEWITHMASK = "TextValueWithMask",
  TEXTVALUEWITHORDER = "TextValueWithOrder",
  SELECT = "Select",
  TEXTINPUTLIST = "TextInputList",
  MULTISELECT = "MultiSelect"
}

export const CANVAS_DRAGGABLE_CONTAINER_ID = "draggable-container-canvas";
export const CANVAS_DRAGGABLE_ID = "draggable-canvas";

export const getElementId = (id: number) => `canvas-operator-${id}`;

export const toolbarData = [
  {
    id: 1,
    label: "Save",
    IconComponent: SaveIcon
  },
  {
    id: 2,
    label: "Save As",
    IconComponent: SaveIcon
  },
  {
    id: 3,
    label: "Share",
    IconComponent: ShareIcon
  },
  {
    id: 4,
    label: "Undo",
    IconComponent: UndoIcon
  },
  {
    id: 5,
    label: "Redo",
    IconComponent: RedoIcon
  },
  {
    id: 6,
    label: "Layout",
    IconComponent: OpenWithIcon
  },
  {
    id: 7,
    label: "Export Graph",
    IconComponent: ArrowDownwardIcon
  }
];

export const connectionConfig = {
  detachable: false,
  anchors: ["Bottom", "Top"],
  endpoints: ["Blank", "Blank"],
  connector: ["Flowchart", { cornerRadius: 5 }],
  overlays: [["Arrow", { location: 0.9 }]]
};

export const topEndPointConfig: EndpointOptions = {
  id: "topEndPointConfig",
  scope: "",
  anchor: "Top",
  // endpoint: ["Dot", { radius: 5, cssClass: "topendpoint" }], Fix me.
  isTarget: true,
  isSource: false,
  maxConnections: -1,
  parameters: {},
  reattachConnections: false,
  type: "Dot"
};

export const bottomEndPointConfig: EndpointOptions = {
  id: "bottomEndPointConfig",
  scope: "",
  anchor: "Bottom",
  // endpoint: [
  //   "Rectangle",
  //   { width: 10, height: 10, cssClass: "bottomendpoint" } Fix me.
  // ],
  isTarget: false,
  isSource: true,
  maxConnections: -1,
  parameters: {},
  reattachConnections: false,
  type: "Dot"
};

export function getConstraintDisplayValue(constraint: IConstraint) {
  const constraintDsiplayValue: IContraintDisplayValue = Object.assign(
    {
      label: constraint.ColumnName,
      displayValue: ""
    },
    constraint
  );
  switch (constraint.DataType) {
    case DATA_TYPES.INTERVALVALUE:
      constraintDsiplayValue.displayValue = constraint.Values && {
        intervalType: constraint.Values[0][0],
        intervalString: constraint.Values[0][1],
        intervalLabel: constraint.Values[0][2]
      };
      break;

    case DATA_TYPES.TEXTVALUE:
    case DATA_TYPES.TEXTVALUEWITHLABEL:
    case DATA_TYPES.TEXTVALUEWITHMASK:
    case DATA_TYPES.TEXTVALUEWITHORDER:
    case DATA_TYPES.BOOLVALUE:
    case DATA_TYPES.INTVALUE:
    case DATA_TYPES.DOUBLEVALUE:
      constraintDsiplayValue.displayValue = constraint.Values
        ? constraint.Values[0][0]
        : "";
      break;
    // case DATA_TYPES.SELECT:
    //   c.displayValue = {
    //     valuesHint: valuesHint ? valuesHint : "NoHint",
    //     values: values,
    //     valuesDisplayStringsPreview: valuesDisplayStringsPreview
    //   };
    //   break;
    // case DATA_TYPES.TEXTINPUTLIST:
    // case DATA_TYPES.MULTISELECT:
    //   c.displayValue = {
    //     valuesHint: valuesHint ? valuesHint : "SelectedAll",
    //     values: values,
    //     valuesDisplayStringsPreview: valuesDisplayStringsPreview
    //   };
    //   break;
    default:
      constraintDsiplayValue.displayValue = "";
      break;
  }

  return constraintDsiplayValue;
}

interface IConstraintVectorValue {
  vectorValues: object[][];
  valuesHint?: string;
}

export function getConstraintVectorValue(
  dataType: DATA_TYPES,
  values: any, // Fix me.
  valuesHint?: string
) {
  const valuesObj: IConstraintVectorValue = {
    vectorValues: [[values]],
    valuesHint: "NoHint"
  };

  switch (dataType) {
    case DATA_TYPES.INTERVALVALUE:
      valuesObj.vectorValues = [
        [values.intervalType, values.intervalString, values.intervalLabel]
      ];
      break;

    case DATA_TYPES.SELECT:
    case DATA_TYPES.TEXTINPUTLIST:
    case DATA_TYPES.MULTISELECT:
      valuesObj.vectorValues = values.values;
      valuesObj.valuesHint = valuesHint;
      break;

    default:
      break;
  }

  return valuesObj;
}
