import React, { FC } from "react";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";

import { IComponentGroup } from "pagebuilder/types";

import Fab from "@material-ui/core/Fab";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import ListSubheader from "@material-ui/core/ListSubheader";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

import AddIcon from "@material-ui/icons/Add";
import ComponentIcon from "@material-ui/icons/Extension";

interface IProps extends WithStyles<typeof styles> {
  anchorEl: HTMLElement | undefined;
  componentGroups: IComponentGroup[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
}

const styles = (theme: Theme) =>
  createStyles({
    addButton: {
      position: "fixed",
      bottom: theme.spacing() * 3,
      right: theme.spacing() * 3
    },
    drawer: {
      marginTop: 48
    },
    listSection: {
      backgroundColor: "inherit"
    },
    ul: {
      backgroundColor: "inherit",
      padding: 0
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      maxHeight: 500
    },
    inputContainer: {
      marginTop: theme.spacing() * 2
    },
    componentGroup: {
      color: theme.palette.secondary.main
    },
    component: {
      paddingLeft: 26,
      paddingRight: 26
    }
  });

const AddComponentButton: FC<IProps> = ({
  classes,
  anchorEl,
  componentGroups,
  handleClick,
  handleClose
}) => (
  <>
    <Fab className={classes.addButton} color="primary" onClick={handleClick}>
      <AddIcon />
    </Fab>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        horizontal: "left",
        vertical: "top"
      }}
      transformOrigin={{
        horizontal: "right",
        vertical: "bottom"
      }}
      MenuListProps={{
        subheader: <li />,
        className: classes.root
      }}
    >
      <ListSubheader className={classes.inputContainer}>
        <TextField fullWidth placeholder="Search..." />
      </ListSubheader>
      {componentGroups.map(({ GroupId, Title, Components }) => (
        <li key={GroupId} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.componentGroup}>
              {Title}
              <Divider />
            </ListSubheader>
            {Components.map(({ ComponentId, Title: ComponentTitle }) => (
              <ListItem button key={ComponentId}>
                <ListItemIcon>
                  <ComponentIcon />
                </ListItemIcon>
                <ListItemText primary={ComponentTitle} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </Menu>
  </>
);

export default withStyles(styles)(AddComponentButton);
