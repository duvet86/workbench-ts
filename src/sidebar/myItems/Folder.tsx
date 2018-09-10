import React, { Fragment, SFC } from "react";
import { Location } from "history";

import { IFolderChild } from "sidebar/myItems/types";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";

import Item from "sidebar/myItems/Item";
import FolderContainer from "sidebar/myItems/FolderContainer";

interface IProps extends WithStyles<typeof styles> {
  location: Location;
  label: string;
  handleClick: () => void;
  expanded: boolean;
  childFolders: IFolderChild[];
  nested: number;
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
  location,
  label,
  childFolders,
  handleClick,
  expanded,
  nested,
  theme
}) => (
  <Fragment>
    <ListItem
      divider
      button
      onClick={handleClick}
      style={{ paddingLeft: nested * theme!.spacing.unit * 2 }}
    >
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
      <List disablePadding component="nav">
        {childFolders.map(
          ({ ChildType, ChildFolderId, ChildFolder, ChildItemId, ChildItem }) =>
            ChildType === "F" ? (
              <FolderContainer
                nested={nested + 1}
                key={ChildFolderId}
                label={ChildFolder.Label}
                childFolders={ChildFolder.Children}
                location={location}
              />
            ) : (
              <Item
                nested={nested + 1}
                key={ChildItemId}
                itemId={ChildItem.ItemId}
                label={ChildItem.Label}
              />
            )
        )}
      </List>
    </Collapse>
  </Fragment>
);

export default withStyles(styles, { withTheme: true })(Folder);
