import Build from "@material-ui/icons/Build";
import ContactPhone from "@material-ui/icons/ContactPhone";
import Dashboard from "@material-ui/icons/Dashboard";
import Info from "@material-ui/icons/Info";
import Person from "@material-ui/icons/Person";
import Work from "@material-ui/icons/Work";

const linksList = [
  {
    id: 1,
    IconComponent: Work,
    label: "New Workbench",
    description:
      "This is where you can query, filter and manipulate your data.",
    to: "/workbench/new"
  },
  {
    id: 2,
    IconComponent: Dashboard,
    label: "New Pagebuilder",
    description: "This is where you visualise your queries.",
    to: "/pagebuilder/new"
  },
  {
    id: 3,
    IconComponent: Build,
    label: "Configure Session",
    description: "This is where you tune your workbench.",
    to: "/"
  },
  {
    id: 4,
    IconComponent: Person,
    label: "Profile",
    description: "This is where you change your personal information.",
    to: "/profile"
  },
  {
    id: 5,
    IconComponent: ContactPhone,
    label: "Contact Us",
    description: "For any trouble or info contact us here.",
    to: "/"
  },
  {
    id: 6,
    IconComponent: Info,
    label: "Product Info",
    description: "Product version and info.",
    to: "/"
  }
];

export default linksList;
