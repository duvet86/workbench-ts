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
      left: 55,
      bottom: 7,
      zIndex: 1,
      padding: 7,
      display: "none",
      // transform: "translateX(-50%)",
      overflow: "hidden",
      "&::after": {
        content: "''",
        position: "absolute",
        width: 20,
        height: 20,
        background: "white",
        transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
        top: 0,
        left: "50%",
        boxShadow: "1px 1px 20px 0px rgba(0,0,0,0.6)"
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
        [classes.paperInfoVisible]: true
      })}
    >
      <Typography>{label}</Typography>
    </Paper>
  </div>
);

export default withStyles(styles)(IconButton);
