import React from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import SettingsIcon from "@material-ui/icons/SettingsApplications";

interface IProps extends WithStyles<typeof styles> {
  label: string;
  style: React.CSSProperties;
}

const styles = createStyles({
  listItem: {
    padding: 0
  },
  itemIcon: {
    marginRight: 5
  },
  primary: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
});

const QueryColumn: React.FC<IProps> = ({ classes, style, label }) => (
  <ListItem style={style} className={classes.listItem} component="div" dense>
    <ListItemIcon className={classes.itemIcon}>
      <SettingsIcon />
    </ListItemIcon>
    <ListItemText
      className={classes.listItem}
      classes={{ primary: classes.primary }}
      primary={label}
    />
  </ListItem>
);

export default withStyles(styles)(QueryColumn);
