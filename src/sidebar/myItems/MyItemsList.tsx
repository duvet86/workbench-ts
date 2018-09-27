import { Location } from "history";
import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import { IFolderChild } from "sidebar/myItems/types";

import FolderContainer from "sidebar/myItems/FolderContainer";
import Item from "sidebar/myItems/Item";

interface IProps extends WithStyles<typeof styles> {
  items?: {
    myItems: IFolderChild[];
    sharedWithMe: IFolderChild[];
  };
  location: Location;
}

const styles = createStyles({
  list: {
    padding: 0
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

const MyItemsList: SFC<IProps> = ({ classes, items, location }) => {
  if (!items) {
    return null;
  }

  return (
    <List className={classes.list}>
      {items.myItems.map(
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
      {items.sharedWithMe.map(
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
};

export default withStyles(styles)(MyItemsList);
