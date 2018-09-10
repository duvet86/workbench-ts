import React, { SFC } from "react";
import { NavLink } from "react-router-dom";

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
  nested: number;
}

const styles = ({ typography }: Theme) =>
  createStyles({
    item: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
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
  className,
  style
}: ListItemProps) => {
  return (
    <NavLink className={className} style={style} to={`/workbench/${itemId}`}>
      {children}
    </NavLink>
  );
};

const Item: SFC<IProps> = ({ classes, itemId, label, nested, theme }) => (
  <ListItem
    divider
    button
    component={workbenchLink(itemId)}
    className={classes.item}
    style={{ paddingLeft: nested * theme!.spacing.unit * 2 }}
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

export default withStyles(styles, { withTheme: true })(Item);
