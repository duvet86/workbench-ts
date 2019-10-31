import React, { FC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import { IOption } from "common/select/SelectInputContainer";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ColumnIcon from "@material-ui/icons/SettingsApplications";

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
  }
});

const Row: FC<IProps> = ({ classes, style, option, handleClick }) => (
  <ListItem
    divider
    disableGutters
    dense
    button
    ContainerComponent="div"
    style={style}
    onClick={handleClick}
    className={classes.listItem}
  >
    <ListItemIcon>
      <ColumnIcon className={classes.iconColour} />
    </ListItemIcon>
    <ListItemText className={classes.listItemText} primary={option.label} />
  </ListItem>
);

export default withStyles(styles)(Row);
