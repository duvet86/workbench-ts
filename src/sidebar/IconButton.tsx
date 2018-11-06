import React, { SFC } from "react";
import { NavLink, LinkProps } from "react-router-dom";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { ButtonProps } from "@material-ui/core/Button";

interface IProps extends WithStyles<typeof styles> {
  Icon: React.ComponentType<SvgIconProps>;
  link: string;
}

const styles = (theme: Theme) =>
  createStyles({
    popper: {
      opacity: 1
    },
    lightTooltip: {
      background: theme.palette.common.white,
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[1],
      fontSize: 14
    },
    listItem: {
      padding: 12
    }
  });

const getLink = (url: string) => ({ children, ...props }: ButtonProps) => (
  <NavLink exact to={url} {...props as LinkProps}>
    {children}
  </NavLink>
);

const IconButton: SFC<IProps> = ({ classes, Icon, link }) => (
  <ListItem button className={classes.listItem} component={getLink(link)}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
  </ListItem>
);

export default withStyles(styles)(IconButton);
