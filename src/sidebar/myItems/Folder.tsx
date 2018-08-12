import PropTypes from "prop-types";
import React, { Fragment, SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";

import Item from "sideBar/myItems/Item";

interface IProps extends WithStyles<typeof styles> {
  label: string;
  handleClick: () => void;
  expanded: boolean;
  // TODO: Fix me.
  children: any;
}

const styles = (theme: Theme) =>
  createStyles({
    icon: {
      color: "#696969"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    }
  });

const Folder: SFC<IProps> = ({
  classes,
  label,
  children,
  handleClick,
  expanded
}) => (
  <Fragment>
    <ListItem button onClick={handleClick}>
      {expanded ? (
        <FolderOpenIcon className={classes.icon} />
      ) : (
        <FolderIcon className={classes.icon} />
      )}
      <ListItemText
        primary={label}
        classes={{
          primary: classes.heading
        }}
      />
    </ListItem>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <List disablePadding>
        {children.map(
          // TODO: Fix me.
          ({ ChildType, ...rest }: any) =>
            ChildType === "F" ? (
              <Folder key={rest.ChildFolderId} {...rest.ChildFolder} />
            ) : (
              <Item key={rest.ChildItemId} {...rest.ChildItem} nested />
            )
        )}
      </List>
    </Collapse>
    <Divider />
  </Fragment>
);

Folder.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired
};

export default withStyles(styles)(Folder);
