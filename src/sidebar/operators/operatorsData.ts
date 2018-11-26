import {
  IOperatorServiceDtc,
  IOperatorExtraInfo
} from "sidebar/operators/types";
import { OperatorServiceIds } from "workbench/types";

import DefaultIcon from "@material-ui/icons/FiberNew";
import FilterListIcon from "@material-ui/icons/FilterList";
import FunctionsIcon from "@material-ui/icons/Functions";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import SearchIcon from "@material-ui/icons/Search";
import ShareIcon from "@material-ui/icons/Share";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import LinkIcon from "@material-ui/icons/Link";

export const DEFAULTS = {
  backgroundColor: "#000000",
  IconComponent: DefaultIcon
};

export const staticOperatorsList: IOperatorServiceDtc[] = [
  {
    OperatorServiceId: OperatorServiceIds.QUERY,
    Label: "Query",
    Description: "Query your data"
  },
  {
    OperatorServiceId: OperatorServiceIds.FILTER,
    Label: "Filter",
    Description: "Filter your data"
  }
];

export const operatorsExtraInfo: IOperatorExtraInfo = {
  // Data Query.
  [OperatorServiceIds.QUERY]: {
    IconComponent: SearchIcon,
    backgroundColor: "#7b582d"
  },
  // Filter.
  [OperatorServiceIds.FILTER]: {
    IconComponent: FilterListIcon,
    backgroundColor: "#2c5367"
  },
  // Calculator.
  [OperatorServiceIds.CALCULATOR]: {
    IconComponent: FunctionsIcon,
    backgroundColor: "#e4ab00"
  },
  // Histogram.
  [OperatorServiceIds.HISTOGRAM]: {
    IconComponent: InsertChartIcon,
    backgroundColor: "#861b1b"
  },
  // Join.
  [OperatorServiceIds.JOIN]: {
    IconComponent: ShareIcon,
    backgroundColor: "#458159"
  },
  // Link.
  [OperatorServiceIds.LINK]: {
    IconComponent: LinkIcon,
    backgroundColor: "#00c0ff"
  },
  // Pivot.
  [OperatorServiceIds.PIVOT]: {
    IconComponent: SubdirectoryArrowRightIcon,
    backgroundColor: "#0880c7"
  },
  // Unpivot.
  [OperatorServiceIds.UNPIVOT]: {
    IconComponent: SubdirectoryArrowLeftIcon,
    backgroundColor: "#0831c7"
  }
};
