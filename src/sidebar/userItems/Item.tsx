import React, { FC, forwardRef } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

import { ItemTypeIds } from "sidebar/userItems/types";

import { Theme, makeStyles, useTheme } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { DashboardIcon, DataViewIcon } from "common/icons";

interface IProps {
  itemTypeId: ItemTypeIds;
  itemId: string;
  label: string;
  nested: number;
}

const useStyles = makeStyles(({ typography }: Theme) => ({
  ellipsis: {
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
}));

// The use of React.forwardRef will no longer be required for react-router-dom v6.
// See https://github.com/ReactTraining/react-router/issues/6056
const workbenchLink = (itemTypeId: ItemTypeIds, itemId: string) => {
  const to =
    itemTypeId.toUpperCase() === ItemTypeIds.PAGE_BUILDER
      ? `/pagebuilder/${itemId}`
      : `/workbench/${itemId}`;

  return forwardRef<HTMLAnchorElement, Omit<NavLinkProps, "innerRef" | "to">>(
    function NewWorkbenchLink(props, ref) {
      return <NavLink to={to} innerRef={ref} {...props} />;
    }
  );
};

const Item: FC<IProps> = ({ itemTypeId, itemId, label, nested }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <ListItem
      divider
      button
      component={workbenchLink(itemTypeId, itemId)}
      style={{ paddingLeft: nested * theme.spacing() * 2 }}
    >
      <ListItemIcon>
        {itemTypeId.toUpperCase() === ItemTypeIds.PAGE_BUILDER ? (
          <DashboardIcon className={classes.icon} />
        ) : (
          <DataViewIcon className={classes.icon} />
        )}
      </ListItemIcon>
      <ListItemText
        primary={label}
        className={classes.ellipsis}
        classes={{
          primary: classes.heading
        }}
      />
    </ListItem>
  );
};

export default Item;
