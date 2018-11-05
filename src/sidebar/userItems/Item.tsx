import React, { SFC } from "react";
import { NavLink } from "react-router-dom";

import { ItemTypeIds } from "sidebar/userItems/types";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { DashboardIcon, DataViewIcon } from "common/icons";

interface IProps extends WithStyles<typeof styles, true> {
  itemTypeId: ItemTypeIds;
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

const workbenchLink = (itemTypeId: ItemTypeIds, itemId: string) => ({
  children,
  className,
  style
}: ListItemProps) => {
  const link =
    itemTypeId.toUpperCase() === ItemTypeIds.PAGE_BUILDER
      ? `/pagebuilder/${itemId}`
      : `/workbench/${itemId}`;

  return (
    <NavLink className={className} style={style} to={link}>
      {children}
    </NavLink>
  );
};

const Item: SFC<IProps> = ({
  classes,
  itemTypeId,
  itemId,
  label,
  nested,
  theme
}) => (
  <ListItem
    divider
    button
    component={workbenchLink(itemTypeId, itemId)}
    className={classes.item}
    style={{ paddingLeft: nested * theme.spacing.unit * 2 }}
  >
    {itemTypeId.toUpperCase() === ItemTypeIds.PAGE_BUILDER ? (
      <DashboardIcon className={classes.icon} />
    ) : (
      <DataViewIcon className={classes.icon} />
    )}
    <ListItemText
      primary={label}
      classes={{
        primary: classes.heading
      }}
    />
  </ListItem>
);

export default withStyles(styles, { withTheme: true })(Item);
