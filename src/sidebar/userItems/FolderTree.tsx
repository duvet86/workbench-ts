import { Location } from "history";
import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { IFolderChild } from "sidebar/userItems/types";

import FolderContainer from "sidebar/userItems/FolderContainer";
import SharedWithMeIcon from "@material-ui/icons/People";
import StarredIcon from "@material-ui/icons/Star";
import TrashIcon from "@material-ui/icons/Delete";

interface IProps extends WithStyles<typeof styles> {
  myItems: IFolderChild[];
  sharedWithMe: IFolderChild[];
  location: Location;
}

const styles = createStyles({
  container: {
    overflow: "auto",
    height: "100%",
    width: "100%"
  }
});

const FolderTree: SFC<IProps> = ({
  classes,
  myItems,
  sharedWithMe,
  location
}) => (
  <div className={classes.container}>
    <FolderContainer
      nested={1}
      label="My Items"
      childFolders={myItems}
      location={location}
    />
    <FolderContainer
      nested={1}
      label="Shared With me"
      childFolders={sharedWithMe}
      location={location}
      CutomFolderIcon={SharedWithMeIcon}
    />
    <FolderContainer
      nested={1}
      label="Starred"
      childFolders={[]}
      location={location}
      CutomFolderIcon={StarredIcon}
    />
    <FolderContainer
      nested={1}
      label="Trash"
      childFolders={[]}
      location={location}
      CutomFolderIcon={TrashIcon}
    />
  </div>
);

export default withStyles(styles)(FolderTree);
