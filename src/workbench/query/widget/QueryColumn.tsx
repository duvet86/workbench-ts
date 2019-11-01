import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import SettingsIcon from "@material-ui/icons/SettingsApplications";

interface IProps {
  label: string;
  style: React.CSSProperties;
}

const useStyles = makeStyles({
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

const QueryColumn: React.FC<IProps> = ({ style, label }) => {
  const classes = useStyles();

  return (
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
};

export default QueryColumn;
