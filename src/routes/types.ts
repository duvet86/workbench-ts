import { RouteComponentProps } from "react-router";

export interface IRouteProps {
  component: React.ComponentType<RouteComponentProps>;
  path: string;
}
