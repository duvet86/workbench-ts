import React, { SFC } from "react";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import MyItemsIcon from "@material-ui/icons/Folder";
import SharedWithMeIcon from "@material-ui/icons/FolderShared";

interface IProps extends WithStyles<typeof styles> {
  currentTree: 0 | 1;
  handleTreeChange: (_: React.ChangeEvent<{}>, currentTree: 0 | 1) => void;
}

const tabs = [
  {
    label: "My Items",
    Icon: MyItemsIcon
  },
  {
    label: "Shared With Me",
    Icon: SharedWithMeIcon
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

const FolderTreeTabs: SFC<IProps> = ({
  classes,
  currentTree,
  handleTreeChange
}) => (
  <Tabs
    fullWidth
    value={currentTree}
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
