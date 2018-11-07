import React, { SFC } from "react";
import { NavLink, LinkProps } from "react-router-dom";
import classnames from "classnames";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { ButtonProps } from "@material-ui/core/Button";

interface IProps extends WithStyles<typeof styles> {
  Icon: React.ComponentType<SvgIconProps>;
  link: string;
  label: string;
  visible: boolean;
  handlePopoverOpen: () => void;
  handlePopoverClose: () => void;
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      position: "relative"
    },
    listItem: {
      padding: 12
    },
    paperInfo: {
      position: "absolute",
      left: 65,
      bottom: 4,
      zIndex: 1,
      padding: 7,
      display: "none",
      "&::after": {
        top: 10,
        left: -7,
        content: "''",
        position: "absolute",
        boxSizing: "border-box",
        border: "7px solid black",
        borderColor: `transparent transparent ${theme.palette.common.white} ${
          theme.palette.common.white
        }`,
        transform: "rotate(45deg)",
        boxShadow: "-3px 3px 3px 0 rgba(0, 0, 0, 0.1)"
      }
    },
    paperInfoVisible: {
      display: "block"
    }
  });

const getLink = (url: string) => ({ children, ...props }: ButtonProps) => (
  <NavLink exact to={url} {...props as LinkProps}>
    {children}
  </NavLink>
);

const IconButton: SFC<IProps> = ({
  classes,
  Icon,
  link,
  label,
  visible,
  handlePopoverOpen,
  handlePopoverClose
}) => (
  <div
    className={classes.container}
    onMouseEnter={handlePopoverOpen}
    onMouseLeave={handlePopoverClose}
  >
    <ListItem button className={classes.listItem} component={getLink(link)}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
    </ListItem>
    <Paper
      className={classnames(classes.paperInfo, {
        [classes.paperInfoVisible]: visible
      })}
    >
      <Typography>{label}</Typography>
    </Paper>
  </div>
);

export default withStyles(styles)(IconButton);
