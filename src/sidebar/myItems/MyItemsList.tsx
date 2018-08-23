import { Location } from "history";
import PropTypes from "prop-types";
import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import { IFolderChild } from "sidebar/myItems/types";

import FolderContainer from "sideBar/myItems/FolderContainer";
import Item from "sideBar/myItems/Item";

interface IProps extends WithStyles<typeof styles> {
  items: {
    myItems: IFolderChild[];
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

const MyItemsList: SFC<IProps> = ({ classes, items, location }) => (
  <List className={classes.list}>
    {items.myItems.map(
      ({ ChildType, ChildFolderId, ChildFolder, ChildItemId, ChildItem }) =>
        ChildType === "F" ? (
          <FolderContainer
            key={ChildFolderId}
            label={ChildFolder.Label}
            children={ChildFolder.Children}
            location={location}
          />
        ) : (
          <Item
            key={ChildItemId}
            itemId={ChildItem.ItemId}
            label={ChildItem.Label}
            location={location}
          />
        )
    )}
  </List>
);

MyItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withStyles(styles)(MyItemsList);
