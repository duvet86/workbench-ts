import { OperatorServiceIds } from "workbench/types";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

export interface IOperatorServiceDtc {
  TenantId?: string;
  OperatorServiceId: OperatorServiceIds;
  Label: string;
  IconColor?: string;
  IconBorderColor?: string;
  Description?: string;
  ServiceBaseUrl?: string;
}

export interface IExtraInfo {
  backgroundColor: string;
  IconComponent: React.ComponentType<SvgIconProps>;
}

export interface IOperatorExtraInfo {
  [key: string]: IExtraInfo;
}

export interface IOperatorResult extends IExtraInfo {
  operatorServiceId: OperatorServiceIds;
  label: string;
  description?: string;
}
