import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import { IOption } from "common/select/SelectInputContainer";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import SettingsIcon from "@material-ui/icons/SettingsApplications";

interface IProps extends WithStyles<typeof styles> {
  style: React.CSSProperties;
  option: IOption;
  handleClick: (event: React.MouseEvent) => void;
}

const styles = createStyles({
  iconColour: {
    fill: "#003b86"
  },
  listItem: {
    paddingLeft: 15
  },
  listItemText: {
    display: "flex"
  },
  listItemTextPrimary: {
    flexBasis: "35%"
  }
});

const Row: SFC<IProps> = ({ classes, style, option, handleClick }) => (
  <ListItem
    divider
    style={style}
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
      primary={option.label}
      // secondary={`(${queryColumn.DataType})`}
    />
  </ListItem>
);

export default withStyles(styles)(Row);
