import { SvgIconProps } from "@material-ui/core/SvgIcon";

export interface IOperatorServiceDtc {
  TenantId?: string;
  OperatorServiceId: string;
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
  operatorServiceId: string;
  label: string;
  description?: string;
}
