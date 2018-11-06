import { Location } from "history";
import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { IFolderChild } from "sidebar/userItems/types";

import FolderContainer from "sidebar/userItems/FolderContainer";
import SharedWithMeIcon from "@material-ui/icons/FolderShared";
import Paper from "@material-ui/core/Paper";

interface IProps extends WithStyles<typeof styles> {
  myItems: IFolderChild[];
  sharedWithMe: IFolderChild[];
  location: Location;
}

const styles = createStyles({
  container: {
    // overflow: "auto",
    // height: "100%"
  }
});

const FolderTree: SFC<IProps> = ({
  classes,
  myItems,
  sharedWithMe,
  location
}) => (
  <Paper>
    <FolderContainer
      initExpanded={true}
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
  </Paper>
);

export default withStyles(styles)(FolderTree);
