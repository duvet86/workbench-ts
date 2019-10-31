import React, { FC } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { IFolderChild } from "sidebar/userItems/types";

import FolderContainer from "sidebar/userItems/FolderContainer";
import SharedWithMeIcon from "@material-ui/icons/People";
import StarredIcon from "@material-ui/icons/Star";
import TrashIcon from "@material-ui/icons/Delete";

interface IProps {
  myItems: IFolderChild[];
  sharedWithMe: IFolderChild[];
}

const useStyles = makeStyles({
  container: {
    overflow: "auto",
    height: "100%",
    width: "100%"
  }
});

const FolderTree: FC<IProps> = ({ myItems, sharedWithMe }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FolderContainer nested={1} label="My Items" childFolders={myItems} />
      <FolderContainer
        nested={1}
        label="Shared With me"
        childFolders={sharedWithMe}
        CutomFolderIcon={SharedWithMeIcon}
      />
      <FolderContainer
        nested={1}
        label="Starred"
        childFolders={[]}
        CutomFolderIcon={StarredIcon}
      />
      <FolderContainer
        nested={1}
        label="Trash"
        childFolders={[]}
        CutomFolderIcon={TrashIcon}
      />
    </div>
  );
};

export default FolderTree;
