import { SvgIconProps } from "@material-ui/core/SvgIcon";

export enum ElementType {
  NONE = "NONE",
  QUERY = "QUERY",
  FILTER = "FILTER"
}

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
  elementType?: ElementType;
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
