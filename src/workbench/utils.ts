import { IConstraint, QesDataType } from "workbench/types";
import { IOption } from "common/select/SelectInputContainer";
import { DataViewIcon } from "common/icons";

import NewIcon from "@material-ui/icons/RestorePage";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

type QueryContraint = IConstraint & IOption;

export const toolbarData = [
  {
    label: "New",
    IconComponent: NewIcon
  },
  {
    label: "Save",
    IconComponent: SaveIcon
  },
  {
    label: "Save As",
    IconComponent: SaveIcon
  },
  {
    label: "Share",
    IconComponent: ShareIcon
  },
  {
    label: "Undo",
    IconComponent: UndoIcon
  },
  {
    label: "Redo",
    IconComponent: RedoIcon
  },
  {
    label: "Layout",
    IconComponent: OpenWithIcon
  },
  {
    label: "Export Graph",
    IconComponent: ArrowDownwardIcon
  },
  {
    label: "Session Info",
    IconComponent: DataViewIcon
  }
];

export function getConstraintDisplayValue(constraint: IConstraint) {
  const constraintDsiplayValue: QueryContraint = {
    ...constraint,
    label: constraint.OutputColumnName,
    value: ""
  };

  switch (constraint.DataType) {
    case QesDataType.Interval:
      constraintDsiplayValue.value = constraint.Values && {
        intervalType: constraint.Values[0][0],
        intervalString: constraint.Values[0][1],
        intervalLabel: constraint.Values[0][2]
      };
      break;

    case QesDataType.TextValue:
    case QesDataType.TextValueWithLabel:
    case QesDataType.TextValueWithMask:
    case QesDataType.TextValueWithOrder:
    case QesDataType.BoolValue:
    case QesDataType.IntValue:
    case QesDataType.DoubleValue:
      constraintDsiplayValue.value = constraint.Values
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
      constraintDsiplayValue.value = "";
      break;
  }

  return constraintDsiplayValue;
}

interface IConstraintVectorValue {
  vectorValues: object[][];
  valuesHint?: string;
}

export function getConstraintVectorValue(
  dataType: string,
  values: any, // Fix me.
  valuesHint?: string
) {
  const valuesObj: IConstraintVectorValue = {
    vectorValues: [[values]],
    valuesHint: "NoHint"
  };

  switch (dataType) {
    case QesDataType.Interval:
      valuesObj.vectorValues = [
        [values.intervalType, values.intervalString, values.intervalLabel]
      ];
      break;

    case QesDataType.ListValue:
      valuesObj.vectorValues = values.values;
      valuesObj.valuesHint = valuesHint;
      break;

    default:
      break;
  }

  return valuesObj;
}
