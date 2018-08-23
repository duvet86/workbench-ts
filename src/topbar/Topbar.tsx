import trimbleLogo from "topBar/trimbleLogo.png";

import React, { SFC } from "react";
import { Link } from "react-router-dom";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import MenuIcon from "@material-ui/icons/Menu";
import Person from "@material-ui/icons/Person";

interface IProps extends WithStyles<typeof styles> {
  anchorEl?: HTMLElement;
  open: boolean;
  onMenuClickHandler: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuCloseHandler: React.ReactEventHandler;
  onWelcomePageClickHandler: React.ReactEventHandler;
  onLogoutClickHandler: React.ReactEventHandler;
  onProfileClickHandler: React.ReactEventHandler;
  handleDrawerOpen?: React.ReactEventHandler;
}

const styles = ({ mixins, zIndex }: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
      zIndex: zIndex.drawer + 2
    },
    trimbleLogo: {
      height: "36px",
      padding: "4px 0"
    },
    iconContainer: {
      display: "flex",
      alignItems: "center"
    },
    matchColor: {
      color: "#01609d"
    },
    toolBar: {
      justifyContent: "space-between",
      ...Object.keys(mixins.toolbar).reduce((style, key) => {
        const value = (mixins.toolbar[key] as number) - 10;
        return { ...style, [key]: value };
      }, {})
    }
  });

const TopBar: SFC<IProps> = ({
  classes,
  anchorEl,
  open,
  onMenuClickHandler,
  onMenuCloseHandler,
  onWelcomePageClickHandler,
  onLogoutClickHandler,
  onProfileClickHandler,
  handleDrawerOpen,
  ...props
}) => (
  <AppBar {...props} className={classes.appBar}>
    <Toolbar className={classes.toolBar}>
      <div className={classes.iconContainer}>
        <IconButton
          className={classes.matchColor}
          aria-label="open drawer"
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Link to="/">
          <img
            src={trimbleLogo}
            className={classes.trimbleLogo}
            alt="trimbleLogo"
          />
        </Link>
      </div>
      <Typography variant="title" className={classes.matchColor}>
        CONNECTED MINE ANALYTIC
      </Typography>
      <div>
        <Button color="inherit" onClick={onMenuClickHandler}>
          <Person className={classes.matchColor} />
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          getContentAnchorEl={undefined}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={onMenuCloseHandler}
        >
          <MenuItem onClick={onWelcomePageClickHandler}>Welcome Page</MenuItem>
          <MenuItem onClick={onProfileClickHandler}>Profile</MenuItem>
          <MenuItem onClick={onLogoutClickHandler}>Sign Out</MenuItem>
        </Menu>
      </div>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(TopBar);
