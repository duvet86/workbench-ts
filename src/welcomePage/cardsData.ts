import BuildIcon from "@material-ui/icons/Build";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import InfoIcon from "@material-ui/icons/Info";
import PersonIcon from "@material-ui/icons/Person";
import { DashboardIcon, DataViewIcon } from "common/icons";

const linksList = [
  {
    id: 1,
    IconComponent: DataViewIcon,
    label: "New Workbench",
    description:
      "This is where you can query, filter and manipulate your data.",
    to: "/workbench/new"
  },
  {
    id: 2,
    IconComponent: DashboardIcon,
    label: "New Pagebuilder",
    description: "This is where you visualise your queries.",
    to: "/pagebuilder/new"
  },
  {
    id: 3,
    IconComponent: BuildIcon,
    label: "Configure Session",
    description: "This is where you tune your workbench.",
    to: "/"
  },
  {
    id: 4,
    IconComponent: PersonIcon,
    label: "Profile",
    description: "This is where you change your personal information.",
    to: "/profile"
  },
  {
    id: 5,
    IconComponent: ContactPhoneIcon,
    label: "Contact Us",
    description: "For any trouble or info contact us here.",
    to: "/"
  },
  {
    id: 6,
    IconComponent: InfoIcon,
    label: "Product Info",
    description: "Product version and info.",
    to: "/"
  }
];

export default linksList;
