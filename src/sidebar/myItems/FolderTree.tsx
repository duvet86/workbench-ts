import { Location } from "history";
import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { IFolderChild } from "sidebar/myItems/types";

import List from "@material-ui/core/List";

import FolderContainer from "sidebar/myItems/FolderContainer";
import Item from "sidebar/myItems/Item";

interface IProps extends WithStyles<typeof styles> {
  items: IFolderChild[];
  location: Location;
}

const styles = createStyles({
  list: {
    padding: 0,
    overflow: "auto",
    height: "100%"
  },
  listItem: {
    cursor: "pointer"
  },
  avatar: {
    width: 35,
    height: 35
  },
  icon: {
    width: 25,
    height: 25
  }
});

const FolderTree: SFC<IProps> = ({ classes, items, location }) => (
  <List className={classes.list}>
    {items.map(
      ({ ChildType, ChildFolderId, ChildFolder, ChildItemId, ChildItem }) =>
        ChildType === "F" ? (
          <FolderContainer
            nested={1}
            key={ChildFolderId}
            label={ChildFolder.Label}
            childFolders={ChildFolder.Children}
            location={location}
          />
        ) : (
          <Item
            nested={1}
            key={ChildItemId}
            itemTypeId={ChildItem.ItemTypeId}
            itemId={ChildItem.ItemId}
            label={ChildItem.Label}
          />
        )
    )}
  </List>
);

export default withStyles(styles)(FolderTree);
