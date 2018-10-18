import { HomeIcon, DashboardIcon, DataViewIcon } from "common/icons";
import StarIcon from "@material-ui/icons/Star";

export const buttons = [
  {
    tooltip: "Home",
    Icon: HomeIcon,
    link: "/"
  },
  {
    tooltip: "Favorites",
    Icon: StarIcon,
    link: "/"
  },
  {
    tooltip: "New Page",
    Icon: DashboardIcon,
    link: "/pagebuilder/new"
  },
  {
    tooltip: "New Workbench",
    Icon: DataViewIcon,
    link: "/workbench/new"
  }
];
