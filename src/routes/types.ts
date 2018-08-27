import { RouteProps } from "react-router";

export interface IRouteProps {
  component: React.ComponentType<RouteProps>;
  path: string;
}
