import React, { SFC } from "react";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";

import { IComponentGroup } from "pagebuilder/types";

import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import ListSubheader from "@material-ui/core/ListSubheader";
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
      bottom: theme.spacing.unit * 3,
      right: theme.spacing.unit * 3
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
      backgroundColor: theme.palette.background.paper
    },
    componentGroup: {
      color: theme.palette.secondary.main
    },
    component: {
      paddingLeft: 26,
      paddingRight: 26
    }
  });

const AddComponentButton: SFC<IProps> = ({
  classes,
  anchorEl,
  componentGroups,
  handleClick,
  handleClose
}) => (
  <>
    <Button
      className={classes.addButton}
      variant="fab"
      color="primary"
      onClick={handleClick}
    >
      <AddIcon />
    </Button>
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
