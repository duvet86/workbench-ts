import React, { SFC } from "react";

import { IOption } from "common/searchableList/types";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import SettingsIcon from "@material-ui/icons/SettingsApplications";

interface IProps {
  index: number;
  isScrolling: boolean;
  isVisible: boolean;
  key: string;
  style: object;
}

interface IClasses {
  listItem: string;
  iconColour: string;
  listItemTextPrimary: string;
  listItemText: string;
}

const rowRenderer: (
  classes: IClasses,
  columns: IOption[],
  onItemClick: (column: IOption) => void
) => SFC<IProps> = (classes, columns, onItemClick) => ({
  index,
  key,
  style
}) => {
  const queryColumn = columns[index];
  const handleClick = () => onItemClick(queryColumn);

  return (
    <div key={key} style={style}>
      <ListItem
        onClick={handleClick}
        disableGutters
        dense
        button
        className={classes.listItem}
        ContainerComponent="div"
      >
        <ListItemIcon>
          <SettingsIcon className={classes.iconColour} />
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classes.listItemTextPrimary
          }}
          className={classes.listItemText}
          primary={queryColumn.label}
          // secondary={`(${queryColumn.DataType})`}
        />
      </ListItem>
      <Divider />
    </div>
  );
};

export default rowRenderer;
