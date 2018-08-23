import React, { SFC } from "react";
import { NavLink } from "react-router-dom";
import { Location } from "history";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Dashboard from "@material-ui/icons/Dashboard";

interface IProps extends WithStyles<typeof styles> {
  itemId: string;
  label: string;
  nested?: boolean;
  location: Location;
}

const styles = ({ typography }: Theme) =>
  createStyles({
    listItemOpen: {
      paddingLeft: 30
    },
    icon: {
      color: "#696969"
    },
    heading: {
      fontSize: typography.pxToRem(15),
      fontWeight: typography.fontWeightRegular
    }
  });

const workbenchLink = (itemId: string) => ({
  children,
  className
}: ListItemProps) => {
  return (
    <NavLink className={className} to={`/workbench/${itemId}`}>
      {children}
    </NavLink>
  );
};

const Item: SFC<IProps> = ({ classes, itemId, label, nested }) => (
  <ListItem
    divider
    button
    component={workbenchLink(itemId)}
    className={nested ? classes.listItemOpen : undefined}
  >
    <Dashboard className={classes.icon} />
    <ListItemText
      primary={label}
      classes={{
        primary: classes.heading
      }}
    />
  </ListItem>
);

export default withStyles(styles)(Item);
