import React, { SFC } from "react";
import { NavLink } from "react-router-dom";
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

interface IProps extends WithStyles<typeof styles> {
  Icon: React.ComponentType<SvgIconProps>;
  to: string;
  label: string;
  visible: boolean;
  handlePopoverOpen: () => void;
  handlePopoverClose: () => void;
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "flex"
    },
    listItem: {
      padding: 12
    },
    link: {
      overflow: "hidden"
    },
    paperInfo: {
      position: "fixed",
      left: 52,
      zIndex: 1,
      padding: 10,
      display: "none",
      marginTop: 5,
      "&::after": {
        top: 13,
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

const IconButton: SFC<IProps> = ({
  classes,
  Icon,
  to,
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
    <NavLink exact to={to} className={classes.link}>
      <ListItem button className={classes.listItem}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
      </ListItem>
    </NavLink>
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
