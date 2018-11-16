import React, { ComponentType } from "react";
import { RouteComponentProps } from "react-router";

const WelcomePageAsync = React.lazy(() => import("welcomePage/WelcomePage"));
const WorkbenchContainerAsync = React.lazy<
  ComponentType<RouteComponentProps<{ id: string }>>
>(() => import("workbench/WorkbenchContainer"));
const PagebuilderContainerAsync = React.lazy(() =>
  import("pagebuilder/PagebuilderContainer")
);
const ProfileContainerAsync = React.lazy(() =>
  import("profile/ProfileContainer")
);

const renderWelcomePageAsync = () => <WelcomePageAsync />;
const renderPagebuilderContainerAsync = () => <PagebuilderContainerAsync />;
const renderWorkbenchContainerAsync = (
  props: RouteComponentProps<{ id: string }>
) => <WorkbenchContainerAsync {...props} />;
const renderProfileContainerAsync = () => <ProfileContainerAsync />;

export const routeRenderers = [
  {
    key: 1,
    routeRenderer: renderWelcomePageAsync,
    path: "/"
  },
  {
    key: 2,
    routeRenderer: renderPagebuilderContainerAsync,
    path: "/pagebuilder/:id"
  },
  {
    key: 3,
    routeRenderer: renderWorkbenchContainerAsync,
    path: "/workbench/:id"
  },
  {
    key: 4,
    routeRenderer: renderProfileContainerAsync,
    path: "/profile"
  }
];
