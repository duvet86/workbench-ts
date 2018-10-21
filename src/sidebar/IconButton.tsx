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
import Tooltip from "@material-ui/core/Tooltip";
import { ButtonProps } from "@material-ui/core/Button";

interface IProps extends WithStyles<typeof styles> {
  tooltip: string;
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
      paddingLeft: 12,
      paddingRight: 12
    }
  });

const getLink = (url: string) => ({ children, ...props }: ButtonProps) => (
  <NavLink exact to={url} {...props as LinkProps}>
    {children}
  </NavLink>
);

const IconButton: SFC<IProps> = ({ classes, tooltip, Icon, link }) => (
  <Tooltip
    classes={{ popper: classes.popper, tooltip: classes.lightTooltip }}
    title={tooltip}
    placement="right"
  >
    <ListItem button className={classes.listItem} component={getLink(link)}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
    </ListItem>
  </Tooltip>
);

export default withStyles(styles)(IconButton);
