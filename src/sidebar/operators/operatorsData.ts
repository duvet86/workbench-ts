import { SvgIconProps } from "@material-ui/core/SvgIcon";

import DefaultIcon from "@material-ui/icons/FiberNew";
import FilterListIcon from "@material-ui/icons/FilterList";
import FunctionsIcon from "@material-ui/icons/Functions";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import SearchIcon from "@material-ui/icons/Search";
import ShareIcon from "@material-ui/icons/Share";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";

export interface IExtraInfo {
  type?: ElementType;
  IconComponent: React.ComponentType<SvgIconProps>;
  backgroundColor: string;
}

export interface IOperatorExtraInfo {
  [key: string]: IExtraInfo;
}

export enum ElementType {
  NONE = "NONE",
  QUERY = "QUERY",
  FILTER = "FILTER"
}

export const DEFAULTS = {
  backgroundColor: "#000000",
  IconComponent: DefaultIcon
};

export const itemType = {
  OPERATOR: "OPERATOR"
};

export const staticOperatorsList = [
  {
    OperatorServiceId: "1",
    Label: "Query",
    Description: "Query your data"
  },
  {
    OperatorServiceId: "2",
    Label: "Filter",
    Description: "Filter your data"
  }
];

export const operatorsExtraInfo: IOperatorExtraInfo = {
  // Data Query.
  1: {
    type: ElementType.QUERY,
    IconComponent: SearchIcon,
    backgroundColor: "#7b582d"
  },
  // Filter.
  2: {
    type: ElementType.FILTER,
    IconComponent: FilterListIcon,
    backgroundColor: "#2c5367"
  },
  // Calculator.
  "f2b180d1-8c2c-422c-bd70-3a84cad759ee": {
    IconComponent: FunctionsIcon,
    backgroundColor: "#e4ab00"
  },
  // Histogram.
  "6ac6ee28-4adf-4a94-9c9c-60393a089b53": {
    IconComponent: InsertChartIcon,
    backgroundColor: "#861b1b"
  },
  // Join.
  "447a2ad9-6201-4c24-88d9-7dd2b761482f": {
    IconComponent: ShareIcon,
    backgroundColor: "#458159"
  },
  // Pivot.
  "e27b60fb-e3f4-4619-82db-e7b1ecf572b2": {
    IconComponent: SubdirectoryArrowRightIcon,
    backgroundColor: "#0880c7"
  },
  // Unpivot.
  "b5d85439-cffb-4198-8818-3921607a4e8b": {
    IconComponent: SubdirectoryArrowLeftIcon,
    backgroundColor: "#0831c7"
  }
};
