import { Location } from "history";
import PropTypes from "prop-types";
import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import FolderContainer from "sideBar/myItems/FolderContainer";
import Item from "sideBar/myItems/Item";

// TODO: Fix me.
interface IProps extends WithStyles<typeof styles> {
  items: {
    myItems: Array<{
      ChildType: string;
      ChildFolderId?: string;
      ChildFolder?: any;
      ChildItemId?: string;
      ChildItem?: any;
    }>;
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
      ({ ChildType, ...props }) =>
        ChildType === "F" ? (
          <FolderContainer
            key={props.ChildFolderId}
            {...props.ChildFolder}
            location={location}
          />
        ) : (
          <Item
            key={props.ChildItemId}
            {...props.ChildItem}
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
