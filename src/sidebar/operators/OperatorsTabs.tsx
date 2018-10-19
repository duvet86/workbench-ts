import React, { SFC } from "react";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import FilterIcon from "@material-ui/icons/FilterList";
import OperatorIcon from "@material-ui/icons/Build";

interface IProps extends WithStyles<typeof styles> {
  value: 0 | 1;
  handleTreeChange: (_: React.ChangeEvent<{}>, value: 0 | 1) => void;
}

const tabs = [
  {
    label: "Filters",
    Icon: FilterIcon
  },
  {
    label: "Operators",
    Icon: OperatorIcon
  }
];

const styles = (theme: Theme) =>
  createStyles({
    tabRoot: {
      [theme.breakpoints.up("md")]: {
        fontSize: theme.typography.pxToRem(11),
        minWidth: 160
      }
    },
    labelIcon: {
      minHeight: 0,
      paddingTop: theme.spacing.unit
    }
  });

const FolderTreeTabs: SFC<IProps> = ({ classes, value, handleTreeChange }) => (
  <Tabs
    fullWidth
    value={value}
    onChange={handleTreeChange}
    indicatorColor="primary"
    textColor="primary"
  >
    {tabs.map(({ label, Icon }, n) => (
      <Tab
        key={n}
        classes={{ root: classes.tabRoot, labelIcon: classes.labelIcon }}
        label={label}
        icon={<Icon fontSize="small" />}
      />
    ))}
  </Tabs>
);

export default withStyles(styles)(FolderTreeTabs);
